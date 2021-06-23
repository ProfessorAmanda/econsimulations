import React from "react";
import SelectorButtonGroup from "../SelectorButtonGroup";
import { Row } from "reactstrap";
import PropTypes from "prop-types";

export default function TestInputs({ testType, setTestType, popShape, setPopType }) {

  return (
    <div style={{ padding: 20 }}>
      <Row>
        <div>
          Choose a kind of hypothesis test: {" "}
          <SelectorButtonGroup options={["oneSample", "twoSample"]} select={setTestType} selected={testType}/>
        </div>
      </Row>
      <Row style={{ padding: 10 }}>
        <div>
          <div style={{ padding: 10 }}>Choose a population distribution shape:</div>
          <SelectorButtonGroup options={["Normal", "Uniform", "Mystery", "??Unknown??"]} select={setPopType} selected={popShape}/>
        </div>
      </Row>
    </div>
  )
}

TestInputs.propTypes = {
  testType: PropTypes.string.isRequired,
  setTestType: PropTypes.func.isRequired,
  popShape: PropTypes.string.isRequired,
  setPopType: PropTypes.func.isRequired
}
