import React from "react";
import { Row, ButtonGroup, Button, Col } from "reactstrap";
import InputSlider from "../InputSlider.js";
import {PropTypes} from 'prop-types';

export default function ConfidenceInputs({ distType, setDistType, confLevel, setConfLevel }) {

  const confidenceBar = [90, 95, 99].map((level) =>
    <Button
      style={{ backgroundColor: (+confLevel === level) ? '#4CAF50' : '#555555' }}
      onClick={() => setConfLevel(level)}
      key={level}
    >
      {level}%
    </Button>
  );

  return (
    <div>
      <Row className="Center">
        <div>
          1) Do you want to assume that you know σ? If yes, choose Z. If no, choose T: {" "}
          <ButtonGroup>
            <Button style={{ backgroundColor: (distType === "z") ? '#4CAF50':'#555555' }} onClick={() => setDistType("z")}>Z</Button>
            <Button style={{ backgroundColor: (distType === "t") ? '#4CAF50':'#555555' }} onClick={() => setDistType("t")}>T</Button>
          </ButtonGroup>
        </div>
      </Row>
      <br/>
      <Row className="Center">
        <div>
          2) Confidence Level: {" "}
          <ButtonGroup>{confidenceBar}</ButtonGroup>
        </div>
      </Row>
      <br/>
      <Row className="Center">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <div>
            More Levels:
            <InputSlider value={confLevel} min={1} max={99} step={1} onChange={setConfLevel}/>
          </div>
        </Col>
      </Row>
    </div>
  );
}

ConfidenceInputs.propTypes = {

  distType : PropTypes.oneOf(['z','t']), 
  setDistType : PropTypes.func, 
  confLevel : PropTypes.number, 
  setConfLevel : PropTypes.func,
}