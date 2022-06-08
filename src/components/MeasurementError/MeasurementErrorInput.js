import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { stringOrNumberType } from '../../lib/types';
import InputSlider from '../InputSlider';

export default function MeasurementErrorInput({ sampleSize, setSampleSize, confirmSampleSize, xErrorRange, setXErrorRange, yErrorRange, setYErrorRange, confirmErrorRange, shouldShowErrorInput }) {
  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <span style={{ marginRight: 20 }}>Sample size:</span>
        <InputSlider value={sampleSize} min={1} max={50} step={1} onChange={setSampleSize} />
      </div>
      <div style={{ marginTop: 30 }}>
        <Button onClick={confirmSampleSize}>Set Sample Size</Button>
      </div>
      {shouldShowErrorInput ? (
        <div style={{ marginTop: 50 }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <span style={{ marginRight: 20 }}>X-axis error range:</span>
            <InputSlider value={xErrorRange} min={0} max={3} step={0.1} onChange={setXErrorRange} />
          </div>
          <div style={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <span style={{ marginRight: 20 }}>Y-axis error range:  </span>
            <InputSlider value={yErrorRange} min={0} max={3} step={0.1} onChange={setYErrorRange} />
          </div>
          <div style={{
            marginTop: 30,
          }}>
            <Button onClick={confirmErrorRange}>Set Error Range</Button>
          </div>

        </div>
      ) : (<></>)}
    </div>
  );
}

MeasurementErrorInput.propTypes = {
  sampleSize: stringOrNumberType.isRequired,
  setSampleSize: PropTypes.func.isRequired,
  confirmSampleSize: PropTypes.func.isRequired,
  xErrorRange: stringOrNumberType.isRequired,
  setXErrorRange: PropTypes.func.isRequired,
  yErrorRange: stringOrNumberType.isRequired,
  setYErrorRange: PropTypes.func.isRequired,
  confirmErrorRange: PropTypes.func.isRequired,
  shouldShowErrorInput: PropTypes.bool.isRequired,
}



