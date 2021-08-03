import { useState } from 'react';
import Collapsable from '../Collapsable.js';
import _ from 'lodash';
import { Col, Container, Row } from 'react-bootstrap';
import regression from 'regression';
import { generateBinary } from '../../lib/stats-utils.js';
import PopulationPlot from './PopulationPlot.js';
import SampleInput from './SampleInput.js';
import SamplePlot from './SamplePlot.js';

export default function OLSEstimatorsAreConsistent() {
  const [data] = useState(generateBinary(1000, 195, 211, 30, 30));
  const [samples, setSamples] = useState([]);
  const [selected, setSelected] = useState();

  const addSample = (size) => {
    let sample;
    do {
      sample = _.sampleSize(data, size);
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
      </Container>
    </Collapsable>
  );
}
