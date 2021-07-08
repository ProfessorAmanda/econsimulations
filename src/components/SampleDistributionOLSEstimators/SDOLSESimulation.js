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

export default function SDOLSESimulation() {
  const [data, setData] = useState([]);
  const [samples, setSamples] = useState([]);
  const [selected, setSelected] = useState();

  useEffect(() => {
    const stdX = 3;
    const stdY = 6;
    const covarianceMatrix = [
      [stdX * stdX, -0.5 * stdX * stdY],
      [-0.5 * stdX * stdY, stdY * stdY]
    ];
    const distribution = MultivariateNormal([8, 2], covarianceMatrix);
    const epsilon = PD.rnorm(1000, 0, 5);
    const series = [];
    for (let i = 0; i < 1000; i++) {
      const [x, y] = distribution.sample();
      const scorePoint = 40 + 3 * x + 2.5 * y + epsilon[i];
      series.push({
        x: _.clamp(_.round(x, 2), 0, 15),
        y: _.clamp(_.round(scorePoint, 2), 0, 100)
      });
    }
    setData(series);
  }, []);

  const addSamples = (size, replications = 1, clear = false) => {
    const newSamples = [];
    for (let i = 0; i < replications; i++) {
      const sample = _.sampleSize(data, size);
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
        />
        <br/>
        <MultipleSamplesInput populationSize={data.length} addSamples={addSamples}/>
        <Row>
          <Col>
            <SlopeDistributionPlot samples={samples}/>
          </Col>
          <Col>
            <InterceptDistributionPlot samples={samples}/>
          </Col>
        </Row>
      </Container>
    </Collapsable>
  );
}
