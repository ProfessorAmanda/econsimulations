import { useEffect, useState } from 'react';
import Collapsable from '../Collapsable.js';
import _ from 'lodash';
import { Container, Row, Col } from 'react-bootstrap';
import PopulationAndSampleCharts from './PopulationAndSampleCharts.js';
import SlopeDistributionPlot from './SlopeDistributionPlot.js';
import InterceptDistributionPlot from './InterceptDistributionPlot.js';
import MultipleSamplesInput from './MultipleSamplesInput.js';
import PropTypes from 'prop-types';
import { generateBinary, generateScatter, linearRegression } from '../../lib/stats-utils.js';

export default function SampleDistributionOLSEstimators({ populationShape }) {
  const [data, setData] = useState([]);
  const [samples, setSamples] = useState([]);
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (populationShape === 'Continuous') {
      setData(generateScatter(1000, 7, 2, 2.5, 6, -0.5))
    } else if (populationShape === 'Binary') {
      setData(generateBinary(1000, 195, 211, 30, 30))
    }
    setSamples([]);
    setSelected();
  }, [populationShape]);

  const addSamples = (size, replications, clear) => {
    const newSamples = [];
    for (let i = 0; i < replications; i++) {
      const sample = _.sampleSize(data, size);

      // ensure that the sample data is spread between both x-categories
      if ((populationShape === 'Binary') && (_.uniq(sample.map(({ x }) => x)).length === 1)) {
        i -= 1;
        continue;
      }

      const { slope, intercept } = linearRegression(sample, 1);
      const sampleObject = {
        data: sample,
        size,
        slope,
        intercept,
      }
      newSamples.push(sampleObject);
    }
    const indexedSamples = (clear ? newSamples : [...samples, ...newSamples]).map((obj, index) => ({ ...obj, id: index }));
    setSelected(indexedSamples[indexedSamples.length - 1]);
    setSamples(indexedSamples);
  }

  return (
    <Collapsable>
      <Container>
        <PopulationAndSampleCharts
          data={data}
          addSamples={addSamples}
          selected={selected}
          samples={samples}
          selectSample={setSelected}
          populationShape={populationShape}
        />
        <br/>
        <Row>
          <Col xs={{ span: 8, offset: 2 }}>
            <MultipleSamplesInput populationSize={data.length} addSamples={addSamples} minSize={2}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <SlopeDistributionPlot samples={samples} populationShape={populationShape}/>
          </Col>
          <Col>
            <InterceptDistributionPlot samples={samples} populationShape={populationShape}/>
          </Col>
        </Row>
      </Container>
    </Collapsable>
  );
}

SampleDistributionOLSEstimators.propTypes = {
  populationShape: PropTypes.oneOf(['Continuous', 'Binary']).isRequired
}
