import { useEffect, useState } from 'react';
import Collapsable from '../Collapsable.js';
import MultivariateNormal from 'multivariate-normal';
import _ from 'lodash';
import PD from 'probability-distributions';
import { Container, Row, Col } from 'react-bootstrap';
import PopulationAndSampleCharts from './PopulationAndSampleCharts.js';
import regression from 'regression';
import SlopeDistributionPlot from './SlopeDistributionPlot.js';
import InterceptDistributionPlot from './InterceptDistributionPlot.js';
import MultipleSamplesInput from './MultipleSamplesInput.js';
import PropTypes from 'prop-types';
import { generateNormal } from '../../lib/stats-utils.js';

export default function SDOLSESimulation({ populationShape }) {
  const [data, setData] = useState([]);
  const [samples, setSamples] = useState([]);
  const [selected, setSelected] = useState();

  useEffect(() => {
    const generateScatter = () => {
      const stdX = 2.5;
      const stdY = 6;
      const covarianceMatrix = [
        [stdX * stdX, -0.5 * stdX * stdY],
        [-0.5 * stdX * stdY, stdY * stdY]
      ];
      const distribution = MultivariateNormal([7, 2], covarianceMatrix);
      return PD.rnorm(1000, 0, 5).map((epsilon) => {
        const [x, y] = distribution.sample();
        const scorePoint = 40 + 3 * x + 2.5 * y + epsilon;
        return ({
          x: _.clamp(_.round(x, 2), 0, 15),
          y: _.clamp(_.round(scorePoint, 2), 0, 100)
        });
      });
    }
    const generateBinary = () => {
      const control = generateNormal(1000, 195, 30, 2).map((num) => ({ x: 0, y: num, category: 'Control' }));
      const jobCorps = generateNormal(1000, 211, 30, 2).map((num) => ({ x: 1, y: num, category: 'Job Corps' }));
      return [...control, ...jobCorps];
    }
    if (populationShape === 'Scatter') {
      setData(generateScatter())
    } else if (populationShape === 'Binary') {
      setData(generateBinary())
    }
    setSamples([]);
    setSelected();
  }, [populationShape]);

  const addSamples = (size, replications = 1, clear = false) => {
    const newSamples = [];
    for (let i = 0; i < replications; i++) {
      const sample = _.sampleSize(data, size);
      if ((populationShape === 'Binary') && (_.uniq(sample.map(({ x }) => x)).length === 1)) {
        i -= 1;
        continue;
      }
      const { equation } = regression.linear(sample.map(({ x, y }) => [x, y]), { precision: 1 });
      const sampleObject = {
        data: sample,
        size,
        slope: equation[0],
        intercept: equation[1],
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
            <MultipleSamplesInput populationSize={data.length} addSamples={addSamples}/>
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

SDOLSESimulation.propTypes = {
  populationShape: PropTypes.oneOf(['Scatter', 'Binary']).isRequired
}
