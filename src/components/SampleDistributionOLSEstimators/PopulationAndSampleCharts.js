import { useEffect, useState } from "react";
import regression from "regression";
import { Container, Row, Col, Alert } from "reactstrap";
import ScatterPlot from "../ScatterPlot.js";
import SampleSizeInput from "../SampleSizeInput.js";
import _ from "lodash";
import { dataObjectArrayType } from "../../lib/types.js";

export default function PopulationAndSampleCharts({ data }) {
  const [bestFitLine, setBestFitLine] = useState([]);
  const [sample, setSample] = useState([]);

  useEffect(() => {
    const { equation } = regression.linear(sample.map(({x, y}) => [x, y]), { precision: 2 });
    const linearPts = [{x: 0}, {x: 15}, ...sample].map((point) => (
      {x: point.x, y: _.round((point.x * equation[0]) + equation[1], 2)})
    );
    setBestFitLine(linearPts);
  }, [sample]);

  const takeSample = (size) => {
    const newSample = _.sampleSize(data, size);
    setSample(newSample);
  }

  const mainSeries = [{name: "data", data: data}, {name: "sample", data: sample}];

  const sampleSeries = [
    {
      name: "best fit line",
      type: "line",
      data: bestFitLine,
      label: false,
      marker: false,
      showInLegend: sample.length > 0,
      color: "black",
      animation: false,
      enableMouseTracking: false
    },
    {
      name: "sample",
      data: sample,
      color: "orange",
      marker: {
        lineWidth: 1,
        lineColor: "orange"
      }
    }
  ];

  return (
    <Container>
      <ScatterPlot
        series={mainSeries}
        title="Population"
        xMin={0}
        xMax={15}
        yMin={20}
        yMax={100}
        xLabel="Study Hours"
        yLabel="Test Score"
      />
      <Row md={1} lg={2}>
        <Col>
          <Alert color="primary" style={{marginTop: "20%", marginBottom: "auto"}}>
            <p>Try drawing some samples and observe the line of best fit on the graph</p>
            <SampleSizeInput maxSize={1000} handleClick={takeSample}/>
          </Alert>
        </Col>
        <Col>
          <ScatterPlot
            series={sampleSeries}
            title="Sample"
            xMin={0}
            xMax={15}
            yMin={20}
            yMax={100}
            xLabel="Study Hours"
            yLabel="Test Score"
          />
        </Col>
      </Row>

    </Container>
  )
}

PopulationAndSampleCharts.propTypes = {
  data: dataObjectArrayType.isRequired
}
