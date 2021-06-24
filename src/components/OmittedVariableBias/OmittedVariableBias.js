import { Alert, Row } from "reactstrap";
import OVBSimulation from "./OVBSimulation";

export default function OmittedVariableBias() {
  return (
    <div className="MainContainer">
      <Alert style={{ width: "50%", margin: 'auto' }} color="primary">
        Omitted Variable Bias
      </Alert>
      <br/>
      <Row>
        <p className="Center">We are studying the relationship between test score and study hours:</p>
        <p className="Center">Test Score = β₀ + β₁Study Hoursᵢ + 𝛿Sleep Hoursᵢ + uᵢ</p>
      </Row>
      <br/>
      <OVBSimulation/>
      <br/>
    </div>
  );
}
