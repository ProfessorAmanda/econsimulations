import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Button, Alert, Form, InputGroup, Table } from 'react-bootstrap';
import TestingForNormalityInput from './TestingForNormalityInput';
import { dataFromDistribution } from 'src/lib/stats-utils';
import TestingForNormalityHistogramChart from './TestingForNormalityHistogramChart';
import ND from 'normal-distribution';
import chi2gof from '@stdlib/stats-chi2gof';
import TeX from '@matejmazur/react-katex';

export default function TestingForNormality() {
  const [sampleSize, setSampleSize] = useState(80);
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);
  const [alpha, setAlpha] = useState(0.05);

  const [distributionShape, setDistributionShape] = useState('');

  // We only need the x value of the point, so type is number[]
  const [dataPoints, setDataPoints] = useState<number[]>([]);

  const [numberOfBinsInput, setNumberOfBinsInput] = useState('');
  const [numberOfBins, setNumberOfBins] = useState(0);
  const [validNumberOfBinsInput, setValidNumberOfBinsInput] = useState(false);
  const [numberOfBinsErrorMessage, setNumberOfBinsErrorMessage] = useState('');

  const [ranges, setRanges] = useState<{ lowerBound: number, upperBound: number }[]>([]);
  const [dataAggregated, setDataAggregated] = useState<{ lowerBound: number, upperBound: number, count: number }[]>([]);

  const [testResult, setTestResult] = useState(<></>);

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
    'Chi-Squared',
    //'Poisson'
  ];

  useEffect(() => {
    setTestResult(<></>);
  }, [numberOfBins]);


  const onGenerateSampleClick = () => {
    setTestResult(<></>);
    const distributionShape = _.sample(availableDistributions) ?? '';
    let data: { x: number, y: number, id: number }[] = [];

    if (distributionShape === 'Normal') {
      data = dataFromDistribution(distributionShape, sampleSize, {
        mean: mu,
        standardDev: sigma,
        hi: 10,
        low: -10,
      });
    } else if (distributionShape === 'Uniform') {
      data = dataFromDistribution(distributionShape, sampleSize, {
        hi: mu + Math.sqrt(3) * sigma,
        low: mu - Math.sqrt(3) * sigma,
      });
    } else if (distributionShape === 'Chi-Squared') {
      data = dataFromDistribution(distributionShape, sampleSize, {
        degreesOfFreedom: mu > 0 ? mu : 0.5,
      });
    }
    setDistributionShape(distributionShape);
    setDataPoints(data.map(d => d.x));
    setNumberOfBinsInput('');
    setNumberOfBins(0);
    setDataAggregated([]);
  }

  const onConfirmBinsClick = () => {
    if (sampleSize / parseInt(numberOfBinsInput) >= 5) {
      setNumberOfBinsErrorMessage('');
      setNumberOfBins(parseInt(numberOfBinsInput));
      const minData = _.min(dataPoints) ?? 0;
      const maxData = _.max(dataPoints) ?? 0;
      const binWidth = (maxData - minData) / parseInt(numberOfBinsInput);

      const ranges: { lowerBound: number, upperBound: number }[] = [];
      const aggregated: { lowerBound: number, upperBound: number, count: number }[] = [];

      _.range(1, parseInt(numberOfBinsInput)).forEach(i => {
        ranges.push({ lowerBound: minData + (i - 1) * binWidth, upperBound: minData + i * binWidth });
        aggregated.push({ lowerBound: minData + (i - 1) * binWidth, upperBound: minData + i * binWidth, count: 0 });
      });
      // The last bin is extedned to the max value – it's inclusive on both ends
      ranges.push({ lowerBound: minData + (parseInt(numberOfBinsInput) - 1) * binWidth, upperBound: maxData });
      aggregated.push({ lowerBound: minData + (parseInt(numberOfBinsInput) - 1) * binWidth, upperBound: maxData, count: 0 });

      const sortedData = _.sortBy(dataPoints);

      let binIndex = 0;
      sortedData.forEach((val) => {
        if (val > aggregated[binIndex].upperBound) { binIndex += 1; }
        aggregated[binIndex].count += 1;
      });

      setRanges(ranges);
      setDataAggregated(aggregated);
    } else {
      setNumberOfBinsErrorMessage('Cannot ensure at least 5 sample points per bin. Please try a lower number of bins.');
    }
  }

  const tableHeaders = ranges.map((r, i) => (<th key={r.lowerBound}> {`[${r.lowerBound.toFixed(2)}, ${r.upperBound.toFixed(2)}${(i < (ranges.length - 1)) ? ')' : ']'}`} </th>));

  const observedFreq = dataAggregated.map(r => (<td key={r.lowerBound}> {r.count} </td>));

  const nd = new ND(mu, sigma);
  const expectedFreq = ranges.map(r => ((nd.cdf(r.upperBound) - nd.cdf(r.lowerBound)) * sampleSize));


  const onTestClick = () => {
    const x = dataAggregated.map(r => r.count);
    const y = expectedFreq;
    const result = chi2gof(x, y, { alpha });
    setTestResult(
      <div>
        <Alert variant={result.rejected ? 'danger' : 'success'}>
          <TeX>{`p\\text{-}value: ${result.pValue.toFixed(3)}`}</TeX><br />
          <TeX>{`test\\text{ }statistic: ${result.statistic.toFixed(3)}`}</TeX><br />
          {result.rejected ? <>Reject the null hypothesis.</> : <>Fail to reject the null hypothesis.</>}
        </Alert>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10rem' }}>
      <Alert variant="info">
        <h5> Testing For Normality </h5>
        <p>In this section, we will find out if a randomly generated set of 100 points follows a normal distribution. This section employs the Chi-Square Goodness-of-Fit Test to evaluate the following null and alternative hypotheses:</p>
        <p>
          <TeX>H_0</TeX>: The dataset follows a normal distribution.
        </p>
        <p>
          <TeX>H_a</TeX>: The dataset does not follow a normal distribution.
        </p>
      </Alert>
      <TestingForNormalityInput sampleSize={sampleSize} setSampleSize={setSampleSize} mu={mu} setMu={setMu} sigma={sigma} setSigma={setSigma} alpha={alpha} setAlpha={setAlpha} />
      <Button style={{ marginTop: '2rem' }} onClick={onGenerateSampleClick}>Generate sample from unknown distribution</Button>
      <p>{`Randomly chose ${distributionShape} as distribution shape`}</p>

      {dataPoints.length > 0 && (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TestingForNormalityHistogramChart dataPoints={dataPoints} dataAggregated={dataAggregated} />
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
        {numberOfBinsErrorMessage !== '' && <Alert style={{ marginTop: '1rem' }} variant="danger">{numberOfBinsErrorMessage}</Alert>}
        <Alert variant="info" style={{ marginTop: '2rem' }}>
          If this dataset came from a normal distribution with the mean and standard deviation of the plotted points, how many points would be located in each bin?
        </Alert>
      </div>)}

      {numberOfBins > 0 &&
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Table style={{ width: '60rem' }} hover striped>
            <thead>
              <tr>
                {/* @ts-ignore */}
                <th width="150" key={'Bin'}>{'Bin'}</th>
                {tableHeaders}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td key={'abc'}>{'Observed Freq.'}</td>
                {observedFreq}
              </tr>
              <tr>
                <td key={'abc'}>{'Expected Freq.'}</td>
                {expectedFreq.map((r, i) => (<td key={i}> {r.toFixed(2)} </td>))}
              </tr>
            </tbody>
          </Table>
          <Button style={{ marginTop: '2rem' }} onClick={onTestClick}>Calculate test statistic and p-value</Button>
          <div style={{ marginTop: '2rem', width: '24rem' }}>
            {testResult}
          </div>
        </div>}
    </div>
  );
}
