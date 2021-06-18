import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Alert } from "reactstrap";
import _ from "lodash";
import More from "highcharts/highcharts-more";

More(Highcharts);

const values = {
  Normal: { xmaxval: 74, xminval: 56, title: "Milk Production", xLabel: "Gallons" },
  Uniform: { xmaxval: 74, xminval: 56, title: "Alien Female Height", xLabel: "Height (in)"},
  Exponential: { xmaxval: 400, xminval: 0, title: "Duration of Telemarketer Call", xLabel: "Duration (seconds)"},
  "Chi-Squared": {xmaxval: 25, xminval: 0, title: "Money Spent on Lunch", xLabel: "Dollars"}
  }

export default function ConfidenceIntervalsChart({ confidenceLevel, samples, distType }) {
  const [chart, setChart] = useState({});

  useEffect(() => {
    const { xmaxval, xminval, title, xLabel } = values[distType];

    const sampleMeans = [];
    const containsMean = [];
    const doesntContainMean = [];

    samples.forEach(({ mean, lowerConf, upperConf, label }) => {
      sampleMeans.push(mean);
      if (label) {
        containsMean.push([lowerConf, upperConf])
      } else {
        doesntContainMean.push([lowerConf, upperConf])
      }
    });

    const newChart = {
      chart: {
        type: 'columnrange',
        inverted: true,
        zoomType: 'xy',
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
            }
          }
        }
      },
      title: {
        text: title
      },
      xAxis: {
        reversed: false,
        min: 0,
        max: (samples.length > 10) ? samples.length : 10,
        startOnTick: true,
        title: {
          text: "Sample Number"
        },
        tickPixelInterval: 1,
        tickInterval: 1
      },
      yAxis: {
        min: xminval,
        max: xmaxval,
        startOnTick: true,
        endOnTick: true,
        title: {
          text: xLabel
        }
      },
      series: [
        {
          name: "Confidence Interval",
          data: containsMean,
          color: "rgba(0, 170, 0, 0.5)",
          showInLegend: false,
        },
        {
          name: "Confidence Interval",
          data: doesntContainMean,
          color: "rgba(255, 0, 0, 0.5)",
          showInLegend: false
        },
        {
          name: "Sample Means",
          type: "scatter",
          data: sampleMeans,
          color: "#616161",
          marker: {
            symbol: "diamond"
          },
          animation: {
            duration: 0
          }
        }
      ]
    }
    setChart(newChart);
  }, [confidenceLevel, samples, distType]);

  const sample = samples[samples.length - 1];

  return (
    <div>
      {
        sample &&
        <Alert color={sample.label ? "success" : "danger"} className="Center">
          Sample number {samples.length} has a mean of {sample.mean.toFixed(2)}, with {confidenceLevel}% CI ({_.round(sample.lowerConf, 2)}, {_.round(sample.upperConf, 2)}). CI contains the true mean? {sample.label.toString()}
        </Alert>
      }
      <HighchartsReact highcharts={Highcharts} options={chart}/>
    </div>
  );
}
