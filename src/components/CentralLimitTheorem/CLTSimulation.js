/*

  Displays one of the CLT simulations

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
import PropTypes from 'prop-types';
import { popShapeType } from '../../lib/types.js';

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

export default function CLTSimulation({ popShape, mainSampleSize }) {
  const [sampleMeans, setSampleMeans] = useState([]);
  const [sampled, setSampled] = useState([]);
  const [sampleSize, setSampleSize] = useState(mainSampleSize);
  const [standardNormal, setStandardNormal] = useState(false);
  const [stage, setStage] = useState(1);
  const [popArray, setPopArray] = useState([]);
  const [popMean, setPopMean] = useState(0);

  useEffect(() => {
    setStage(1);
    setPopArray([]);
    setSampled([]);
    setSampleMeans([]);
  }, [popShape]);

  // Highcharts rendering is buggy - this second useEffect takes a second but allows the data to be reset completely before being generated again
  useEffect(() => {
    if (popArray.length === 0) {
      const newPop = dataFromDistribution(popShape, mainSampleSize);
      setPopArray(newPop);
      const newMean = populationMean(newPop);
      setPopMean(newMean);
    }
  }, [popArray, popShape, mainSampleSize]);

  const addSampleMeans = (means) => {
    if (!means) {  // calling addSampleMeans with no arguments clears the data
      setSampleMeans([])
    } else {
      const newSampleMeans = [...sampleMeans, ...means];
      setSampleMeans(newSampleMeans);
    }
  }

  const handleClick = (size) => {
    const sample = _.sampleSize(popArray, size);
    setSampled(sample);
    const newMeans = [...sampleMeans, {x: size, y: populationMean(sample)}];
    setSampleMeans(newMeans);
  }

  const xvalue = sampled.length === 0 ? [0] : sampled.map((s) => s.x);  // provide a placeholder value until 'sampled' is updated

  return (
    <Collapsable>
      <div>
        <ChartContainer popArray={popArray} popMean={popMean} sampled={sampled} popShape={popShape}/>
        <Button color="success" onClick={() => setStage(2)}>Continue</Button>
        {(stage >= 2) &&
          <div>
            <Row className="Center">
              <div style={{padding: "30px"}}>
                <p>Try drawing some samples and calculating means</p>
                <SampleSizeInput maxSize={popArray.length} handleClick={handleClick}/>
              </div>
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
                  resampleSize={resampleSize[popShape]}
                  mean={popMean}
                  sd={std(xvalue)}
                  normalized={standardNormal}
                  sampleSize={sampleSize}
                  type={popShape}
                  normal={standardNormal}
                  sampleMeans={sampleMeans}
                />
              </Col>
              <Col lg="4">
                <SampleMeansTable sampleMeans={sampleMeans}/>
              </Col>
            </Row>
            <Row style={{width: "60%", margin:'auto'}}>
              <div className="Center">
                <Alert color="primary" style={{width: "50%", margin: 'auto'}}>
                  Simulate drawing many many samples
                </Alert>
                <br/>
                <SampleMeansSimulator
                  setSampleSize={setSampleSize}
                  population={popArray}
                  addSamples={addSampleMeans}
                />
              </div>
            </Row>
          </div>
        }

      </div>
    </Collapsable>
  );
}

CLTSimulation.propTypes = {
  popShape: popShapeType.isRequired,
  mainSampleSize: PropTypes.number.isRequired,
}
