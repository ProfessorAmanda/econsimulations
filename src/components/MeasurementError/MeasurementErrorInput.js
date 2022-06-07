import { Button, Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { stringOrNumberType } from '../../lib/types';
import InputSlider from '../InputSlider';

export default function MeasurementErrorInput({ sampleSize, setSampleSize, xErrorRange, setXErrorRange, yErrorRange, setYErrorRange }) {
  return (
    <div>
      <InputSlider value={sampleSize} min={1} max={10} step={1} onChange={setSampleSize}/>
      {/*<Button variant="primary" onClick={())*/}
    </div>
  );
}

MeasurementErrorInput.propTypes = {
  sampleSize: stringOrNumberType.isRequired,
  setSampleSize: PropTypes.func.isRequired,
  xErrorRange: stringOrNumberType.isRequired,
  setXErrorRange: PropTypes.func.isRequired,
  yErrorRange: stringOrNumberType.isRequired,
  setYErrorRange: PropTypes.func.isRequired,
}
