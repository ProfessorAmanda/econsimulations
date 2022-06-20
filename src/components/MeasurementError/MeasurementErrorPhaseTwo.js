import { useEffect, useState } from 'react';
import { linearRegression } from '../../lib/stats-utils';
import _ from 'lodash';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import ScatterPlot from '../ScatterPlot';
import SelectorButtonGroup from '../SelectorButtonGroup';


export default function MeasurementErrorPhaseTwo() {
  const sampleSize = 100;
  const dataSize = 1000;

  const [iterationCnt, setIterationCnt] = useState(0);
  const [errorDirection, setErrorDirection] = useState('');

  const [origDataPoints, setOrigDataPoints] = useState([]);
  const [errorDataPoints, setErrorDataPoints] = useState([]);

  const [currSample, setCurrSample] = useState([]);
  const [allSampleRegressions, setAllSampleRegressions] = useState([]);

  const [alert, setAlert] = useState('');


  const generatePointsWithError = (origPoints) => {
    const [xMin, xMax] = errorDirection === 'X' ? [6, 10] : [0, 0];
    const [yMin, yMax] = errorDirection === 'Y' ? [6, 10] : [0, 0];
    const newDataPoints = origPoints.map((point) => {
      const x = point.x + (Math.random() * (xMax - xMin) + xMin) * (Math.random() > 0.5 ? 1 : -1);
      const y = point.y + (Math.random() * (yMax - yMin) + yMin) * (Math.random() > 0.5 ? 1 : -1);
      return { x, y, id: point.id };
    });
    return newDataPoints;
  }

  const regressionToPoints = ({ slope, intercept }) => _.range(2).map((i) => {
    return {
      x: i * 50,
      y: _.round(intercept + i * 50 * slope, 2),
      id: i
    };
  });

  const checkInput = () => {
    if (iterationCnt < 1 || iterationCnt > 100) {
      setAlert('Number of iterations must be between 1 and 100');
      return false;
    }
    if (errorDirection === '') {
      setAlert('Error direction must be selected');
      return false;
    }
    setAlert('');
    return true;
  }

  const onConfirm = () => {
    if (checkInput() === true) {
      const newDataPoints = [];

      // Generate error points with some randomness:
      // First plot points along f(x)=x or f(x)=-x+50
      // Then add randomeness to both x and y directions
      const origSlope = Math.random() > 0.5 ? 1 : -1;
      _.range(0, dataSize).forEach((i) => {
        const x = (i / dataSize) * 50 + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 10; // range: 0 to 50
        const y = (i / dataSize) * 50 * origSlope + (origSlope === 1 ? 0 : 50) + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 10; // range: 0 to 50
        newDataPoints.push({ x, y, id: i + 1 });
      });

      setOrigDataPoints(newDataPoints);
      setErrorDataPoints(generatePointsWithError(newDataPoints));
    }

  }

  useEffect(() => {
    const acumSampleRegressions = [];
    _.range(iterationCnt).forEach((i) => {
      const samples = _.sampleSize(errorDataPoints, sampleSize);
      const regressionPoints = regressionToPoints(linearRegression(samples));
      setCurrSample(samples);
      acumSampleRegressions.push({ data: regressionPoints, id: i });
    });
    setAllSampleRegressions(acumSampleRegressions);
  }, [errorDataPoints]);


  const sampleSeries = [
    {
      name: 'Curr Error Points',
      type: 'scatter',
      data: currSample,
      color: 'orange',
      marker: {
        lineWidth: 1,
        lineColor: 'orange'
      }
    },
    {
      name: 'Orig data regression',
      type: 'line',
      data: regressionToPoints(linearRegression(origDataPoints)),
      label: false,
      marker: false,
      enableMouseTracking: false,
      color: 'green',
    },
    // add a new series for each 'grayed-out' line
    // couldn't figure out how to add multiple lines to one series, so this makes it slower with more replications
    ...allSampleRegressions.map(({ data, id }) => ({
      name: `Sample ${id}`,
      type: 'line',
      data,
      color: '#dddddd',
      animation: false,
      label: false,
      marker: false,
      showInLegend: false,
      enableMouseTracking: false,
      zIndex: -5,
      states: {
        hover: {
          enabled: false
        },
        inactive: {
          enabled: false
        }
      }
    }))
  ];

  return (
    <div style={{ marginTop: 100 }}>


      <Row>
        <Col lg={{ span: 4, offset: 0 }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%'
          }}>
            <span >Number of Iterations:</span>
            <Form.Control
              style={{ width: 100, marginLeft: 20 }}
              type="number"
              placeholder="Number of Iterations:"
              min={1}
              max={100}
              value={iterationCnt}
              onChange={(event) => setIterationCnt(event.target.value)}
            />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 20,
            width: '100%'
          }}>
            <span >Error direction:</span>
            <div style={{ width: 100, marginLeft: 20 }}><SelectorButtonGroup style={{ flex: 1 }} options={['X', 'Y']} select={setErrorDirection} selected={errorDirection} /></div>
          </div>
          <Button style={{ marginTop: 30 }} variant="outline-primary" onClick={onConfirm}>
            Generate Data
          </Button>
          {alert==='' ? null : <Alert variant="danger" style={{ marginTop: 10 }}>{alert}</Alert>}
        </Col>
        <Col lg={{ span: 6, offset: 1 }}>
          <ScatterPlot
            series={sampleSeries}
            xMin={0}
            xMax={50}
            yMin={0}
            yMax={50}
            xLabel={'X label'}
            yLabel={'Y label'}
          />
        </Col>
      </Row>
    </div>
  );
}
