import { Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function CoefficientInput({ beta, setBeta, delta, setDelta }) {
  return (
    <div>
      <InputGroup>
        <InputGroup.Text>β₁, the Coefficient on Study Hours:</InputGroup.Text>
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
        <InputGroup.Text>𝛿, the Coefficient on Sleep Hours:</InputGroup.Text>
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
