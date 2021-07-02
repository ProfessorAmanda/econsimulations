import { useState, useEffect } from "react";
import { dataFromDistribution, populationMean, populationStandardDev } from "../../lib/stats-utils";
import DotPlot from "../DotPlot.js";
import NormalCurve from "./NormalCurve.js";
import ManySamplesInput from "./ManySamplesInput.js";
import { Container, Row, Col, Alert, Input, Label } from "reactstrap";
import _ from "lodash";
import { jStat } from "jstat";
import PropTypes from "prop-types";
import { distributionType, popShapeType } from "../../lib/types.js";
import { sqrt } from "mathjs";
import StdNormalCurve from "./StdNormalCurve.js";

export default function SimulateTypeOneError({ popShape, mu0, alpha, distType, sides, equality }) {
  const [population, setPopulation] = useState([]);
  const [sampleMeans, setSampleMeans] = useState([]);
  const [sampleSize, setSampleSize] = useState(0);
  const [normalized, setNormalized] = useState(false);

  useEffect(() => {
    setPopulation(dataFromDistribution(popShape, 2000, { mean: mu0, standardDev: 3, low: mu0 - 10, hi: mu0 + 10 }))
  }, [mu0, popShape]);

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
          ? jStat.zscore(sampleMean, mu0, populationStandardDev(population) / sqrt(size))
          : jStat.tscore(sampleMean, mu0, populationStandardDev(sample), size)
        );
        const pValue = (
          (distType === "Z")
          ? jStat.ztest(testStatistic, sides)
          : jStat.ttest(testStatistic, size - 1, sides)
        );
        const sampleObject = {
          testStatistic: _.round(testStatistic, 2),
          mean: _.round(sampleMean, 2),
          reject: !(((equality === ">=") && (testStatistic > 0)) || ((equality === "<=") && (testStatistic < 0))) && pValue <= alpha
        };
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
        Now we simulate Type I error. In other words, if the true mean were actually {mu0}, how often would we (incorrectly) reject the null hypothesis?
      </p>
      <Row>
        <Col>
          <DotPlot series={[{name: "Population", data: population, showInLegend: false}]} title="Population" xLabel="Gallons"/>
        </Col>
        <Col>
          {!normalized ? (
            <NormalCurve
              means={sampleMeans}
              mu0={mu0}
              popStandardDev={_.defaultTo(populationStandardDev(population), 0)}
              sampleSize={+sampleSize || 1}
              distType={distType}
            />
          ) : (
            <StdNormalCurve
              means={sampleMeans}
              sampleSize={+sampleSize || 1}
              distType={distType}
            />
          )}
          <Label>
            <Input type="checkbox" onClick={() => setNormalized(!normalized)}/>
            {" "}Normalized
          </Label>
        </Col>
      </Row>
      <ManySamplesInput populationSize={population.length} addSamples={addSamples}/>
      {(sampleMeans.length > 0) && (
        <Alert color="info">
          Out of {sampleMeans.length} samples, we rejected the null hypothesis {sampleMeans.filter(({ reject }) => reject).length} times ({_.round(100 * sampleMeans.filter(({ reject }) => reject).length / sampleMeans.length, 2)}%).
        </Alert>
      )}
    </Container>
  )
}

SimulateTypeOneError.propTypes = {
  popShape: popShapeType.isRequired,
  mu0: PropTypes.number.isRequired,
  alpha: PropTypes.number.isRequired,
  distType: distributionType.isRequired,
  sides: PropTypes.oneOf([1, 2]).isRequired,
  equality: PropTypes.oneOf(["<=", ">=", "="]).isRequired,
}
