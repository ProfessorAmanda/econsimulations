import { Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { stringOrNumberType } from 'src/lib/types';

interface InputSliderProps {
  value: string | number;
  min: number;
  max: number;
  step: number;
  onChange: Function;
  customStyle?: object;
}

export default function InputSlider({ value, min, max, step, onChange, customStyle} : InputSliderProps) {
  return (
    <InputGroup className="input-slider-group" style={{
      height: 30,
      width: 400,
      margin: 'auto',
      alignItems: 'center',
      ...customStyle
    }}>
      <Form.Control
        type="range"
        className="form-range"
        value={value}
        style={{ width: '60%', borderWidth: 0 }}
        min={min}
        max={max}
        step={step}
        onChange={(event : any) => onChange(event.target.value)}
      />
      <Form.Control
        type="number"
        className="input-group-append"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event : any) => onChange(event.target.value)}
      />
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
