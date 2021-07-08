import { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function MultipleSamplesInput({ populationSize, addSamples }) {
  const [numberResamples, setNumberResamples] = useState(0);
  const [resampleSize, setResampleSize] = useState(0);

  return (
    <div>
      <Alert variant="primary">
        <p>Simulate drawing many many samples</p>
        <span>Sample Size:</span>
        <Form.Control
          type="number"
          style={{ width: '50%', margin: 'auto' }}
          placeholder="Sample Size:"
          min={1}
          value={resampleSize}
          onChange={(event) => setResampleSize(event.target.value)}
        />
        <br/>
        <span>Number of Replications:</span>
        <Form.Control
          style={{ width: '50%', margin: 'auto' }}
          min={1}
          type="number"
          placeholder="Replications:"
          onChange={(event) => setNumberResamples(event.target.value)}
          value={numberResamples}
        />
        <br/>
        <Button
          onClick={() => addSamples(resampleSize, numberResamples, true)}
          disabled={(resampleSize < 1) || (resampleSize > populationSize) || (numberResamples < 1)}
        >
          Run
        </Button>
      </Alert>
    </div>
  );
}

MultipleSamplesInput.propTypes = {
  populationSize: PropTypes.number.isRequired,
  addSamples: PropTypes.func.isRequired,
}
