import React, { useState, useEffect } from "react";
import Collapsable from "../Collapsable.js";
import ConfidenceInputs from "./ConfidenceInputs.js";
import { dataFromDistribution } from "../../lib/stats-utils.js";


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
  }, [popArray, distType, populationSize]);

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
