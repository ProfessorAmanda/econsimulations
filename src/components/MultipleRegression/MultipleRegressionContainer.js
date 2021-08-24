import SimulationIntro from '../SimulationIntro';
import MultipleRegression from './MultipleRegression';

export default function MultipleRegressionContainer() {

  return (
    <div className="module-container">
      <SimulationIntro
        name="Multiple Regression"
        text="Unlike single variable regression, multiple regression is hard to sketch on paper. This demonstration helps visualize multiple regression when we have two regressors."
      />
      <br/>
      <MultipleRegression/>
    </div>
  );
}
