import { useState, useEffect } from 'react';
import '../styles/dark-unica.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';
import { highchartsSeriesType, stringOrNumberType } from '../lib/types';

export default function ScatterPlot({
  series,
  title,
  xMin,
  xMax,
  yMin,
  yMax,
  xLabel,
  yLabel,
  animation,
  zoom,
  height,
  xCategories,
  yTickInterval,
  tooltipFormat
}) {
  const [chart, setChart] = useState({});

  useEffect(() => {
    const newChart = {
      chart: {
        type: 'scatter',
        animation: !!animation,
        height,
        zoomType: zoom ? 'xy' : ''
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
        endOnTick: true,
        categories: xCategories
      },
      title: {
        text: title
      },
      yAxis: {
        min: yMin,
        max: yMax,
        startOnTick: true,
        endOnTick: true,
        title: {
          text: yLabel
        },
        tickInterval: yTickInterval
      },
      series: series.map((seriesObject) => (
        {
          showInLegend: seriesObject.data.length > 0,
          turboThreshold: 0,
          tooltip: {
            pointFormat: tooltipFormat || 'x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>'
          },
          ...seriesObject,
          data: seriesObject.data.map(({ x, y }) => ({ x, y })), // don't want any other attributes
        })
      )
    }
    setChart(newChart);
  }, [
    series, title, xMin, xMax, yMin, yMax, xLabel, yLabel, animation, zoom, height, xCategories, yTickInterval, tooltipFormat
  ]);

  return <HighchartsReact highcharts={Highcharts} options={chart}/>
}

ScatterPlot.propTypes = {
  series: highchartsSeriesType.isRequired,
  title: PropTypes.string,
  xMin: PropTypes.number,
  xMax: PropTypes.number,
  yMin: PropTypes.number,
  yMax: PropTypes.number,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  animation: PropTypes.bool,
  zoom: PropTypes.bool,
  height: stringOrNumberType,
  xCategories: PropTypes.arrayOf(PropTypes.string),
  yTickInterval: PropTypes.number,
  tooltipFormat: PropTypes.string
}
