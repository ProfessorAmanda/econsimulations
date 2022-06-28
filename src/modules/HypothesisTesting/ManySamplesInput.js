import { useState } from 'react';
import { Button, Form, Alert, InputGroup } from 'react-bootstrap';
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
      <InputGroup className="sample-size-input" style={{ width: '40%', margin: 'auto' }}>
        <Form.Control
          style={{width: 45}}
          type="number"
          placeholder="Sample Size:"
          min={1}
          value={resampleSize}
          onChange={(event) => setResampleSize(event.target.value)}
        />
        <Button
          variant="secondary"
          disabled={!resampleSize || resampleSize > populationSize || resampleSize < 1}
          onClick={() => addSamples(+resampleSize, 1, false)}
        >
          Sample Once
        </Button>
      </InputGroup>
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
        variant="secondary"
        onClick={() => addSamples(resampleSize, numberResamples, true)}
        disabled={(resampleSize < 1) || (resampleSize > populationSize) || (numberResamples < 1)}
      >
        Run
      </Button>
      <Button variant="secondary" onClick={() => addSamples(0, 0, true)}>Clear</Button>
    </div>
  );
}

ManySamplesInput.propTypes = {
  populationSize: PropTypes.number.isRequired,
  addSamples: PropTypes.func.isRequired,
}
