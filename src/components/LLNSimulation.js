import React, { useState } from 'react';
import Collapsable from './Collapsable.js';
import ChartContainer from './ChartContainer.js';
import SampleSizeInput from './SampleSizeInput.js';
import SimulateSamples from './SimulateSamples.js';
import { Alert } from 'reactstrap';
import { populationMean, sample, differenceOfMeans } from "../lib/stats-utils.js";
import { generateChiSquared, generateExponential, generateNormal, generateUniform } from '../lib/data-generation.js';

export default function LLNSimulation({ popType, sampleSize }) {
  const [sampled, setSampled] = useState([]);
  const [expand, setExpand] = useState(false);
  const [sampleMean, setSampleMean] = useState(0);

  const dataFromDistribution = {
    "Normal": () => generateNormal(sampleSize),
    "Uniform": () => generateUniform(sampleSize),
    "Exponential": () => generateExponential(sampleSize),
    "Chi-Squared": () => generateChiSquared(sampleSize)
  }

  const popArray = dataFromDistribution[popType]();
  const popMean = populationMean(popArray);

  const handleClick = (size) => {
    const sampleObject = sample(size, popArray);
    setSampled(sampleObject.pop);
    setSampleMean(sampleObject.mue);
    setExpand(true);
  }

  return (
    <Collapsable>
      <ChartContainer popArray={popArray} popMean={popMean} sampled={sampled} popType={popType} mainSampleSize={sampleSize}/>
      <p> Try a few different sample sizes and compare sample mean to population mean </p>
      <SampleSizeInput maxSize={popArray.length} handleClick={handleClick}/>
      {expand &&
        <div>
          <Alert color="success" style={{ padding: 0, marginTop: '1em' }}>
            Sample Mean: {sampleMean || ''}
            <br/>
            Difference of Means: {differenceOfMeans(popMean, sampleMean)}
          </Alert>
          <Alert color="info">
            According to the law, the average of the results obtained from a large enough sample should be close to the total average of the population, and will tend to become closer the larger the sample is. Make sure to pick several samples, or click below for a simulation to see the law in action.
          </Alert>
          <SimulateSamples type={popType} sample={(size) => sample(size, popArray).pop} pop={popMean}/>
        </div>
      }
    </Collapsable>
  );

}
