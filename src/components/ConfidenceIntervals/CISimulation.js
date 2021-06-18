import React, { useState, useEffect } from "react";
import Collapsable from "../Collapsable.js";
import ConfidenceInputs from "./ConfidenceInputs.js";
import SampleSizeInput from "../SampleSizeInput.js";
import ConfidenceIntervalsChart from "./ConfidenceIntervalsChart.js";
import ManySamplesInput from "./ManySamplesInput.js";
import ConfidenceTable from "./ConfidenceTable.js";
import { dataFromDistribution, populationMean } from "../../lib/stats-utils.js";
import { Row, Col, Alert } from "reactstrap";
import PopulationChart from "./PopulationChart.js";
import _ from "lodash";
import { std } from "mathjs";
import { jStat } from "jstat";


export default function CISimulation({ popType, populationSize }) {
  const [distType, setDistType] = useState("z");  // can be 'z' or 't'
  const [confLevel, setConfLevel] = useState(95);
  const [popArray, setPopArray] = useState([]);
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    setPopArray([]);
    setSamples([]);
  }, [popType]);

  // Highcharts rendering is buggy - this second useEffect takes a second but allows the data to be reset completely before being generated again
  useEffect(() => {
    if (popArray.length === 0) {
      // adjust params for uniform distribution to fit example
      const newPop = dataFromDistribution(popType, populationSize, {low: 54, hi: 74});
      setPopArray(newPop);
    }
  }, [popArray, popType, populationSize]);

  const generateSamples = (size, replications=1) => {
    const sampleObjects = [];
    for (let i = 0; i < replications; i++) {
      const sample = _.sampleSize(popArray, size);
      const mean = _.round(populationMean(sample), 2);
      const popMean = _.round(populationMean(popArray), 2);
      const standardDev = std(((distType === "z") ? popArray : sample).map((s) => s[0]));
      const ciFunction = (distType === "z") ? jStat.normalci : jStat.tci;
      const [lowerConf, upperConf] = ciFunction(mean, 1 - (confLevel / 100), standardDev, size);
      const sampleObject = {
        data: sample,
        size: +size,
        mean: mean,
        lowerConf: _.round(lowerConf, 2),
        upperConf: _.round(upperConf, 2),
        confidenceLevel: confLevel,
        distribution: distType,
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
          distType={distType}
          setDistType={setDistType}
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
            distType={popType}
          />
          <p>Try drawing some samples and calculating means</p>
          <SampleSizeInput maxSize={popArray.length} handleClick={generateSamples}/>
        </Col>
        <Col>
          <ConfidenceIntervalsChart
            confidenceLevel={confLevel}
            samples={samples}
            popType={popType}
            popMean={_.round(populationMean(popArray))}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <ManySamplesInput
            population={popArray}
            addSamples={generateSamples}
            clear={() => setSamples([])}
          />
        </Col>
        <Col>
          <ConfidenceTable samples={samples}/>
        </Col>
      </Row>
      <br/>
      <Row lg="12">
        {
          (samples.length > 0) &&
          <Alert color="info" style={{margin:'auto'}}>
            {samples.filter(({ label }) => !label).length} intervals did not contain the true mean
            <br/>
            {samples.filter(({ label }) => label).length} did
          </Alert>
        }
      </Row>
    </Collapsable>
  );
}
