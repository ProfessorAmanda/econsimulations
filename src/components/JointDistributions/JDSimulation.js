import React, { useState } from 'react';
import MultivariateNormal from 'multivariate-normal';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Button } from 'reactstrap';
import MeanSDInput from './MeanSDInput';
import HeightChart from './HeightChart';
import JointChart from './JointChart';

const meanVector = [70, 70];

export default function JDSimulation() {
  const [parentMean, setParentMean] = useState(70);
  const [childMean, setChildMean] = useState(70);
  const [parentSD, setParentSD] = useState(1);
  const [childSD, setChildSD] = useState(1);
  const [correlation, setCorrelation] = useState(0);
  const [covariance, setCovariance] = useState(0);
  const [stage, setStage] = useState(1);
  const [parentData, setParentData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [jointData, setJointData] = useState([]);

  const changeParentSD = (value) => {
    setParentSD(value);
    setCovariance(correlation * value * childSD);
  }

  const changeChildSD = (value) => {
    setChildSD(value);
    setCovariance(correlation * value * parentSD);
  }

  const changeSlider = (value) => {
    const newCorrelation = (value === 1) ? 0.999999 : value;
    setCorrelation(newCorrelation);
    setCovariance(newCorrelation * parentSD * childSD);
  }

  const generate = () => {  // TODO: what is the intended behavior of this function?

    const temp = [[Math.pow(parentSD, 2), covariance], [covariance, Math.pow(childSD, 2)]];

    // lets you sample from distribution
    const distribution = MultivariateNormal(meanVector, temp);
    const series = [];
    // samples 1000
    for (let i = 0; i < 500; i++){
        series.push(distribution.sample());
    }

    //generate shark series
    const parentSeries = [];
    const parentDict = {};
    const rawParents = series.map((s) => s[0]);
    // building dictionary for histogram
    for (const i of rawParents){
        const parentFreq = Math.round(i * 100) / 100;
        if (parentDict[parentFreq]){
            parentDict[parentFreq]++;
        } else {
            parentDict[parentFreq] = 1;
        }
    }
    for (const i in parentDict){
        for (let j = 0; j < parentDict[i]; j++){
            parentSeries.push([parseFloat(i), j+1]);
        }
    }

    setParentData(parentSeries);


    //generate iceseries
    const childSeries = [];
    const childDict = {};
    for (const i of series){
        const childFreq = Math.round(i[1] * 100) / 100;
        if (childDict[childFreq]){
            childDict[childFreq]++;
        } else {
            childDict[childFreq] = 1;
        }
    }
    for (const i in childDict){
        for (let j = 0; j < childDict[i]; j++){
            childSeries.push([parseFloat(i), j+1]);
        }
    }

    setChildData(childSeries);

    //generate joint series
    const jointSeries = [];
    for (const i in rawParents){
        jointSeries.push([Math.round(rawParents[i] * 100) / 100, Math.round(series[i][1] * 100) / 100]);
    }
    setJointData(jointSeries);

    setStage(2);
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <MeanSDInput title="Parent" mean={parentMean} setMean={setParentMean} sd={parentSD} setSD={changeParentSD}/>
        </Col>
        <Col>
          <MeanSDInput title="Child" mean={childMean} setMean={setChildMean} sd={childSD} setSD={changeChildSD}/>
        </Col>
        <Col>
          <p>Set the Correlation</p>
          <InputGroup>
            <Input
              value={correlation}
              type="range"
              className="custom-range"
              style={{height: "30px"}}
              step={0.1}
              min={-1}
              max={1}
              onChange={(event) => changeSlider(event.target.value)}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText className="inputGroupAppend">{correlation}</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <p style={{ margin: "15px" }}>Covariance</p>
          <InputGroupText>{covariance.toFixed(2)}</InputGroupText>
        </Col>
      </Row>
      <Row className='Center'>
        <Button
          outline
          color='primary'
          style={{margin:"3vh"}}
          disabled={!parentMean || !parentSD || !childMean || !childSD}
          onClick={() => generate()}
        >
          Generate!
        </Button>
      </Row>
      {
        (stage === 2) &&
        <Row>
          <Col>
            <HeightChart
              heightData={parentData}
              title="Parent Height"
              xLabel="Child Height (Inches)"
              yLabel="Count"
              color='#006D75'
            />
          </Col>
          <Col>
            <HeightChart
              heightData={childData}
              title="Child Height"
              xLabel="Parent Height (Inches)"
              yLabel="Count"
              color='#ff0000'
            />
          </Col>
          <Col>
            <JointChart
              data={jointData}
              title="Parent Height vs Child Height"
              xLabel="Parent Height (Inches)"
              yLabel="Child Height (Inches)"
              color='#FF9655'
            />
          </Col>
        </Row>
      }
    </Container>
  );
}
