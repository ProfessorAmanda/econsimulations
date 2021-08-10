import { InputGroup } from 'react-bootstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';

export default function LabeledSelector({ min, max, label, value, setValue }) {
  return (
    <InputGroup className="justify-content-md-center">
      <InputGroup.Text>{label}</InputGroup.Text>
      <select as="select" value={value} onChange={(event) => setValue(+event.target.value)}>
        {_.range(min, max + 1).map((i) => <option key={i} value={i}>{i}</option>)}
      </select>
    </InputGroup>
  )
}

LabeledSelector.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired
}
