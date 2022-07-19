import { useState } from 'react';
import _ from 'lodash';
import { Button, Alert } from 'react-bootstrap';
import TestingForNormalityInput from './TestingForNormalityInput';
import { dataFromDistribution } from 'src/lib/stats-utils';
import TestingForNormalityHistogramChart from './TestingForNormalityHistogramChart';

export default function TestingForNormality() {
  const [sampleSize, setSampleSize] = useState(80);
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);
  const [alpha, setAlpha] = useState(0.05);

  const [distributionShape, setDistributionShape] = useState('');

  // We only need the x value of the point, so type is number[]
  const [dataPoints, setDataPoints] = useState<number[]>([]);

  const availableDistributions = [
    'Normal',
    'Uniform',
    //'Exponential',
    //'Chi-Squared',
    //'Poisson'
  ];
  

  const onGenerateSampleClick = () => {
    const distributionShape = _.sample(availableDistributions) ?? '';
    setDistributionShape(distributionShape);
    const data = dataFromDistribution(distributionShape, sampleSize, {
      mean: mu,
      standardDev: sigma,
      hi:10,
      low:-10
    });
    setDataPoints(data.map(d => d.x));
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10rem' }}>
      <Alert variant="info">
        <h5> Testing For Normality </h5>
        <p>In this section, we will find out if a randomly generated set of 100 points follows a normal distribution. This section employs the Chi-Square Goodness-of-Fit Test to evaluate the following null and alternative hypotheses:</p>
        <p>H_0: The dataset follows a normal distribution.</p>
        <p>H_a: The dataset does not follow a normal distribution</p>
      </Alert>
      <TestingForNormalityInput sampleSize={sampleSize} setSampleSize={setSampleSize} mu={mu} setMu={setMu} sigma={sigma} setSigma={setSigma} alpha={alpha} setAlpha={setAlpha} />
      <Button style={{ marginTop: '2rem' }} onClick={onGenerateSampleClick}>Generate sample from unknown distribution</Button>
      <p>{`Randomly chose ${distributionShape} as distribition shape`}</p>
      <TestingForNormalityHistogramChart dataPoints={dataPoints} />
    </div>

  );
}
