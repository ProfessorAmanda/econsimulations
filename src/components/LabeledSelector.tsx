import { Form, Col, Row } from 'react-bootstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';

interface LabeledSelectorProps {
  min: number;
  max: number;
  label: string;
  value: number;
  setValue: Function;
}

export default function LabeledSelector({ min, max, label, value, setValue } : LabeledSelectorProps) {
  return (
    <Form>
      <Form.Group as={Row} className="justify-content-md-center">
        <Form.Label column sm="6" md="auto">{label}</Form.Label>
        <Col sm="auto">
          <select className="form-select" value={value} onChange={(event) => setValue(+event.target.value)}>
            {_.range(min, max + 1).map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </Col>
      </Form.Group>
    </Form>
  )
}

LabeledSelector.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired
}
