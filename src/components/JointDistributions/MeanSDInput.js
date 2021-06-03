import React from 'react';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

export default function MeanSDInput({ title, mean, setMean, sd, setSD}){
  return (
    <div>
      <p> Choose the Mean and Standard Deviation for {title} Height </p>
      <InputGroup>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>{title} Height Mean:</InputGroupText>
        </InputGroupAddon>
        <Input type="number" min={60} max={80} step={1} value={mean} onChange={(event) => setMean(event.target.value)}/>
      </InputGroup>
      <br/>
      <InputGroup>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>{title} Height SD:</InputGroupText>
        </InputGroupAddon>
        <Input type="number" min={1} max={7} value={sd} onChange={(event) => setSD(event.target.value)}/>
      </InputGroup>
    </div>
  );
}
