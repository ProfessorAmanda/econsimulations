import React, { useState } from 'react';
import PopBar from './PopBar.js';
import { Alert } from 'reactstrap';
import Normal from './LawOfLargeNumbers/Normal.js';
import Uniform from './LawOfLargeNumbers/Uniform.js';
import Exponential from './LawOfLargeNumbers/Exponential.js';
import ChiSquared from './LawOfLargeNumbers/ChiSquared.js';

const SAMPLE_SIZE = 2000;

export default function LawOfLargeNumbers() {
  const [popType, setPopType] = useState("");

  return (
    <div className="MainContainer">
      <Alert className="simDescription" color="primary">Law Of Large Numbers</Alert>
      <Alert className="simDescription" color="primary">
        The Law of Large Numbers (LLN) is a statement about the relationship between a population and a random sample drawn from that population. Let 𝜇 denote the true mean of a variable when calculated using the entire population, let 𝜎 denote the true standard deviation of that variable when calculated using the entire population, let 𝑥̅ denote the mean calculated from a sample drawn from that population, and let 𝑠 denote the standard deviation calculated from that sample. We would like to use information from the sample to make conclusions about the population. The LLN is helpful in this endeavor, because it states that as the sample size gets larger, the sample mean approaches the true population mean. This simulation’s goal is to demonstrate this handy property.
      </Alert>
      <PopBar sim="LLN" setPop={(pop) => setPopType(pop)}/>
      {popType === "Normal" && <Normal/>}
      {popType === "Uniform" && <Uniform mainSampleSize={SAMPLE_SIZE}/>}
      {popType === "Exponential" && <Exponential mainSampleSize={SAMPLE_SIZE}/>}
      {popType === "Chi-Squared" && <ChiSquared mainSampleSize={SAMPLE_SIZE}/>}
    </div>
  );
}
