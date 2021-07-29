import { Alert, Row } from 'react-bootstrap';
import OmittedVariableBias from './OmittedVariableBias';

export default function OmittedVariableBiasContainer() {
  return (
    <div className="module-container">
      <Alert style={{ width: '50%', margin: 'auto' }} variant="primary">
        Omitted Variable Bias
      </Alert>
      <br/>
      <Row>
        <p>We are studying the relationship between test score and study hours:</p>
        <p>Test Score = β₀ + β₁Study Hoursᵢ + 𝛿Sleep Hoursᵢ + uᵢ</p>
      </Row>
      <br/>
      <OmittedVariableBias/>
      <br/>
    </div>
  );
}
