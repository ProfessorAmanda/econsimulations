/*

  Displays an input and a button for the user to enter a sample size

  Used by Law of Large Numbers and Central Limit Theorem

  props:
    maxSize     - int
    handleClick - callback

*/
import React, { useState } from 'react';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

export default function SampleSizeInput({ maxSize, handleClick }) {
  const [sampleSize, setSampleSize] = useState("");

  return (
    <InputGroup style={{width: "50%", margin: "auto"}}>
      <Input
        align="right"
        type="number"
        placeholder="Sample Size:"
        min={1}
        value={sampleSize}
        max={maxSize}
        onChange={(event) => setSampleSize(+event.target.value)}
      />
      <InputGroupAddon addonType="append">
        <Button disabled={!sampleSize || sampleSize > maxSize || sampleSize < 1} onClick={()=> handleClick(sampleSize)}>
          Sample
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}
