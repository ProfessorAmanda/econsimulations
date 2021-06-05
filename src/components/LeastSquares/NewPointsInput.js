import React, {  useState } from "react";
import { Button, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";

export default function NewPointsInput({ generatePoints }) {
  const [numPoints, setNumPoints] = useState(5);

  return (
    <InputGroup>
      <Input
        type='range'
        className="custom-range"
        style={{width: "70%"}}
        min={4}
        max={10}
        value={numPoints}
        onChange={(event) => setNumPoints(event.target.value)}
      />
      <InputGroupAddon addonType="append">
        <InputGroupText>{numPoints}</InputGroupText>
      </InputGroupAddon>
      <Button
          outline
          color="primary"
          onClick={() => generatePoints(numPoints)}
        >
          New Points
        </Button>
    </InputGroup>
  );
}
