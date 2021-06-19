/*

  Displays a table of values and a corresponding HighCharts plot

  Used by Law of Large Numbers and Central Limit Theorem

  props:
    popArray   - array
    popMean    - float
    sampled    - array
    popType    - string
    sampleSize - int
*/

import React from 'react';
import '../styles/dark-unica.css';
import DotPlot from './DotPlot';
import { Alert, Container, Col, Row } from 'reactstrap';
import PopTable from './PopTable.js'
import _ from "lodash";
import {PropTypes} from 'prop-types';

const values = {
  Normal: { xmaxval: 74, xminval: 56, ymaxval: 40, title: "Milk Production", xLabel: "Gallons" },
  Uniform: { xmaxval: 10, xminval: -10, ymaxval: 25, title: "Lottery Outcome", xLabel: "Dollars"},
  Exponential: { xmaxval: 400, xminval: 0, ymaxval: 10, title: "Duration of Telemarketer Call", xLabel: "Duration (seconds)"},
  "Chi-Squared": {xmaxval: 25, xminval: 0, ymaxval: 40, title: "Money Spent on Lunch", xLabel: "Dollars"},
  Mystery: { xmaxval: 80, xminval: 50, ymaxval: 40, title:"Alien Female Height", xLabel: "Height (in)"}
}

const texts = {
  Normal: ["monthly Milk Production", "cows","produced", " gallons a month."],
  //Uniform: ['the wait time', 'people at the DMV in VT', "reported a total time of", " minutes."],
  Exponential: ["duration", "Telemarketer Calls","reported a duration of", " seconds on a call."],
  "Chi-Squared": ["expenditure", "workers on lunch","reported an expenditure of"," dollars on lunch."],
  Mystery: ['the height', 'Alien Females from planet Stata', "reported a height of", " inches."],
}

export default function ChartContainer({ popArray, popMean, sampled, sampleMean, popType }) {
  const { xmaxval, xminval, ymaxval, title, xLabel } = values[popType];

  const series = [
    {
      name: 'Population Observations',
      data: popArray
    },
    {
      name: 'Sampled Observations',
      data: sampled
    },
    {
      type: 'line',
      name: 'Sample Mean',
      data: [[sampleMean, 0], [sampleMean, ymaxval]],
      color: 'red',
      enableMouseTracking: false,
      showInLegend: false,
      visible: (sampleMean !== undefined) && (sampled.length > 0),
      label: {
        format: `<div>Sample Mean: ${sampleMean}</div>`
      }
    }
  ];

  return (
    <div>
      <Container fluid style={{marginBottom: "2vh"}}>
        <Row>
          <Alert color="secondary" className="Center">
            {popType !== "Uniform" && <p>We queried the {texts[popType][0]} of {popArray.length} {texts[popType][1]} and plotted the results on the following chart.</p>}
            {popType === "Uniform" && <p>Behavioral economists studying loss aversion design a lottery among 2000 participants where each amount between -10 and +10 is equally likely.  We plotted the winnings and losses below.</p>}
          </Alert>
        </Row>
          <Row >
            <Col lg="2">
              <PopTable
                samples={sampled}
                popArray={popArray}
                popType={popType}
              />
            </Col>
            <Col lg="8">
              <DotPlot
                series={series}
                title={`${title} <br /> Population Mean: ${_.round(popMean, 2)}`}
                xMin={xminval}
                xMax={xmaxval}
                yMax={ymaxval}
                xLabel={xLabel}
                yLabel={"Count"}
              />
            </Col>
          </Row>
      </Container>
    </div>
  );
}

ChartContainer.PropTypes = {

  popArray : PropTypes.array ,
  popMean : PropTypes.number, 
  sampled : PropTypes.array, 
  sampleMean : PropTypes.number, 
  popType : PropTypes.string,

}