import React, { useEffect, useState } from "react";
import { floor, random, mean, round, std, sqrt, abs } from "mathjs";
import TToPval from "./TToPval.js";
import DotPlot from "../DotPlot.js";
import { Alert, Button, Container, Col, Input, Row, InputGroupText, InputGroupAddon, InputGroup } from "reactstrap";
import { populationMean, dataFromDistribution } from "../../lib/stats-utils.js";
import PropTypes from "prop-types";


export default function TTest({ shape, hypothesis, mue0 }) {
  const [popArr, setPopArr] = useState([]);
  const [sampleMean, setSampleMean] = useState(0);
  const [sampleSd, setSampleSd] = useState(0);
  const [sampleSize, setSampleSize] = useState(0);
  const [alpha, setAlpha] = useState(0);
  const [tScore, setTScore] = useState(0);
  const [sim, setSim] = useState(0);
  const [pVal, setPVal] = useState(0);

  useEffect(() => {
    setPopArr(dataFromDistribution(shape, 2000, { mean: 69, low: 59, hi: 79 }))
  }, [shape]);

  // Helper functions
  // Take a sample given a sample size and a population, update sampleMean and sampleSd
  const handleSample = (size, pop) => {
    // Sampling randomly from the population by index
    var index = {};
    for (let i = 0; i < popArr.length; i++) {
      index[i]=false;
    } // Can be used to check if the index has been generated before
    var sampleArr = [];
    var j = 0;

    while (j < size) {
      const ranNum = floor(random()*popArr.length);
      if (!index[ranNum]) {
        index[ranNum] = true;
        sampleArr.push(pop[ranNum][0]);
        j += 1;
      }
    }

    const x_bar = round(mean(sampleArr) * 1000)/1000;
    const sd = round(std(sampleArr)*1000)/1000;
    const tScore = getT(x_bar, mue0, sd, size);
    const pVal = getPVal(hypothesis, tScore, sampleSize - 1);

    setSampleMean(x_bar);
    setSampleSd(sd);
    setTScore(tScore);
    setPVal(pVal);
    setSim(1);
  }

  const getT = (x_bar, mue0, sd, sampleSize) => {
    return round(((x_bar - mue0)/(sd/sqrt(sampleSize)))*1000)/1000;
  }

  const getPVal = (hypothesis, t, degreeOF)=>{
    var dof;
    if (degreeOF>121) {
      dof = 121;
    } else {
      dof = degreeOF;
    }

    if ((t > 3)||(t < -3)) {
      switch(hypothesis) {
        case 0:
          return 0;
        case 1:
          return 1;
        case 2:
          return 0;
        default:
          throw new Error();
      }
    } else {
      const p1 = TToPval[dof - 1][t.toFixed(1)];
      switch(hypothesis) {
        case 0:
          return p1;
        case 1:
          return 1 - p1;
        case 2:
          return 2*TToPval[dof - 1][abs(t.toFixed(1))/2];
        default:
          throw new Error();
      }
    }
  }

  return (
    <Container fluid>
      <p>Let’s test your assertion by taking a sample and setting our tolerance for making a type-one error α!</p>
      <Row>
        <Col xs="6">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Sample Size</InputGroupText>
            </InputGroupAddon>
            <Input
              type="number"
              step={1}
              value={sampleSize}
              min={1}
              max={popArr.length}
              onChange={(event) => setSampleSize(event.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs="6">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Alpha</InputGroupText>
            </InputGroupAddon>
            <Input
              type="number"
              step={0.01}
              value={alpha}
              min={0}
              max={1}
              onChange={(event) => setAlpha(event.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      <br/>
      <Button
        color="primary"
        disabled={(sampleSize <= 0) || (sampleSize > popArr.length)}
        onClick={() => handleSample(sampleSize, popArr)}
      >
        Sample
      </Button>
      <br/>
      <br/>
      {(sim >= 1) && (
        <Container>
          <Alert color="secondary" className="Center" >
            <p>This sample yields the following data:</p>
            <p>Sample Mean: &nbsp;{sampleMean}</p>
            <p>Sample Standard Deviation:&nbsp;{sampleSd} </p>
            <p>The test statistic is &nbsp;{tScore}</p>
            <p>This test statistic yields a p-value of P(Z&gt;teststat) = &nbsp;{pVal}. </p>
            <p>Therefore we {pVal<alpha? "reject":"fail to reject"} the null hypothesis. </p>
          </Alert>
          <br/>
          <Row className="Center">
            <p>
              Press here to reveal the true population distribution and mean.&nbsp;
              <Button color="primary" onClick={() => setSim(2)}>Reveal</Button>
            </p>
          </Row>
        </Container>
      )}
      <br/>
      {(sim === 2) && (
        <Container>
          <Row className="Center">
            <Container fluid >
              <Row>
                <Alert color="secondary" className="Center">
                  <p>
                    We queried the monthly Milk Production of {popArr.length} cows and plotted the results on the following chart.
                  </p>
                  <p>
                    The population mean is {(popArr.length > 0) && populationMean(popArr).toFixed(2)}.
                  </p>
                </Alert>
              </Row>
              <Row>
                <DotPlot
                  series={[{name: 'Population', data: popArr}]}
                  title="Milk Production"
                  xMin={55}
                  xMax={81}
                  yMax={40}
                  xLabel="Gallons"
                />
              </Row>
            </Container>
          </Row>
          <Row className="Center">
            <p>Our hypothesis test conclusion was therefore {(pVal < alpha) ? "correct" : "incorrect"}.</p>
          </Row>
        </Container>
      )}
    </Container>
  )
}

TTest.propTypes = {
  shape: PropTypes.string.isRequired,
  hypothesis: PropTypes.number.isRequired,
  mue0: PropTypes.number.isRequired,
}
