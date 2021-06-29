import { useState, useEffect } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import BellCurve from 'highcharts/modules/histogram-bellcurve';

BellCurve(Highcharts);


export default function NormalCurve({ population }) {
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
          enableMouseTracking: false,
          label: false
        },
        {
          name: 'Data',
          type: 'scatter',
          data: population,
          visible: false,
          showInLegend: false
        },
        {
          name: "means",
          type: "scatter",
          data: [],
          showInLegend: false
        }
      ]
    }

    setChart(newChart);
  }, [population]);

  return <HighchartsReact highcharts={Highcharts} options={chart}/>
}
