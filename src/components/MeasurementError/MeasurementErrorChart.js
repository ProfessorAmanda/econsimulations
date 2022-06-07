import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';
import { dataObjectArrayType } from '../../lib/types.js';

export default function MeasurementErrorChart({ origDataPoints, errorDataPoints, origRegression, errorRegression }) {
  const [myChart, setMyChart] = useState({});

  useEffect(() => {
    const newChart = {
      chart: {
        type: 'scatter',
        zoomtype: 'xy',
      },
      title: {
        text: 'Study Hours vs. Test Score'
      },
      xAxis: {
        min: 0,
        max: 10,
        title: {
          text: 'Study Hours'
        }
      },
      yAxis: {
        min: 20,
        max: 100,
        title: {
          text: 'Test Score'
        }
      },
      series: [
        {
          type: 'scatter',
          data: origDataPoints,
          name: 'Test Score',
          color: '#33A5FF'
        },
        {
          type: 'scatter',
          data: errorDataPoints,
          name: 'Test Score',
          color: '#880000'
        },
        {
          type: 'line',
          data: origRegression,
          name: 'origRegression',
          color: '#E30404',
          label: {
            enabled: false
          }
        },
        {
          type: 'line',
          data: errorRegression,
          name: 'errorRegression',
          color: '#2AC208',
          label: {
            enabled: false
          }
        }
      ]
    }

    setMyChart(newChart);
  }, [origDataPoints, errorDataPoints, origRegression, errorRegression]);

  return (
    <HighchartsReact highcharts={Highcharts} options={myChart}/>
  );
}

MeasurementErrorChart.propTypes = {
  origDataPoints: dataObjectArrayType.isRequired,
  errorDataPoints: dataObjectArrayType.isRequired,
  origRegression: PropTypes.arrayOf(PropTypes.number),
  errorRegression: PropTypes.arrayOf(PropTypes.number),
}
