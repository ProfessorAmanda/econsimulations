import { useState } from 'react';
import PropTypes from 'prop-types';
import { anovaPopulationObjectType, stringOrNumberType } from '../../lib/types';
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';
import _ from 'lodash';
import { mean, std, sum } from 'mathjs';
import { jStat } from 'jstat';
import { InlineMath } from 'react-katex';
import FDistributionPlot from './FDistributionPlot';

export default function DistributionOfFStatistic({ populations, alpha }) {
  const [numSamples, setNumSamples] = useState('');
  const [accepts, setAccepts] = useState([]);
  const [rejects, setRejects] = useState([]);

  const runSimulation = () => {
    const fStats = [];
    for (let i = 0; i < numSamples; i++) {
      // calculate F-statistic and p-value
      const sampleObjects = populations.map(({ data, sampleSize }) => _.sampleSize(data, sampleSize));
      const samples = sampleObjects.map((sample) => sample.map(({ x }) => x));
      const overallSampleMean = (_.flatten(samples).length > 0) ? mean(_.flatten(samples)) : undefined;
      const SSTR = sum(samples.map((sample) => sample.length * (mean(sample) - overallSampleMean) ** 2));
      const MSTR = SSTR / (populations.length - 1);
      const SSE = sum(samples.map((sample) => (sample.length - 1) * std(sample) ** 2));
      const MSE = SSE / (sum(samples.map((sample) => sample.length)) - populations.length);
      const F = MSTR / MSE;
      const pValue = jStat.anovaftest(...samples);
      // round slightly differently below 1 so there are no f-stats = 0
      fStats.push({ F: (F < 1) ? +F.toPrecision(2) : _.round(F, 2), pValue, reject: pValue < +alpha });
    }
    const fCounts = {};
    const newRejects = [];
    const newAccepts = [];
    // separate F-stats into two arrays for rejecting/failing to reject
    fStats.forEach(({ F, pValue, reject }) => {
      fCounts[F] = _.defaultTo(fCounts[F] + 1, 1);
      const fObject = {
        x: +F,
        y: fCounts[F],
        F,
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
        <>
          <p>
            <strong>Distribution of F-Statistic </strong>
            (<InlineMath math={`df_{num} = ${populations.length - 1}, df_{den} = ${sum(populations.map(({ sampleSize }) => sampleSize)) - populations.length}`}/>)
          </p>
          <FDistributionPlot accepts={accepts} rejects={rejects}/>
        </>
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
  alpha: stringOrNumberType.isRequired
}
