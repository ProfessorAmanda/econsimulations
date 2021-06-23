import React from "react";
import DotPlot from "../DotPlot";
import { Alert, Container } from "reactstrap";
import _ from "lodash";
import PropTypes from 'prop-types';
import { dataArrayType, popShapeType } from "../../lib/types.js";

export default function PopulationChart({ popArray, popMean, sampled, popShape }) {

  const values = {
    Normal: { xmaxval: 74, xminval: 56, ymaxval: 40, title: "Milk Production", xLabel: "Gallons" },
    Uniform: { xmaxval: 74, xminval: 56, ymaxval: 25, title: "Alien Female Height", xLabel: "Height (in)"},
    Exponential: { xmaxval: 400, xminval: 0, ymaxval: 10, title: "Duration of Telemarketer Call", xLabel: "Duration (seconds)"},
    "Chi-Squared": {xmaxval: 25, xminval: 0, ymaxval: 40, title: "Money Spent on Lunch", xLabel: "Dollars"}
  }

  const texts = {
    Normal: ["monthly Milk Production", "cows"],
    Uniform: ['the height', 'Alien Females from planet Stata'],
    Exponential: ["duration", "Telemarketer Calls"],
    "Chi-Squared": ["expenditure", "workers on lunch"]
  }

  const { xmaxval, xminval, ymaxval, title, xLabel } = values[popShape];

  const series = [
    {
      name: 'Population',
      data: popArray
    },
    {
      name: 'Samples',
      data: sampled
    }
  ];

  return (
    <Container fluid>
      <Alert color="secondary" className="Center">
        We queried the {texts[popShape][0]} of {popArray.length} {texts[popShape][1]} and plotted the results on the following chart.
      </Alert>
      <DotPlot
        series={series}
        title={`${title} <br /> Population Mean: ${_.round(popMean, 2)}`}
        xMin={xminval}
        xMax={xmaxval}
        yMax={ymaxval}
        xLabel={xLabel}
      />
  </Container>
  );
}

PopulationChart.propTypes = {
  popArray: dataArrayType.isRequired,
  popMean: PropTypes.number,
  sampled: dataArrayType.isRequired,
  popShape: popShapeType.isRequired
}
