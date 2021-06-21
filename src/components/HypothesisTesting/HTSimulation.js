import React, { useEffect, useState }  from "react";
import TTest from "./TTest.js";
import MysteryPop from "./MysteryPop.js";
import { mean, sqrt, random, floor, round } from "mathjs";
import { Alert, Container, Row, Col, Button, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import TestInputs from "./TestInputs.js";
import HypothesisDropdown from "./HypothesisDropdown.js";

const mainSampleSize = 2000

export default function HTSimulation() {

  const [pplShape, setPplShape] = useState("");
  const [testType, setTestType] = useState("");
  const [hypothesis, setHypothesis] = useState();
  const [mue0, setMue0] = useState(0);
  const [popMean, setPopMean] = useState(0);
  const [popArr, setPopArr] = useState([]);
  const [stage, setStage] = useState(1);

  useEffect(() => {
    if ((pplShape !== "") && (testType !== "")) {
      setStage(2)
    }
  }, [pplShape, testType]);


// Helper functions
// Generste 4 kinds of distributions
    const generatePop=(shape)=>{
        switch(shape){
            case "Normal":
            setPopArr(generateNormal());
            break;

            case "Uniform":
            setPopArr(generateUniform());
            break;

            case "Mystery":
            setPopArr(generateMystery());
            break;

            case "??Unknown??":
            setPopArr(generateUnknown());
            break;
        }

    }

    const generateNormal=()=>{
        const MEAN = 68;
        const STANDARD_DEV = 3;
        const ITERATES = 9;
        const range = sqrt(12) * STANDARD_DEV * STANDARD_DEV;
        const popMin = MEAN - (range / 2);

        const popArray = [];

        const sampleSize = mainSampleSize;
        let dict = Array(sampleSize).fill(-1);

        // creates data points for population and stores it in popArray
        for (let i = 0; i < sampleSize; i++){
            let sum = 0;
            for (let j = 0; j < ITERATES; j++){
                sum += random() * range + popMin;
            }

            if (dict[round(sum / ITERATES * 10)] !== -1){
                dict[round(sum / ITERATES * 10)] += 1;
            }
            // Adds first instance of a point
            else {
                dict[round(sum / ITERATES * 10)] = 1;
            }
        }

        for (const point in dict) {
            if (point !== -1) {
                for (let count = 1; count < dict[point] + 1; count++) {
                    popArray.push([point/10, count]);
                }
            }
        }
        popArray.sort(() => random() - 0.5);
        popArray.sort((a,b) => b[1] - a[1]);
        setPopMean(mean(popArray.map(p => p[0])));
        return popArray;

    }
    const generateUniform=()=>{
        const HI = 77;
        const LOW = 59;
        const range = HI - LOW;

        const popArray = [];

        const sampleSize = mainSampleSize;

        let dict = Array(sampleSize).fill(-1);

        for (let i = 0; i < sampleSize; i++){
            const val = random() * range + LOW;

            if (dict[round(val * 10)]){
                dict[round(val * 10)] += 1;
            } else {
                dict[round(val * 10)] = 1;
            }
        }

        for (const point in dict) {
            if (point !== -1) {
                for (let count = 1; count < dict[point] + 2; count++) {
                    popArray.push([point/10, count]);
                }
            }
        }

        popArray.sort(() => random() - 0.3);
        popArray.sort((a,b) => b[1] - a[1]);
        setPopMean(mean(popArray.map(p => p[0])));
        return popArray;

    }

// Double-humped Distribution
    const generateMystery=()=>{
        // The generageMystery() function in Cental Limit Theorem/Mystery.js may not be usable, so a pre-generated Mystery pop is used.

    setPopMean(mean(MysteryPop.map(p => p[0])));


    return MysteryPop;
  }

    const generateUnknown=()=>{
        const ranNum = floor(random()*3);
        var arr;
        console.log(ranNum);

        switch(ranNum){
            case 0:
            arr = generateNormal();
            break;

            case 1:
            arr = generateUniform();
            break;

            case 2:
            arr = generateMystery();
            break;

        }


        return arr;

    }

  return (
    <div className="MainContainer">
      <TestInputs testType={testType} setTestType={setTestType} popType={pplShape} setPopType={setPplShape}/>
      {(stage >= 2) &&
      <Container fluid>
        <Row>
          <Alert color="secondary" className="Center">
            <p>The true population distribution will be revealed at the end.</p>
            {(testType === "oneSample") ? (
              <p>
                Suppose that our farmer has changed the variety of feed the cows eat. It might be reasonable to think that the cows now produce more or less milk than they had before. As a researcher, what assertion would you like to make about these cows’ milk production now? Choose an Option and specify a hypothesized amount. To help make an informed guess, note that the distribution of millk production before we changed the feed had a mean of about 64 gallons
              </p>
              ) : (
              <p>
                Suppose that our farmer has changed the variety of feed the cows eat. It might be reasonable to think that the cows now produce more or less milk than they had before. As a researcher, what assertion would you like to make about these cows’ milk production now? Let Population 1 denote the cows before the feed change and Population 2 denote the cows after the change. Choose an Option below.
              </p>
              )
            }
          </Alert>
        </Row>
        <br/>
        <Row>
          <Col xs="6">
            <HypothesisDropdown testType={testType} setHypothesis={setHypothesis}/>
          </Col>
          <Col xs="4">
            {(testType === "oneSample")  &&
            <InputGroup>
              <Input
                className="Center"
                type="number"
                value={mue0}
                step={1}
                min={1}
                max={1000}
                onChange={(event) => setMue0(event.target.value)}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>gallons of milk per day.</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            }
          </Col>
        </Row>
        <br/>
        <Button color="primary" onClick={() => setStage(3)}> Continue </Button>
        <br/>
        <br/>
        {(stage >= 3) &&
        <Container>
          <Row>
            <Alert color="secondary" className="Center" >
              <p>This means our null and alternative hypotheses are given by:</p>
              <p>{hypothesis.nullH} {(testType === "oneSample") && mue0}</p>
              <p>{hypothesis.alterH} {(testType === "oneSample") && mue0}</p>
            </Alert>
          </Row>
          <br/>
          <Row className="Center">
            <TTest
              testType={testType}
              hypo={hypothesis}
              mue_0={mue0}
            />
          </Row>
        </Container>
        }
      </Container>
      }
    </div>
  )
}
