
import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import BellCurve from 'highcharts/modules/histogram-bellcurve';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { dataFromDistribution, arraySTD } from '../../lib/stats-utils';
import { mean } from 'mathjs';

BellCurve(Highcharts);

export default function StandardNormalOLS({ samples, interceptOrSlope}) {
  const [population] = useState(
    dataFromDistribution('Normal', 2000, { mean: 0, standardDev: 1 })
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
      text: 'Sample Slopes'
    },
    xAxis: {
      title: {
        text: 'Normal Curve',
      },
      startOnTick: true,
      endOnTick: true
    },
    yAxis: {
      startOnTick: true,
      endOnTick: true,
      title: false
    },
  });

  let betaArr = [];
   
    for(var i in samples) {
      if (interceptOrSlope === 'slope') {
      betaArr.push(samples[i].slope);
    } else {
      betaArr.push(samples[i].intercept);
    }
  } 

  const meanArr = mean(betaArr);


  const sdArr = arraySTD(betaArr) 

  useEffect(() => {
    const dataArr = [];
    samples.forEach(({id,size,slope,intercept}) => {

     const meanObject = {
        x: (interceptOrSlope === 'slope' ? slope : intercept),
        y: ((interceptOrSlope === 'slope' ? slope : intercept) - meanArr) / sdArr,
        intercept,
      }
      dataArr.push(meanObject);
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
          showInLegend: false
        },
        {
          name: 'Data',
          type: 'scatter',
          data: dataArr,
          visible: false,
          showInLegend: false
        }
      ]
    }

    setChart(newChart);
  }, [samples, meanArr, sdArr, population, interceptOrSlope]);

  return <HighchartsReact highcharts={Highcharts} options={chart}/>
}

StandardNormalOLS.propTypes = {
  samples: PropTypes.array.isRequired,
  interceptOrSlope: PropTypes.string.isRequired
}
