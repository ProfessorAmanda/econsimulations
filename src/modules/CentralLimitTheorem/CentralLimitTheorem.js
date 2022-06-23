import { useState, useEffect } from 'react';
import Collapsable from '@/components/Collapsable';
import ChartContainer from '@/components/ChartContainer';
import SampleMeanChart from './SampleMeanChart'
import SampleMeansSimulator from './SampleMeansSimulator'
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { populationMean, dataFromDistribution, populationStandardDev } from '@/lib/stats-utils';
import SampleSizeInput from '@/components/SampleSizeInput';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { popShapeType } from '@/lib/types';
import DataTable from '@/components/DataTable';

export default function CentralLimitTheorem({ popShape, mainSampleSize }) {
  const [sampleMeans, setSampleMeans] = useState([]);
  const [sampled, setSampled] = useState([]);
  const [stage, setStage] = useState(1);
  const [popArray, setPopArray] = useState([]);

  useEffect(() => {
    setStage(1);
    const newPop = dataFromDistribution(popShape, mainSampleSize);
    setPopArray(newPop);
    setSampled([]);
    setSampleMeans([]);
  }, [popShape, mainSampleSize]);

  const addSampleMeans = (means) => {
    if (!means) { // calling addSampleMeans with no arguments clears the data
      setSampleMeans([])
    } else {
      const newSampleMeans = means.map((mean, index) => ({ ...mean, id: index + 1 }));
      setSampleMeans(newSampleMeans);
    }
  }

  const handleClick = (size) => {
    const sample = _.sampleSize(popArray, size);
    setSampled(sample);
    const newMeans = [...sampleMeans, { size, mean: populationMean(sample) }];
    setSampleMeans(newMeans.map((mean, index) => ({ ...mean, id: index + 1 })));
  }

  const popMean = populationMean(popArray) || 0;

  return (
    <Collapsable>
      <div data-testid="clt-sim">
        <ChartContainer popArray={popArray} popMean={popMean} sampled={sampled} popShape={popShape}/>
        <Button variant="success" onClick={() => setStage(2)}>Continue</Button>
        {(stage >= 2) && (
          <div>
            <Row>
              <p style={{ margin: 15 }}>Try drawing some samples and calculating means</p>
              <SampleSizeInput maxSize={popArray.length} minSize={1} handleClick={handleClick} classname="sample-size-input"/>
            </Row>
            <Row>
              <Col lg="8">
                <SampleMeanChart
                  sampleMeans={sampleMeans}
                  popMean={popMean}
                  sd={populationStandardDev(popArray)}
                  popShape={popShape}
                />
              </Col>
              <Col lg="4">
                <DataTable
                  data={sampleMeans}
                  headers={{
                    'Sample': 'id',
                    'Size': 'size',
                    'Mean': 'mean'
                  }}
                />
              </Col>
            </Row>
            <Row>
              <div>
                <br/>
                <Alert variant="primary" style={{ width: '50%', margin: 'auto' }}>
                  Simulate drawing many many samples
                </Alert>
                <br/>
                <SampleMeansSimulator
                  population={popArray}
                  addSamples={addSampleMeans}
                />
              </div>
            </Row>
          </div>
        )}
      </div>
    </Collapsable>
  );
}

CentralLimitTheorem.propTypes = {
  popShape: popShapeType.isRequired,
  mainSampleSize: PropTypes.number.isRequired,
}
