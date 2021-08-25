import { useEffect, useState } from 'react';
import Collapsable from '../Collapsable.js';
import _ from 'lodash';
import { Col, Container, Row } from 'react-bootstrap';
import { linearRegression } from '../../lib/stats-utils.js';
import PopulationPlot from './PopulationPlot.js';
import SampleInput from './SampleInput.js';
import SamplePlot from './SamplePlot.js';
import SimulateSamples from '../SimulateSamples.js';
import { InlineMath } from 'react-katex';
import randomNormal from 'random-normal';
import { median } from 'mathjs';
import { olsAssumptionType } from '../../lib/types.js';
import { OLS_ASSUMPTIONS_OPTIONS } from '../../lib/constants.js';
import { fetchCsv } from '../../lib/data-utils.js';

export default function OLSEstimatorsAreConsistent({ assumption }) {
  const [data, setData] = useState([]);
  const [samples, setSamples] = useState([]);
  const [selected, setSelected] = useState();
  const [showViolation, setShowViolation] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // use a pre-generated dataset
    const getData = async () => {
      const csvData = await fetchCsv(`${process.env.PUBLIC_URL}/data/RTC_data.csv`);
      setData(csvData.map(([x, y, category]) => ({ x: +x, y: +y, category })));
    }
    getData();
  }, []);

  useEffect(() => {
    setSamples([]);
    setSelected();
    setShowViolation(true);
  }, [assumption]);

  useEffect(() => {
    if (selected && assumption === 'E(u|x) != 0') {
      // display a message if no violation occurs
      setShowMessage(selected.data.every((obj) => !obj.altered))
    }
  }, [selected, assumption]);

  // takes a sample of 'size' from 'population' - the sample is altered based on 'assumption'
  const samplingFunction = (population, size) => {
    const medianValue = median(population.map(({ y }) => y));

    if (assumption === 'OLS Assumptions Hold') {
      // take a normal sample
      return _.sampleSize(population, size);

    } else if (assumption === 'Non-Random Sample') {
      // only sample from observations below the median value
      const belowMedian = population.filter(({ y }) => y < medianValue);
      const belowMedianSample = _.sampleSize(belowMedian, size);
      // if the sample size is too big, resample from below the median
      const belowMedianResample = _.sampleSize(belowMedian, size - belowMedian.length);
      return [...belowMedianSample, ...belowMedianResample];

    } else if (assumption === 'Large Outliers') {
      // take a normal sample, then multiply the income by 2 of 20% of the sampled jobCorps observations
      const sample = _.sampleSize(population, size);
      const sampleJobCorps = sample.filter(({ category }) => category === 'Job Corps');
      const randomIndices = _.sampleSize(_.range(0, sampleJobCorps.length), _.round(sampleJobCorps.length * 0.2));
      const alteredJobCorps = sampleJobCorps.map((obj, idx) => (
        {
          ...obj,
          y: (randomIndices.includes(idx) ? obj.y * 2 : obj.y),
          // store the original y-value and mark that the sample was modified
          originalY: obj.y,
          altered: randomIndices.includes(idx)
        }
      ));
      const remainingSample = sample.filter(({ id }) => !alteredJobCorps.some((obj) => obj.id === id));
      return [...remainingSample, ...alteredJobCorps];

    } else if (assumption === 'E(u|x) != 0') {
      // take a normal sample, then increase 20% of the top sampled control observations by ~16 and move them to the Job Corps
      const sample = _.sampleSize(population, size);
      const sampleControl = sample.filter(({ category }) => category === 'Control');
      const sampleControlAboveMedian = sampleControl.filter(({ y }) => y >= medianValue);
      const protocolBreakers = _.sampleSize(sampleControlAboveMedian, _.round(size * 0.2)).map((obj) => (
        {
          ...obj,
          x: 1,
          // store the original x-value
          originalX: 0,
          y: obj.y + randomNormal({mean: 16, dev: 5}),
          // store the original y-value
          originalY: obj.y,
          // mark that the sample was modified
          altered: true
        }
      ));
      const remainingSample = sample.filter(({ id }) => !protocolBreakers.some((obj) => obj.id === id));
      return [...remainingSample, ...protocolBreakers];
    }
  }

  const addSample = (size) => {
    let sample;
    do {
      sample = samplingFunction(data, size);
      // ensures that the sample has points in both of the x-categories
    } while (_.uniq(sample.map(({ category }) => category)).length === 1);

    const { slope: violationSlope, intercept: violationIntercept } = linearRegression(sample, 1);
    const { slope: originalSlope, intercept: originalIntercept } = linearRegression(sample.map(
      ({ x, y, originalY, altered }) => [x, (altered ? originalY : y)]
    ), 1);

    // store the slope/intercept from both the altered and non-altered samples
    const sampleObject = {
      data: sample,
      size: sample.length,
      slope: violationSlope,
      intercept: violationIntercept,
      originalSlope,
      originalIntercept
    }
    const newSamples = [...samples, sampleObject].map((obj, index) => ({ ...obj, id: index }));
    setSelected(newSamples[newSamples.length - 1]);
    setSamples(newSamples);
  }

  const getBestFitSlope = (sample) => {
    const { slope } = linearRegression(sample, 2);
    return slope;
  }

  const getBestFitIntercept = (sample) => {
    const { intercept } = linearRegression(sample, 2);
    return intercept;
  }

  return (
    <Collapsable>
      <Container>
        <Row>
          <Col lg={{ span: 12, offset: 0 }} xl={{ span: 8, offset: 2 }}>
            <PopulationPlot
              data={data}
              selected={selected}
              assumption={assumption}
              showViolation={showViolation}
              setShowViolation={setShowViolation}
            />
          </Col>
        </Row>
        <br/>
        <Row md={1} lg={2}>
          <Col>
            <SampleInput
              maxSize={data.length}
              addSample={addSample}
              samples={samples}
              selected={selected}
              setSelected={setSelected}
              showMessage={showMessage}
            />
          </Col>
          <Col>
            <SamplePlot sample={selected} showViolation={showViolation}/>
          </Col>
        </Row>
        <br/>
        <Row>
          <SimulateSamples
            mathTitle={
              <p>
                Population vs Sample Slope
                <br/>
                {OLS_ASSUMPTIONS_OPTIONS[assumption]}
                <br/>
                <InlineMath math="\hat{\beta_1}\ vs\ \beta_1"/>
              </p>
            }
            popArray={data}
            popValSeriesName={`Population Slope ($${getBestFitSlope(data).toFixed(2)})`}
            sampleSeriesName="Estimated Slope"
            yLabel="Slope"
            sampleFn={samplingFunction}
            yFn={getBestFitSlope}
          />
        </Row>
        <br/>
        <Row>
          <SimulateSamples
            mathTitle={
              <p>
                Population vs Sample Intercept
                <br/>
                {OLS_ASSUMPTIONS_OPTIONS[assumption]}
                <br/>
                <InlineMath math="\hat{\beta_0}\ vs\ \beta_0"/>
              </p>
            }
            popArray={data}
            popValSeriesName={`Population Intercept ($${getBestFitIntercept(data).toFixed(2)})`}
            sampleSeriesName="Estimated Intercept"
            yLabel="Intercept"
            sampleFn={samplingFunction}
            yFn={getBestFitIntercept}
          />
        </Row>
      </Container>
    </Collapsable>
  );
}

OLSEstimatorsAreConsistent.propTypes = {
  assumption: olsAssumptionType.isRequired
}
