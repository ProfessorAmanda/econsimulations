import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { anovaPopulationObjectType, stringOrNumberType } from '@/lib/types';
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';
import { sum } from 'mathjs';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import TeX from '@matejmazur/react-katex';
import { CircularProgressbar } from 'react-circular-progressbar';

// A HighChartReact bug when integrating with Next.js's server-side rendering
// Work around: https://github.com/highcharts/highcharts/issues/10588
import Boost from 'highcharts/modules/boost';
if (typeof Highcharts === 'object') {
  Boost(Highcharts);
}

export default function DistributionOfFStatistic({ populations, alpha }) {
  const [numSamples, setNumSamples] = useState('');
  const [accepts, setAccepts] = useState([]);
  const [rejects, setRejects] = useState([]);

  const [shouldShowProgress, setShouldShowProgress] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  const workerRef = useRef();

  useEffect(() => {
    workerRef.current = new Worker(new URL('./ANOVASimulationWorker', import.meta.url))
    workerRef.current.onmessage = (evt) => {
      if (evt.data.type === 'progress') {
        setProgressPercent(evt.data.percentComplete);
      } else if (evt.data.type === 'done') {
        setAccepts(evt.data.newAccepts);
        setRejects(evt.data.newRejects);
        setProgressPercent(100);
      }
    }
  }, [])

  const onSimulateClick = async () => {
    setProgressPercent(0);
    setShouldShowProgress(true);
    setTimeout(() => {
      workerRef.current.postMessage({ populations, alpha, numSamples });
    }, 600);
  }

  const chart = {
    chart: {
      zoomType: 'xy',
      animation: false,
      type: 'scatter'
    },
    boost: {
      useGPUTranslations: true,
      usePreAllocated: true
    },
    plotOptions: {
      series: {
        boostThreshold: 10000
      }
    },
    title: {
      text: ''
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
      allowDecimals: false,
      startOnTick: true,
      endOnTick: true,
      min: 0,
      title: {
        text: 'Observations of F-Statistic'
      }
    },
    tooltip: {
      pointFormat: 'F-Statistic: <b>{point.F}</b><br/>p-value: <b>{point.pValue}</b><br/>reject H_0: <b>{point.reject}</b></br>'
    },
    // fail to reject and reject are in two different series so they can be colored differently
    // I can't figure out how to color points within one series differently so this is the best option
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
      {shouldShowProgress && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
          <div style={{ height: '100px', width: '100px' }}>
            <CircularProgressbar value={progressPercent} text={`${progressPercent}%`} />
          </div>
        </div>
      )}
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
            disabled={!numSamples || numSamples < 1} onClick={() => onSimulateClick()}
          >
            Simulate
          </Button>
        </InputGroup>
        {([...accepts, ...rejects].length > 0) && (
          <>
            <p>
              <strong>Distribution of F-Statistic </strong>
              (<TeX math={`df_{num} = ${populations.length - 1}, df_{den} = ${sum(populations.map(({ sampleSize }) => sampleSize)) - populations.length}`} />)
            </p>

            <HighchartsReact highcharts={Highcharts} options={chart} />
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
