import SimulationIntro from '../SimulationIntro.js';
import JointDistributions from './JointDistributions.js';

export default function JointDistributionsContainer() {
  return (
    <div className="module-container">
      <SimulationIntro
        name="Joint Distributions"
        text="Covariance measures the extent to which two random variables move together, or “co-vary.” Correlation is an alternative measure of how two variables co-move that is scaled by the standard deviation of the variables and ranges between -1 and 1. The mean and variance of each individual random variable factor into the calculation of covariance (or correlation), but pairs of random variables with same underlying distributions could have very different correlations."
      />
      <br/>
      <JointDistributions/>
    </div>
  );
}
