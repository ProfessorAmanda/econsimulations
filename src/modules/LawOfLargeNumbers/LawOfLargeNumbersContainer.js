import { useState } from 'react';
import LawOfLargeNumbers from './LawOfLargeNumbers';
import { SAMPLE_SIZE } from '@/lib/constants';
import SimulationIntro from '@/components/SimulationIntro';
import TeX from '@matejmazur/react-katex';
import SelectorButtonGroup from '@/components/SelectorButtonGroup';

export default function LawOfLargeNumbersContainer() {
  const [popShape, setPopType] = useState('');

  return (
    <div className="module-container">
      <SimulationIntro
        name="Law of Large Numbers"
        text={<>The Law of Large Numbers (LLN) is a statement about the relationship between a population and a random sample drawn from that population. Let <TeX math="\mu"/> denote the true mean of a variable when calculated using the entire population, let <TeX math="\sigma"/> denote the true standard deviation of that variable when calculated using the entire population, let <TeX math="\bar{x}"/> denote the mean calculated from a sample drawn from that population, and let <TeX math="s"/> denote the standard deviation calculated from that sample. We would like to use information from the sample to make conclusions about the population. The LLN is helpful in this endeavor, because it states that as the sample size gets larger, the sample mean approaches the true population mean. This simulation’s goal is to demonstrate this handy property.</>}
      />
      <br/>
      <p>Pick a Population Distribution:</p>
      <SelectorButtonGroup
        options={['Normal', 'Uniform', 'Exponential', 'Chi-Squared']}
        select={setPopType}
        selected={popShape}
      />
      <br/>
      <br/>
      {popShape && <LawOfLargeNumbers popShape={popShape} sampleSize={SAMPLE_SIZE}/>}
    </div>
  );
}
