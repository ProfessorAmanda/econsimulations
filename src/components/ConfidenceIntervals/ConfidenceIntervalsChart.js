import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Alert } from "reactstrap";
import _ from "lodash";
import More from "highcharts/highcharts-more";
import { max } from "mathjs";

More(Highcharts);

const values = {
  Normal: { xmaxval: 74, xminval: 56, title: "Milk Production", xLabel: "Gallons" },
  Uniform: { xmaxval: 74, xminval: 56, title: "Alien Female Height", xLabel: "Height (in)"},
  Exponential: { xmaxval: 400, xminval: 0, title: "Duration of Telemarketer Call", xLabel: "Duration (seconds)"},
  "Chi-Squared": {xmaxval: 25, xminval: 0, title: "Money Spent on Lunch", xLabel: "Dollars"}
  }

export default function ConfidenceIntervalsChart({ confidenceLevel, samples, distType, popMean }) {
  const [chart, setChart] = useState({});

  useEffect(() => {
    const { xmaxval, xminval, title, xLabel } = values[distType];

    const sampleMeans = [];
    const containsMean = [];
    const doesntContainMean = [];

    samples.forEach((sampleObject, index) => {
      sampleMeans.push({
        ...sampleObject,
        x: index,
        y: sampleObject.mean
      });
      if (sampleObject.label) {
        containsMean.push({
          ...sampleObject,
          low: sampleObject.lowerConf,
          high: sampleObject.upperConf,
          x: index
        })
      } else {
        doesntContainMean.push({
          ...sampleObject,
          low: sampleObject.lowerConf,
          high: sampleObject.upperConf,
          x: index
        })
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
        max: max(samples.length, 10),
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
          centerInCategory: true,
          showInLegend: false,
          tooltip: {
            headerFormat: "",
            pointFormat: "Sample Size: <b>{point.size}</b><br/>Sample Mean: <b>{point.mean}</b><br/>Lower Confidence Interval: <b>{point.lowerConf}</b><br/>Upper Confidence Interval: <b>{point.upperConf}</b><br/>"
          },
          animation: {
            duration: 0
          },
        },
        {
          name: "Confidence Interval",
          data: doesntContainMean,
          color: "rgba(255, 0, 0, 0.5)",
          centerInCategory: true,
          showInLegend: false,
          tooltip: {
            headerFormat: "",
            pointFormat: "Sample Size: <b>{point.size}</b><br/>Sample Mean: <b>{point.mean}</b><br/>Lower Confidence Interval: <b>{point.lowerConf}</b><br/>Upper Confidence Interval: <b>{point.upperConf}</b><br/>"
          },
          animation: {
            duration: 0
          },
        },
        {
          name: "Sample Means",
          type: "scatter",
          data: sampleMeans,
          marker: {
            enabled: (samples.length <= 300),
            symbol: "diamond",
            radius: 2
          },
          animation: {
            duration: 0
          },
          tooltip: {
            headerFormat: "",
            pointFormat: "Sample Size: <b>{point.size}</b><br/>Sample Mean: <b>{point.mean}</b><br/>Lower Confidence Interval: <b>{point.lowerConf}</b><br/>Upper Confidence Interval: <b>{point.upperConf}</b><br/>"
          }
        },
        {
          type: 'line',
          name: 'Population Mean',
          data: [[0, popMean], [samples.length, popMean]],
          color: 'gray',
          enableMouseTracking: false,
          showInLegend: false,
          label: {
            enabled: false
          },
          marker: {
            enabled: false
          },
          zIndex: -5
        }
      ]
    }
    setChart(newChart);
  }, [confidenceLevel, samples, distType, popMean]);

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
