import { Alert, Row } from 'react-bootstrap';
import OmittedVariableBias from './OmittedVariableBias';
import { BlockMath, InlineMath } from 'react-katex';

export default function OmittedVariableBiasContainer() {
  return (
    <div className="module-container">
      <Alert className="sim-description" variant="primary">
        Omitted Variable Bias
      </Alert>
      <Alert className="sim-description" variant="primary">
        Omitted Variable Bias (OVB) is the bias in a regression estimator that arises when there is a variable (<InlineMath math="V"/>) which is not included in the regression that is correlated with the regressor (<InlineMath math="X"/>) and is a determinant of the outcome (<InlineMath math="Y"/>). In the regression model <InlineMath math="Y_i = \beta_0 + \beta_1 X_i + \delta V_i + \epsilon_i"/> where <InlineMath math="V"/> is omitted from the regression estimation, the OVB is described as the final term in the following expression:
        <BlockMath math="\beta_1 \xrightarrow{p} \hat{\beta}_1 + \frac{\delta Cov(X,V)}{Var(X)}"/>
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
