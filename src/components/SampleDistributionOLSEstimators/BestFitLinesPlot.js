import HighchartsReact from 'highcharts-react-official';
import { Highcharts } from 'highcharts';
import { useEffect, useState } from 'react';
import { OLSE_VALUES } from '../../lib/constants';
import { olsSampleType } from '../../lib/types';
import PropTypes from 'prop-types';

export default function BestFitLinesPlot({ samples, populationShape }) {
  const [chart, setChart] = useState({})

  useEffect(() => {
    const newChart = {
      chart: {
        type: 'line',
        animation: false
      },
      legend: {
        enabled: false
      },
      xAxis: {
        min: OLSE_VALUES[populationShape].xMin,
        max: OLSE_VALUES[populationShape].xMax,
        title: {
          text: OLSE_VALUES[populationShape].xLabel,
          enabled: true
        },
        startOnTick: true,
        endOnTick: true,
        categories: OLSE_VALUES[populationShape].xCategories
      },
      title: {
        text: 'Best Fit Lines'
      },
      yAxis: {
        min: OLSE_VALUES[populationShape].yMin,
        max: OLSE_VALUES[populationShape].yMax,
        startOnTick: true,
        endOnTick: true,
        title: {
          text: OLSE_VALUES[populationShape].yLabel,
          enabled: true
        }
      },
      series: samples.map(({ data, slope, intercept, id }) => ({
        name: `Sample ${id}`,
        type: 'line',
        data: [{ x: 0 }, { x: OLSE_VALUES[populationShape].xMax }, ...data].map((point) => (
          { x: point.x, y: (point.x * slope) + intercept }
        )),
        label: false,
        marker: false,
        enableMouseTracking: false,
      }))
    }

    setChart(newChart);
  }, [samples, populationShape]);

  return (
    <HighchartsReact highcharts={Highcharts} options={chart} />
  );
}

BestFitLinesPlot.propTypes = {
  samples: PropTypes.arrayOf(olsSampleType).isRequired,
  populationShape: PropTypes.oneOf(['Continuous', 'Binary'])
}
