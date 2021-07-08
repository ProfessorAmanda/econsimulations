import { useState, useEffect } from 'react';
import { Row, Col, Button, InputGroup, InputGroupText } from 'reactstrap';
import CoefficientInput from './CoefficientInput.js';
import MultivariateNormal from 'multivariate-normal';
import { round, transpose, matrix, multiply, inv } from 'mathjs';
import regression from 'regression';
import OmittedVariableChart from './OmittedVariableChart.js';
import PD from 'probability-distributions';
import _ from 'lodash';
import InputSlider from '../InputSlider.js';

export default function OVBSimulation() {
  const [beta, setBeta] = useState(3);
  const [delta, setDelta] = useState(3);
  const [correlation, setCorrelation] = useState(0);
  const [stage, setStage] = useState(1);
  const [series, setSeries] = useState([]);
  const [showCorrect, setShowCorrect] = useState(false);
  const [allData, setAllData] = useState({ points: [], naiveLine: [], correctedLine: [] });

  const stdX = 3;
  const stdY = 6;
  const OBS = 1000;

  useEffect(() => {
    const generatePoints = (slope, int) => {
      const points = [];

      for (let i = 0; i < 11; i++) {
        points[i] = _.round(int + i * slope, 2);
      }

      return points;
    }

    if (series.length > 0) {
      // TODO - simplify this

      // generate epsilon
      const epsilon = PD.rnorm(OBS, 0, 5);

      // matrix data
      const ones = [];
      const colOne = [];
      const colTwo = [];

      // generate test score data
      const scores = [];
      for (let i = 0; i < OBS; i++) {
        const scorePoint = 40 + beta * series[i][0] + delta * series[i][1] + epsilon[i];
        scores.push(round(scorePoint * 100) / 100);
        ones.push(1);
        colOne.push(series[i][0]);
        colTwo.push(series[i][1]);
      }

      // get series with study hours vs test scores
      const studyScores = [];
      for (let i = 0; i < OBS; i++) {
        studyScores.push([series[i][0], scores[i]]);
      }

      // regress study hours with test scores
      const [naiveSlope, naiveInt] = regression.linear(studyScores).equation;

      // Corrected regression

      // using matrices
      const X = transpose(matrix([ones, colOne, colTwo]));
      const Y = transpose(matrix([scores]));
      const inverse = inv(multiply(transpose(X), X));
      const bHat = multiply(multiply(inverse, transpose(X)), Y);

      setAllData({
        points: studyScores.map(([x, y]) => ({ x, y })),
        naiveLine: generatePoints(naiveSlope, naiveInt),
        correctedLine: generatePoints(parseFloat(bHat.get([1, 0])), parseFloat(bHat.get([0, 0])))
      });
      setShowCorrect(false);
    }
  }, [series]);  // eslint-disable-line

  useEffect(() => {
    if ((allData.points.length > 0) && (allData.naiveLine.length > 0)) {
      setStage(2);
    }
  }, [allData]);

  const generateSeries = () => {
    // covariance between dimensions. This examples makes the first and third
    // dimensions highly correlated, and the second dimension independent.
    const covarianceMatrix = [
      [stdX * stdX, correlation * stdX * stdY],
      [correlation * stdX * stdY, stdY * stdY]
    ];

    // lets you sample from distribution
    const distribution = MultivariateNormal([5, 2], covarianceMatrix);
    const seriesArr = []

    // samples 1000
    for (let i = 0; i < OBS; i++) {
      const [a, b] = distribution.sample()
      seriesArr.push([_.round(a, 2), _.round(b, 2)]);
    }

    setSeries(seriesArr);
  }

  return (
    <div>
      <Row>
        <p>Choose Population Parameters:</p>
      </Row>
      <br/>
      <Row lg={2} sm={1}>
        <Col style={{ margin: 'auto', padding: 10 }}>
          <CoefficientInput beta={beta} setBeta={setBeta} delta={delta} setDelta={setDelta}/>
        </Col>
        <Col>
          <div style={{ padding: 10 }}>Set the Correlation between Study Hours and Sleep Hours:</div>
          <InputSlider value={correlation} min={-0.99} max={0.99} step={0.01} onChange={(value) => setCorrelation(value)}/>
          <br/>
          <InputGroup style={{ width: 'fit-content', margin: 'auto' }}>
            <InputGroupText>Covariance between Study Hours and Sleep Hours:</InputGroupText>
            <InputGroupText aria-label="covariance">{(correlation * stdX * stdY).toFixed(2)}</InputGroupText>
          </InputGroup>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col>
          <p>Estimate Regression Using Test Score and Study Hours Data </p>
          <Button color="primary" onClick={() => generateSeries()}>Generate!</Button>
        </Col>
      </Row>
      <br/>
      {(stage >= 2) && (
        <div>
          <Row>
            <Col lg={{ size: 12, offset: 0 }} xl={{ size: 8, offset: 2 }}>
              <OmittedVariableChart
                dataPoints={allData.points}
                naiveLine={allData.naiveLine}
                correctedLine={showCorrect ? allData.correctedLine : []}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <p color="primary">Add Omitted Variable, Density, to Regression</p>
              <Button
                outline
                color="primary"
                onClick={() => setShowCorrect(!showCorrect)}
                active={showCorrect}
              >
                Show Corrected Regression Line
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
