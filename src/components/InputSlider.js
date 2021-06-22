import React from "react";
import { Input, InputGroup, InputGroupAddon } from "reactstrap";
import PropTypes from 'prop-types';

export default function InputSlider({ value, min, max, step, onChange }) {
  return (
    <InputGroup style={{height: "30px", width: "400px", margin: "auto"}}>
      <Input
        type="range"
        className="custom-range"
        style={{width: "60%"}}
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
InputSlider.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}
