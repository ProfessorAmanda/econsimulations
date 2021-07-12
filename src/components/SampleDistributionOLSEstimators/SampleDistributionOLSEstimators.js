import { Alert } from 'react-bootstrap';
import SDOLSESimulation from './SDOLSESimulation.js';
import SelectorButtonGroup from '../SelectorButtonGroup.js';
import { useState } from 'react';

export default function SampleDistributionOLSEstimators() {
  const [populationShape, setPopulationShape] = useState('');

  return (
    <div className="module-container">
      <Alert style={{ width: '50%', margin: 'auto' }} variant="primary">
        Sample Distribution of OLS Estimators
      </Alert>
      <br/>
      <p>Select a population shape:</p>
      <SelectorButtonGroup options={['Scatter', 'Binary']} select={setPopulationShape} selected={populationShape}/>
      <br/>
      <br/>
      {populationShape && <SDOLSESimulation populationShape={populationShape}/>}
    </div>
  );
}
