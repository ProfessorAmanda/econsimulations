import { Form, Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';

export default function LabeledSelector({ min, max, label, value, setValue }) {
  return (
    <Form>
      <Form.Group as={Row} className="justify-content-md-center">
        <Form.Label style={{padding: 0}} column sm="3">{label}</Form.Label>
        <Col sm="auto">
          <select as="select" value={value} onChange={(event) => setValue(+event.target.value)}>
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
