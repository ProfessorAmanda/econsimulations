import { Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { stringOrNumberType } from '../lib/types';

export default function InputSlider({ value, min, max, step, onChange }) {
  return (
    <InputGroup className="input-slider-group">
      <Form.Control
        type="range"
        className="custom-range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(event.target.value)}
      />
      <InputGroup.text addonType="append">
        <Form.Control
          type="number"
          className="input-group-append"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => onChange(event.target.value)}
        />
      </InputGroup.text>
    </InputGroup>
  );
}

InputSlider.propTypes = {
  value: stringOrNumberType.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}
