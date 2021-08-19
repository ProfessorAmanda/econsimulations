import { useState } from 'react';
import PopBar from '../PopBar.js';
import LawOfLargeNumbers from './LawOfLargeNumbers.js';
import { SAMPLE_SIZE } from '../../lib/constants.js';
import SimulationIntro from '../SimulationIntro.js';
import { InlineMath } from 'react-katex';

export default function LawOfLargeNumbersContainer() {
  const [popShape, setPopType] = useState('');

  return (
    <div className="module-container">
      <SimulationIntro
        name="Law of Large Numbers"
        text={<>The Law of Large Numbers (LLN) is a statement about the relationship between a population and a random sample drawn from that population. Let <InlineMath math="\mu"/> denote the true mean of a variable when calculated using the entire population, let <InlineMath math="\sigma"/> denote the true standard deviation of that variable when calculated using the entire population, let <InlineMath math="\bar{x}"/> denote the mean calculated from a sample drawn from that population, and let <InlineMath math="s"/> denote the standard deviation calculated from that sample. We would like to use information from the sample to make conclusions about the population. The LLN is helpful in this endeavor, because it states that as the sample size gets larger, the sample mean approaches the true population mean. This simulation’s goal is to demonstrate this handy property.</>}
      />
      <PopBar options={['Normal', 'Uniform', 'Exponential', 'Chi-Squared']} setPop={setPopType}/>
      {popShape && <LawOfLargeNumbers popShape={popShape} sampleSize={SAMPLE_SIZE}/>}
    </div>
  );
}
