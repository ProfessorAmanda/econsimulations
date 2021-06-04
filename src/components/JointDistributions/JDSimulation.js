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
      jointSeries.push({x: parentHeight, y: childHeight, id: i});
    }

    const parentCounts = {};
    const parentSeries = [];
    const childCounts = {};
    const childSeries = [];

    jointSeries.forEach(({x, y, id}) => {
      const parentHeight = x.toFixed(2);
      if (parentCounts[parentHeight]) {
        parentCounts[parentHeight]++
      } else {
        parentCounts[parentHeight] = 1
      }
      parentSeries.push({x: parentHeight, y: parentCounts[parentHeight], id: id});
      const childHeight = y.toFixed(2);
      if (childCounts[childHeight]) {
        childCounts[childHeight]++
      } else {
        childCounts[childHeight] = 1
      }
      childSeries.push({x: childHeight, y: childCounts[childHeight], id: id});
    });

    setParentData(parentSeries);
    setChildData(childSeries);
    setJointData(jointSeries);
    setStage(2);
  }

  const maxHeight = Math.max(...parentData.map((point) => point.y), ...childData.map((point) => point.y));

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
              maxY={maxHeight + 1}
            />
          </Col>
          <Col>
            <HeightChart
              heightData={childData}
              title="Child Height"
              xLabel="Parent Height (Inches)"
              yLabel="Count"
              color='#ff0000'
              maxY={maxHeight + 1}
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
