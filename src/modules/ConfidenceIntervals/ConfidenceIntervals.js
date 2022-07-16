import { useState, useEffect, useRef } from 'react';
import Collapsable from '@/components/Collapsable';
import ConfidenceInputs from './ConfidenceInputs';
import SampleSizeInput from '@/components/SampleSizeInput';
import ConfidenceIntervalsChart from './ConfidenceIntervalsChart';
import ManySamplesInput from './ManySamplesInput';
import { dataFromDistribution, populationMean } from '@/lib/stats-utils';
import { Row, Col, Alert } from 'react-bootstrap';
import PopulationChart from './PopulationChart';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import { popShapeType } from '@/lib/types';
import DataTable from '@/components/DataTable';
import { InfinitySpin } from 'react-loader-spinner';

export default function ConfidenceIntervals({ popShape, populationSize }) {
  const [distType, setDistType] = useState('Z'); // can be "Z" or "T"
  const [confLevel, setConfLevel] = useState(95);
  const [popArray, setPopArray] = useState([]);
  const [samples, setSamples] = useState([]);
  const [selected, setSelected] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const workerRef = useRef();

  useEffect(() => {
    workerRef.current = new Worker(new URL('./ConfidenceIntervalsSimulationWorker', import.meta.url));
    workerRef.current.onmessage = (evt) => {
      if (evt.data.type === 'done') {
        const newSamples = samples.concat(evt.data.samples);
        const indexedSamples = newSamples.map((sample, index) => ({ ...sample, id: index + 1 }));
        setSamples(indexedSamples);
        setSelected(indexedSamples[indexedSamples.length - 1]);
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const newPop = dataFromDistribution(popShape, populationSize, { low: 55, hi: 75 });
    setPopArray(newPop);
    setSamples([]);
    setSelected();
  }, [popShape, populationSize]);

  // this is a hack to get around what I believe is a bug in highcharts
  // where a point will sometimes turn gray when selected
  const unselect = () => {
    Highcharts.charts.forEach((chart) => {
      if (chart) {
        chart.series.forEach((series) => {
          series.data.forEach((point) => {
            point.select(false, false)
          })
        })
      }
    });
  }

  const generateSamples = (size, replications = 1) => {
    unselect();
    if (!size) { // calling generateSamples with no arguments clears the data
      setSamples([]);
      setSelected();
    } else {
      setIsLoading(true);
      setTimeout(() => {
        workerRef.current.postMessage({ size, replications, popArray, distType, confLevel });
      }, 600);
    }
  }

  const selectPoint = (point) => {
    setSelected(point);
    unselect();
  }

  return (
    <Collapsable>
      <div>
        <Row>
          <ConfidenceInputs
            distType={distType}
            setDistType={setDistType}
            confLevel={+confLevel}
            setConfLevel={setConfLevel}
          />
        </Row>
        <br />
        <Row md={1} lg={2}>
          <Col>
            <PopulationChart
              popArray={popArray}
              popMean={populationMean(popArray)}
              sampled={selected ? selected.data : []} // most recent sample data
              popShape={popShape}
            />
            <p>Try drawing some samples and calculating means</p>
            <SampleSizeInput maxSize={popArray.length} minSize={1} handleClick={generateSamples} classname="sample-size-input" />
          </Col>
          <Col>
            <ConfidenceIntervalsChart
              confidenceLevel={+confLevel}
              samples={samples}
              popShape={popShape}
              popMean={_.round(populationMean(popArray), 2)}
              selected={selected}
              setSelected={setSelected}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12} xl={5}>
            <ManySamplesInput
              populationSize={popArray.length}
              addSamples={generateSamples}
            />
            {isLoading && <InfinitySpin color="#3e98c7"/>}
          </Col>
          <Col lg={12} xl={7}>
            <DataTable
              data={samples}
              headers={{
                'Sample': 'id',
                'Size': 'size',
                'Mean': 'mean',
                'Lower Bound for CI': 'lowerConf',
                'Upper Bound for CI': 'upperConf',
                'Confidence Level': 'confidenceLevel',
                'Distribution': 'distribution'
              }}
              height={400}
              setSelected={selectPoint}
              setRowColor={(object) => object.label ? 'rgba(23, 161, 80, 0.233)' : 'rgba(161, 23, 23, 0.233)'}
            />
          </Col>
        </Row>
        <br />
        <Row>
          {(samples.length > 0) && (
            <Alert variant="info">
              {samples.filter(({ label }) => !label).length} intervals did not contain the population mean.
              <br />
              {samples.filter(({ label }) => label).length} did ({_.round(100 * samples.filter(({ label }) => label).length / samples.length, 2)}%).
            </Alert>
          )}
        </Row>
      </div>
    </Collapsable>
  );
}

ConfidenceIntervals.propTypes = {
  popShape: popShapeType.isRequired,
  populationSize: PropTypes.number.isRequired,
}
