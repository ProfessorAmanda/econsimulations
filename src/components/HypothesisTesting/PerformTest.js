import { useEffect, useState } from 'react';
import { random, sqrt } from 'mathjs';
import { Button, Container, Row } from 'react-bootstrap';
import { dataFromDistribution, populationMean, populationStandardDev } from '../../lib/stats-utils.js';
import PropTypes from 'prop-types';
import PopulationChartReveal from './PopulationChartReveal.js';
import _ from 'lodash';
import { jStat } from 'jstat';
import ResultsDisplay from './ResultsDisplay.js';
import SampleSizeAlphaInputs from './SampleSizeAlphaInput.js';
import SimulateTypeOneError from './SimulateTypeOneError.js';
import { hypothesisEqualityType, popShapeType, testTypeType } from '../../lib/types.js';

export default function PerformTest({ distType, shape, sides, mu0, equality, testType }) {
  const [popArr, setPopArr] = useState([]);
  const [sample, setSample] = useState([]);
  const [sampleSize, setSampleSize] = useState(0);
  const [alpha, setAlpha] = useState(0);
  const [stage, setStage] = useState(0);
  const [originalPop, setOriginalPop] = useState([]);
  const [originalPopSample, setOriginalPopSample] = useState([]);
  const [originalPopSampleSize, setOriginalPopSampleSize] = useState(0);

  useEffect(() => {
    if (stage === 3) {
      setStage(2)
    }
  }, [mu0, equality]);  // eslint-disable-line

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
  }

  const takeBothSamples = () => {
    takeSample();
    setOriginalPopSample(_.sampleSize(originalPop, originalPopSampleSize));
  }

  const sampleMean = populationMean(sample);
  const sampleSD = populationStandardDev(sample)
  const populationSD = populationStandardDev(popArr)

  const tscore = jStat.tscore(sampleMean, mu0, sampleSD, sampleSize);
  const zscore = jStat.zscore(sampleMean, mu0, populationSD / sqrt(sampleSize));

  // for two-sample
  const originalSampleMean = populationMean(originalPopSample);
  const originalSampleSD = populationStandardDev(originalPopSample)
  const originalPopSD = populationStandardDev(originalPop)

  const tscoreTwoSample = (originalSampleMean - sampleMean) / sqrt((sampleSD ** 2) / sampleSize + (originalSampleSD ** 2) / originalPopSampleSize)
  const zscoreTwoSample = (originalSampleMean - sampleMean) / sqrt((populationSD ** 2) / sampleSize + (originalPopSD ** 2) / originalPopSampleSize)

  const calculateTestStatistic = () => {
    // one sample sigma known
    if (distType === 'Z' && testType === 'oneSample') {
      return zscore;
      // one sample sigma unknown
    } else if (distType !== 'Z' && testType === 'oneSample') {
      return tscore;
      // two sample sigma known
    } else if (distType === 'Z' && testType !== 'oneSample') {
      return zscoreTwoSample;
      // two sample sigma unknown
    } else {
      return tscoreTwoSample
    }
  }

  const calculatePValue = () => {
    if (distType === 'Z' && testType === 'oneSample') {
      return jStat.ztest(zscore, sides)
    } else if (distType === 'T' && testType === 'oneSample') {
      return jStat.ttest(tscore, sampleSize - 1, sides)

    } else if (distType === 'Z' && testType !== 'oneSample' && equality === ">") {

        if(zscoreTwoSample >= 0) { 
          return jStat.ztest(zscoreTwoSample, sides);

        } else {
          return  1 - jStat.ztest(zscoreTwoSample, sides);
      }
      
    } else if (distType === 'Z' && testType !== 'oneSample' && equality === "<") {

      if (zscoreTwoSample < 0) {
        return jStat.ztest(zscoreTwoSample, sides);

      } else {
        return 1 - jStat.ztest(zscoreTwoSample, sides);
      }
     } else {
      return jStat.ttest(tscoreTwoSample, sampleSize - 1, sides)
    }
  }

  const testStatistic = calculateTestStatistic();
  const pValue = calculatePValue();

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
        onClick={() => (testType === 'oneSample' ? takeSample() : takeBothSamples())}
      >
        Sample
      </Button>
      <br/>
      <br/>
      {(stage >= 1) && (
        <Container>
          <ResultsDisplay
            testType={testType}
            mean={(testType === 'twoSample') ? originalSampleMean : sampleMean}
            mean2={sampleMean}
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
              Press here to reveal the true population distribution and mean.&nbsp;
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
            pVal={pValue}
            alpha={+alpha}
            mu0={+mu0}
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
