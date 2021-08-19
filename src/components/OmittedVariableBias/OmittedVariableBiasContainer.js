import { Row } from 'react-bootstrap';
import OmittedVariableBias from './OmittedVariableBias';
import { InlineMath } from 'react-katex';
import SimulationIntro from '../SimulationIntro';

export default function OmittedVariableBiasContainer() {
  return (
    <div className="module-container">
      <SimulationIntro
        name="Omitted Variable Bias"
        text={<>Omitted Variable Bias (OVB) is the bias in a regression estimator that arises when there is a variable (<InlineMath math="V"/>) which is not included in the regression that is correlated with the regressor (<InlineMath math="X"/>) and is a determinant of the outcome (<InlineMath math="Y"/>). In the regression model <InlineMath math="Y_i = \beta_0 + \beta_1 X_i + \delta V_i + \epsilon_i"/> where <InlineMath math="V"/> is omitted from the regression estimation, the OVB is described as the final term in the following expression: <InlineMath math="\hat{\beta}_1 \xrightarrow{p} \beta_1 + \frac{\delta Cov(X,V)}{Var(X)}"/></>}
      />
      <br/>
      <Row>
        <p>We are studying the relationship between test score and study hours:</p>
        <InlineMath math="Test\ Score = \beta_0 + \beta_1 Study\ Hours_i + \delta Sleep\ Hours_i + u_i"/>
      </Row>
      <br/>
      <OmittedVariableBias/>
      <br/>
    </div>
  );
}
