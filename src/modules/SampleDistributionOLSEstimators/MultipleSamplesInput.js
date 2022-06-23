import { useEffect, useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function MultipleSamplesInput({ populationSize, addSamples, minSize }) {
  const [numberResamples, setNumberResamples] = useState('');
  const [resampleSize, setResampleSize] = useState('');

  useEffect(() => {
    setResampleSize('');
    setNumberResamples('');
  }, [populationSize]);

  return (
    <div>
      <Alert variant="primary">
        <p>Simulate drawing many many samples</p>
        <span>Sample Size:</span>
        <Form.Control
          type="number"
          style={{ width: '50%', margin: 'auto' }}
          placeholder="Sample Size:"
          min={minSize}
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
          variant="secondary"
          onClick={() => addSamples(resampleSize, numberResamples, true)}
          disabled={(resampleSize < minSize) || (resampleSize > populationSize) || (numberResamples < 1)}
        >
          Run
        </Button>
        <Button
          variant="secondary"
          onClick={() => addSamples(0, 0, true)}
        >
          Clear
        </Button>
      </Alert>
    </div>
  );
}

MultipleSamplesInput.propTypes = {
  populationSize: PropTypes.number.isRequired,
  addSamples: PropTypes.func.isRequired,
  minSize: PropTypes.number.isRequired
}
