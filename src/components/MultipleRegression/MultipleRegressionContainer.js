import { Alert } from 'react-bootstrap';
import SimulationIntro from '../SimulationIntro';
import MultipleRegression from './MultipleRegression';

export default function MultipleRegressionContainer() {

  return (
    <div className="module-container">
      <SimulationIntro
        name="Multiple Regression"
        text=""
      />
      <br/>
      <MultipleRegression/>
    </div>
  );
}
