import React, { useEffect, useState } from "react";
import { Alert, Row, Col } from "reactstrap";
import NewPointsInput from "./NewPointsInput";
import SlopeInterceptInput from "./SlopeInterceptInput";
import LeastSquaresChart from "./LeastSquaresChart.js";
import PlotLine from "./PlotLine.js";

export default function LeastSquares() {
  const [points, setPoints] = useState([]);
  const [linePoints, setLinePoints] = useState([]);
  const [stage, setStage] = useState(1);
  const [squareAreas, setSquareAreas] = useState([]);
  const [slope, setSlope] = useState(1);
  const [intercept, setIntercept] = useState(1);

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
      const linearPts = points.map((point) => {return {x: point.x, y: (point.x * +slope) + +intercept}});
      linearPts.sort((a, b) => a.x - b.x);
      setLinePoints(linearPts);
    }
  }, [stage, slope, intercept, points]);

  const generatePoints = (num) => {
    const newPoints = [];
    for (let i = 0; i < num; i++) {
      const x = Math.random() * 15 + 2;
      const y = Math.random() * 15 + 2;
      newPoints.push({x: x, y: y});
    }
    setPoints(newPoints);
    setStage(2);
  }

  const generateBestLine = () => {
    const xpoints = points.map((p) => p.x);
    const ypoints = points.map((p) => p.y);

    const averageX = xpoints.reduce((a, b) => a + b, 0)/xpoints.length;
    const averageY = ypoints.reduce((a, b) => a + b, 0)/ypoints.length;

    let scovXY = 0;
    for (let i = 0; i < xpoints.length; i++){
      scovXY += (ypoints[i] - averageY)*(xpoints[i] - averageX);
    }
    scovXY = scovXY/xpoints.length;

    let svarX = 0;
    for (let i = 0; i < xpoints.length; i++){
      svarX += (xpoints[i] - averageX)*(xpoints[i] - averageX);
    }
    svarX = svarX/xpoints.length;

    let olsSlope = scovXY/svarX;
    let olsIntercept = averageY - (olsSlope * averageX);

    setSlope(olsSlope.toFixed(1));
    setIntercept(olsIntercept.toFixed(1));
  }

  return (
    <div className="MainContainer">
      <Alert style={{ width: "50%", margin: 'auto' }} color="primary">
        Least Squares
      </Alert>
      <br/>
      <Row>
        <Col>
          <LeastSquaresChart points={points} linePoints={linePoints} setSquareAreas={setSquareAreas}/>
        </Col>
        <Col>
          <NewPointsInput generatePoints={generatePoints}/>
          <br/>
          {(stage === 2) && <p>Guess a Slope and Y-Intercept to fit the points</p>}
          {(stage === 3) && <p>Want to try again? Guess a different slope and y-intercept to reduce the Sum of Squares!</p>}
          {(stage >= 2) &&
            <div>
              <SlopeInterceptInput
                slope={slope}
                setSlope={setSlope}
                intercept={intercept}
                setIntercept={setIntercept}
              />
              <PlotLine stage={stage} setStage={setStage} squareAreas={squareAreas} generateBestLine={generateBestLine}/>
            </div>
          }
        </Col>
      </Row>
    </div>
  )
}
