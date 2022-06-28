import { Form, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { optionalLaTeXType, stringOrNumberType } from 'src/lib/types';

interface LabeledInputProps {
  min: number;
  max: number;
  step?: number;
  label: React.ReactElement | string;
  value: string | number;
  setValue: Function;
}

export default function LabeledInput({ min, max, step, label, value, setValue } : LabeledInputProps) {
  return (
    <Form>
      <Form.Group as={Row} className="justify-content-md-center">
        <Form.Label column sm="6" md="auto">{label}</Form.Label>
        <Col sm="auto">
          <Form.Control
            style={{padding: 6}}
            type="number"
            min={min}
            max={max}
            step={step || 1}
            value={value}
            onChange={(event : any) => setValue(event.target.value)}
          />
        </Col>
      </Form.Group>
    </Form>
  )
}

LabeledInput.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  label: optionalLaTeXType.isRequired,
  value: stringOrNumberType.isRequired,
  setValue: PropTypes.func.isRequired
}
