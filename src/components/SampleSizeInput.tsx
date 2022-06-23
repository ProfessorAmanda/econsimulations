import { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types'

export default function SampleSizeInput({ maxSize, minSize, handleClick } : { maxSize: number, minSize: number, handleClick: Function }) {
  const [sampleSize, setSampleSize] = useState('');

  useEffect(() => {
    setSampleSize('')
  }, [maxSize]);

  return (
    <InputGroup style={{
      width: '60%',
      margin: 'auto',
      marginBottom: 20,
    }}>
      <Form.Control
        // @ts-ignore
        align="right"
        type="number"
        placeholder="Sample Size:"
        min={minSize}
        value={sampleSize}
        max={maxSize}
        onChange={(event : any) => setSampleSize(event.target.value)}
      />
      <Button
        variant="secondary"
        disabled={!sampleSize || +sampleSize > maxSize || +sampleSize < minSize} onClick={() => handleClick(+sampleSize, 1, false)}
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
  classname: PropTypes.string
}
