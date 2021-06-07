import React, { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import CoefficientInput from "./CoefficientInput.js";
import CovarianceInput from "./CovarianceInput.js";
import MultivariateNormal from "multivariate-normal";
import { round, transpose, matrix, multiply, inv } from "mathjs";
import regression from "regression";
import { useEffect } from "react/cjs/react.development";
import OmittedVariableChart from "./OmittedVariableChart.js";
import PD from "probability-distributions";
import _ from "lodash";

const meanVector = [5, 2];
const stdX = 3;
const stdY = 6;
const OBS = 1000;
const INT = 40;


export default function OVBSimulation() {
  const [beta, setBeta] = useState(3);
  const [delta, setDelta] = useState(3);
  const [correlation, setCorrelation] = useState(0);
  const [covariance, setCovariance] = useState(0);
  const [stage, setStage] = useState(1);
  const [series, setSeries] = useState([]);
  const [showCorrect, setShowCorrect] = useState(false);
  const [allData, setAllData] = useState({points: [], naiveLine: [], correctedLine: []})

  useEffect(() => {
    if (series.length > 0) {
      generateData();
      setShowCorrect(false);
    }
  }, [series]);

  useEffect(() => {
    if ((allData.points.length > 0) && (allData.naiveLine.length > 0)) {
      setStage(2);
    }
  }, [allData]);

  const generatePoints = (slope, int) => {
    const points = [];

    for(let i=0;i<11;i++){
      points[i] = _.round(int + i * slope, 2);
    }

    return points;
  }

  const generateSeries = () => {
    // covariance between dimensions. This examples makes the first and third
    // dimensions highly correlated, and the second dimension independent.
    const covarianceMatrix = [
      [stdX * stdX, covariance],
      [covariance, stdY * stdY]
    ];

    // lets you sample from distribution
    const distribution = MultivariateNormal(meanVector, covarianceMatrix);
    const seriesArr = []

    // samples 1000
    for (let i = 0; i < OBS; i++){
      const [a, b] = distribution.sample()
      seriesArr.push([_.round(a, 2), _.round(b, 2)]);
    }

    setSeries(seriesArr);
  }

  const generateData = () => {

    // generate epsilon
    const epsilon = PD.rnorm(OBS, 0, 5);

    // matrix data
    const ones = [];
    const colOne = [];
    const colTwo = [];

    // generate test score data
    const scores = [];
    for(let i=0;i<OBS;i++){
      const scorePoint = INT + beta * series[i][0] + delta * series[i][1] + epsilon[i];
      scores.push(round(scorePoint*100)/100);
      ones.push(1);
      colOne.push(series[i][0]);
      colTwo.push(series[i][1]);
    }

    // get series with study hours vs test scores
    const studyScores = [];
    for(let i=0;i<OBS;i++){
      studyScores.push([series[i][0],scores[i]]);
    }

    // regress study hours with test scores
    const naiveReg = regression.linear(studyScores);
    const naiveSlope = (naiveReg.equation[0]);
    const naiveInt = (naiveReg.equation[1]);

    // Corrected regression

    // using matrices
    const X = transpose(matrix([ones,colOne, colTwo]));
    const Y = transpose(matrix([scores]));
    const inverse = inv(multiply(transpose(X),X));
    const bHat = multiply(multiply(inverse,transpose(X)),Y);

    setAllData({
      points: studyScores,
      naiveLine: generatePoints(naiveSlope, naiveInt),
      correctedLine: generatePoints(parseFloat(bHat.get([1,0])),parseFloat(bHat.get([0,0])))
    });
  }

  return (
    <div>
      <Row>
        <p className="Center">Choose Population Parameters:</p>
      </Row>
      <br/>
      <Row>
        <Col style={{margin: "auto"}}>
          <CoefficientInput beta={beta} setBeta={setBeta} delta={delta} setDelta={setDelta}/>
        </Col>
        <Col>
          <CovarianceInput
            correlation={correlation}
            setCorrelation={setCorrelation}
            covariance={covariance}
            setCovariance={setCovariance}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Estimate Regression Using Test Score and Study Hours Data </p>
          <Button color='primary' onClick={() => generateSeries()}>Generate!</Button>
        </Col>
      </Row>
      {
        (stage >= 2) &&
        <div>
          <Row>
            <Col>
              <OmittedVariableChart
                dataPoints={allData.points}
                naiveLine={allData.naiveLine}
                correctedLine={showCorrect ? allData.correctedLine : []}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <p color='primary'>Add Omitted Variable, Density, to Regression</p>
              <Button outline color='primary' onClick={() => setShowCorrect(true)}>Show Corrected Regression Line</Button>
            </Col>
          </Row>
        </div>
      }
    </div>
  );
}
