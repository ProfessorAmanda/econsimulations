import { Alert } from 'react-bootstrap';
import MultipleRegression from './MultipleRegression';

export default function MultipleRegressionContainer() {

  return (
    <div className="module-container">
      <Alert style={{ width: '50%', margin: 'auto' }} variant="primary">
        Multiple Regression
      </Alert>
      <br/>
      <MultipleRegression/>
    </div>
  );
}
