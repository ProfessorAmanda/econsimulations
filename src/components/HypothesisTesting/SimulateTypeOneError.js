import { useState, useEffect } from "react";
import { dataFromDistribution, populationStandardDev } from "../../lib/stats-utils";
import DotPlot from "../DotPlot.js";
import NormalCurve from "./NormalCurve.js";
import ManySamplesInput from "../ManySamplesInput.js";
import { Container, Row, Col } from "reactstrap";
import _ from "lodash";
import { populationMean } from "../../lib/stats-utils.js";
import { jStat } from "jstat";
import PropTypes from "prop-types";
import { distributionType } from "../../lib/types";
import { sqrt } from "mathjs";

export default function SimulateTypeOneError({ mue0, alpha, distType, tails }) {
  const [population, setPopulation] = useState([]);
  const [sampleMeans, setSampleMeans] = useState([]);

  useEffect(() => {
    setPopulation(dataFromDistribution("Normal", 2000, { mean: mue0, standardDev: 3 }))
  }, [mue0]);

  const addSamples = (size, replications=1) => {
    if (!size) {  // calling addSamples with no arguments clears the data
      setSampleMeans([]);
    } else {
      const means = [];
      for (let i = 0; i < replications; i++) {
        const sample = _.sampleSize(population, size);
        const sampleMean = populationMean(sample);
        const pValue = (
          (distType === "Z")
          ? jStat.ztest(sampleMean, mue0, 3 / sqrt(size), tails)
          : jStat.ttest(sampleMean, mue0, populationStandardDev(sample), size, tails)
        );
        const sampleObject = {
          mean: _.round(sampleMean, 2),
          reject: pValue < alpha
        }
        means.push(sampleObject);
      }
      const newSampleMeans = [...sampleMeans, ...means];
      setSampleMeans(newSampleMeans);
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <DotPlot series={[{name: "Population", data: population}]} title="Population" xLabel="Gallons"/>
        </Col>
        <Col>
          <NormalCurve population={(population.length > 0) ? population.map((obj) => obj.x) : []} means={sampleMeans}/>
        </Col>
      </Row>
      <ManySamplesInput populationSize={population.length} addSamples={addSamples}/>
    </Container>
  )
}

SimulateTypeOneError.propTypes = {
  mue0: PropTypes.number.isRequired,
  alpha: PropTypes.number.isRequired,
  distType: distributionType.isRequired,
  tails: PropTypes.oneOf([1, 2]).isRequired
}
