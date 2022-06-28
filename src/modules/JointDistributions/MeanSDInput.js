import { Form, InputGroup, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { stringOrNumberType } from '@/lib/types';

export default function MeanSDInput({ title, mean, setMean, sd, setSD }) {
  return (
    <div>
      <p> Choose the Mean and Standard Deviation for {title} Height </p>
      <InputGroup>
        <InputGroup.Text>{title} Height Mean:</InputGroup.Text>
        <Form.Control type="number" min={60} max={80} step={1} value={mean} onChange={(event) => setMean(event.target.value)}/>
      </InputGroup>
      <br/>
      <InputGroup>
        <InputGroup.Text>{title} Height SD:</InputGroup.Text>
        <Form.Control
          type="number"
          min={1}
          max={7}
          value={sd}
          onChange={(event) => setSD(event.target.value)}
          aria-label={`${title}-SD`}
        />
      </InputGroup>
    </div>
  );
}

MeanSDInput.propTypes = {
  title: PropTypes.string.isRequired,
  mean: stringOrNumberType.isRequired,
  setMean: PropTypes.func.isRequired,
  sd: stringOrNumberType.isRequired,
  setSD: PropTypes.func.isRequired,
}
