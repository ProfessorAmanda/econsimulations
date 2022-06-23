import OLSEstimatorsAreConsistent from './OLSEstimatorsAreConsistent';
import SelectorButtonGroup from '@/components/SelectorButtonGroup';
import { useState } from 'react';
import { OLS_ASSUMPTIONS_OPTIONS } from '@/lib/constants';
import SimulationIntro from '@/components/SimulationIntro';
import _ from 'lodash';
import TeX from '@matejmazur/react-katex';
import JobCorpsDataPopup from '@/components/JobCorpsDataPopup';

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
            <TeX math="Y_i = \beta_0 + \beta_1X_i + u_i, i = 1, \dotsc , n,"/> where
            <br/>
            <br/>
            <ol style={{textAlign: 'left'}}>
              <li style={{margin: 5}}>The error term <TeX math="u_i"/> has conditional mean zero given <TeX math="X_i: E(u_i|X_i)=0"/>;</li>
              <li style={{margin: 5}}><TeX math="(X_i,Y_i), i=1, \dotsc , n,"/> are independent and identically distributed (i.i.d.) draws from their joint distribution; and</li>
              <li style={{margin: 5}}>Large outliers are unlikely: <TeX math="X_i"/> and <TeX math="Y_i"/> have nonzero finite fourth moments.</li>
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
