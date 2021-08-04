import { useState } from 'react';
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

export default function OLSEstimatorsAreConsistent({ assumption }) {
  const [data] = useState(generateBinary(1000, 195, 211, 30, 30));
  const [samples, setSamples] = useState([]);
  const [selected, setSelected] = useState();

  const samplingFunction = (population, size) => {
    if (assumption === 'Normal') {
      return _.sampleSize(population, size);
    } else if (assumption === 'Non-Random Sample') {
      const jobCorps = population.filter(({ x }) => x);
      const jobCorpsSample = _.sampleSize(jobCorps, _.ceil(size * 0.2));
      const remainingData = population.filter(({ id }) => !jobCorpsSample.some((obj) => obj.id === id));
      return [..._.sampleSize(remainingData, _.floor(size * 0.8)), ...jobCorpsSample];
    } else if (assumption === 'Human Error') {
      const sample = _.sampleSize(population, size);
      const randomIndices = _.sampleSize(_.range(0, size), size * 0.2);
      const alteredSample = sample.map((obj, idx) => ({ ...obj, y: (randomIndices.includes(idx) ? obj.y * 10 : obj.y)}));
      return alteredSample;
    }
  }

  const addSample = (size) => {
    let sample;
    do {
      sample = samplingFunction(data, size);
    } while (_.uniq(sample.map(({ x }) => x)).length === 1);

    const { equation } = regression.linear(sample.map(({ x, y }) => [x, y]), { precision: 1 });
    const sampleObject = {
      data: sample,
      size,
      slope: equation[0],
      intercept: equation[1],
    }
    const newSamples = [...samples, sampleObject].map((obj, index) => ({ ...obj, id: index }));
    setSelected(newSamples[newSamples.length - 1]);
    setSamples(newSamples);
  }

  const getBestFitSlope = (sample) => {
    const { equation } = regression.linear(sample.map(({ x, y }) => [x, y]), { precision: 1 });
    return equation[0];
  }

  return (
    <Collapsable>
      <Container>
        <Row>
          <Col lg={{ span: 12, offset: 0 }} xl={{ span: 8, offset: 2 }}>
            <PopulationPlot data={data} selected={selected}/>
          </Col>
        </Row>
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
            <SamplePlot sample={selected}/>
          </Col>
        </Row>
        <Row>
          <SimulateSamples
            mathTitle={<p>Population vs Sample Slope <br /><InlineMath math="\hat{\beta_1}\ vs\ \beta_1"/></p>}
            popArray={data}
            popValSeriesName={`Population Slope (${getBestFitSlope(data)})`}
            sampleSeriesName="Estimated Slope"
            yLabel="Slope"
            sampleFn={samplingFunction}
            yFn={getBestFitSlope}
          />
        </Row>
      </Container>
    </Collapsable>
  );
}

OLSEstimatorsAreConsistent.propTypes = {
  assumption: PropTypes.oneOf(['Normal', 'Non-Random Sample', 'Human Error']).isRequired
}
