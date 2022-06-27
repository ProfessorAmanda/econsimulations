import { Button, Form, InputGroup, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SelectorButtonGroup from '../../components/SelectorButtonGroup';
import TeX from '@matejmazur/react-katex';

interface SolowModelInputProps {
  alpha: number; setAlpha: (val: number) => void;
  beta: number; setBeta: (val: number) => void;
  A: number; setA: (val: number) => void;
  delta: number; setDelta: (val: number) => void;
  L: number; setL: (val: number) => void;
  s: number; setS: (val: number) => void;
  disabled: boolean;
}

export default function SolowModelInput({
  alpha, setAlpha,
  beta, setBeta,
  A, setA,
  delta, setDelta,
  L, setL,
  s, setS,
  disabled,
}: SolowModelInputProps) {

  const paramInput = (
    nameInTeX: string,
    step: number,
    value: number,
    min: number,
    max: number,
    onChange: (val: number) => void,
    disabled: boolean
  ) => {
    return (
      <InputGroup >
        <InputGroup.Text style={{ width: 50, justifyContent: 'center' }}>
          <TeX math={nameInTeX} />
        </InputGroup.Text>
        <Form.Control
          type="number"
          step={step}
          value={value}
          min={min}
          max={max}
          onChange={(event: any) => onChange(parseFloat(event.target.value))}
          disabled={disabled}
        />
      </InputGroup>
    );
  }
  return (
    <div>
      <div>
        {paramInput('\\alpha', 0.1, alpha, 0, 1, setAlpha, disabled)}
        <br />
        {paramInput('\\beta', 0.1, beta, 0, 1, setBeta, disabled)}
        <br />
        {paramInput('\\overline{A}', 0.1, A, 0, 1, setA, disabled)}
        <br />
        {paramInput('\\delta', 0.1, delta, 0, 1, setDelta, disabled)}
        <br />
        {paramInput('\\overline{L}', 0.1, L, 0, 1, setL, disabled)}
        <br />
        {paramInput('\\overline{s}', 0.1, s, 0, 1, setS, disabled)}
      </div>
    </div>
  );
}

SolowModelInput.propTypes = {
  alpha: PropTypes.number.isRequired,
  setAlpha: PropTypes.func.isRequired,
  beta: PropTypes.number.isRequired,
  setBeta: PropTypes.func.isRequired,
  A: PropTypes.number.isRequired,
  setA: PropTypes.func.isRequired,
  delta: PropTypes.number.isRequired,
  setDelta: PropTypes.func.isRequired,
  L: PropTypes.number.isRequired,
  setL: PropTypes.func.isRequired,
  s: PropTypes.number.isRequired,
  setS: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}
