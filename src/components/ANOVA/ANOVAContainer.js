import { Alert } from 'react-bootstrap';
import ANOVA from './ANOVA';

export default function ANOVAContainer() {

  return (
    <div className="module-container">
      <Alert style={{ width: '50%', margin: 'auto' }} variant="primary">
        ANOVA
      </Alert>
      <br/>
      <ANOVA/>
    </div>
  );
}
