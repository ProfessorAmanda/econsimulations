import React, { useState, useEffect } from "react";
import Collapsable from "../Collapsable.js";
import ConfidenceInputs from "./ConfidenceInputs.js";
import SampleSizeInput from "../SampleSizeInput.js";
import ConfidenceIntervalsChart from "./ConfidenceIntervalsChart.js";
import { dataFromDistribution, populationMean } from "../../lib/stats-utils.js";
import { Row, Col } from "reactstrap";
import PopulationChart from "./PopulationChart.js";
import _ from "lodash";


export default function CISimulation({ distType, populationSize }) {
  const [stage, setStage] = useState(0);
  const [testType, setTestType] = useState("z");  // can be 'z' or 't'
  const [confLevel, setConfLevel] = useState(95);
  const [popArray, setPopArray] = useState([]);
  const [popMean, setPopMean] = useState(0);
  const [sampled, setSampled] = useState([]);
  const [sampleMeans, setSampleMeans] = useState([]);

  useEffect(() => {
    setStage(0);
    setPopArray([]);
    setSampled([]);
    setSampleMeans([]);
  }, [distType]);

  // Highcharts rendering is buggy - this second useEffect takes a second but allows the data to be reset completely before being generated again
  useEffect(() => {
    if (popArray.length === 0) {
      // adjust params for uniform distribution to fit example
      const newPop = dataFromDistribution(distType, populationSize, {low: 54, hi: 74});
      setPopArray(newPop);
      const newMean = populationMean(newPop);
      setPopMean(newMean);
    }
  }, [popArray, distType, populationSize]);

  const handleClick = (size) => {
    const sample = _.sampleSize(popArray, size);
    setSampled(sample);
    // TODO: the mean object should also include the confidence intervals
    const newMeans = [...sampleMeans, [size, populationMean(sample)]];
    setSampleMeans(newMeans);
  }

  return (
    <Collapsable>
      <Row>
        <ConfidenceInputs
          testType={testType}
          setTestType={setTestType}
          confLevel={confLevel}
          setConfLevel={setConfLevel}
        />
      </Row>
      <br/>
      <Row>
        <Col>
          <PopulationChart
            popArray={popArray}
            popMean={popMean}
            sampled={sampled}
            distType={distType}
          />
          <p>Try drawing some samples and calculating means</p>
          <SampleSizeInput maxSize={popArray.length} handleClick={handleClick}/>
        </Col>
        <Col>
          <ConfidenceIntervalsChart sampleMeans={sampleMeans}/>
        </Col>
      </Row>
    </Collapsable>
  );
}
