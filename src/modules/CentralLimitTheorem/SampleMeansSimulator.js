import { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { dataObjectArrayType } from '@/lib/types';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function SampleMeansSimulator({ population, addSamples }) {
  const [numberResamples, setNumberResamples] = useState(0);
  const [resampleSize, setResampleSize] = useState(0);

  const [shouldShowProgress, setShouldShowProgress] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  const workerRef = useRef();

  useEffect(() => {
    workerRef.current = new Worker(new URL('./SimulationWorker', import.meta.url))
    workerRef.current.onmessage = (evt) => {
      if (evt.data.type === 'progress') {
        setProgressPercent(evt.data.percentComplete);
      } else if (evt.data.type === 'done') {
        addSamples(evt.data.sampleMeans);
        setProgressPercent(100);
      }
    }
  }, [])

  const onRunClick = async () => {
    setProgressPercent(0);
    setShouldShowProgress(true);
    setTimeout(() => {
      workerRef.current.postMessage({ numberResamples, population, resampleSize });
    }, 600);
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
      >Run</Button>
      <Button variant="secondary" onClick={() => { addSamples([]); setShouldShowProgress(false); }}>Clear</Button>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <div style={{ height: '100px', width: '100px' }}>
          {shouldShowProgress && (
            <CircularProgressbar value={progressPercent} text={`${progressPercent}%`} />
          )}
        </div>
      </div>
    </div>
  );
}

SampleMeansSimulator.propTypes = {
  population: dataObjectArrayType.isRequired,
  addSamples: PropTypes.func.isRequired,
}
