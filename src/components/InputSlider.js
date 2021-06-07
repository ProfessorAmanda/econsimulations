import React from "react";
import { Input, InputGroup, InputGroupAddon } from "reactstrap";

export default function InputSlider({ value, min, max, step, onChange }) {
  return (
    <InputGroup style={{height: "30px", width: "500px", margin: "auto"}}>
      <Input
        type="range"
        className="custom-range"
        style={{width: "80%"}}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(event.target.value)}
      />
      <InputGroupAddon addonType="append">
      <Input
        type="number"
        className="inputGroupAppend"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(event.target.value)}
      />
      </InputGroupAddon>
    </InputGroup>
  );
}
