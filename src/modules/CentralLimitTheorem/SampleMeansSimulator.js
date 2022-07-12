import { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { dataObjectArrayType } from '@/lib/types';

export default function SampleMeansSimulator({ population, addSamples }) {
  const [numberResamples, setNumberResamples] = useState(0);
  const [resampleSize, setResampleSize] = useState(0);

  const workerRef = useRef();

  useEffect(() => {
    workerRef.current = new Worker(new URL('./SimulationWorker', import.meta.url))
    workerRef.current.onmessage = (evt) => {
      //console.log('worker sent: ', evt.data);
      addSamples(evt.data);
    }
  }, [])

  const onRunClick = async () => {
    //console.log('running simulation', numberResamples, resampleSize);
    workerRef.current.postMessage({ numberResamples, population, resampleSize });
  }

  return (
    <div>
      <span> Sample Size: </span>
      <Form.Control
        style={{ width: '40%', margin: 'auto' }}
        min={1}
        type="number"
        placeholder="Sample Size:"
        onChange={(event) => setResampleSize(event.target.value)}
        value={resampleSize}
      />
      <br />
      <span> Number of Replications: </span>
      <Form.Control
        style={{ width: '40%', margin: 'auto' }}
        min={1}
        type="number"
        placeholder="Number of Replications:"
        onChange={(event) => setNumberResamples(event.target.value)}
        value={numberResamples}
      />
      <br />
      <Button
        variant="secondary"
        onClick={() => onRunClick()} disabled={(resampleSize < 1) || (resampleSize > population.length) || (numberResamples < 1)}
      >
        Run
      </Button>
      <Button variant="secondary" onClick={() => { addSamples([]); }}>Clear</Button>
    </div>
  );
}

SampleMeansSimulator.propTypes = {
  population: dataObjectArrayType.isRequired,
  addSamples: PropTypes.func.isRequired,
}
