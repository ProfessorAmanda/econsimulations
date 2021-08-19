import { useState, useEffect } from 'react';
import DotPlot from '../DotPlot.js';
import NormalCurve from './NormalCurve.js';
import ManySamplesInput from './ManySamplesInput.js';
import { Container, Row, Col, Alert, Form } from 'react-bootstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { distributionType, hypothesisEqualityType, popShapeType, testTypeType } from '../../lib/types.js';
import StdNormalCurve from './StdNormalCurve.js';
import { random } from 'mathjs';
import {
  calculateOneSampleTestStatistic,
  calculatePValue,
  calculateTwoSampleTestStatistic,
  dataFromDistribution,
  populationMean,
  populationStandardDev
} from '../../lib/stats-utils';

export default function SimulateTypeOneError({ popShape, mu0, alpha, distType, sides, equality, testType, sd1, sd2 }) {
  const [population, setPopulation] = useState([]);
  const [population2, setPopulation2] = useState([]);
  const [sampleMeans, setSampleMeans] = useState([]);
  const [sampleSize, setSampleSize] = useState(0);
  const [standardized, setStandardized] = useState(false);

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

  const addSamples = (size, replications, clear) => {
    const means = [];
    for (let i = 0; i < replications; i++) {
      const sample = _.sampleSize(population, size);
      const sampleMean = populationMean(sample);
      const sample2 = (testType === 'twoSample') ? _.sampleSize(population2, size) : [];
      const sampleMean2 = populationMean(sample2);
      const testStatistic = (testType === 'oneSample')
        ? calculateOneSampleTestStatistic(
          distType,
          sampleMean,
          mu0,
          populationStandardDev((distType === 'Z') ? population : sample),
          size
        )
        : calculateTwoSampleTestStatistic(
          sampleMean,
          sampleMean2,
          populationStandardDev((distType === 'Z') ? population : sample),
          populationStandardDev((distType === 'Z') ? population2 : sample2),
          size,
          size
        );

      const pValue = calculatePValue(distType, testStatistic, equality, size, sides);

      const sampleObject = {
        testStatistic: _.round(testStatistic, 2),
        mean: testType === 'oneSample' ? _.round(sampleMean, 2) : _.round(sampleMean - sampleMean2, 2),
        reject: !(((equality === '<') && (testStatistic > 0)) || ((equality === '>') && (testStatistic < 0))) && pValue <= alpha
      };
      means.push(sampleObject);
    }
    const newSampleMeans = clear ? means : [...sampleMeans, ...means];
    setSampleMeans(newSampleMeans);
    setSampleSize(size);
  }

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
          <DotPlot series={dotPlotSeries} title={`Population${(testType === 'twoSample') ? 's' : ''}`} xLabel="Gallons"/>
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
            onClick={() => setStandardized(!standardized)}
          />
        </Col>
      </Row>
      <ManySamplesInput populationSize={population.length} addSamples={addSamples}/>
      {(sampleMeans.length > 0) && (
        <Alert variant="info">
          Out of {sampleMeans.length} samples, we rejected the null hypothesis {sampleMeans.filter(({ reject }) => reject).length} times ({_.round(100 * sampleMeans.filter(({ reject }) => reject).length / sampleMeans.length, 2)}%).
        </Alert>
      )}
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
