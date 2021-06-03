import React, {  useState } from "react";
import { Button, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";

export default function SlopeInterceptInput({ plotLine }) {
  const [slope, setSlope] = useState(1);
  const [intercept, setIntercept] = useState(1);

  return (
    <div>
      <p>Guess a Slope and Y-Intercept to fit the points</p>
      <div>
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
          <h4>Intercept</h4>
        <InputGroup>
          <Input
            type='range'
            className="custom-range"
            min={-20}
            max={20}
            step={0.1}
            value={intercept}
            onChange={(event) => setIntercept(parseFloat(event.target.value, 10))}
          />
          <InputGroupAddon addonType="append">
          <Input
              className="inputGroupAppend"
              type="number"
              min={-20}
              max={20}
              step={0.1}
              value={intercept}
              onChange={(event) => setIntercept(parseFloat(event.target.value, 10))}
            />
          </InputGroupAddon>
        </InputGroup>
        <Button outline color='primary' onClick={() => plotLine(slope, intercept)}>Plot Your Guess</Button>
      </div>
    </div>
  );
}
