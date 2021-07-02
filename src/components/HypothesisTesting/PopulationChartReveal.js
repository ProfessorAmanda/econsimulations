import { Container, Row, Alert } from "reactstrap";
import DotPlot from "../DotPlot.js";
import PropTypes from "prop-types";
import { dataObjectArrayType } from "../../lib/types.js";
import { populationMean } from "../../lib/stats-utils.js";
import { max } from "mathjs";

export default function PopulationChartReveal({ popArr, pVal, alpha, mu0 }) {
  const popMean = populationMean(popArr);

  const series = [
    {
      name: "Population",
      data: popArr
    },
    {
      type: "line",
      name: "True Population Mean",
      data: [{x: popMean || 0, y: 0}, {x: popMean || 0, y: max(popArr.map(({ y }) => y))}],
      color: "blue",
      enableMouseTracking: false,
      showInLegend: false,
      label: {
        format: `<div>True Population Mean: ${popMean.toFixed(2)}</div>`
      }
    },
    {
      type: "line",
      name: "Mu_0",
      data: [{x: mu0 || 0, y: 0}, {x: mu0 || 0, y: max(popArr.map(({ y }) => y))}],
      color: "red",
      enableMouseTracking: false,
      showInLegend: false,
      label: {
        format: `<div>Mu_0: ${mu0}</div>`
      }
    }
  ];

  return (
    <Container>
      <Row>
        <Container fluid>
          <Row>
            <Alert color="secondary">
              We queried the monthly Milk Production of {popArr.length} cows and plotted the results on the following chart.
            </Alert>
          </Row>
          <Row>
            <DotPlot
              series={series}
              title="Milk Production"
              xLabel="Gallons"
            />
          </Row>
        </Container>
      </Row>
      <Row>
        <p>Our hypothesis test conclusion was therefore {(pVal < alpha) ? "correct" : "incorrect"}.</p>
      </Row>
    </Container>
  )
}

PopulationChartReveal.propTypes = {
  popArr: dataObjectArrayType.isRequired,
  pVal: PropTypes.number.isRequired,
  alpha: PropTypes.number.isRequired,
  mu0: PropTypes.number.isRequired
}
