/*

  Displays a table of values and a corresponding HighCharts plot

  props:
    popArray   - array
    popMean    - float
    sampled    - array
    popType    - string
    sampleSize - int
*/

import React, { useEffect, useState } from 'react';
import '../styles/dark-unica.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import { Alert, Container, Col, Row } from 'reactstrap';
import PopTable from './PopTable.js'
import '../boost.js';

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

export default function ChartContainer({ popArray, popMean, sampled, popType }) {
  const [myChart, setMyChart] = useState();

  useEffect(() => {
    const { xmaxval, xminval, ymaxval, title, xLabel } = values[popType];

    const newChart = {
      chart: {
        type: 'scatter',
      },
      plotOptions: {
        series: {
          animation: {
            duration: 100,
            easing: 'easeOutBounce'
          }
        }
      },
      legend: {
        symbolHeight: 12,
        symbolWidth: 12,
        symbolRadius: 6
      },
      xAxis: {
        min: xminval,
        max: xmaxval,
        title : {
          enabled: true,
          text: xLabel
        },
        startOnTick: true,
        endOnTick: true
      },
      title: {
        text: `${title} <br /> Population Mean: ${Math.round(popMean * 100) / 100}`
      },
      yAxis: {
        max: ymaxval,
        startOnTick: true,
        endOnTick: true,
        title: {
          text: 'Count'
        }
      },
      tooltip: {
        enabled: true,
        pointFormat: `${xLabel}: <b>{point.x}<b><br />`
      },
      series: [
        {name: 'Population Observations', data: popArray},
        {name: 'Sampled Observations', data: sampled.map(([x, y]) => {return {x, y}})}
      ],
      boost: {
        enabled: true,
        useGPUTranslations: true
      },
    }

    setMyChart(newChart);
  }, [popArray, sampled]);  // eslint-disable-line

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
              <HighchartsReact highcharts={Highcharts} options={myChart}/>
            </Col>
          </Row>
      </Container>
    </div>
  );
}
