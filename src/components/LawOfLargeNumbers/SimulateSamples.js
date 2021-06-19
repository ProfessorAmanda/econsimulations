import React, { useEffect, useState } from 'react';
import { mean } from "mathjs";
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import { Collapse, Card, CardBody } from 'reactstrap';
import '../../styles/dark-unica.css';
import _ from "lodash";

export default function SimulateSamples({ type, popArray, popMean }) {
  const [sampled, setSampled] = useState([]);
  const [meanLine, setMeanLine] = useState([]);
  const [chart, setChart] = useState({});

  useEffect(() => {
    const newChart = {
      chart: {
        type: 'line',
        animation: false
      },
      plotOptions: {
        series: {
          animation: {
            duration: 0
          },
          states: {
            hover: {
              enabled: false
            },
            select: {
              enabled: false
            },
            normal: {
              animation: false
            },
            inactive: {
              enabled: false
            }
          }
        }
      },
      title: {
        text: `Population vs Sample Means <br /> (${type})`,
      },
      xAxis: {
        title : {
          text: 'Sample Size'
        },
        min: 0,
        max: 1000
      },
      yAxis: {
        title: {
          text: 'Mean'
        }
      },
      tooltip: {
        enabled: true
      },
      series: [
        {
          name: 'Population Mean',
          data: meanLine,
          label: {
            enabled: false
          },
          color: "red"
        },
        {
          name: 'Sampled Means',
          data: sampled,
          label: {
            enabled: false
          },
          color: "black"
        }
      ]
    }

    setChart(newChart);
  }, [sampled, meanLine, type, popArray, popMean]);

  useEffect(() => {
    setSampled([]);
    setMeanLine([]);
    for (let n = 1; n <= 1000; n++) {
      setTimeout(function run() {
        const sample = _.sampleSize(popArray, n).map(p => p[0]);
        const avg = _.round(mean(sample), 2);
        setSampled(samples => [...samples, {y: avg}]);
        setMeanLine(meanLine => [...meanLine, {y: popMean}]);
      }, n);
    }
  }, []);  // eslint-disable-line

  return (
    <Collapse isOpen>
      <Card outline style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>
        <CardBody style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>
          <HighchartsReact highcharts={Highcharts} options={chart}/>
        </CardBody>
      </Card>
    </Collapse>
  );
}
