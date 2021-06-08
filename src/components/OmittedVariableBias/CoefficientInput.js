import React from 'react';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

export default function CoefficientInput({ beta, setBeta, delta, setDelta }){
  return (
    <div>
      <InputGroup>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>β₁, the Coefficient on Study Hours:</InputGroupText>
        </InputGroupAddon>
        <Input
          className="Center"
          type="number"
          step={.1}
          value={beta}
          min={-4}
          max={4}
          onChange={(event) => setBeta(event.target.value)}/>
      </InputGroup>
      <br/>
      <InputGroup>
        <InputGroupAddon addonType='prepend'>
            <InputGroupText>𝛿, the Coefficient on Sleep Hours:</InputGroupText>
        </InputGroupAddon>
        <Input
          className="Center"
          type="number"
          step={.1}
          value={delta}
          min={-4}
          max={4}
          onChange={(event) => setDelta(event.target.value)}/>
      </InputGroup>
    </div>
  );
}
