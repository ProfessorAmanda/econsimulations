import { Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function CoefficientInput({ beta, setBeta, delta, setDelta }) {
  return (
    <div>
      <InputGroup>
        <InputGroup.text addonType="prepend">
          <InputGroup.text>β₁, the Coefficient on Study Hours:</InputGroup.text>
        </InputGroup.text>
        <Form.Control
          type="number"
          step={0.1}
          value={beta}
          min={-4}
          max={4}
          onChange={(event) => setBeta(event.target.value)}
        />
      </InputGroup>
      <br/>
      <InputGroup>
        <InputGroup.text addonType="prepend">
          <InputGroup.text>𝛿, the Coefficient on Sleep Hours:</InputGroup.text>
        </InputGroup.text>
        <Form.Control
          type="number"
          step={0.1}
          value={delta}
          min={-4}
          max={4}
          onChange={(event) => setDelta(event.target.value)}
        />
      </InputGroup>
    </div>
  );
}

CoefficientInput.propTypes = {
  beta: PropTypes.number.isRequired,
  setBeta: PropTypes.func.isRequired,
  delta: PropTypes.number.isRequired,
  setDelta: PropTypes.func.isRequired,
}
