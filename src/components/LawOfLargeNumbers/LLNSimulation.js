/*

  Displays one of the LLN simulations

  props:
    popType     - string
    sampleSize  - int

*/
import React, { useEffect, useState } from 'react';
import Collapsable from '../Collapsable.js';
import ChartContainer from '../ChartContainer.js';
import SampleSizeInput from '../SampleSizeInput.js';
import SimulateSamples from './SimulateSamples.js';
import { Alert } from 'reactstrap';
import { populationMean, sample, differenceOfMeans } from "../../lib/stats-utils.js";
import { dataFromDistribution } from '../../lib/data-generation.js';

export default function LLNSimulation({ popType, sampleSize }) {
  const [sampled, setSampled] = useState([]);
  const [stage, setStage] = useState(1);
  const [sampleMean, setSampleMean] = useState(0);
  const [popArray, setPopArray] = useState([]);
  const [popMean, setPopMean] = useState(0);

  useEffect(() => {
    setStage(1);
    const newPop = dataFromDistribution(popType, sampleSize);
    setPopArray(newPop);
    const newMean = populationMean(newPop);
    setPopMean(newMean);
    setSampled([]);
  }, [popType, sampleSize]);

  const handleClick = (size) => {
    const sampleObject = sample(size, popArray);  // TODO: use a package here? (lodash, underscore)
    setSampled(sampleObject.pop);
    setSampleMean(sampleObject.mue);
    setStage(2);
  }

  return (
    <Collapsable>
      <ChartContainer popArray={popArray} popMean={popMean} sampled={sampled} popType={popType}/>
      <p>Try a few different sample sizes and compare sample mean to population mean</p>
      <SampleSizeInput maxSize={popArray.length} handleClick={handleClick}/>
      {(stage >= 2) &&
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
