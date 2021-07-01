import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official"
import '../../styles/dark-unica.css';
import BellCurve from "highcharts/modules/histogram-bellcurve";
import { hypothesisTestingSampleArrayType } from "../../lib/types";
import PropTypes from "prop-types";
import _ from "lodash";
import { dataFromDistribution } from "../../lib/stats-utils";
import { sqrt } from "mathjs";

BellCurve(Highcharts);


export default function NormalCurve({ means, mue0, popStandardDev, sampleSize }) {
  const [population, setPopulation] = useState(
    dataFromDistribution("Normal", 2000, { mean: mue0, standardDev: popStandardDev / sqrt(sampleSize) })
  );
  const [chart, setChart] = useState({
    chart: {
      zoomType: "xy"
    },
    plotOptions: {
      series: {
        animation: {
          duration: 100,
          easing: "easeOutBounce"
        },
      }
    },
    title: {
      text: "Sample Means"
    },
    xAxis: {
      title: {
        text: "Gallons",
      },
      startOnTick: true,
      endOnTick: true
    },
    yAxis: {
      startOnTick: true,
      endOnTick: true,
      title: false
    },
    tooltip: {
      pointFormat: "sample mean: <b>{point.mean}</b><br/>test statistic: <b>{point.testStatistic}</b><br/>reject H_0: <b>{point.reject}</b></br>"
    }
  });

  useEffect(() => {
    setPopulation(dataFromDistribution("Normal", 2000, { mean: mue0, standardDev: popStandardDev / sqrt(sampleSize) }))
  }, [mue0, popStandardDev, sampleSize]);

  useEffect(() => {
    const meanCounts = {};
    const rejects = [];
    const accepts = [];
    means.forEach(({ testStatistic, mean, reject }) => {
      meanCounts[mean] = _.defaultTo(meanCounts[mean] + 1, 1);
      const meanObject = {
        x: mean,
        y: meanCounts[mean] * 0.005 * sqrt(sampleSize),
        testStatistic,
        mean,
        reject,
      }
      if (reject) {
        rejects.push(meanObject)
      } else {
        accepts.push(meanObject)
      }
    });

    const newChart = {
      series: [
        {
          name: "Normal Distribution",
          type: "bellcurve",
          baseSeries: 1,
          zIndex: -1,
          enableMouseTracking: false,
          label: false,
          showInLegend: false
        },
        {
          name: "Data",
          type: "scatter",
          data: population.map(({ x }) => x),
          visible: false,
          showInLegend: false
        },
        {
          name: "Sample Means",
          type: "scatter",
          data: accepts,
          color: "#03fc0b",
          showInLegend: false,
          marker: {
            symbol: "diamond",
            radius: 4,
            lineColor: "green",
            lineWidth: 1
          }
        },
        {
          name: "Sample Means",
          type: "scatter",
          data: rejects,
          color: "red",
          showInLegend: false,
          marker: {
            symbol: "diamond",
            radius: 4,
            lineColor: "#800000",
            lineWidth: 1
          }
        }
      ]
    }

    setChart(newChart);
  }, [means, population, sampleSize]);

  return <HighchartsReact highcharts={Highcharts} options={chart}/>
}

NormalCurve.propTypes = {
  means: hypothesisTestingSampleArrayType.isRequired,
  mue0: PropTypes.number.isRequired,
  popStandardDev: PropTypes.number.isRequired,
  sampleSize: PropTypes.number.isRequired
}
