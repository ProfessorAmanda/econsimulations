import { useState } from 'react';
import PropTypes from 'prop-types';
import { anovaObjectType } from '../../lib/types';
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';
import _ from 'lodash';
import { mean, sum } from 'mathjs';
import { getCounts, populationMean, populationStandardDev } from '../../lib/stats-utils';
import DotPlot from '../DotPlot';

export default function DistributionOfFStatistic({ populations }) {
  const [numSamples, setNumSamples] = useState('');
  const [fStats, setFStats] = useState([]);

  const runSimulation = () => {
    const newFStats = [];
    for (let i = 0; i < numSamples; i++) {
      const sampleObjects = populations.map(({ data, sampleSize }) => _.sampleSize(data, sampleSize));
      const samples = sampleObjects.map((sample) => sample.map(({ x }) => x));
      const overallSampleMean = (_.flatten(samples).length > 0) ? mean(_.flatten(samples)) : undefined;
      const SSTR = sum(populations.map(({ data }) => data.length * (populationMean(data) - overallSampleMean) ** 2));
      const MSTR = SSTR / (populations.length - 1);
      const SSE = sum(populations.map(({ data }) => (data.length - 1) * populationStandardDev(data) ** 2));
      const MSE = SSE / (sum(populations.map(({ data }) => data.length)) - populations.length);
      const F = MSTR / MSE;
      newFStats.push(F.toFixed(2));
    }
    setFStats(newFStats);
  }

  const series = [
    {
      name: 'F-Statistics',
      data: getCounts(fStats),
    }
  ];

  return (
    <>
      <Alert variant="secondary">
        <p>Let's plot the distribution of the F-Statistic:</p>
        <InputGroup className="sample-size-input">
          <Form.Control
            align="right"
            type="number"
            placeholder="Number of Replications:"
            min={1}
            value={numSamples}
            onChange={(event) => setNumSamples(event.target.value)}
          />
          <Button
            variant="secondary"
            disabled={!numSamples || numSamples < 1} onClick={() => runSimulation()}
          >
            Simulate
          </Button>
        </InputGroup>
      {(fStats.length > 0) && (
        <DotPlot
          series={series}
          title="Distribution of F-Statistic"
          xLabel="F-Statistic"
          yLabel="Observations of F-Statistic"
        />
      )}
      </Alert>
    </>
  )
}

DistributionOfFStatistic.propTypes = {
  populations: PropTypes.arrayOf(anovaObjectType).isRequired
}
