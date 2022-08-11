import { useState, useEffect, useRef } from 'react';
import DotPlot from '@/components/DotPlot';
import NormalCurve from './NormalCurve';
import ManySamplesInput from './ManySamplesInput';
import { Container, Row, Col, Alert, Form } from 'react-bootstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { distributionType, hypothesisEqualityType, popShapeType, testTypeType } from '@/lib/types';
import StdNormalCurve from './StdNormalCurve';
import { random } from 'mathjs';
import { dataFromDistribution, populationStandardDev } from '@/lib/stats-utils';
import { CircularProgressbar } from 'react-circular-progressbar';

export default function SimulateTypeOneError({ popShape, mu0, alpha, distType, sides, equality, testType, sd1, sd2 }) {
  const [population, setPopulation] = useState([]);
  const [population2, setPopulation2] = useState([]);
  const [sampleMeans, setSampleMeans] = useState([]);
  const [sampleSize, setSampleSize] = useState(0);
  const [standardized, setStandardized] = useState(false);

  const [shouldShowProgress, setShouldShowProgress] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  const workerRef = useRef();

  useEffect(() => {
    workerRef.current = new Worker(new URL('./SimulateTypeOneErrorWorker', import.meta.url))
    workerRef.current.onmessage = (evt) => {
      if (evt.data.type === 'progress') {
        setProgressPercent(evt.data.percentComplete);
      } else if (evt.data.type === 'done') {
        setSampleMeans(evt.data.newSampleMeans);
        setSampleSize(evt.data.sampleSize);
        setProgressPercent(100);
      }
    }
  }, [])

  const onRunClick = async (size, replications, clear) => {
    setProgressPercent(0);
    setShouldShowProgress(true);
    setTimeout(() => {
      workerRef.current.postMessage({ size, replications, clear, population, population2, testType, distType, mu0, equality, sides, sampleMeans, alpha });
    }, 600);
  }

  useEffect(() => {
    setPopulation(dataFromDistribution(
      popShape,
      2000,
      {
        mean: mu0,
        standardDev: sd1,
        low: mu0 - 10,
        hi: mu0 + 10,
        mysteryMean1: mu0 - 6,
        mysteryMean2: mu0 + 6,
        mysterySD1: random(1, 4),
        mysterySD2: random(1, 4)
      }
    ))
    if (testType === 'twoSample') {
      setPopulation2(dataFromDistribution(
        popShape,
        2000,
        {
          mean: mu0,
          standardDev: sd2,
          low: mu0 - 10,
          hi: mu0 + 10,
          mysteryMean1: mu0 - 6,
          mysteryMean2: mu0 + 6,
          mysterySD1: random(1, 4),
          mysterySD2: random(1, 4)
        }
      ))
    }
  }, [mu0, popShape, testType, sd1, sd2]);

  const dotPlotSeries = [
    {
      name: `Population${(testType === 'twoSample') ? ' 1' : ''}`,
      data: population,
    },
    {
      name: 'Population 2',
      data: population2,
      color: '#903C3D',
      marker: {
        symbol: 'diamond',
        radius: 4,
        lineColor: '#5A2526',
        lineWidth: 1
      }
    }
  ]

  return (
    <Container>
      <Alert variant="primary" style={{ marginTop: 50, marginBottom: 50 }}>
        Now we simulate Type I error. In other words, if the true mean were actually {mu0.toPrecision(2)}, how often would we (incorrectly) reject the null hypothesis?
      </Alert>
      <Row>
        <Col>
          <DotPlot series={dotPlotSeries} title={`Population${(testType === 'twoSample') ? 's' : ''}`} xLabel="Gallons" />
        </Col>
        <Col>
          {!standardized ? (
            <NormalCurve
              means={sampleMeans}
              mu0={mu0}
              popStandardDev={_.defaultTo(populationStandardDev(population), 0)}
              sampleSize={+sampleSize || 1}
              distType={distType}
              testType={testType}
            />
          ) : (
            <StdNormalCurve
              means={sampleMeans}
              sampleSize={+sampleSize || 1}
              distType={distType}
              testType={testType}
            />
          )}
          <Form.Check
            checked={standardized}
            inline
            className="form-switch"
            label="Convert to Standard Normal"
            onChange={() => setStandardized(!standardized)}
          />
        </Col>
      </Row>
      <ManySamplesInput populationSize={population.length} addSamples={onRunClick} />
      {(sampleMeans.length > 0) && (
        <Alert variant="info">
          Out of {sampleMeans.length} samples, we rejected the null hypothesis {sampleMeans.filter(({ reject }) => reject).length} times ({_.round(100 * sampleMeans.filter(({ reject }) => reject).length / sampleMeans.length, 2)}%).
        </Alert>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <div style={{ height: '100px', width: '100px' }}>
          {shouldShowProgress && (
            <CircularProgressbar value={progressPercent} text={`${progressPercent}%`} />
          )}
        </div>
      </div>
    </Container>
  )
}

SimulateTypeOneError.propTypes = {
  popShape: popShapeType.isRequired,
  mu0: PropTypes.number.isRequired,
  alpha: PropTypes.number.isRequired,
  distType: distributionType.isRequired,
  sides: PropTypes.oneOf([1, 2]).isRequired,
  equality: hypothesisEqualityType.isRequired,
  testType: testTypeType.isRequired,
  sd1: PropTypes.number.isRequired,
  sd2: PropTypes.number
}
