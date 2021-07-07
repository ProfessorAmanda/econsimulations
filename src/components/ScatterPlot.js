import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official"
import PropTypes from "prop-types";
import { highchartsSeriesType, stringOrNumberType } from "../lib/types";

export default function ScatterPlot({ series, title, xMin, xMax, yMin, yMax, xLabel, yLabel, animation, height }) {
  const [chart, setChart] = useState({});

  useEffect(() => {
    const newChart = {
      chart: {
        type: "scatter",
        animation: !!animation,
        height: height
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
        min: yMin,
        max: yMax,
        startOnTick: true,
        endOnTick: true,
        title: {
          text: yLabel
        }
      },
      series: series.map((seriesObject) => (
        {
          showInLegend: seriesObject.data.length > 0,
          turboThreshold: 0,
          ...seriesObject,
          data: seriesObject.data.map(({ x, y }) => ({ x, y })),  // don"t want any other attributes
        })
      )
    }
    setChart(newChart);
  }, [series, title, xMin, xMax, yMin, yMax, xLabel, yLabel, animation, height]);

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
  height: stringOrNumberType
}
