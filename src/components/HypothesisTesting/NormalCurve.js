import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import { distributionType, hypothesisTestingSampleArrayType, testTypeType } from '../../lib/types';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { dataFromDistribution } from '../../lib/stats-utils';
import { sqrt } from 'mathjs';
require('highcharts/modules/histogram-bellcurve')(Highcharts);

export default function NormalCurve({ means, mu0, popStandardDev, sampleSize, distType, testType }) {
  // use a placeholder population to draw the bell curve in the plot
  const [population, setPopulation] = useState(
    dataFromDistribution(
      'Normal', 2000, { mean: (testType === 'oneSample') ? mu0 : 0, standardDev: popStandardDev / sqrt(sampleSize) }
    )
  );

  const [chart, setChart] = useState({
    chart: {
      zoomType: 'xy'
    },
    plotOptions: {
      series: {
        animation: {
          duration: 100,
          easing: 'easeOutBounce'
        },
      }
    },
    title: {
      text: 'Sample Means'
    },
    xAxis: {
      title: {
        text: 'Gallons',
      },
      startOnTick: true,
      endOnTick: true
    },
    yAxis: {
      labels: {
        enabled: false
      },
      startOnTick: true,
      endOnTick: true,
      title: false
    },
    tooltip: {
      pointFormat: `${(testType === 'oneSample') ? 'sample mean' : 'difference of means'}: <b>{point.mean}</b><br/>test statistic: <b>{point.testStatistic}</b><br/>reject H_0: <b>{point.reject}</b></br>`
    }
  });

  useEffect(() => {
    setPopulation(
      dataFromDistribution(
        'Normal', 2000, { mean: (testType === 'oneSample') ? mu0 : 0, standardDev: popStandardDev / sqrt(sampleSize) }
      )
    )
  }, [mu0, popStandardDev, sampleSize, testType]);

  useEffect(() => {
    const meanCounts = {};
    const rejects = [];
    const accepts = [];
    means.forEach(({ testStatistic, mean, reject }) => {
      meanCounts[mean] = _.defaultTo(meanCounts[mean] + 1, 1);
      const meanObject = {
        x: mean,
        y: meanCounts[mean] * ((distType === 'T') ? 1 : 0.005 * sqrt(sampleSize)),  // scale the y-value so the plot looks good
        testStatistic,
        mean,
        reject,
      }
      if (reject) {
        rejects.push(meanObject)
      } else {
        accepts.push(meanObject)
      }
    });

    const newChart = {
      series: [
        {
          name: 'Normal Distribution',
          type: 'bellcurve',
          baseSeries: 1,
          zIndex: -1,
          enableMouseTracking: false,
          label: false,
          showInLegend: false,
          visible: !(distType === 'T')
        },
        {
          name: 'Data',
          type: 'scatter',
          data: population.map(({ x }) => x),
          visible: false,
          showInLegend: false
        },
        {
          name: 'Fail to Reject H_0',
          type: 'scatter',
          data: accepts,
          color: '#03fc0b',
          marker: {
            symbol: 'diamond',
            radius: 4,
            lineColor: 'green',
            lineWidth: 1
          }
        },
        {
          name: 'Reject H_0',
          type: 'scatter',
          data: rejects,
          color: 'red',
          marker: {
            symbol: 'diamond',
            radius: 4,
            lineColor: '#800000',
            lineWidth: 1
          }
        }
      ]
    }

    setChart(newChart);
  }, [means, population, sampleSize, distType]);

  return <HighchartsReact highcharts={Highcharts} options={chart}/>
}

NormalCurve.propTypes = {
  means: hypothesisTestingSampleArrayType.isRequired,
  mu0: PropTypes.number.isRequired,
  popStandardDev: PropTypes.number.isRequired,
  sampleSize: PropTypes.number.isRequired,
  distType: distributionType.isRequired,
  testType: testTypeType.isRequired
}
