import { useState } from 'react';
import PopBar from '../PopBar.js';
import ConfidenceIntervals from './ConfidenceIntervals.js';
import { SAMPLE_SIZE } from '../../lib/constants.js';
import SimulationIntro from '../SimulationIntro.js';

export default function ConfidenceIntervalsContainer() {
  const [popShape, setPopType] = useState('');

  return (
    <div className="module-container">
      <SimulationIntro
        name="Confidence Intervals"
        text="This simulation demonstrates how confidence intervals provide an estimate for the location of the true population mean µ. In this exercise you will first choose 1) whether to assume that you know the true population standard deviation and 2) what confidence level to impose. Then, you will take random samples from the population, calculation a sample mean for each, and construct confidence intervals around those sample means. The proportion of confidence intervals that contain the true mean corresponds to the chosen confidence level!"
      />
      <PopBar options={['Normal', 'Uniform', 'Exponential', 'Chi-Squared']} setPop={setPopType}/>
      {popShape && <ConfidenceIntervals popShape={popShape} populationSize={SAMPLE_SIZE}/>}
    </div>
  );
}
