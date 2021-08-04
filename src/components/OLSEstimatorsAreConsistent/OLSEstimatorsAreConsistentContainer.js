import { Alert } from 'react-bootstrap';
import OLSEstimatorsAreConsistent from './OLSEstimatorsAreConsistent.js';
import SelectorButtonGroup from '../SelectorButtonGroup.js';
import { useState } from 'react';
import { OLS_ASSUMPTIONS_OPTIONS } from '../../lib/constants.js';

export default function OLSEstimatorsAreConsistentContainer() {
  const [assumption, setAssumption] = useState('');

  return (
    <div className="module-container">
      <Alert className="sim-description" variant="primary">
        OLS Estimators are Consistent
      </Alert>
      <br/>
      <SelectorButtonGroup
        options={OLS_ASSUMPTIONS_OPTIONS}
        select={setAssumption}
        selected={assumption}
      />
      <br/>
      <br/>
      {assumption && <OLSEstimatorsAreConsistent assumption={assumption}/>}
    </div>
  );
}
