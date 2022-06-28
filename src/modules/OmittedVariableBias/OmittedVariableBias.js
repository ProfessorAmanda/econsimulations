import { useState, useEffect } from 'react';
import { Row, Col, Button, Alert, Badge } from 'react-bootstrap';
import CoefficientInput from './CoefficientInput';
import MultivariateNormal from 'multivariate-normal';
import { round, transpose, matrix, multiply, inv } from 'mathjs';
import OmittedVariableChart from './OmittedVariableChart';
import PD from 'probability-distributions';
import _ from 'lodash';
import InputSlider from '@/components/InputSlider';
import { linearRegression } from '@/lib/stats-utils';
import TeX from '@matejmazur/react-katex';

export default function OmittedVariableBias() {
  const [beta, setBeta] = useState(3);
  const [delta, setDelta] = useState(3);
  const [correlation, setCorrelation] = useState(0);
  const [stage, setStage] = useState(1);
  const [series, setSeries] = useState([]);
  const [showCorrect, setShowCorrect] = useState(false);
  const [allData, setAllData] = useState({ points: [], naiveLine: [], correctedLine: [] });

  const [naiveLine, setNaiveLine] = useState([0, 0]); // [beta0, slope]
  const [correctedLine, setCorrectedLine] = useState([0, 0, 0]); // [beta0, beta1, delta]

  const stdX = 3;
  const stdY = 6;
  const OBS = 1000;

  useEffect(() => {
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
      const { slope, intercept } = linearRegression(studyScores)

      // Corrected regression

      // using matrices
      const X = transpose(matrix([ones, colOne, colTwo]));
      const Y = transpose(matrix([scores]));
      const inverse = inv(multiply(transpose(X), X));
      const bHat = multiply(multiply(inverse, transpose(X)), Y);

      const generatePoints = (slope, int) => _.range(0, 11).map((i) => _.round(int + i * slope, 2));

      setNaiveLine([intercept, slope]);
      setCorrectedLine([parseFloat(bHat.get([0, 0])), beta, delta]);

      setAllData({
        points: studyScores.map(([x, y]) => ({ x, y })),
        naiveLine: generatePoints(slope, intercept),
        correctedLine: generatePoints(parseFloat(bHat.get([1, 0])), parseFloat(bHat.get([0, 0])))
      });
      setShowCorrect(false);
    }
  }, [series]);

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
      <br />
      <Row lg={2} sm={1}>
        <Col style={{ margin: 'auto', padding: 10 }}>
          <CoefficientInput beta={beta} setBeta={setBeta} delta={delta} setDelta={setDelta} />
        </Col>
        <Col>
          <div style={{ padding: 10 }}>Set the Correlation between Study Hours and Sleep Hours:</div>
          <InputSlider value={correlation} min={-0.99} max={0.99} step={0.01} onChange={(value) => setCorrelation(value)} />
          <br />
          <Alert variant="secondary" style={{ width: 'fit-content', margin: 'auto' }}>
            Covariance between Study Hours and Sleep Hours: {' '}
            <Badge className="badge bg-primary pill" aria-label="covariance">{(correlation * stdX * stdY).toFixed(2)}</Badge>
          </Alert>

        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <p>Estimate Regression Using Test Score and Study Hours Data </p>
          <Button variant="primary" onClick={() => generateSeries()}>Generate!</Button>
        </Col>
      </Row>
      <br />
      {(stage >= 2) && (
        <div>
          <Row>
            <Col lg={{ span: 12, offset: 0 }} xl={{ span: 8, offset: 2 }}>
              <OmittedVariableChart
                dataPoints={allData.points}
                naiveLine={allData.naiveLine}
                correctedLine={showCorrect ? allData.correctedLine : []}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <p variant="primary">Add Omitted Variable, Density, to Regression</p>
              <Button
                variant="outline-primary"
                onClick={() => setShowCorrect(!showCorrect)}
                active={showCorrect}
              >
                Show Corrected Regression Line
              </Button>
            </Col>
          </Row>
          <Row lg={{ span: 12, offset: 0 }} xl={{ span: 4, offset: 1 }}>
            <div style={{
              marginTop: 30,
              marginBottom: 30,
            }}>
              <TeX>
                {`\\text{Naive Regression: }TestScore = ${naiveLine[0].toFixed(1)} + ${naiveLine[1].toFixed(1)} * StudyHours + u_i`}
              </TeX>
              <br />
              <TeX>
                {showCorrect ? `\\text{Corrected Regression: }TestScore = ${correctedLine[0].toFixed(1)} + ${correctedLine[1]} * StudyHours + ${correctedLine[2].toFixed(1)} * SleepHours + u_i` : ''}
              </TeX>
            </div>
          </Row>
        </div>
      )}
    </div>
  );
}
