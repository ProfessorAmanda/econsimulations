import { useEffect, useState } from 'react';
import Collapsable from '../Collapsable.js';
import _ from 'lodash';
import { Col, Container, Row } from 'react-bootstrap';
import regression from 'regression';
import { generateBinary } from '../../lib/stats-utils.js';
import PopulationPlot from './PopulationPlot.js';
import SampleInput from './SampleInput.js';
import SamplePlot from './SamplePlot.js';
import SimulateSamples from '../SimulateSamples.js';
import { InlineMath } from 'react-katex';
import PropTypes from 'prop-types';
import { OLS_ASSUMPTIONS_OPTIONS } from '../../lib/constants.js';
import randomNormal from 'random-normal';
import { median } from 'mathjs';

export default function OLSEstimatorsAreConsistent({ assumption }) {
  const [data] = useState(generateBinary(1000, 195, 211, 30, 30));
  const [samples, setSamples] = useState([]);
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSamples([]);
    setSelected();
  }, [assumption]);

  const samplingFunction = (population, size) => {
    if (assumption === 'OLS Assumptions Hold') {

      return _.sampleSize(population, size);

    } else if (assumption === 'Non-Random Sample') {

      const medianValue = median(population.map(({ y }) => y));
      const belowMedian = population.filter(({ y }) => y < medianValue);
      const aboveMedian = population.filter(({ y }) => y >= medianValue);

      const belowMedianSample = _.sampleSize(belowMedian, size);
      const aboveMedianSample = _.sampleSize(aboveMedian, size - belowMedian.length);
      return [...belowMedianSample, ...aboveMedianSample];

    } else if (assumption === 'Large Outliers') {

      const sample = _.sampleSize(population, size);
      const sampleJobCorps = sample.filter(({ category }) => category === 'Job Corps');
      const randomIndices = _.sampleSize(_.range(0, sampleJobCorps.length), _.round(sampleJobCorps.length * 0.2));
      const alteredJobCorps = sampleJobCorps.map((obj, idx) => (
        {
          ...obj,
          y: (randomIndices.includes(idx) ? obj.y * 2 : obj.y),
          originalY: obj.y,
          altered: randomIndices.includes(idx)
        }
      ));
      const remainingSample = sample.filter(({ id }) => !alteredJobCorps.some((obj) => obj.id === id));
      return [...remainingSample, ...alteredJobCorps];

    } else if (assumption.props && assumption.props.math === 'E(u|x)\\neq 0') {

      const sample = _.sampleSize(population, size);
      const sampleControl = sample.filter(({ category }) => category === 'Control');
      const protocolBreakers = _.sampleSize(sampleControl, _.round(size * 0.2)).map((obj) => (
        {
          ...obj,
          y: obj.y + randomNormal({mean: 16, dev: 5}),
          originalY: obj.y,
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
    } while (_.uniq(sample.map(({ category }) => category)).length === 1);

    const { equation: violation } = regression.linear(sample.map(({ x, y }) => [x, y]), { precision: 1 });
    const { equation: original } = regression.linear(
      sample.map(({ x, y, originalY, altered }) => [x, (altered ? originalY : y)]), { precision: 1 }
    );
    const sampleObject = {
      data: sample,
      size: sample.length,
      slope: violation[0],
      intercept: violation[1],
      originalSlope: original[0],
      originalIntercept: original[1]
    }
    const newSamples = [...samples, sampleObject].map((obj, index) => ({ ...obj, id: index }));
    setSelected(newSamples[newSamples.length - 1]);
    setSamples(newSamples);
  }

  const getBestFitSlope = (sample) => {
    const { equation } = regression.linear(sample.map(({ x, y }) => [x, y]), { precision: 1 });
    return equation[0];
  }

  const getBestFitIntercept = (sample) => {
    const { equation } = regression.linear(sample.map(({ x, y }) => [x, y]), { precision: 1 });
    return equation[1];
  }

  return (
    <Collapsable>
      <Container>
        <Row>
          <Col lg={{ span: 12, offset: 0 }} xl={{ span: 8, offset: 2 }}>
            <PopulationPlot data={data} selected={selected} assumption={assumption}/>
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
            />
          </Col>
          <Col>
            <SamplePlot sample={selected} assumption={assumption}/>
          </Col>
        </Row>
        <br/>
        <Row>
          <SimulateSamples
            mathTitle={<p>Population vs Sample Slope ({assumption})<br /><InlineMath math="\hat{\beta_1}\ vs\ \beta_1"/></p>}
            popArray={data}
            popValSeriesName={`Population Slope (${getBestFitSlope(data)})`}
            sampleSeriesName="Estimated Slope"
            yLabel="Slope"
            sampleFn={samplingFunction}
            yFn={getBestFitSlope}
          />
        </Row>
        <br/>
        <Row>
          <SimulateSamples
            mathTitle={<p>Population vs Sample Intercept ({assumption})<br /><InlineMath math="\hat{\beta_0}\ vs\ \beta_0"/></p>}
            popArray={data}
            popValSeriesName={`Population Intercept (${getBestFitIntercept(data)})`}
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
  assumption: PropTypes.oneOf(OLS_ASSUMPTIONS_OPTIONS).isRequired
}
