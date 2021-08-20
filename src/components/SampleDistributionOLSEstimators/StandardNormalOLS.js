import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import { dataFromDistribution } from '../../lib/stats-utils';
import PropTypes from 'prop-types';
import { dataObjectArrayType } from '../../lib/types';
import { max } from 'mathjs';
require('highcharts/modules/histogram-bellcurve')(Highcharts);

export default function StandardNormalOLS({ seriesName, data }) {
  const [chart, setChart] = useState({});
  const [population] = useState(dataFromDistribution('Normal', 2000, { mean: 0, standardDev: 1 }));

  useEffect(() => {
    const newChart = {
      chart: {
        type: 'scatter',
        animation: false,
      },
      title: {
        text: `Distribution of Sample ${seriesName}`
      },
      xAxis: {
        title: {
          text: 'Standard Deviations',
        },
        startOnTick: true,
        endOnTick: true
      },
      yAxis: [{  // Primary yAxis
        startOnTick: true,
        endOnTick: true,
        min: 0,
        max: max(4, ...data.map(({ y }) => y)),
        allowDecimals: false,
        title: {
          text: `Observation of Sample ${seriesName.slice(0, -1)}`
        }
      }, {  // Secondary yAxis for bell curve
        visible: false
      }],
      series: [
        {
          name: 'Normal Distribution',
          type: 'bellcurve',
          baseSeries: 1,
          zIndex: -1,
          enableMouseTracking: false,
          label: false,
          showInLegend: false,
          yAxis: 1
        },
        {
          name: 'Data',
          type: 'scatter',
          data: population.map(({ x }) => x),
          visible: false,
          showInLegend: false
        },
        {
          name: seriesName,
          data,
          showInLegend: false,
          color: 'red',
          marker: {
            symbol: 'circle'
          },
          tooltip: {
            pointFormat: `${seriesName}: <b>{point.x}</b><br/>`
          },
        }
      ]
    }
    setChart(newChart);

  }, [seriesName, data, population]);

  return <HighchartsReact highcharts={Highcharts} options={chart}/>
}

StandardNormalOLS.propTypes = {
  seriesName: PropTypes.string.isRequired,
  data: dataObjectArrayType.isRequired
}
