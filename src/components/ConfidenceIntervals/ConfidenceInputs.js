import React from "react";
import { Row, ButtonGroup, Button, Col } from "reactstrap";
import InputSlider from "../InputSlider.js";
import TTable from './TTable.js';
import ZTable from './ZTable.js';

export default function ConfidenceInputs({ testType, setTestType, confLevel, changeConfLevel, dOf }) {
  const modDof = (dOf > 120) ? 121 : dOf;

  const sampleInputs = (testType === "z") ? [
    {level: 90, zValue: 1.645},
    {level: 95, zValue: 1.960},
    {level: 99, zValue: 2.576}
  ] : [
    {level: 90, zValue: parseFloat(TTable[modDof - 1][9])},
    {level: 95, zValue: parseFloat(TTable[modDof - 1][4])},
    {level: 99, zValue: parseFloat(TTable[modDof - 1][0])}
  ];

  const confidenceBar = sampleInputs.map(({level, zValue}) =>
    <Button
      style={{ backgroundColor: (+confLevel === level) ? '#4CAF50' : '#555555' }}
      onClick={() => changeConfLevel(level, zValue)}
      key={level}
    >
      {level}%
    </Button>
  );

  const adjustSlider = (value) => {
    const newZScore = (testType === "z")
      ? ZTable[value]
      : parseFloat(TTable[modDof-1][((value > 50) ? (100 - value) : value) - 1]);
    changeConfLevel(value, newZScore);
  }

  return (
    <div>
      <Row className="Center">
        <div>
          1) Do you want to assume that you know σ? If yes, choose Z. If no, choose T: {" "}
          <ButtonGroup>
            <Button style={{ backgroundColor: (testType === "z") ? '#4CAF50':'#555555' }} onClick={() => setTestType("z")}>Z</Button>
            <Button style={{ backgroundColor: (testType === "t") ? '#4CAF50':'#555555' }} onClick={() => setTestType("t")}>T</Button>
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
            <InputSlider value={confLevel} min={1} max={99} step={1} onChange={adjustSlider}/>
          </div>
        </Col>
      </Row>
    </div>
  );
}
