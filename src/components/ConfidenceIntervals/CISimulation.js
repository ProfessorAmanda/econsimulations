import React, { useState, useEffect } from "react";
import Collapsable from "../Collapsable.js";
import ConfidenceInputs from "./ConfidenceInputs.js";
import SampleSizeInput from "../SampleSizeInput.js";
import ConfidenceIntervalsChart from "./ConfidenceIntervalsChart.js";
import { dataFromDistribution, populationMean } from "../../lib/stats-utils.js";
import { Row, Col } from "reactstrap";
import PopulationChart from "./PopulationChart.js";
import _ from "lodash";
import { std } from "mathjs";
import { jStat } from "jstat";


export default function CISimulation({ distType, populationSize }) {
  const [testType, setTestType] = useState("z");  // can be 'z' or 't'
  const [confLevel, setConfLevel] = useState(95);
  const [popArray, setPopArray] = useState([]);
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    setPopArray([]);
    setSamples([]);
  }, [distType]);

  // Highcharts rendering is buggy - this second useEffect takes a second but allows the data to be reset completely before being generated again
  useEffect(() => {
    if (popArray.length === 0) {
      // adjust params for uniform distribution to fit example
      const newPop = dataFromDistribution(distType, populationSize, {low: 54, hi: 74});
      setPopArray(newPop);
    }
  }, [popArray, distType, populationSize]);

  const generateSamples = (size, replications=1) => {
    const sample = _.sampleSize(popArray, size);
    const mean = _.round(populationMean(sample), 2);
    const popMean = _.round(populationMean(popArray), 2);
    const standardDev = std(((testType === "z") ? popArray : sample).map((s) => s[0]));
    const ciFunction = (testType === "z") ? jStat.normalci : jStat.tci;
    const [lowerConf, upperConf] = ciFunction(mean, 1 - (confLevel / 100), standardDev, size);
    const sampleObjects = [];
    for (let i = 0; i < replications; i++) {
      const sampleObject = {
        data: sample,
        size: +size,
        mean: mean,
        lowerConf: _.round(lowerConf, 2),
        upperConf: _.round(upperConf, 2),
        label: (popMean >= _.round(lowerConf, 2)) && (popMean <= _.round(upperConf, 2))
      }
      sampleObjects.push(sampleObject);
    }
    const newSamples = [...samples, ...sampleObjects];
    setSamples(newSamples);
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
            popMean={populationMean(popArray)}
            sampled={(samples.length > 0) ? samples[samples.length - 1].data : []}  // most recent sample data
            distType={distType}
          />
          <p>Try drawing some samples and calculating means</p>
          <SampleSizeInput maxSize={popArray.length} handleClick={generateSamples}/>
        </Col>
        <Col>
          <ConfidenceIntervalsChart
            confidenceLevel={confLevel}
            samples={samples}
            distType={distType}
            popMean={_.round(populationMean(popArray))}
          />
        </Col>
      </Row>
    </Collapsable>
  );
}
