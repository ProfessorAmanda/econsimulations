/*

  Displays an input and a button for the user to enter a sample size

  Used by Law of Large Numbers and Central Limit Theorem

*/
import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types'

export default function SampleSizeInput({ maxSize, minSize, handleClick }) {
  const [sampleSize, setSampleSize] = useState('');

  return (
    <InputGroup className="sample-size-input">
      <Form.Control
        align="right"
        type="number"
        placeholder="Sample Size:"
        min={minSize || 1}
        value={sampleSize}
        max={maxSize}
        onChange={(event) => setSampleSize(event.target.value)}
      />
      <Button
        variant="secondary"
        disabled={!sampleSize || sampleSize > maxSize || sampleSize < 1} onClick={() => handleClick(+sampleSize, 1, false)}
      >
        Sample
      </Button>
    </InputGroup>
  );
}

SampleSizeInput.propTypes = {
  maxSize: PropTypes.number.isRequired,
  minSize: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
}
