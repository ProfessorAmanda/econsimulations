import { Alert } from 'react-bootstrap';
import SDOLSESimulation from './SDOLSESimulation.js';

export default function SampleDistributionOLSEstimators() {
  return (
    <div className="module-container">
      <Alert style={{ width: '50%', margin: 'auto' }} variant="primary">
        Sample Distribution of OLS Estimators
      </Alert>
      <br/>
      <SDOLSESimulation/>
    </div>
  );
}
