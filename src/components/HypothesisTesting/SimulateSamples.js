import { useState, useEffect } from "react";
import { dataFromDistribution } from "../../lib/stats-utils";
import DotPlot from "../DotPlot.js";
import NormalCurve from "./NormalCurve.js";
import { Container, Row, Col } from "reactstrap";

export default function SimulateSamples({ mue0 }) {
  const [population, setPopulation] = useState([]);

  useEffect(() => {
    setPopulation(dataFromDistribution("Normal", 2000, { mean: mue0, standardDev: 3 }))
  }, [mue0]);

  return (
    <Container>
      <Row>
        <Col>
          <DotPlot series={[{name: "Population", data: population}]} title="Population"/>
        </Col>
        <Col>
          <NormalCurve population={(population.length > 0) ? population.map((obj) => obj.x) : []}/>
        </Col>
      </Row>
    </Container>
  )
}
