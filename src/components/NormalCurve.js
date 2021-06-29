import { useState, useEffect } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import BellCurve from 'highcharts/modules/histogram-bellcurve';
import { generateNormal } from "../lib/stats-utils.js";

BellCurve(Highcharts);


export default function NormalCurve() {
  const [chart, setChart] = useState({});

  useEffect(() => {

    const newChart = {
      plotOptions: {
        series: {
          animation: {
            duration: 100,
            easing: 'easeOutBounce'
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
      },
      series: [
        {
          name: 'Bell curve',
          type: 'bellcurve',
          baseSeries: 1,
          zIndex: -1,
          color: "#aaaaaa"
        },
        {
          name: 'Data',
          type: 'scatter',
          data: generateNormal(2000, 64, 3),
          visible: false,
          showInLegend: false
        },
        {
          name: "means",
          type: "scatter",
          data: [{x: 64, y: 0.1}]
        }
      ]
    }

    setChart(newChart);
  }, []);

  return <HighchartsReact highcharts={Highcharts} options={chart}/>
}
