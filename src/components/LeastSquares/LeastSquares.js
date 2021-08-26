import { useCallback, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import NewPointsInput from './NewPointsInput';
import LeastSquaresChart from './LeastSquaresChart.js';
import PlotLine from './PlotLine.js';
import InputSlider from '../InputSlider.js';
import { random } from 'mathjs';
import { linearRegression } from '../../lib/stats-utils';

export default function LeastSquares() {
  const [points, setPoints] = useState([]);
  const [linePoints, setLinePoints] = useState([]);
  const [stage, setStage] = useState(1);
  const [squareAreas, setSquareAreas] = useState([]);
  const [slope, setSlope] = useState(1);
  const [intercept, setIntercept] = useState(1);

  const addPoint = useCallback((point) => {
    setPoints([...points, point]);
  }, [points])

  useEffect(() => {
    if (stage === 2) {
      setLinePoints([]);
      setSquareAreas([]);
      setSlope(1);
      setIntercept(1);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 3) {
      setSquareAreas([]);
      const linearPts = [{ x: 0, y: 0 }, ...points].map((point) => ({ x: point.x, y: (point.x * +slope) + +intercept }));
      linearPts.sort((a, b) => a.x - b.x);
      setLinePoints(linearPts);
    }
  }, [stage, slope, intercept, points]);

  const generatePoints = (num) => {
    const newPoints = [];
    for (let i = 0; i < num; i++) {
      const x = random(2, 17);
      const y = random(2, 17);
      newPoints.push({ x: +x, y: +y });
    }
    setPoints(newPoints);
    setStage(2);
  }

  const generateBestLine = () => {
    const { slope: newSlope, intercept: newIntercept } = linearRegression(points, 1);
    setSlope(newSlope);
    setIntercept(newIntercept);
  }

  return (
    <Row className="least-squares-container">
      <Col xs="auto">
        <LeastSquaresChart points={points} addPoint={addPoint} linePoints={linePoints} setSquareAreas={setSquareAreas}/>
      </Col>
      <Col xs={{ span: 3, offset: 3 }} md={{ span: 3, offset: 0 }} style={{ paddingTop: '100px' }}>
        <NewPointsInput generatePoints={generatePoints}/>
        <br/>
        {(points.length > 0) && (
          <>
            {(stage === 2) && <p>Guess a Slope and Y-Intercept to fit the points</p>}
            {(stage === 3) && <p>Want to try again? Guess a different slope and y-intercept to reduce the Sum of Squares!</p>}
            {(stage >= 2) && (
              <div>
                <h4>Intercept</h4>
                <InputSlider value={intercept} min={-20} max={20} step={0.1} onChange={(value) => setIntercept(value)}/>
                <br/>
                <h4>Slope</h4>
                <InputSlider value={slope} min={-10} max={10} step={0.1} onChange={(value) => setSlope(value)}/>
                <br/>
                <PlotLine stage={stage} setStage={setStage} squareAreas={squareAreas} generateBestLine={generateBestLine}/>
              </div>
            )}
          </>
        )}
      </Col>
    </Row>
  )
}
