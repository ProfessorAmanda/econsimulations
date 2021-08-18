import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import PropTypes from 'prop-types';
import { highchartsSeriesType } from '../lib/types';
import '../styles/dark-unica.css';
require('highcharts/modules/series-label')(Highcharts);

export default function DotPlot({ series, title, xMin, xMax, yMax, xLabel, yLabel, animation, zoom }) {
  const [chart, setChart] = useState({});

  useEffect(() => {
    const newChart = {
      chart: {
        type: 'scatter',
        animation: !!animation
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
        title: {
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
        min: 0,
        max: yMax,
        startOnTick: true,
        endOnTick: true,
        title: {
          text: yLabel || 'Count'
        }
      },
      series: series.map((seriesObject) => (
        {
          showInLegend: seriesObject.data.length > 0,
          turboThreshold: 0,
          tooltip: {
            pointFormat: `${xLabel}: <b>{point.x}</b><br />`
          },
          ...seriesObject
        })
      )
    }
    setChart(newChart);
  }, [series, title, xMin, xMax, yMax, xLabel, yLabel, animation, zoom]);

  return <HighchartsReact highcharts={Highcharts} options={chart}/>
}

DotPlot.propTypes = {
  series: highchartsSeriesType.isRequired,
  title: PropTypes.string,
  xMin: PropTypes.number,
  xMax: PropTypes.number,
  yMax: PropTypes.number,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  animation: PropTypes.bool,
  zoom: PropTypes.bool
}
