/*

  Displays inputs to allow the user to run a large number of resamples

*/
import React, { useState } from "react";
import {Button, Input } from 'reactstrap';
import { mean } from "mathjs";
import _ from "lodash";
import PropTypes from 'prop-types';
import { popArrayType } from "../../lib/types.js";

export default function SampleMeansSimulator({ setSampleSize, clear, population, addSamples }) {
  const [numberResamples, setNumberResamples] = useState(0);
  const [resampleSize, setResampleSize] = useState(0);

  const changeSampleSize = (value) => {
    setSampleSize(value);
    setResampleSize(value);
  }

  const resample = () => {
    const samplePop = _.sampleSize(population, resampleSize);
    const sampleMean = mean(samplePop.map((s) => s[0]));
    return [+resampleSize, sampleMean];
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
      <Button onClick={() => clear()}>Clear</Button>
    </div>
  );
}

SampleMeansSimulator.propTypes = {
  setSampleSize: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  population: popArrayType.isRequired,
  addSamples: PropTypes.func.isRequired,
}
