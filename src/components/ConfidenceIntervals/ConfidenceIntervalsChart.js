import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Alert } from "reactstrap";
import _ from "lodash";
import More from "highcharts/highcharts-more";
import { max } from "mathjs";
import {PropTypes} from 'prop-types';

More(Highcharts);

const values = {
  Normal: { xmaxval: 74, xminval: 56, title: "Milk Production", xLabel: "Gallons" },
  Uniform: { xmaxval: 74, xminval: 56, title: "Alien Female Height", xLabel: "Height (in)"},
  Exponential: { xmaxval: 400, xminval: 0, title: "Duration of Telemarketer Call", xLabel: "Duration (seconds)"},
  "Chi-Squared": {xmaxval: 25, xminval: 0, title: "Money Spent on Lunch", xLabel: "Dollars"}
  }

export default function ConfidenceIntervalsChart({ confidenceLevel, samples, popType, popMean, selected, setSelected }) {
  const [chart, setChart] = useState({});

  useEffect(() => {
    const { xmaxval, xminval, title, xLabel } = values[popType];

    const sampleMeans = [];
    const containsMean = [];
    const doesntContainMean = [];

    samples.forEach((sampleObject) => {
      sampleMeans.push({
        ...sampleObject,
        x: sampleObject.id,
        y: sampleObject.mean
      });
      if (sampleObject.label) {
        containsMean.push({
          ...sampleObject,
          low: sampleObject.lowerConf,
          high: sampleObject.upperConf,
          x: sampleObject.id
        })
      } else {
        doesntContainMean.push({
          ...sampleObject,
          low: sampleObject.lowerConf,
          high: sampleObject.upperConf,
          x: sampleObject.id
        })
      }
    });

    const tooltipFormat = {
      headerFormat: "",
      pointFormat: "Sample Size: <b>{point.size}</b><br/>Sample Mean: <b>{point.mean}</b><br/>Lower Bound of CI: <b>{point.lowerConf}</b><br/>Upper Bound of CI: <b>{point.upperConf}</b><br/>Confidence Level: <b>{point.confidenceLevel}%</b><br/>Distribution: <b>{point.distribution}</b><br/>",
      outside: true,
      borderColor: "gray",
    }

    const newChart = {
      chart: {
        type: 'columnrange',
        inverted: true,
        animation: false
      },
      plotOptions: {
        series: {
          point: {
            events: {
              click() {
                setSelected(this)
              }
            }
          },
          animation: {
            duration: 0
          },
          cursor: "pointer"
        }
      },
      title: {
        text: title
      },
      xAxis: {
        reversed: false,
        min: 1,
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
          tooltip: tooltipFormat,
          allowPointSelect: true,
          animation: {
            duration: 0
          },
          states: {
            hover: {
              color: "rgba(0, 170, 0, 1)"
            },
            inactive: {
              color: "rgba(0, 170, 0, 0.5)"
            },
            select: {
              enabled: false,
              color: "rgba(0, 170, 0, 0.5)"
            }
          }
        },
        {
          name: "Confidence Interval",
          data: doesntContainMean,
          color: "rgba(255, 0, 0, 0.5)",
          centerInCategory: true,
          showInLegend: false,
          tooltip: tooltipFormat,
          allowPointSelect: true,
          animation: {
            duration: 0
          },
          states: {
            hover: {
              color: "rgba(255, 0, 0, 1)"
            },
            inactive: {
              color: "rgba(255, 0, 0, 0.5)"
            },
            select: {
              enabled: false,
              color: "rgba(255, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "Sample Means",
          type: "scatter",
          data: sampleMeans,
          color: "#616161",
          marker: {
            enabled: true,
            symbol: "diamond",
            radius: 1
          },
          allowPointSelect: true,
          animation: {
            duration: 0
          },
          states: {
            hover: {
              enabled: false
            },
            select: {
              enabled: false,
            }
          },
          tooltip: tooltipFormat,
        },
        {
          type: "line",
          name: "Population Mean",
          data: [[0, popMean], [samples.length, popMean]],
          color: "gray",
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
  }, [confidenceLevel, samples, popType, popMean, setSelected]);

  const sample = selected || samples[samples.length - 1];

  return (
    <div>
      {
        sample ? (
          <Alert color={sample.label ? "success" : "danger"} className="Center">
            Sample number {sample.id} has a mean of {sample.mean.toFixed(2)}, with {confidenceLevel}% CI ({_.round(sample.lowerConf, 2)}, {_.round(sample.upperConf, 2)}). CI contains the population mean? {sample.label.toString()}
          </Alert>
        ) : <div style={{height: 80}}/>
      }
      <HighchartsReact highcharts={Highcharts} options={chart}/>
    </div>
  );
}
ConfidenceIntervalsChart.propTypes = {

  confidenceLevel : PropTypes.number, 
  samples : PropTypes.array , 
  popType : PropTypes.string, 
  popMean : PropTypes.number, 
  selected : PropTypes.string, 
  setSelected : PropTypes.func,
}