import { useEffect, useState } from 'react';
import Collapsable from '@/components/Collapsable';
import _ from 'lodash';
import { Container, Row, Col } from 'react-bootstrap';
import PopulationAndSampleCharts from './PopulationAndSampleCharts';
import SlopeDistributionPlot from './SlopeDistributionPlot';
import InterceptDistributionPlot from './InterceptDistributionPlot';
import MultipleSamplesInput from './MultipleSamplesInput';
import PropTypes from 'prop-types';
import { generateScatter, linearRegression } from '@/lib/stats-utils';
import { fetchCSV } from '@/lib/data-utils';

export default function SampleDistributionOLSEstimators({ regressorType }) {
  const [data, setData] = useState([]);
  const [samples, setSamples] = useState([]);
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (regressorType === 'Continuous') {
      setData(generateScatter(1000, 7, 2, 2.5, 6, -0.5))
    } else if (regressorType === 'Binary') {
      // use a pre-generated dataset
      const parseData = (results) => {
        setData(results.map(([x, y, category], id) => ({ x: +x, y: +y, category, id: id + 1 })));
      }
      fetchCSV('/public/data/Job_Corps_data.csv', parseData);
    }
    setSamples([]);
    setSelected();
  }, [regressorType]);

  const addSamples = (size, replications, clear) => {
    const newSamples = [];
    for (let i = 0; i < replications; i++) {
      const sample = _.sampleSize(data, size);

      // ensure that the sample data is spread between both x-categories
      if ((regressorType === 'Binary') && (_.uniq(sample.map(({ x }) => x)).length === 1)) {
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
    const indexedSamples = (clear ? newSamples : [...samples, ...newSamples]).map((obj, index) => ({ ...obj, id: index + 1 }));
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
          regressorType={regressorType}
        />
        <br/>
        <Row>
          <Col xs={{ span: 8, offset: 2 }}>
            <MultipleSamplesInput populationSize={data.length} addSamples={addSamples} minSize={2}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <SlopeDistributionPlot samples={samples} regressorType={regressorType}/>
          </Col>
          <Col>
            <InterceptDistributionPlot samples={samples} regressorType={regressorType}/>
          </Col>
        </Row>
      </Container>
    </Collapsable>
  );
}

SampleDistributionOLSEstimators.propTypes = {
  regressorType: PropTypes.oneOf(['Continuous', 'Binary']).isRequired
}
