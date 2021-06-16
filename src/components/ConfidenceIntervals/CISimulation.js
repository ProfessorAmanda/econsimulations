import React, { useState, useEffect } from "react";
import Collapsable from "../Collapsable";
import ConfidenceInputs from "./ConfidenceInputs";
import { dataFromDistribution } from "../../lib/stats-utils";

const numberResamples = {
  "Normal": 0,
  "Uniform": 0,
  "Exponential": 0,
  "Chi-Squared": 0,
  "Mystery": 0
  }
const resampleSize = {
  "Normal": 0,
  "Uniform": 0,
  "Exponential": 0,
  "Chi-Squared": 0,
  "Mystery": 0
  }


export default function CISimulation({ distType, populationSize }) {
  const [stage, setStage] = useState(0);
  const [testType, setTestType] = useState("z");  // can be 'z' or 't'
  const [confLevel, setConfLevel] = useState(95);
  const [popArray, setPopArray] = useState([]);

  useEffect(() => {
    setStage(0);
    setPopArray([]);
  }, [distType]);

  // Highcharts rendering is buggy - this second useEffect takes a second but allows the data to be reset completely before being generated again
  useEffect(() => {
    if (popArray.length === 0) {
      const newPop = dataFromDistribution(distType, populationSize);
      setPopArray(newPop);
    }
  }, [popArray]);


  return (
    <Collapsable>
      <ConfidenceInputs
        testType={testType}
        setTestType={setTestType}
        confLevel={confLevel}
        setConfLevel={setConfLevel}
      />

    </Collapsable>
  );
}
