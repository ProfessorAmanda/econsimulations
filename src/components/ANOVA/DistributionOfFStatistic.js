import { useState } from 'react';
import PropTypes from 'prop-types';
import { anovaPopulationObjectType } from '../../lib/types';
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';
import _ from 'lodash';
import { mean, sum } from 'mathjs';
import { populationMean, populationStandardDev } from '../../lib/stats-utils';
import DotPlot from '../DotPlot';
import { jStat } from 'jstat';

export default function DistributionOfFStatistic({ populations, alpha }) {
  const [numSamples, setNumSamples] = useState('');
  const [accepts, setAccepts] = useState([]);
  const [rejects, setRejects] = useState([]);

  const runSimulation = () => {
    const fStats = [];
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
      fStats.push({ F, pValue, reject: pValue < alpha });
    }
    const fCounts = {};
    const newRejects = [];
    const newAccepts = [];
    fStats.forEach(({ F, pValue, reject }) => {
      fCounts[F] = _.defaultTo(fCounts[F] + 1, 1);
      const fObject = {
        x: _.round(F, 3),
        y: fCounts[F],
        F: _.round(F, 3),
        pValue: pValue.toPrecision(3),
        reject,
      }
      if (reject) {
        newRejects.push(fObject)
      } else {
        newAccepts.push(fObject)
      }
    });
    setAccepts(newAccepts);
    setRejects(newRejects);
  }

  const tooltipFormat = {
    pointFormat: 'F-Statistic: <b>{point.F}</b><br/>p-value: <b>{point.pValue}</b><br/>reject H_0: <b>{point.reject}</b></br>'
  }

  const series = [
    {
      name: 'Fail to Reject H_0',
      type: 'scatter',
      data: accepts,
      color: '#03fc0b',
      marker: {
        symbol: 'diamond',
        radius: 4,
        lineColor: 'green',
        lineWidth: 1
      },
      tooltip: tooltipFormat
    },
    {
      name: 'Reject H_0',
      type: 'scatter',
      data: rejects,
      color: 'red',
      marker: {
        symbol: 'diamond',
        radius: 4,
        lineColor: '#800000',
        lineWidth: 1
      },
      tooltip: tooltipFormat
    }
  ]

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
      {([...accepts, ...rejects].length > 0) && (
        <DotPlot
          series={series}
          title="Distribution of F-Statistic"
          xLabel="F-Statistic"
          yLabel="Observations of F-Statistic"
          xMin={0}
        />
      )}
      </Alert>
      {([...accepts, ...rejects].length > 0) && (
        <Alert variant="primary">
          {`We rejected the null hypothesis in ${100 * rejects.length / (rejects.length + accepts.length)}% of replications.`}
        </Alert>
      )}
    </>
  )
}

DistributionOfFStatistic.propTypes = {
  populations: PropTypes.arrayOf(anovaPopulationObjectType).isRequired,
  alpha: PropTypes.number.isRequired
}
