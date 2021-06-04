/*

  Displays inputs to allow the user to run a large number of resamples

  props:
    setSampleSize - callback
    clear         - callback
    population    - array
    addSamples    - callback

*/
import React, { useState } from "react";
import {Button, Input } from 'reactstrap';
import math from "mathjs";

export default function SampleMeansSimulator({ setSampleSize, clear, population, addSamples }) {
  const [numberResamples, setNumberResamples] = useState(0);
  const [resampleSize, setResampleSize] = useState(0);

  const changeSampleSize = (value) => {
    setSampleSize(value);
    setResampleSize(value);
  }

  const resample = () => {
    const samplePop = [];
    for (let i = 0; i < resampleSize; i++) {
      const r = Math.floor(Math.random() * population.length);
      samplePop.push(population[r][0]);
    }
    const sampleMean = math.mean(samplePop);
    return [resampleSize, sampleMean];
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
      <div style={{ float: "center" }}>
      <span> Sample Size: </span>
        <Input
          min={1}
          type="number"
          placeholder="Sample Size:"
          onChange={(event) => changeSampleSize(event.target.value)}
          value={resampleSize}
        />
      </div>
      <div style={{ float: "center" }}>
        <span> Number of Replications: </span>
        <Input
          min={1}
          type="number"
          placeholder="Number of Replications:"
          onChange={(event) => setNumberResamples(event.target.value)}
          value={numberResamples}
        />
      </div>
      <div style={{ float: "center" }}>
        <Button onClick={() => runSim()} disabled={(resampleSize < 1) || (resampleSize > population.length) || (numberResamples < 1)}>
          Run
        </Button>
        <Button onClick={() => clear()}>Clear</Button>
      </div>
    </div>
  );
}
