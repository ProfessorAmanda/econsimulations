import { useState } from 'react';
import PropTypes from 'prop-types';
import { anovaPopulationObjectType, stringOrNumberType } from '../../lib/types';
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';
import _ from 'lodash';
import { mean, std, sum } from 'mathjs';
import { jStat } from 'jstat';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

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
      const SSTR = sum(samples.map((sample) => sample.length * (mean(sample) - overallSampleMean) ** 2));
      const MSTR = SSTR / (populations.length - 1);
      const SSE = sum(samples.map((sample) => (sample.length - 1) * std(sample) ** 2));
      const MSE = SSE / (sum(populations.map(({ data }) => data.length)) - populations.length);
      const F = MSTR / MSE;
      const pValue = jStat.anovaftest(...samples);
      fStats.push({ F: (F < 1) ? +F.toPrecision(2) : _.round(F, 1), pValue, reject: pValue < +alpha });
    }
    const fCounts = {};
    const newRejects = [];
    const newAccepts = [];
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

  const chart = {
    chart: {
      zoomType: 'xy',
      animation: false,
      type: 'scatter'
    },
    title: {
      text: 'Distribution of F-Statistic'
    },
    xAxis: {
      title: {
        text: 'F-Statistic',
      },
      min: 0,
      startOnTick: true,
      endOnTick: true
    },
    yAxis: {
      startOnTick: true,
      endOnTick: true,
      title: {
        text: 'Observations of F-Statistic'
      }
    },
    tooltip: {
      pointFormat: 'F-Statistic: <b>{point.F}</b><br/>p-value: <b>{point.pValue}</b><br/>reject H_0: <b>{point.reject}</b></br>'
    },
    series: [
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
        }
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
        }
      }
    ]
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
      {([...accepts, ...rejects].length > 0) && <HighchartsReact highcharts={Highcharts} options={chart}/>}
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
