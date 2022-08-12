import { Button, Form, InputGroup, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SelectorButtonGroup from 'src/components/SelectorButtonGroup';

interface MeasurementErrorInputProps {
  sampleSize: number; setSampleSize: Function;
  generatePoints: Function;
  shouldShowOrigRegression: boolean; setShouldShowOrigRegression: Function;
  errorDirection: string; setErrorDirection: Function;
  errorAmplitude: string; setErrorAmplitude: Function;
  shouldShowErrorRegression: boolean; setShouldShowErrorRegression: Function;
  shouldShowErrorInput: boolean;
  shouldShowErrorPoints: boolean; setShouldShowErrorPoints: Function;
}


export default function MeasurementErrorInput({
  sampleSize,
  setSampleSize,
  generatePoints,
  shouldShowOrigRegression,
  setShouldShowOrigRegression,
  errorDirection,
  setErrorDirection,
  errorAmplitude,
  setErrorAmplitude,
  shouldShowErrorRegression,
  setShouldShowErrorRegression,
  shouldShowErrorInput,
  shouldShowErrorPoints,
  setShouldShowErrorPoints,
} : MeasurementErrorInputProps) {
  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <span style={{ marginRight: 20 }}>Sample size:</span>
        <InputGroup className="input-slider-group" style={{
          height: 30,
          width: 350,
          alignItems: 'center',
        }}>
          <Form.Control
            type="range"
            className="form-range"
            data-testid="new-points-slider"
            style={{ borderWidth: 0 }}
            min={5}
            max={20}
            value={sampleSize}
            onChange={(event : any) => setSampleSize(parseInt(event.target.value))}
          />
          <InputGroup.Text style={{ width: 40, justifyContent: 'center' }}>{sampleSize}</InputGroup.Text>
          <Button variant="outline-primary" onClick={() => generatePoints()}>New Points</Button>
        </InputGroup>

      </div>
      <div style={{ marginTop: 30 }}>
        <Button
          variant="outline-primary"
          onClick={() => { setShouldShowOrigRegression(!shouldShowOrigRegression) }}
        >{shouldShowOrigRegression ? 'Hide original regression' : 'Show original regression'}</Button>
      </div>
      {shouldShowErrorInput ? (
        <div style={{ marginTop: 50 }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <span style={{ marginRight: 20 }}>Error direction:</span>
            <SelectorButtonGroup options={['X', 'Y']} select={setErrorDirection} selected={errorDirection} />
          </div>
          <div style={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <span style={{ marginRight: 20 }}>Error amplitude</span>
            <SelectorButtonGroup options={['No Error', 'Low', 'Medium', 'High']} select={setErrorAmplitude} selected={errorAmplitude} />
          </div>
          <div style={{
            marginTop: 30,
          }}>
            <ButtonGroup>
              <Button
                variant="outline-primary"
                onClick={() => { setShouldShowErrorPoints(!shouldShowErrorPoints) }}
              >{shouldShowErrorPoints ? 'Hide error points' : 'Show error points'}</Button>
              <Button
                variant="outline-primary"
                onClick={() => { setShouldShowErrorRegression(!shouldShowErrorRegression) }}
              >{shouldShowErrorRegression ? 'Hide regression with error' : 'Show regression with error'}</Button>
            </ButtonGroup>
          </div>

        </div>
      ) : (<></>)}
    </div>
  );
}

MeasurementErrorInput.propTypes = {
  sampleSize: PropTypes.number.isRequired,
  setSampleSize: PropTypes.func.isRequired,
  generatePoints: PropTypes.func.isRequired,
  shouldShowOrigRegression: PropTypes.bool.isRequired,
  setShouldShowOrigRegression: PropTypes.func.isRequired,
  errorDirection: PropTypes.string.isRequired,
  setErrorDirection: PropTypes.func.isRequired,
  errorAmplitude: PropTypes.string.isRequired,
  setErrorAmplitude: PropTypes.func.isRequired,
  shouldShowErrorRegression: PropTypes.bool.isRequired,
  setShouldShowErrorRegression: PropTypes.func.isRequired,
  shouldShowErrorInput: PropTypes.bool.isRequired,
  shouldShowErrorPoints: PropTypes.bool.isRequired,
  setShouldShowErrorPoints: PropTypes.func.isRequired,
}


