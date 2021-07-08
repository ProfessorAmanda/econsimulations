import { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function ManySamplesInput({ populationSize, addSamples }) {
  const [numberResamples, setNumberResamples] = useState(0);
  const [resampleSize, setResampleSize] = useState(0);

  return (
    <div style={{ padding: 50 }}>
      <Alert variant="primary" style={{ width: '50%', margin: 'auto' }}>
        Simulate drawing many many samples
      </Alert>
      <br/>
      <span> Sample Size: </span>
      <Form.Control
        style={{ width: '40%', margin: 'auto' }}
        min={1}
        type="number"
        placeholder="Sample Size:"
        onChange={(event) => setResampleSize(event.target.value)}
        value={resampleSize}
      />
      <br/>
      <span> Number of Replications: </span>
      <Form.Control
        style={{ width: '40%', margin: 'auto' }}
        min={1}
        type="number"
        placeholder="Number of Replications:"
        onChange={(event) => setNumberResamples(event.target.value)}
        value={numberResamples}
      />
      <br/>
      <Button
        onClick={() => addSamples(resampleSize, numberResamples)}
        disabled={(resampleSize < 1) || (resampleSize > populationSize) || (numberResamples < 1)}
      >
        Run
      </Button>
      <Button onClick={() => addSamples()}>Clear</Button>
    </div>
  );
}

ManySamplesInput.propTypes = {
  populationSize: PropTypes.number.isRequired,
  addSamples: PropTypes.func.isRequired,
}
