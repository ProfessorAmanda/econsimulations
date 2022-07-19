import { useState } from 'react';
import _ from 'lodash';
import { Button, Alert } from 'react-bootstrap';
import TestingForNormalityInput from './TestingForNormalityInput';

export default function TestingForNormality() {
  const [sampleSize, setSampleSize] = useState(30);
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);
  const [alpha, setAlpha] = useState(0.05);

  const [distributionShape, setDistributionShape] = useState('');

  const availableDistributions = [
    'normal',
    'uniform',
    //'poisson',
    //'chi-square',
    //'exponential'
  ];

  const onGenerateSampleClick = () => {
    const distribution = _.sample(availableDistributions);
    setDistributionShape(distribution ?? '');
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Alert variant="info">
        <h5> Testing For Normality </h5>
        <p>In this section, we will find out if a randomly generated set of 100 points follows a normal distribution. This section employs the Chi-Square Goodness-of-Fit Test to evaluate the following null and alternative hypotheses:</p>
        <p>H_0: The dataset follows a normal distribution.</p>
        <p>H_a: The dataset does not follow a normal distribution</p>
      </Alert>
      <TestingForNormalityInput sampleSize={sampleSize} setSampleSize={setSampleSize} mu={mu} setMu={setMu} sigma={sigma} setSigma={setSigma} alpha={alpha} setAlpha={setAlpha} />
      <Button style={{ marginTop: '2rem' }} onClick={onGenerateSampleClick}>Generate sample from unknown distribution</Button>
      <p>{`Randomly chose ${distributionShape} as distribition shape`}</p>
    </div>

  );
}
