import React, { useState, useEffect } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import Label from 'highcharts/modules/series-label';

Label(Highcharts);


export default function DotPlot({ series, title, xMin, xMax, yMax, xLabel, yLabel }) {
  const [chart, setChart] = useState({});

  useEffect(() => {
    const newChart = {
      chart: {
        type: 'scatter',
      },
      plotOptions: {
        series: {
          animation: {
            duration: 100,
            easing: 'easeOutBounce'
          },
        }
      },
      legend: {
        symbolHeight: 12,
        symbolWidth: 12,
        symbolRadius: 6
      },
      xAxis: {
        min: xMin,
        max: xMax,
        title : {
          enabled: true,
          text: xLabel
        },
        startOnTick: true,
        endOnTick: true
      },
      title: {
        text: title
      },
      yAxis: {
        max: yMax,
        startOnTick: true,
        endOnTick: true,
        title: {
          text: yLabel
        }
      },
      tooltip: {
        enabled: true,
        pointFormat: `${xLabel}: <b>{point.x}</b><br />`
      },
      series: series.map((seriesObject) => (
        {
          showInLegend: seriesObject.data.length > 0,
          turboThreshold: 0,
          ...seriesObject,
          data: seriesObject.data.map(([x, y]) => ({ x, y }))
        })
      )
    }
    setChart(newChart);
  }, [series, title, xMin, xMax, yMax, xLabel, yLabel]);

  return <HighchartsReact highcharts={Highcharts} options={chart}/>
}
