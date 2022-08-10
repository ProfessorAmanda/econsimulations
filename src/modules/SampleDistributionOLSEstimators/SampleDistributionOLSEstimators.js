import { useEffect, useState, useRef } from 'react';
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
import { CircularProgressbar } from 'react-circular-progressbar';

export default function SampleDistributionOLSEstimators({ regressorType }) {
  const [data, setData] = useState([]);
  const [samples, setSamples] = useState([]);
  const [selected, setSelected] = useState();

  const [shouldShowProgress, setShouldShowProgress] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  const workerRef = useRef();

  useEffect(() => {
    workerRef.current = new Worker(new URL('./SampleDistributionOLSEstimatorsWorker', import.meta.url))
    workerRef.current.onmessage = (evt) => {
      if (evt.data.type === 'progress') {
        setProgressPercent(evt.data.percentComplete);
      } else if (evt.data.type === 'done') {
        setSelected(evt.data.selected);
        setSamples(evt.data.samples);
        setProgressPercent(100);
      }
    }
  }, [])

  const onRunClick = async (size, replications, clear) => {
    setProgressPercent(0);
    setShouldShowProgress(true);
    setTimeout(() => {
      workerRef.current.postMessage({ size, replications, clear, data, regressorType, samples });
    }, 600);
  }

  useEffect(() => {
    if (regressorType === 'Continuous') {
      setData(generateScatter(1000, 7, 2, 2.5, 6, -0.5))
    } else if (regressorType === 'Binary') {
      // use a pre-generated dataset
      const parseData = (results) => {
        setData(results.map(([x, y, category], id) => ({ x: +x, y: +y, category, id: id + 1 })));
      }
      fetchCSV('/data/Job_Corps_data.csv', parseData);
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
        <br />
        <Row>
          <Col xs={{ span: 8, offset: 2 }}>
            <MultipleSamplesInput populationSize={data.length} addSamples={onRunClick} minSize={2} />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <div style={{ height: '100px', width: '100px' }}>
                {shouldShowProgress && (
                  <CircularProgressbar value={progressPercent} text={`${progressPercent}%`} />
                )}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <SlopeDistributionPlot samples={samples} regressorType={regressorType} />
          </Col>
          <Col>
            <InterceptDistributionPlot samples={samples} regressorType={regressorType} />
          </Col>
        </Row>
      </Container>
    </Collapsable>
  );
}

SampleDistributionOLSEstimators.propTypes = {
  regressorType: PropTypes.oneOf(['Continuous', 'Binary']).isRequired
}
