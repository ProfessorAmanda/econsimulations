import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official"
import '../../styles/dark-unica.css';
import BellCurve from "highcharts/modules/histogram-bellcurve";
import { hypothesisTestingSampleArrayType } from "../../lib/types";
import { generateNormal } from "../../lib/stats-utils";

BellCurve(Highcharts);


export default function NormalCurve({ means }) {
  const [curveData, setCurveData] = useState([]);
  const [chart, setChart] = useState({
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
      pointFormat: "test statistic: <b>{point.testStatistic}</b><br/>sample mean: <b>{point.mean}</b><br/>reject H_0: <b>{point.reject}</b></br>"
    }
  });

  useEffect(() => {
    setCurveData(generateNormal(10000, 0, 1));
  }, []);

  useEffect(() => {
    const meanCounts = {};
    const rejects = [];
    const accepts = [];
    means.forEach(({ testStatistic, mean, reject }) => {
      meanCounts[testStatistic] = meanCounts[testStatistic] ? meanCounts[testStatistic] + 1 : 1;
      const meanObject = {
        x: testStatistic,
        y: meanCounts[testStatistic] * 0.005,
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
          name: "Standard Normal Distribution",
          type: "bellcurve",
          baseSeries: 1,
          zIndex: -1,
          enableMouseTracking: false,
          label: false
        },
        {
          name: "Data",
          type: "scatter",
          data: curveData,
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
  }, [means, curveData]);

  return <HighchartsReact highcharts={Highcharts} options={chart}/>
}

NormalCurve.propTypes = {
  means: hypothesisTestingSampleArrayType.isRequired
}
