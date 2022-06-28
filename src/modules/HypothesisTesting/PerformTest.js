import { useEffect, useState } from 'react';
import { random } from 'mathjs';
import { Button, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import PopulationChartReveal from './PopulationChartReveal';
import _ from 'lodash';
import ResultsDisplay from './ResultsDisplay';
import SampleSizeAlphaInputs from './SampleSizeAlphaInput';
import SimulateTypeOneError from './SimulateTypeOneError';
import { hypothesisEqualityType, popShapeType, testTypeType } from '@/lib/types';
import {
  calculateOneSampleTestStatistic,
  calculatePValue,
  calculateTwoSampleTestStatistic,
  dataFromDistribution,
  populationMean,
  populationStandardDev
} from '@/lib/stats-utils';

export default function PerformTest({ distType, shape, sides, mu0, equality, testType }) {
  const [popArr, setPopArr] = useState([]);
  const [sample, setSample] = useState([]);
  const [sampleSize, setSampleSize] = useState(0);
  const [alpha, setAlpha] = useState(0);
  const [stage, setStage] = useState(0);

  // in the two-sample case, 'popArr' becomes the '2nd' population, and we use 'originalPop' as the first population
  // see the ResultsDisplay component for an example of this
  const [originalPop, setOriginalPop] = useState([]);
  const [originalPopSample, setOriginalPopSample] = useState([]);
  const [originalPopSampleSize, setOriginalPopSampleSize] = useState(0);

  useEffect(() => {
    if (stage === 3) {
      setStage(2)
    }
  }, [mu0, equality]);

  useEffect(() => {
    const popMean1 = random(61, 66);
    const sd1 = random(1, 4);
    setPopArr(dataFromDistribution(
      shape,
      2000,
      {
        mean: popMean1,
        standardDev: sd1,
        low: popMean1 - 10,
        hi: popMean1 + 10,
        mysteryMean1: popMean1 - 6,
        mysteryMean2: popMean1 + 6,
        mysterySD1: sd1 - 1,
        mysterySD2: sd1 + 1
      }
    ));
    if (testType === 'twoSample') {
      setOriginalPop(dataFromDistribution(shape, 2000, { low: 54, hi: 74 }));
    } else {
      setOriginalPop([]);
    }
  }, [shape, testType]);

  const takeSample = () => {
    setSample(_.sampleSize(popArr, sampleSize));
    if (stage === 0) {
      setStage(1);
    }
    if (testType === 'twoSample') {
      setOriginalPopSample(_.sampleSize(originalPop, originalPopSampleSize))
    }
  }

  const sampleMean = populationMean(sample);
  const sampleSD = populationStandardDev(sample);
  const populationSD = populationStandardDev(popArr);

  // for the two-sample case
  const originalSampleMean = populationMean(originalPopSample);
  const originalSampleSD = populationStandardDev(originalPopSample);
  const originalPopSD = populationStandardDev(originalPop);

  // use the population or sample sd based on the distribution type (Z or T)
  const oneSampleSD = (distType === 'Z') ? populationSD : sampleSD;
  const twoSampleSD1 = (distType === 'Z') ? originalPopSD : originalSampleSD;
  const twoSampleSD2 = (distType === 'Z') ? originalPopSD : sampleSD;

  const testStatistic = (testType === 'oneSample')
    ? calculateOneSampleTestStatistic(distType, sampleMean, mu0, oneSampleSD, sampleSize)
    : calculateTwoSampleTestStatistic(
        originalSampleMean,
        sampleMean,
        twoSampleSD1,
        twoSampleSD2,
        originalPopSampleSize,
        sampleSize
      );

  const pValue = calculatePValue(distType, testStatistic, equality, sampleSize, sides);

  return (
    <Container fluid>
      <p>Let’s test your assertion by taking a sample and setting our tolerance for making a type-one error α!</p>
      <SampleSizeAlphaInputs
        sampleSize={sampleSize}
        setSampleSize={setSampleSize}
        alpha={alpha}
        setAlpha={setAlpha}
        popSize={popArr.length}
        sampleSize2={originalPopSampleSize}
        setSampleSize2={setOriginalPopSampleSize}
        showSecondInput={testType === 'twoSample'}
      />
      <br/>
      <Button
        variant="outline-primary"
        active={stage >= 1}
        disabled={
          (sampleSize <= 0) ||
          (sampleSize > popArr.length) ||
          ((testType === 'twoSample') && ((originalPopSampleSize <= 0) || (originalPopSampleSize > originalPop.length)))
        }
        onClick={() => takeSample()}
      >
        Sample
      </Button>
      <br/>
      <br/>
      {(stage >= 1) && (
        <Container>
          <ResultsDisplay
            testType={testType}
            // note how we use the 'original' mean in the two-sample case but the 'regular' mean in the one-sample case
            mean={(testType === 'twoSample') ? originalSampleMean : sampleMean}
            mean2={sampleMean}  // mean2 has no effect in the one-sample case
            standardDev={(testType === 'twoSample') ? originalSampleSD : sampleSD}
            standardDev2={sampleSD}
            testStatistic={testStatistic}
            pValue={pValue}
            alpha={+alpha}
            equality={equality}
          />
          <br/>
          <Row>
            <p>
              Press here to reveal the true population distribution and mean:{' '}
              <Button active={stage >= 2} variant="outline-primary" onClick={() => setStage(2)}>Reveal</Button>
            </p>
          </Row>
        </Container>
      )}
      <br/>
      {(stage >= 2) && (
        <div>
          <PopulationChartReveal
            popArr={(testType === 'twoSample') ? originalPop : popArr}
            popArr2={(testType === 'twoSample') ? popArr : []}
            mu0={+mu0}
            equality={equality}
            reject={pValue < alpha}
            testType={testType}
          />
          <Button variant="outline-primary" active={stage >= 3} onClick={() => setStage(3)}>Simulate Type I Error</Button>
        </div>
      )}
      {(stage >= 3) && (
        <SimulateTypeOneError
          popShape={shape}
          mu0={(testType === 'twoSample') ? populationMean(popArr) : +mu0}
          alpha={+alpha}
          distType={distType}
          sides={sides}
          equality={equality}
          testType={testType}
          sd1={(testType === 'twoSample') ? originalPopSD : populationSD}
          sd2={populationSD}
        />
      )}
    </Container>
  )
}

PerformTest.propTypes = {
  distType: PropTypes.string.isRequired,
  shape: popShapeType.isRequired,
  sides: PropTypes.oneOf([1, 2]).isRequired,
  mu0: PropTypes.number.isRequired,
  equality: hypothesisEqualityType.isRequired,
  testType: testTypeType.isRequired
}
