import { useState } from 'react';
import PropTypes from 'prop-types';
import { anovaPopulationObjectType } from '../../lib/types';
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';
import _ from 'lodash';
import { mean, sum } from 'mathjs';
import { getCounts, populationMean, populationStandardDev } from '../../lib/stats-utils';
import DotPlot from '../DotPlot';
import { jStat } from 'jstat';

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
      const pValue = jStat.anovaftest(...samples);
      newFStats.push({ F: F.toPrecision(3), pValue: pValue.toPrecision(3) });
    }
    setFStats(newFStats);
  }

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
          series={[{ name: 'F-Statistics', data: getCounts(fStats.map(({ F }) => F)) }]}
          title="Distribution of F-Statistic"
          xLabel="F-Statistic"
          yLabel="Observations of F-Statistic"
          xMin={0}
        />
      )}
      </Alert>
    </>
  )
}

DistributionOfFStatistic.propTypes = {
  populations: PropTypes.arrayOf(anovaPopulationObjectType).isRequired
}
