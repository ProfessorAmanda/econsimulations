import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Button, Alert, Form, InputGroup } from 'react-bootstrap';
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

  const [numberOfBinsInput, setNumberOfBinsInput] = useState('');
  const [numberOfBins, setNumberOfBins] = useState(10);
  const [validNumberOfBinsInput, setValidNumberOfBinsInput] = useState(false);
  const [numberOfBinsErrorMessage, setNumberOfBinsErrorMessage] = useState('');

  useEffect(() => {
    if (numberOfBinsInput !== '') {
      const newNumberOfBins = parseInt(numberOfBinsInput);
      setValidNumberOfBinsInput(newNumberOfBins >= 2 && newNumberOfBins <= 10);
    }
  }, [numberOfBinsInput]);

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
      hi: 10,
      low: -10
    });
    setDataPoints(data.map(d => d.x));
  }

  const onConfirmBinsClick = () => {
    if (sampleSize / parseInt(numberOfBinsInput) >= 5) {
      setNumberOfBins(parseInt(numberOfBinsInput));
      setNumberOfBinsErrorMessage('');
    } else {
      setNumberOfBinsErrorMessage('Cannot ensure at least 5 samples per bin. Please try a lower number of bins.');
    }

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

      {dataPoints.length > 0 && (<div>
        <TestingForNormalityHistogramChart dataPoints={dataPoints} numberOfBins={numberOfBins} />
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '1.5rem' }}>
          <span style={{ width: '15rem', marginRight: '2rem' }}>How many bins would you like to divide the data into?</span>
          <InputGroup style={{ width: '80%', margin: 'auto', marginBottom: '1rem', marginTop: '1rem' }}>
            <Form.Control
              style={{ width: '20rem' }}
              // @ts-ignore
              align="right"
              type="number"
              placeholder="Number of bins(2-10):"
              min={2}
              value={numberOfBinsInput}
              max={10}
              step={1}
              onChange={(event: any) => setNumberOfBinsInput(event.target.value)}
            />
            <Button variant={validNumberOfBinsInput ? 'primary' : 'secondary'} disabled={!validNumberOfBinsInput} onClick={() => onConfirmBinsClick()}>
              Confirm
            </Button>
          </InputGroup>
        </div>
      </div>)}
      {numberOfBinsErrorMessage !== '' && <Alert style={{ marginTop: '1rem'}} variant="danger">{numberOfBinsErrorMessage}</Alert>}
    </div>
  );
}
