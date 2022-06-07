import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import MeasurementErrorChart from './MeasurementErrorChart';
import MeasurementErrorInput from './MeasurementErrorInput';


export default function MeasurementError() {
  const [sampleSize, setSampleSize] = useState(5);
  const [xErrorRange, setXErrorRange] = useState(0);
  const [yErrorRange, setYErrorRange] = useState(0);

  const origDataPoints = [];
  const errorDataPoints = [];
  const origRegressionLine = [];
  const errorRegressionLine = [];

  return (
    <div>
      <Row>
        <Col lg={{ span: 12, offset: 0 }} xl={{ span: 8, offset: 0 }}>
          <MeasurementErrorChart
            origDataPoints={origDataPoints}
            errorDataPoints={errorDataPoints}
            origRegressionLine={origRegressionLine}
            errorRegressionLine={errorRegressionLine}
          />
        </Col>
        <Col lg={{ span: 12, offset: 0 }} xl={{ span: 4, offset: 0 }}>
          <div style={{ marginTop: 100 }}>
            <MeasurementErrorInput 
              sampleSize={sampleSize}
              setSampleSize={setSampleSize}
              xErrorRange={xErrorRange}
              setXErrorRange={setXErrorRange}
              yErrorRange={yErrorRange}
              setYErrorRange={setYErrorRange}
            />
          </div>
        </Col>

      </Row>


    </div>
  );
}
