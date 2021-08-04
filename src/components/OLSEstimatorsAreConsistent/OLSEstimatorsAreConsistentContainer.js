import { Alert } from 'react-bootstrap';
import OLSEstimatorsAreConsistent from './OLSEstimatorsAreConsistent.js';
import SelectorButtonGroup from '../SelectorButtonGroup.js';
import { useState } from 'react';

export default function OLSEstimatorsAreConsistentContainer() {
  const [assumption, setAssumption] = useState('');

  return (
    <div className="module-container">
      <Alert className="sim-description" variant="primary">
        OLS Estimators are Consistent
      </Alert>
      <br/>
      <SelectorButtonGroup
        options={['Normal', 'Non-Random Sample', 'Human Error']}
        select={setAssumption}
        selected={assumption}
      />
      <br/>
      <br/>
      {assumption && <OLSEstimatorsAreConsistent assumption={assumption}/>}
    </div>
  );
}
