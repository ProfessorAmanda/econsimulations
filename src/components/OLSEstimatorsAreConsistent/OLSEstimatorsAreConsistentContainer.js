import OLSEstimatorsAreConsistent from './OLSEstimatorsAreConsistent.js';
import SelectorButtonGroup from '../SelectorButtonGroup.js';
import { useState } from 'react';
import { OLS_ASSUMPTIONS_OPTIONS } from '../../lib/constants.js';
import SimulationIntro from '../SimulationIntro.js';
import _ from 'lodash';
import { InlineMath } from 'react-katex';
import JobCorpsDataPopup from '../JobCorpsDataPopup.js';

export default function OLSEstimatorsAreConsistentContainer() {
  const [assumption, setAssumption] = useState('');

  const assumptionAsString = _.isObject(assumption) ? _.invert(OLS_ASSUMPTIONS_OPTIONS)[assumption] : assumption;

  return (
    <div className="module-container">
      <SimulationIntro
        name="OLS Estimators are Consistent"
        text={
          <>
            The Least Squares Assumptions:
            <br/>
            <br/>
            <InlineMath math="Y_i = \beta_0 + \beta_1X_i + u_i, i = 1, \dotsc , n,"/> where
            <br/>
            <br/>
            <ol style={{textAlign: 'left'}}>
              <li style={{margin: 5}}>The error term <InlineMath math="u_i"/> has conditional mean zero given <InlineMath math="X_i: E(u_i|X_i)=0"/>;</li>
              <li style={{margin: 5}}><InlineMath math="(X_i,Y_i), i=1, \dotsc , n,"/> are independent and identically distributed (i.i.d.) draws from their joint distribution; and</li>
              <li style={{margin: 5}}>Large outliers are unlikely: <InlineMath math="X_i"/> and <InlineMath math="Y_i"/> have nonzero finite fourth moments.</li>
            </ol>
            <br/>
            Stock, James H., and Mark W. Watson. 2019. <cite>Introduction to econometrics, 4th Edition.</cite> Boston: Pearson/Addison Wesley.
          </>
        }
      />
      <br/>
      <SelectorButtonGroup
        options={_.values(OLS_ASSUMPTIONS_OPTIONS)}
        select={setAssumption}
        selected={assumption}
      />
      <br/>
      <br/>
      <JobCorpsDataPopup showButton/>
      <br/>
      <br/>
      {assumption && <OLSEstimatorsAreConsistent assumption={assumptionAsString}/>}
    </div>
  );
}
