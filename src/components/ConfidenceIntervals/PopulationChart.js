import React from "react";
import DotPlot from "../DotPlot";
import { Row, Alert, Col, Container } from "reactstrap";
import _ from "lodash";

export default function PopulationChart({ popArray, popMean, sampled, distType }) {

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

  const { xmaxval, xminval, ymaxval, title, xLabel } = values[distType];

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
        We queried the {texts[distType][0]} of {popArray.length} {texts[distType][1]} and plotted the results on the following chart.
      </Alert>
      <DotPlot
        series={series}
        title={`${title} <br /> Population Mean: ${_.round(popMean, 2)}`}
        xMin={xminval}
        xMax={xmaxval}
        yMax={ymaxval}
        xLabel={xLabel}
        yLabel={"Count"}
      />
  </Container>
  );

}
