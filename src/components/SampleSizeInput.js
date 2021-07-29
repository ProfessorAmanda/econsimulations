/*

  Displays an input and a button for the user to enter a sample size

  Used by Law of Large Numbers and Central Limit Theorem

*/
import { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types'

export default function SampleSizeInput({ maxSize, minSize, handleClick }) {
  const [sampleSize, setSampleSize] = useState('');

  useEffect(() => {
    setSampleSize('')
  }, [maxSize]);

  return (
    <InputGroup className="sample-size-input">
      <Form.Control
        align="right"
        type="number"
        placeholder="Sample Size:"
        min={minSize}
        value={sampleSize}
        max={maxSize}
        onChange={(event) => setSampleSize(event.target.value)}
      />
      <Button
        variant="secondary"
        disabled={!sampleSize || sampleSize > maxSize || sampleSize < minSize} onClick={() => handleClick(+sampleSize, 1, false)}
      >
        Sample
      </Button>
    </InputGroup>
  );
}

SampleSizeInput.propTypes = {
  maxSize: PropTypes.number.isRequired,
  minSize: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
}
