/*

  Displays an input and a button for the user to enter a sample size

  props:
    maxSize     - int
    handleClick - callback

*/
import React, { useState } from 'react';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

export default function SampleSizeInput({ maxSize, handleClick }) {
  const [sampleSize, setSampleSize] = useState("");

  const hangleChange = (event) => {
    setSampleSize(parseInt(event.target.value, 10))
  }

  return (
    <div>
      <InputGroup>
        <Input
            align="right"
            type="number"
            placeholder="Sample Size:"
            min={1}
            value={sampleSize}
            max={maxSize}
            onChange={(event) => hangleChange(event)}
        />
        <InputGroupAddon addonType="append">
          <Button disabled={!sampleSize || sampleSize > maxSize || sampleSize < 1} onClick={()=> handleClick(sampleSize)}>
            Sample
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
