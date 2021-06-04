import React, { useEffect, useState } from 'react';
import MultivariateNormal from 'multivariate-normal';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Button } from 'reactstrap';
import MeanSDInput from './MeanSDInput';
import JDCharts from './JDCharts';

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
  const [allData, setAllData] = useState({parent: [], child: [], joint: []});

  useEffect(() => {
    if (stage === 2) {
      generate();
    }
  }, [stage]);

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
    setCorrelation(value);
    setCovariance(newCorrelation * parentSD * childSD);
  }

  // generate datapoints for parent height and child height
  const generate = () => {
    const temp = [[Math.pow(parentSD, 2), covariance], [covariance, Math.pow(childSD, 2)]];
    const distribution = MultivariateNormal(meanVector, temp);

    const jointSeries = [];
    for (let i = 0; i < 1000; i++) {
      const [parentHeight, childHeight] = distribution.sample();
      jointSeries.push({x: parentHeight.toFixed(2), y: childHeight.toFixed(2), id: i});
    }

    const parentCounts = {};
    const parentSeries = [];
    const childCounts = {};
    const childSeries = [];

    jointSeries.forEach(({x, y, id}) => {
      if (parentCounts[x]) {
        parentCounts[x]++
      } else {
        parentCounts[x] = 1
      }
      parentSeries.push({x: x, y: parentCounts[x], id: id});
      if (childCounts[y]) {
        childCounts[y]++
      } else {
        childCounts[y] = 1
      }
      childSeries.push({x: y, y: childCounts[y], id: id});
    });

    const data = {parent: parentSeries, child: childSeries, joint: jointSeries}
    setAllData(data);
    // setParentData(parentSeries);
    // setChildData(parentSeries);
    // setJointData(parentSeries);
    // setStage(2);
  }

  return (
    <Container fluid>
      <Button onClick={() => setStage(1)}>reset</Button>
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
          onClick={() => setStage(2)}
        >
          Generate!
        </Button>
      </Row>
      {(stage === 2) && <JDCharts parentData={allData.parent} childData={allData.child} jointData={allData.joint}/>}
    </Container>
  );
}
