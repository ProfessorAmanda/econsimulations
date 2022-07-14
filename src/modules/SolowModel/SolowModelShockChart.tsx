import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

interface SolowModelChartProps {
  K: number[];
  Y: number[];
  I: number[];
  deltaTimesK: number[];
  shouldShowModel: boolean;
  equalibrium: { x: number; y: number };
  shockK: number;
  shockI: number;
  shockY: number;
  shouldShowShock: boolean;
  positiveShock: boolean;
}

export default function SolowModelChart({ K, Y, I, deltaTimesK, shouldShowModel, equalibrium, shockK, shockI, shockY, shouldShowShock, positiveShock} : SolowModelChartProps) {
  const yDataPoints = Y.map((y, i) => {
    return {
      x: K[i],
      y,
      id: i,
    };
  });

  const iDataPoints = I.map((i, iIndex) => {
    return {
      x: K[iIndex],
      y: i,
      id: iIndex
    };
  });

  const deltaTimesKDataPoints = deltaTimesK.map((deltaTimesK, i) => {
    return {
      x: K[i],
      y: deltaTimesK,
      id: i
    };
  });

  const myChart = {
    chart: {
      type: 'spline',
    },
    title: {
      text: 'Solow Model'
    },
    subtitle: {
      text: 'Static'
    },
    xAxis: {
      title: { text: 'K' },
      min: 0,
      max: 20
    },
    yAxis: {
      title: { text: 'Y' },
      min: 0,
      max: 3,
    },
    plotOptions: {
      spline: {
        marker: { enabled: false },
      },
      line: {
        marker: { enabled: false },
        enableMouseTracking: false,
        dashStyle: 'dot',
        lineWidth: 1,
        color: '#aaaaaa',
        showInLegend: false,
        animation: { enabled: false },
      },
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: ''
    },
    colors: ['bbd8b3', 'f3b61f', 'a29f15', '510d0a', '191102'],
    series: [{
      name: 'Y = A * K^α * L^β',
      data: yDataPoints,
      visible: shouldShowModel,
    }, {
      name: 'I = s * Y',
      data: iDataPoints,
      visible: shouldShowModel
    }, {
      name: '𝛿 * K',
      data: deltaTimesKDataPoints,
      visible: shouldShowModel
    }, {
      name: 'EqualibriumXLine',
      type: 'line',
      data: [equalibrium, { x: equalibrium.x, y: 0 }],
      visible: shouldShowModel,
    }, {
      name: 'EqualibriumYLine',
      type: 'line',
      data: [equalibrium, { x: 0, y: equalibrium.y }],
      visible: shouldShowModel,
    }, {
      name: 'ShockXLine',
      type: 'line',
      data: [{x: shockK, y: 0}, { x: shockK, y: shockY }],
      visible: shouldShowShock && shouldShowModel,
      color: positiveShock ? '#00aa00' : '#aa0000',
    }, {
      name: 'ShockYLineY',
      type: 'line',
      data: [{x: 0, y: shockY}, { x: shockK, y: shockY }],
      visible: shouldShowShock && shouldShowModel,
      color: positiveShock ? '#00aa00' : '#aa0000',
    }, {
      name: 'ShockYLineI',
      type: 'line',
      data: [{x: 0, y: shockI}, { x: shockK, y: shockI }],
      visible: shouldShowShock && shouldShowModel,
      color: positiveShock ? '#00aa00' : '#aa0000',
    }]
  }
  

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={myChart} />
    </div>
  )
}