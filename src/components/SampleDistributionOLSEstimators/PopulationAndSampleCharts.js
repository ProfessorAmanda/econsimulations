import { Container, Row, Col, Alert } from "reactstrap";
import ScatterPlot from "../ScatterPlot.js";
import SampleSizeInput from "../SampleSizeInput.js";
import _ from "lodash";
import { dataObjectArrayType, olsSampleType } from "../../lib/types.js";
import PropTypes from "prop-types";
import SamplesTable from "./SamplesTable.js";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

export default function PopulationAndSampleCharts({ data, addSamples, selected, samples, selectSample }) {
  const sample = selected ? selected : {data: []};

  const mainSeries = [{name: "data", data: data}, {name: "sample", data: sample.data}];

  const sampleSeries = [
    {
      name: "best fit line",
      type: "line",
      data: [{x: 0}, {x: 15}, ...sample.data].map((point) => (
        {x: point.x, y: _.round((point.x * sample.slope) + sample.intercept, 2)}
      )),
      label: {
        format: `<div>slope: ${sample.slope}</div>`
      },
      marker: false,
      showInLegend: sample.data.length > 0,
      color: "black",
      enableMouseTracking: false,
    },
    {
      name: "sample",
      data: sample.data,
      color: "orange",
      marker: {
        lineWidth: 1,
        lineColor: "orange"
      },
    }
  ];

  return (
    <Container>
      <Row>
        <Col lg={{size: 12, offset: 0}} xl={{size: 8, offset: 2}}>
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
        </Col>
      </Row>
      <br/>
      <Row md={1} lg={2}>
        <Col>
          <Alert color="primary">
            <p>Try drawing some samples and observe the line of best fit on the graph</p>
            <SampleSizeInput maxSize={1000} handleClick={addSamples}/>
          </Alert>
          <SamplesTable samples={samples} setSelected={selectSample} selected={selected}/>
        </Col>
        <Col>
          <div style={{marginLeft: "20%"}}>
            <InlineMath math="\widehat{Test\ Score}_i = \hat{\beta}_0 + \hat{\beta}_1{Study\ Hours_i}"/>
          </div>
          <ScatterPlot
            series={sampleSeries}
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
  data: dataObjectArrayType.isRequired,
  addSamples: PropTypes.func.isRequired,
  selected: olsSampleType,
  samples: PropTypes.arrayOf(olsSampleType).isRequired,
  selectSample: PropTypes.func.isRequired
}
