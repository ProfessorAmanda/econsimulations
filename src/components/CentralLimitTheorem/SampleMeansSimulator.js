/*

  Displays inputs to allow the user to run a large number of resamples

*/
import { useState } from "react";
import {Button, Input } from 'reactstrap';
import _ from "lodash";
import PropTypes from 'prop-types';
import { dataObjectArrayType } from "../../lib/types.js";
import { populationMean } from "../../lib/stats-utils.js";

export default function SampleMeansSimulator({ setSampleSize, population, addSamples }) {
  const [numberResamples, setNumberResamples] = useState(0);
  const [resampleSize, setResampleSize] = useState(0);

  const changeSampleSize = (value) => {
    setSampleSize(value);
    setResampleSize(value);
  }

  const resample = () => {
    const samplePop = _.sampleSize(population, resampleSize);
    const sampleMean = populationMean(samplePop);
    return {x: +resampleSize, y: sampleMean};
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
      <Input
        style={{width: "40%", margin: "auto"}}
        min={1}
        type="number"
        placeholder="Sample Size:"
        onChange={(event) => changeSampleSize(event.target.value)}
        value={resampleSize}
      />
      <br/>
      <span> Number of Replications: </span>
      <Input
        style={{width: "40%", margin: "auto"}}
        min={1}
        type="number"
        placeholder="Number of Replications:"
        onChange={(event) => setNumberResamples(event.target.value)}
        value={numberResamples}
      />
      <br/>
      <Button onClick={() => runSim()} disabled={(resampleSize < 1) || (resampleSize > population.length) || (numberResamples < 1)}>
        Run
      </Button>
      <Button onClick={() => addSamples()}>Clear</Button>
    </div>
  );
}

SampleMeansSimulator.propTypes = {
  setSampleSize: PropTypes.func.isRequired,
  population: dataObjectArrayType.isRequired,
  addSamples: PropTypes.func.isRequired,
}
