import { Alert } from "reactstrap";
import SDOLSESimulation from "./SDOLSESimulation.js";
import SelectorButtonGroup from "../SelectorButtonGroup.js";
import { useState } from "react";

export default function SampleDistributionOLSEstimators() {
  const [dataShape, setDataShape] = useState("Scatter");

  return (
    <div className="module-container">
      <Alert style={{ width: "50%", margin: "auto" }} color="primary">
          Sample Distribution of OLS Estimators
      </Alert>
      <p>Select a population shape:</p>
      <SelectorButtonGroup options={["Scatter", "Binary"]} select={setDataShape} selected={dataShape}/>
      <br/>
      <SDOLSESimulation/>
    </div>
  );
}
