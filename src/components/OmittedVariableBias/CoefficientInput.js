import { Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { InlineMath } from 'react-katex';
import { stringOrNumberType } from '../../lib/types';

export default function CoefficientInput({ beta, setBeta, delta, setDelta }) {
  return (
    <div>
      <InputGroup>
        <InputGroup.Text><InlineMath math="\beta_1"/>, the Coefficient on Study Hours:</InputGroup.Text>
        <Form.Control
          type="number"
          step={0.1}
          value={beta}
          min={-4}
          max={4}
          onChange={(event) => setBeta(parseFloat(event.target.value))}
        />
      </InputGroup>
      <br/>
      <InputGroup>
        <InputGroup.Text><InlineMath math="\delta_1"/>, the Coefficient on Sleep Hours:</InputGroup.Text>
        <Form.Control
          type="number"
          step={0.1}
          value={delta}
          min={-4}
          max={4}
          onChange={(event) => {setDelta(parseFloat(event.target.value))}}
        />
      </InputGroup>
    </div>
  );
}

CoefficientInput.propTypes = {
  beta: stringOrNumberType.isRequired,
  setBeta: PropTypes.func.isRequired,
  delta: stringOrNumberType.isRequired,
  setDelta: PropTypes.func.isRequired,
}
