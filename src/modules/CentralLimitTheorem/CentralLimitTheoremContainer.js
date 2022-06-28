import { useState } from 'react';
import CentralLimitTheorem from './CentralLimitTheorem';
import SimulationIntro from '@/components/SimulationIntro';
import TeX from '@matejmazur/react-katex';
import SelectorButtonGroup from '@/components/SelectorButtonGroup';

const SAMPLE_SIZE = 2000;

export default function CentralLimitTheoremContainer() {
  const [popShape, setPopType] = useState('');

  return (
    <div className="module-container">
      <SimulationIntro
        name="Central Limit Theorem"
        text={<>This simulation demonstrates the shape of the sampling distribution of the sample mean. Suppose I draw a large number of samples, each of size <TeX math="n"/>, from some population. For each sample, I calculate a sample mean <TeX math="\bar{x}"/>. I now plot a histogram of those sample means. For a sufficiently large sample size, the shape of that histogram will look like a beautiful bell-shaped curve, no matter what shape the underlying population had.</>}
      />
      <br/>
      <p>Pick a Population Distribution:</p>
      <SelectorButtonGroup
        options={['Normal', 'Uniform', 'Exponential', 'Chi-Squared', 'Mystery']}
        select={setPopType}
        selected={popShape}
      />
      <br/>
      <br/>
      {popShape && <CentralLimitTheorem popShape={popShape} mainSampleSize={SAMPLE_SIZE}/>}
    </div>
  );
}
