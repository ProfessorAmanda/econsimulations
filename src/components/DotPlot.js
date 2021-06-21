import React, { useState, useEffect } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import Label from 'highcharts/modules/series-label';
import {PropTypes} from 'prop-types';

Label(Highcharts);


export default function DotPlot({ series, title, xMin, xMax, yMax, xLabel }) {
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
          text: "Count"
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
  }, [series, title, xMin, xMax, yMax, xLabel]);

  return <HighchartsReact highcharts={Highcharts} options={chart}/>
}
DotPlot.propTypes = {

    series : PropTypes.object, 
    title  : PropTypes.object, 
    xMin  : PropTypes.number, 
    xMax  : PropTypes.number, 
    yMax : PropTypes.number, 
    xLabel : PropTypes.string, 
    yLabel : PropTypes.string,
}