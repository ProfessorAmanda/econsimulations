import React from "react";
import { Input, InputGroup, InputGroupAddon } from "reactstrap";

export default function SlopeInterceptInput({ slope, setSlope, intercept, setIntercept }) {

  return (
    <div>
      <h4>Intercept</h4>
      <InputGroup>
        <Input
          type='range'
          className="custom-range"
          min={-20}
          max={20}
          step={0.1}
          value={intercept}
          onChange={(event) => setIntercept(event.target.value)}
        />
        <InputGroupAddon addonType="append">
        <Input
            className="inputGroupAppend"
            type="number"
            min={-20}
            max={20}
            step={0.1}
            value={intercept}
            onChange={(event) => setIntercept(event.target.value)}
          />
        </InputGroupAddon>
      </InputGroup>
      <h4>Slope</h4>
      <InputGroup>
        <Input
          type='range'
          className="custom-range"
          min={-10}
          max={10}
          step={0.1}
          value={slope}
          onChange={(event) => setSlope(parseFloat(event.target.value, 10))}
        />
        <InputGroupAddon addonType="append">
          <Input
            className="inputGroupAppend"
            type="number"
            min={-10}
            max={10}
            step={0.1}
            value={slope}
            onChange={(event) => setSlope(parseFloat(event.target.value, 10))}
          />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
