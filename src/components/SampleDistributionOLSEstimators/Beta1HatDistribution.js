import { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import DotPlot from "../DotPlot.js";
import MultipleSamplesInput from "./MultipleSamplesInput.js";
import regression from "regression";
import _ from "lodash";
import { getCounts } from "../../lib/stats-utils.js";
import { max, min } from "mathjs";

export default function Beta1HatDistribution({ data }) {
  const [sampleBetas, setSampleBetas] = useState([]);

  const addSamples = (size, replications=1) => {
    if (!size) {  // calling generateSamples with no arguments clears the data
      setSampleBetas([]);
    } else {
      const newSlopes = [];
      for (let i = 0; i < replications; i++) {
        const sample = _.sampleSize(data, size);
        const { equation } = regression.linear(sample.map(({x, y}) => [x, y]), { precision: 2 });
        newSlopes.push(equation[0]);
      }
      setSampleBetas([...sampleBetas, ...getCounts(newSlopes)])
    }
  }

  return (
    <Container>
      <Row md={1} lg={2}>
        <Col>
          <DotPlot
            series={[{name: "slopes", data: sampleBetas}]}
            title="Distribution of Sample Slopes"
            xMin={min(-5, ...sampleBetas.map(({ x }) => x))}
            xMax={max(5, ...sampleBetas.map(({ x }) => x))}
            yMax={max(4, ...sampleBetas.map(({ y }) => y))}
            xLabel="Slope"
          />
        </Col>
        <Col>
          <MultipleSamplesInput populationSize={data.length} addSamples={addSamples}/>
        </Col>
      </Row>
    </Container>
  )
}
