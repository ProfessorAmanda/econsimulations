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
import { distributionType, popShapeType } from "../../lib/types";
import { sqrt } from "mathjs";

export default function SimulateTypeOneError({ popShape, mue0, alpha, distType, sides }) {
  const [population, setPopulation] = useState([]);
  const [sampleMeans, setSampleMeans] = useState([]);
  const [sampleSize, setSampleSize] = useState(0);

  useEffect(() => {
    setPopulation(dataFromDistribution(popShape, 2000, { mean: mue0, standardDev: 3, low: mue0 - 10, hi: mue0 + 10 }))
  }, [mue0, popShape]);

  const addSamples = (size, replications=1) => {
    if (!size) {  // calling addSamples with no arguments clears the data
      setSampleMeans([]);
    } else {
      const means = [];
      for (let i = 0; i < replications; i++) {
        const sample = _.sampleSize(population, size);
        const sampleMean = populationMean(sample);
        const testStatistic = (
          (distType === "Z")
          ? jStat.zscore(sampleMean, mue0, populationStandardDev(population) / sqrt(size))
          : jStat.tscore(sampleMean, mue0, populationStandardDev(sample), size)
        );
        const pValue = (
          (distType === "Z")
          ? jStat.ztest(testStatistic, sides)
          : jStat.ttest(testStatistic, size, sides)
        );
        const sampleObject = {
          testStatistic: _.round(testStatistic, 2),
          mean: _.round(sampleMean, 2),
          reject: pValue < alpha
        }
        means.push(sampleObject);
      }
      const newSampleMeans = [...sampleMeans, ...means];
      setSampleMeans(newSampleMeans);
      setSampleSize(size);
    }
  }

  return (
    <Container>
      <p style={{marginTop: 50, marginBottom: 50}}>
        "Now we simulation Type I error. In other words, if the true mean were actually {mue0}, how often would we (incorrectly) reject the null hypothesis?"
      </p>
      <Row>
        <Col>
          <DotPlot series={[{name: "Population", data: population}]} title="Population" xLabel="Gallons"/>
        </Col>
        <Col>
          <NormalCurve
            means={sampleMeans}
            mue0={mue0}
            popStandardDev={_.defaultTo(populationStandardDev(population), 0)}
            sampleSize={+sampleSize || 1}
          />
        </Col>
      </Row>
      <ManySamplesInput populationSize={population.length} addSamples={addSamples}/>
    </Container>
  )
}

SimulateTypeOneError.propTypes = {
  popShape: popShapeType.isRequired,
  mue0: PropTypes.number.isRequired,
  alpha: PropTypes.number.isRequired,
  distType: distributionType.isRequired,
  sides: PropTypes.oneOf([1, 2]).isRequired
}
