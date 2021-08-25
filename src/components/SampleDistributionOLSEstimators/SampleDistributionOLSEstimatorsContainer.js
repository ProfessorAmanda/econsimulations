import SampleDistributionOLSEstimators from './SampleDistributionOLSEstimators.js';
import SelectorButtonGroup from '../SelectorButtonGroup.js';
import { useState } from 'react';
import { InlineMath } from 'react-katex';
import SimulationIntro from '../SimulationIntro.js';
import JobCorpsDataModal from '../JobCorpsDataModal.js';

export default function SampleDistributionOLSEstimatorsContainer() {
  const [regressorType, setRegressorType] = useState('');

  return (
    <div className="module-container">
      <SimulationIntro
        name="Sample Distribution of OLS Estimators"
        text={<>Like the sample mean, the OLS estimated slope and intercept are random variables with sampling distributions. The Central Limit theorem states that the distribution of the sample average is approximately normal when the sample size is large. This incredibly useful attribute of the sample average also holds for our OLS estimators <InlineMath math="\hat{\beta}_0"/> and <InlineMath math="\hat{\beta}_1"/>!</>}
      />
      <br/>
      <p>Select a regressor type:</p>
      <SelectorButtonGroup options={['Continuous', 'Binary']} select={setRegressorType} selected={regressorType}/>
      <br/>
      <br/>
      <JobCorpsDataModal showButton={regressorType === 'Binary'}/>
      <br/>
      <br/>
      {regressorType && <SampleDistributionOLSEstimators regressorType={regressorType}/>}
    </div>
  );
}
