import { Alert } from 'react-bootstrap';
import SampleDistributionOLSEstimators from './SampleDistributionOLSEstimators.js';
import SelectorButtonGroup from '../SelectorButtonGroup.js';
import { useState } from 'react';

export default function SampleDistributionOLSEstimatorsContainer() {
  const [populationShape, setPopulationShape] = useState('');

  return (
    <div className="module-container">
      <Alert style={{ width: '50%', margin: 'auto' }} variant="primary">
        Sample Distribution of OLS Estimators
      </Alert>
      <br/>
      <p>Select a population shape:</p>
      <SelectorButtonGroup options={['Continuous', 'Binary']} select={setPopulationShape} selected={populationShape}/>
      <br/>
      <br/>
      {populationShape && <SampleDistributionOLSEstimators populationShape={populationShape}/>}
    </div>
  );
}
