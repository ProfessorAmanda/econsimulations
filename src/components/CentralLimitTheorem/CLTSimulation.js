/*

  Displays one of the CLT simulations

  props:
    popType        - string
    mainSampleSize - int

*/
import React, { useState, useEffect } from 'react';
import Collapsable from '../Collapsable.js';
import ChartContainer from '../ChartContainer.js';
import SampleMeanChart from './SampleMeanChart.js'
import SampleMeansSimulator from './SampleMeansSimulator.js'
import { std } from "mathjs";
import { Alert, Button, Col, Row } from 'reactstrap';
import { populationMean, dataFromDistribution } from "../../lib/stats-utils.js";
import SampleSizeInput from '../SampleSizeInput.js';
import SampleMeansTable from './SampleMeansTable.js';
import _ from "lodash";

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

export default function CLTSimulation({ popType, mainSampleSize }) {
  const [sampleMeans, setSampleMeans] = useState([]);
  const [sampled, setSampled] = useState([]);
  const [sampleSize, setSampleSize] = useState(mainSampleSize);
  const [standardNormal, setStandardNormal] = useState(false);
  const [stage, setStage] = useState(1);
  const [popArray, setPopArray] = useState([]);
  const [popMean, setPopMean] = useState(0);

  useEffect(() => {
    setStage(1);
    const newPop = dataFromDistribution(popType, mainSampleSize);
    setPopArray(newPop);
    const newMean = populationMean(newPop);
    setPopMean(newMean);
    setSampled([]);
  }, [popType, mainSampleSize]);

  const addSampleMeans = (means) => {
    const newSampleMeans = [...sampleMeans, ...means];
    setSampleMeans(newSampleMeans);
  }

  const handleClick = (size) => {
    const sample = _.sampleSize(popArray, size);
    setSampled(sample);
    const newMeans = [...sampleMeans, [size, populationMean(sample)]];
    setSampleMeans(newMeans);
  }

  const xvalue = sampled.length === 0 ? [0] : sampled.map((s) => s[0]);  // provide a placeholder value until 'sampled' is updated

  return (
    <div>
      <Collapsable>
        <ChartContainer popArray={popArray} popMean={popMean} sampled={sampled} popType={popType}/>
        <Button color="success" onClick={() => setStage(2)}>Continue</Button>
        {(stage >= 2) &&
          <div>
            <Row className="Center">
              <Alert color='light'>
                <p>Try drawing some samples and calculating means</p>
                <SampleSizeInput maxSize={popArray.length} handleClick={handleClick}/>
              </Alert>
            </Row>
            <Row>
              <Col lg="8">
                <Button
                  outline
                  color="primary"
                  active={standardNormal}
                  onClick={() => setStandardNormal(!standardNormal)}>
                    Convert to Std. Normal
                </Button>
                <SampleMeanChart  // TODO: update this
                  numberResamples={numberResamples}
                  resampleSize={resampleSize[popType]}
                  mean={popMean}
                  sd={std(xvalue)}
                  normalized={standardNormal}
                  sampleSize={sampleSize}
                  type={popType}
                  normal={standardNormal}
                  sampleMeans={sampleMeans}
                />
              </Col>
              <Col lg="4">
                <SampleMeansTable sampleMeans={sampleMeans}/>
              </Col>
            </Row>
            <Row style={{width: "60%", margin:'auto'}}>
              <Alert color='light' className="Center">
                <Alert color="primary" style={{width: "50%", margin: 'auto'}}>
                  <p>Simulate drawing many many samples</p>
                </Alert>
                <br/>
                <SampleMeansSimulator
                  setSampleSize={setSampleSize}
                  clear={() => setSampleMeans([])}
                  population={popArray}
                  addSamples={addSampleMeans}
                />
              </Alert>
            </Row>
          </div>
        }
      </Collapsable>
    </div>
  );
}
