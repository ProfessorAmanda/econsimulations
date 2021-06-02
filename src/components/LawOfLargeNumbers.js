import React, { useState } from 'react';
import PopBar from './PopBar.js';
import { Alert } from 'reactstrap';
import LLNSimulation from './LLNSimulation.js';

const SAMPLE_SIZE = 2000;

export default function LawOfLargeNumbers() {
  const [popType, setPopType] = useState("");

  return (
    <div className="MainContainer">
      <Alert className="simDescription" color="primary">Law Of Large Numbers</Alert>
      <Alert className="simDescription" color="primary">
        The Law of Large Numbers (LLN) is a statement about the relationship between a population and a random sample drawn from that population. Let 𝜇 denote the true mean of a variable when calculated using the entire population, let 𝜎 denote the true standard deviation of that variable when calculated using the entire population, let 𝑥̅ denote the mean calculated from a sample drawn from that population, and let 𝑠 denote the standard deviation calculated from that sample. We would like to use information from the sample to make conclusions about the population. The LLN is helpful in this endeavor, because it states that as the sample size gets larger, the sample mean approaches the true population mean. This simulation’s goal is to demonstrate this handy property.
      </Alert>
      <PopBar sim="LLN" setPop={setPopType}/>
      {popType && <LLNSimulation popType={popType} sampleSize={SAMPLE_SIZE}/>}
    </div>
  );
}
