import React, { useEffect, useState }  from "react";
import TTest from "./TTest.js";
import { Alert, Container, Row, Col, Button, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import TestInputs from "./TestInputs.js";
import HypothesisDropdown from "./HypothesisDropdown.js";
import _ from "lodash";

export default function HTSimulation() {
  const [pplShape, setPplShape] = useState("");
  const [testType, setTestType] = useState("");
  const [hypothesis, setHypothesis] = useState();
  const [mue0, setMue0] = useState(0);
  const [stage, setStage] = useState(1);

  useEffect(() => {
    if ((pplShape !== "") && (testType !== "")) {
      setStage(2)
    }
  }, [pplShape, testType]);

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
              shape={(pplShape === "??Unknown??") ? _.sample(["Normal", "Uniform", "Mystery"]) : pplShape}
              hypothesis={hypothesis.id}
              mue0={mue0}
            />
          </Row>
        </Container>
        }
      </Container>
      }
    </div>
  )
}
