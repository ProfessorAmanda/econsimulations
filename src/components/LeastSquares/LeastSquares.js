import React, { useEffect, useState } from "react";
import { Alert, Row, Col } from "reactstrap";
import NewPointsInput from "./NewPointsInput";
import SlopeInterceptInput from "./SlopeInterceptInput";
import LeastSquaresChart from "./LeastSquaresChart.js";

export default function LeastSquares() {
  const [points, setPoints] = useState([]);
  const [linePoints, setLinePoints] = useState([]);
  const [stage, setStage] = useState(1);

  useEffect(() => {
    if (stage === 2) {
      setLinePoints([]);
    }
  }, [stage]);

  const generatePoints = (num) => {
    const newPoints = [];
    for (let i = 0; i < num; i++) {
      const x = Math.random() * 20;
      const y = Math.random() * 20;
      newPoints.push({x: x, y: y});
    }
    setPoints(newPoints);
    setStage(2);
  }

  const plotLine = (slope, intercept) => {
    const linearPts = points.map((point) => {return {x: point.x, y: (point.x * slope) + intercept}});
    linearPts.sort((a, b) => a.x - b.x);
    setLinePoints(linearPts);
    setStage(3);
  }

  return (
    <div className="MainContainer">
      <Alert style={{ width: "50%", margin: 'auto' }} color="primary">
        Least Squares
      </Alert>
      <br/>
      <Row>
        <Col>
          <LeastSquaresChart points={points} linePoints={linePoints}/>
        </Col>
        <Col>
          <NewPointsInput generatePoints={generatePoints}/>
          <br/>
          {(stage === 2) && <SlopeInterceptInput plotLine={plotLine}/>}

{/*

          {
            this.state.step === 3 &&
            <p>
              Want to try again? Guess a different slope and y-intercept to reduce the Sum of Squares!
            </p>
          }
          {this.state.step === 3 && (
            <div>
            <br/>
              <p>
                Sum of Squares:
                {Math.round(sumSquares * 100) / 100}
              </p>
              <Button
                outline
                color="info"
                onClick={() => {
                  const eq = this.generateTrue();
                  this.setState({ slope: Math.round(eq[0]*100)/100, int: Math.round(eq[1]*100)/100 });
                }}
                >
                {" "}Reveal the Least Squares Line{" "}
              </Button>
            </div>
          )} */}
          </Col>
        </Row>
    </div>
  )
}
