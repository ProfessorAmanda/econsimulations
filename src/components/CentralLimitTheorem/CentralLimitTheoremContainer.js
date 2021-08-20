import { useState } from 'react';
import PopBar from '../PopBar.js';
import CentralLimitTheorem from './CentralLimitTheorem.js';
import SimulationIntro from '../SimulationIntro.js';
import { InlineMath } from 'react-katex';

const SAMPLE_SIZE = 2000;

export default function CentralLimitTheoremContainer() {
  const [popShape, setPopType] = useState('');

  return (
    <div className="module-container">
      <SimulationIntro
        name="Central Limit Theorem"
        text={<>This simulation demonstrates the shape of the sampling distribution of the sample mean. Suppose I draw a large number of samples, each of size <InlineMath math="n"/>, from some population. For each sample, I calculate a sample mean <InlineMath math="\bar{x}"/>. I now plot a histogram of those sample means. For a sufficiently large sample size, the shape of that histogram will look like a beautiful bell-shaped curve, no matter what shape the underlying population had.</>}
      />
      <PopBar options={['Normal', 'Uniform', 'Exponential', 'Chi-Squared', 'Mystery']} setPop={setPopType}/>
      {popShape && <CentralLimitTheorem popShape={popShape} mainSampleSize={SAMPLE_SIZE}/>}
    </div>
  );
}
