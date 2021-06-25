import React from "react";
import SelectorButtonGroup from "../SelectorButtonGroup";
import { Row } from "reactstrap";
import PropTypes from "prop-types";
import { distributionType } from "../../lib/types.js";

export default function TestInputs({ setDistType, distType, testType, setTestType, popShape, setPopType }) {

  return (
    <div style={{ padding: 20 }}>
      <Row>
        <div>
        <div>
          Do you want to assume that you know σ? If yes, choose Z. If no, choose T: {" "}
          <SelectorButtonGroup options={["Z", "T"]} select={setDistType} selected={distType}/>
        </div>
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
  setPopType: PropTypes.func.isRequired,
  setDistType: PropTypes.func.isRequired,
  distType: distributionType.isRequired,

}
