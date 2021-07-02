import { useEffect, useState } from "react";
import { sqrt } from "mathjs";
import { Button, Container, Row } from "reactstrap";
import { dataFromDistribution, populationMean, populationStandardDev } from "../../lib/stats-utils.js";
import PropTypes from "prop-types";
import PopulationChartReveal from "./PopulationChartReveal.js";
import _ from "lodash";
import { jStat } from "jstat";
import DataDisplay from "./DataDisplay.js";
import SampleSizeAlphaInputs from "./SampleSizeAlphaInput.js";
import { popShapeType } from "../../lib/types.js";
import {InputGroupText, Input } from "reactstrap";

export default function PerformTest({ testType, distType, shape, tails, mue0 }) {

  const [popArr, setPopArr] = useState([]);
  const [sample, setSample] = useState([]);
  const [sampleSize, setSampleSize] = useState(0);
  const [alpha, setAlpha] = useState(0);
  const [sim, setSim] = useState(0);

  const [popArr2, setPopArr2] = useState([]);
  const [sample2, setSample2] = useState([]);
  const [sampleSize2, setSampleSize2] = useState(0);
  const [sim2, setSim2] = useState(0);

 

  useEffect(() => {
    const popMean1 = Math.random(61,66);
    const popMean2 = Math.random(61,66);
    setPopArr(dataFromDistribution(shape, 2000, { mean: popMean1, low: 59, hi: 79 }))
    setPopArr2(dataFromDistribution(shape, 2000, { mean: popMean2 , low: 59, hi: 79 }))
  }, [shape]);

  const takeSample = () => {
    setSample(_.sampleSize(popArr, sampleSize));
    if (sim === 0) {
      setSim(1);
    }
  }
  const takeSample2 = () => {
      setSample2(_.sampleSize(popArr2, sampleSize2));
      if (sim2 === 0) {
        setSim2(1);
      }
    } 
  
 const takeBothSamples = () => {
    takeSample();
    takeSample2();
  }
  const sampleMean = populationMean(sample);
  const sampleSD = populationStandardDev(sample)
  const populationSD = populationStandardDev(popArr)

  const tscore = jStat.tscore(sampleMean, mue0, sampleSD, sampleSize);
  const zscore = jStat.zscore(sampleMean, mue0, 3 / sqrt(sampleSize));

  //for two-sample
  const sampleMean2 = populationMean(sample2);
  const sampleSD2 = populationStandardDev(sample2) 
  const populationSD2 = populationStandardDev(popArr2) 

  const tscoreTwoSample = ((sampleMean - sampleMean2)  - 0) / sqrt(Math.pow(sampleSD,2)/sampleSize + Math.pow(sampleSD2,2)/sampleSize2)
  const zscoreTwoSample = ((sampleMean - sampleMean2)  - 0) / sqrt(Math.pow(populationSD,2)/sampleSize + Math.pow(populationSD2,2)/sampleSize2)

  function calculateTestStatistic(){

    //one sample sigma known
    if (distType === 'Z' && testType === 'oneSample') {
      return zscore;

    //one sample sigma unknown
    } else if (distType !== 'Z' && testType === 'oneSample') {
      return tscore;  

      //two sample sigma known
    } else if (distType === 'Z' && testType !== 'oneSample') {
      return zscoreTwoSample ;

      //two sample sigma unknown
    } else {
      return  tscoreTwoSample
    }
  }

  function calculatePValue() {

    if(distType === 'Z' && testType === 'oneSample') {
      return jStat.ztest(sampleMean, mue0, populationSD / sqrt(sampleSize), tails)
     } 
     else if (distType === 'T' && testType === 'oneSample') {
      return jStat.ttest(tscore, sampleSize - 1, tails)

   } else if (distType === 'Z' && testType !== 'oneSample') {
       return jStat.ztest(zscore,tails);
    } else {
      return jStat.ttest( tscoreTwoSample, sampleSize - 1, tails )
    }
  }

  const testStatistic = calculateTestStatistic();
  const pValue = calculatePValue();


  let extraInput =  (<> </>)
  if (testType !== "oneSample") {

    extraInput =  <>
   <InputGroupText>Sample 2 Size </InputGroupText>
          <Input
            type="number"
            step={1}
            value={sampleSize2}
            min={1}
            max={popArr2}
            onChange={(event) => setSampleSize2(event.target.value)} /> 
          </> 
  }
 
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
      {extraInput}
      <br/>
      <Button
        color="primary"
        disabled={(sampleSize <= 0) || (sampleSize > popArr.length)}
        onClick={() => testType === 'oneSample' ?  takeSample() : takeBothSamples()} 
      > Sample/s
      </Button>
      <br/>
      <br/>
      {(sim >= 1) && (
        <Container>
          <DataDisplay
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
              <Button color="primary" onClick={() => setSim(2)}>Reveal</Button>
            </p>
          </Row>
        </Container>
      )}
      <br/>
      {(sim === 2) && <PopulationChartReveal popArr={popArr} pVal={pValue} alpha={+alpha}/>}
    </Container>
      )
  }

PerformTest.propTypes = {
  shape: popShapeType.isRequired,
  tails: PropTypes.number.isRequired,
  mue0: PropTypes.number.isRequired,
  distType: PropTypes.string.isRequired,
}
