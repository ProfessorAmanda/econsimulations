/*

  A container component that holds the description and simulation for Joint Distribution

*/
import { Alert } from 'react-bootstrap';
import JointDistributions from './JointDistributions.js';

export default function JointDistributionsContainer() {
  return (
    <div className="module-container">
      <Alert className="sim-description" variant="primary">
        Joint Distributions
      </Alert>
      <Alert className="sim-description" variant="primary">
        Covariance measures the extent to which two random variables move together, or “co-vary.” Correlation is an alternative measure of how two variables co-move that is scaled by the standard deviation of the variables and ranges between -1 and 1. The mean and variance of each individual random variable factor into the calculation of covariance (or correlation), but pairs of random variables with same underlying distributions could have very different correlations.
      </Alert>
      <br/>
      <JointDistributions/>
    </div>
  );
}
