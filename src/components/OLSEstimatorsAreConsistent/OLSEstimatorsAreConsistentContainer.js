import { Alert } from 'react-bootstrap';
import OLSEstimatorsAreConsistent from './OLSEstimatorsAreConsistent';

export default function OLSEstimatorsAreConsistentContainer() {

  return (
    <div className="module-container">
      <Alert className="sim-description" variant="primary">
        OLS Estimators are Consistent
      </Alert>
      <OLSEstimatorsAreConsistent/>
    </div>
  );
}
