import { Row } from 'react-bootstrap';
import OmittedVariableBias from './OmittedVariableBias';
import TeX from '@matejmazur/react-katex';
import SimulationIntro from '@/components/SimulationIntro';

export default function OmittedVariableBiasContainer() {
  return (
    <div className="module-container">
      <SimulationIntro
        name="Omitted Variable Bias"
        text={<>Omitted Variable Bias (OVB) is the bias in a regression estimator that arises when there is a variable (<TeX math="V"/>) which is not included in the regression that is correlated with the regressor (<TeX math="X"/>) and is a determinant of the outcome (<TeX math="Y"/>). In the regression model <TeX math="Y_i = \beta_0 + \beta_1 X_i + \delta V_i + \epsilon_i"/> where <TeX math="V"/> is omitted from the regression estimation, the OVB is described as the final term in the following expression: <TeX math="\hat{\beta}_1 \xrightarrow{p} \beta_1 + \frac{\delta Cov(X,V)}{Var(X)}"/></>}
      />
      <br/>
      <Row>
        <p>We are studying the relationship between test score and study hours:</p>
        <TeX math="Test\ Score = \beta_0 + \beta_1 Study\ Hours_i + \delta Sleep\ Hours_i + u_i"/>
      </Row>
      <br/>
      <OmittedVariableBias/>
      <br/>
    </div>
  );
}
