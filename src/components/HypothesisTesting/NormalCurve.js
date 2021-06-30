import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official"
import '../../styles/dark-unica.css';
import BellCurve from "highcharts/modules/histogram-bellcurve";
import PropTypes from "prop-types";
import _ from "lodash";

BellCurve(Highcharts);


export default function NormalCurve({ population, means }) {
  const [chart, setChart] = useState({
    plotOptions: {
      series: {
        animation: {
          duration: 100,
          easing: "easeOutBounce"
        },
      }
    },
    xAxis: {
      title : {
        enabled: true,
      },
      startOnTick: true,
      endOnTick: true
    },
    yAxis: {
      startOnTick: true,
      endOnTick: true,
    }
  });

  useEffect(() => {
    const meanCounts = _.countBy(means, (mean) => mean.mean);
    const rejects = [];
    const accepts = [];
    means.forEach(({ mean, reject }) => {
      const meanObject = {
        x: mean,
        y: meanCounts[mean] * 0.005,
      }
      meanCounts[mean] -= 1;
      if (reject) {
        rejects.push(meanObject)
      } else {
        accepts.push(meanObject)
      }
    });

    const newChart = {
      series: [
        {
          name: "Bell curve",
          type: "bellcurve",
          baseSeries: 1,
          zIndex: -1,
          enableMouseTracking: false,
          label: false
        },
        {
          name: "Data",
          type: "scatter",
          data: population,
          visible: false,
          showInLegend: false
        },
        {
          name: "accepts",
          type: "scatter",
          data: accepts,
          color: "#03fc0b",
          showInLegend: false,
          marker: {
            symbol: "diamond",
            radius: 4,
            lineColor: "black",
            lineWidth: 1
          }
        },
        {
          name: "rejects",
          type: "scatter",
          data: rejects,
          color: "red",
          showInLegend: false,
          marker: {
            symbol: "diamond",
            radius: 4,
            lineColor: "black",
            lineWidth: 1
          }
        }
      ]
    }

    setChart(newChart);
  }, [population, means]);

  return <HighchartsReact highcharts={Highcharts} options={chart}/>
}

NormalCurve.propTypes = {
  population: PropTypes.arrayOf(PropTypes.number).isRequired,
  means: PropTypes.arrayOf(PropTypes.number).isRequired
}
