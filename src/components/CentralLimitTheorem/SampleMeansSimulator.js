/*

  Displays inputs to allow the user to run a large number of resamples

*/
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { dataObjectArrayType } from '../../lib/types.js';
import { populationMean } from '../../lib/stats-utils.js';

export default function SampleMeansSimulator({ population, addSamples }) {
  const [numberResamples, setNumberResamples] = useState(0);
  const [resampleSize, setResampleSize] = useState(0);

  const resample = () => {
    const samplePop = _.sampleSize(population, resampleSize);
    const sampleMean = populationMean(samplePop);
    return { size: +resampleSize, mean: sampleMean };
  }

  const runSim = () => {
    const newSamples = [];
    for (let i = 0; i < numberResamples; i++) {
      newSamples.push(resample())
    }
    addSamples(newSamples);
  }

  return (
    <div>
      <span> Sample Size: </span>
      <Form.Control
        style={{ width: '40%', margin: 'auto' }}
        min={1}
        type="number"
        placeholder="Sample Size:"
        onChange={(event) => setResampleSize(event.target.value)}
        value={resampleSize}
      />
      <br/>
      <span> Number of Replications: </span>
      <Form.Control
        style={{ width: '40%', margin: 'auto' }}
        min={1}
        type="number"
        placeholder="Number of Replications:"
        onChange={(event) => setNumberResamples(event.target.value)}
        value={numberResamples}
      />
      <br/>
      <Button
        variant="secondary"
        onClick={() => runSim()} disabled={(resampleSize < 1) || (resampleSize > population.length) || (numberResamples < 1)}
      >
        Run
      </Button>
      <Button variant="secondary" onClick={() => addSamples()}>Clear</Button>
    </div>
  );
}

SampleMeansSimulator.propTypes = {
  population: dataObjectArrayType.isRequired,
  addSamples: PropTypes.func.isRequired,
}
