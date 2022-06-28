import SampleDistributionOLSEstimators from './SampleDistributionOLSEstimators';
import SelectorButtonGroup from '@/components/SelectorButtonGroup';
import { useState } from 'react';

import TeX from '@matejmazur/react-katex';

import SimulationIntro from '@/components/SimulationIntro';
import JobCorpsDataPopup from '@/components/JobCorpsDataPopup';

export default function SampleDistributionOLSEstimatorsContainer() {
  const [regressorType, setRegressorType] = useState('');

  return (
    <div className="module-container">
      <SimulationIntro
        name="Sample Distribution of OLS Estimators"
        text={<>Like the sample mean, the OLS estimated slope and intercept are random variables with sampling distributions. The Central Limit theorem states that the distribution of the sample average is approximately normal when the sample size is large. This incredibly useful attribute of the sample average also holds for our OLS estimators <TeX math="\hat{\beta}_0"/> and <TeX math="\hat{\beta}_1"/>!</>}
      />
      <br/>
      <p>Select a regressor type:</p>
      <SelectorButtonGroup options={['Continuous', 'Binary']} select={setRegressorType} selected={regressorType}/>
      <br/>
      <br/>
      <JobCorpsDataPopup showButton={regressorType === 'Binary'}/>
      <br/>
      <br/>
      {regressorType && <SampleDistributionOLSEstimators regressorType={regressorType}/>}
    </div>
  );
}
