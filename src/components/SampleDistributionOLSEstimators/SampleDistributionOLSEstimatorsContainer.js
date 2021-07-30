import { Alert } from 'react-bootstrap';
import SampleDistributionOLSEstimators from './SampleDistributionOLSEstimators.js';
import SelectorButtonGroup from '../SelectorButtonGroup.js';
import { useState } from 'react';
import { InlineMath } from 'react-katex';

export default function SampleDistributionOLSEstimatorsContainer() {
  const [populationShape, setPopulationShape] = useState('');

  return (
    <div className="module-container">
      <Alert className="sim-description" variant="primary">
        Sample Distribution of OLS Estimators
      </Alert>
      <Alert className="sim-description" variant="primary">
        Like the sample mean, the OLS estimated slope and intercept are random variables with sampling distributions. The Central Limit theorem states that the distribution of the sample average is approximately normal when the sample size is large. This incredibly useful attribute of the sample average also holds for our OLS estimators <InlineMath math="\hat{\beta}_0"/> and <InlineMath math="\hat{\beta}_1"/>!
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
