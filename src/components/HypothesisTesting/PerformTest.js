import { useEffect, useState } from "react";
import { sqrt } from "mathjs";
import { Button, Container, Row } from "reactstrap";
import { dataFromDistribution, populationMean, populationStandardDev } from "../../lib/stats-utils.js";
import PropTypes from "prop-types";
import PopulationChartReveal from "./PopulationChartReveal.js";
import _ from "lodash";
import { jStat } from "jstat";
import ResultsDisplay from "./ResultsDisplay.js";
import SampleSizeAlphaInputs from "./SampleSizeAlphaInput.js";
import SimulateSamples from "./SimulateSamples.js";
import { popShapeType } from "../../lib/types.js";

export default function PerformTest({ distType, shape, tails, mue0 }) {
  const [popArr, setPopArr] = useState([]);
  const [sample, setSample] = useState([]);
  const [sampleSize, setSampleSize] = useState(0);
  const [alpha, setAlpha] = useState(0);
  const [stage, setStage] = useState(3);  // TODO: init to 0

  useEffect(() => {
    setPopArr(dataFromDistribution(shape, 2000, { mean: 69, low: 59, hi: 79 }))
  }, [shape]);

  const takeSample = () => {
    setSample(_.sampleSize(popArr, sampleSize));
    if (stage === 0) {
      setStage(1);
    }
  }
  const sampleMean = populationMean(sample);
  const sampleSD = populationStandardDev(sample)
  const zscore = jStat.zscore(sampleMean, mue0, 3 / sqrt(sampleSize)); //sd is 3
  const tscore = jStat.tscore(sampleMean, mue0, sampleSD, sampleSize);

  function calculateTestStatistic(){

    if(distType === 'Z') {
      return zscore
    } else {
      return tscore;
    }
  }
  function calculatePValue() {
    if(distType === 'Z') {
      return jStat.ztest(sampleMean, mue0, 3 / sqrt(sampleSize), tails)
    } else {
       return jStat.ttest(tscore, sampleSize, tails)
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
      />
      <br/>
      <Button
        color="primary"
        disabled={(sampleSize <= 0) || (sampleSize > popArr.length)}
        onClick={() => takeSample()}
      >
        Sample
      </Button>
      <br/>
      <br/>
      {(stage >= 1) && (
        <Container>
          <ResultsDisplay
            mean={sampleMean}
            standardDev={sampleSD}
            testStatistic={testStatistic}
            pValue={pValue}
            alpha={+alpha}
          />
          <br/>
          <Row>
            <p>
              Press here to reveal the true population distribution and mean.&nbsp;
              <Button color="primary" onClick={() => setStage(2)}>Reveal</Button>
            </p>
          </Row>
        </Container>
      )}
      <br/>
      {(stage >= 2) && (
        <div>
          <PopulationChartReveal popArr={popArr} pVal={pValue} alpha={+alpha}/>
          <Button color="primary" onClick={() => setStage(3)}>Simulate Type I Error</Button>
        </div>
      )}
      {(stage >= 3) && <SimulateSamples mue0={+mue0} alpha={+alpha}/>}
    </Container>
  )
}

PerformTest.propTypes = {
  shape: popShapeType.isRequired,
  tails: PropTypes.oneOf([1, 2]).isRequired,
  mue0: PropTypes.number.isRequired,
  distType: PropTypes.string.isRequired,
}
