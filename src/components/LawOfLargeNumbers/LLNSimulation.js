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
import { populationMean, dataFromDistribution } from "../../lib/stats-utils.js";
import _ from "lodash";
import PropTypes from 'prop-types';

export default function LLNSimulation({ popType, sampleSize }) {
  const [sampled, setSampled] = useState([]);
  const [stage, setStage] = useState(1);
  const [sampleMean, setSampleMean] = useState(0);
  const [popArray, setPopArray] = useState([]);
  const [popMean, setPopMean] = useState(0);

  useEffect(() => {
    setStage(1);
    setPopArray([]);
    setSampled([]);
    setSampleMean(0);
  }, [popType]);

  // Highcharts rendering is buggy - this second useEffect takes a second but allows the data to be reset completely before being generated again
  useEffect(() => {
    if (popArray.length === 0) {
      const newPop = dataFromDistribution(popType, sampleSize);
      setPopArray(newPop);
      const newMean = populationMean(newPop);
      setPopMean(newMean);
    }
  }, [popArray, popType, sampleSize]);

  const handleClick = (size) => {
    const sample = _.sampleSize(popArray, size);
    setSampled(sample);
    setSampleMean(_.round(populationMean(sample), 2));
    setStage(2);
  }

  return (
    <Collapsable>
      <ChartContainer popArray={popArray} popMean={popMean} sampled={sampled} sampleMean={sampleMean} popType={popType}/>
      <p>Try a few different sample sizes and compare sample mean to population mean</p>
      <SampleSizeInput maxSize={popArray.length} handleClick={handleClick}/>
      {(stage >= 2) &&
        <div>
          <Alert color="success" style={{ padding: 0, marginTop: '1em' }}>
            Sample Mean: {_.round(sampleMean, 2) || ''}
            <br/>
            Difference of Means: {_.round(popMean - sampleMean, 2)}
          </Alert>
          <Alert color="info">
            According to the law, the average of the results obtained from a large enough sample should be close to the total average of the population, and will tend to become closer the larger the sample is. Make sure to pick several samples, or see below for a simulation to see the law in action.
          </Alert>
          <SimulateSamples type={popType} popArray={popArray} popMean={_.round(popMean, 2)}/>
        </div>
      }
    </Collapsable>
  );
}
LLNSimulation.propTypes =  {
  popType : PropTypes.string ,
  sampleSize : PropTypes.number,
}
