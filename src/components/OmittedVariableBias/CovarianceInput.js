import React from "react";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";

const stdX = 3;
const stdY = 6;

export default function OVBSimulation({ correlation, setCorrelation, covariance, setCovariance }) {

  const adjustCorrelation = (value) => {
    setCorrelation(value);
    setCovariance(value * stdX * stdY);
  }

  return (
    <div>
      <p>Set the Correlation between Study Hours and Sleep Hours:</p>
      <InputGroup style={{height: "30px", width: "500px", margin: "auto"}}>
        <Input
          value={correlation}
          type="range"
          className="custom-range"
          style={{width: "81%"}}
          step={.01}
          min={-0.99}
          max={0.99}
          onChange={(event) => adjustCorrelation(event.target.value)}
        />
        <InputGroupAddon addonType="append">
          <Input
            className="inputGroupAppend"
            value={correlation}
            type="number"
            step={.01}
            min={-0.99}
            max={0.99}
            onChange={(event) => adjustCorrelation(event.target.value)}
          />
        </InputGroupAddon>
      </InputGroup>
      <br/>
      <InputGroup style={{width: "fit-content", margin: "auto"}}>
        <InputGroupText className="Center" addonType='prepend'>Covariance between Study Hours and Sleep Hours:</InputGroupText>
        <InputGroupText className="Center">{covariance.toFixed(2)}</InputGroupText>
      </InputGroup>
    </div>
  );
}
