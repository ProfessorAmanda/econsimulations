import OLSEstimatorsAreConsistent from './OLSEstimatorsAreConsistent.js';
import SelectorButtonGroup from '../SelectorButtonGroup.js';
import { useState } from 'react';
import { OLS_ASSUMPTIONS_OPTIONS } from '../../lib/constants.js';
import SimulationIntro from '../SimulationIntro.js';
import _ from 'lodash';

export default function OLSEstimatorsAreConsistentContainer() {
  const [assumption, setAssumption] = useState('');

  const assumptionAsString = _.isObject(assumption) ? _.invert(OLS_ASSUMPTIONS_OPTIONS)[assumption] : assumption;

  return (
    <div className="module-container">
      <SimulationIntro
        name="OLS Estimators are Consistent"
        text=""
      />
      <br/>
      <SelectorButtonGroup
        options={_.values(OLS_ASSUMPTIONS_OPTIONS)}
        select={setAssumption}
        selected={assumption}
      />
      <br/>
      <br/>
      {assumption && <OLSEstimatorsAreConsistent assumption={assumptionAsString}/>}
    </div>
  );
}
