import { useState, useEffect } from "react";
import { dataFromDistribution } from "../../lib/stats-utils";
import DotPlot from "../DotPlot.js";
import NormalCurve from "./NormalCurve.js";
import ManySamplesInput from "../ManySamplesInput.js";
import { Container, Row, Col } from "reactstrap";
import _ from "lodash";
import { populationMean } from "../../lib/stats-utils.js";

export default function SimulateSamples({ mue0 }) {
  const [population, setPopulation] = useState([]);
  const [sampleMeans, setSampleMeans] = useState([]);

  useEffect(() => {
    setPopulation(dataFromDistribution("Normal", 2000, { mean: mue0, standardDev: 3 }))
  }, [mue0]);

  const addSamples = (size, replications=1) => {
    if (!size) {  // calling generateSamples with no arguments clears the data
      setSampleMeans([]);
    } else {
      const means = [];
      for (let i = 0; i < replications; i++) {
        const sample = _.sampleSize(population, size);
        const mean = _.round(populationMean(sample), 1);
        means.push(mean);
      }
      const newSampleMeans = [...sampleMeans, ...means];
      setSampleMeans(newSampleMeans);
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <DotPlot series={[{name: "Population", data: population}]} title="Population"/>
        </Col>
        <Col>
          <NormalCurve population={(population.length > 0) ? population.map((obj) => obj.x) : []} means={sampleMeans}/>
        </Col>
      </Row>
      <ManySamplesInput populationSize={population.length} addSamples={addSamples}/>
    </Container>
  )
}
