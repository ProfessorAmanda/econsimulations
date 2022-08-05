import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

interface SolowModelShiftChartProps {
  K: number[];
  Y: number[];
  I: number[];
  deltaTimesK: number[];
  shouldShowModel: boolean;
  equalibrium: { x: number; y: number };
  Y2: number[];
  I2: number[];
  deltaTimesK2: number[];
  shouldShowModel2: boolean;
  equalibrium2: { x: number; y: number };
}

export default function SolowModelShiftChart({ K, Y, I, deltaTimesK, shouldShowModel, equalibrium, Y2, I2, deltaTimesK2, shouldShowModel2, equalibrium2 } : SolowModelShiftChartProps) {
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

  const yDataPoints2 = Y2.map((y, i) => {
    return {
      x: K[i],
      y,
      id: i,
    };
  });

  const iDataPoints2 = I2.map((i, iIndex) => {
    return {
      x: K[iIndex],
      y: i,
      id: iIndex
    };
  });

  const deltaTimesKDataPoints2 = deltaTimesK2.map((deltaTimesK, i) => {
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
      name: 'Y2 = A2 * K^α2 * L^β2',
      data: yDataPoints2,
      visible: shouldShowModel2
    }, {
      name: 'I2 = s2 * Y',
      data: iDataPoints2,
      visible: shouldShowModel2
    }, {
      name: '𝛿2 * K',
      data: deltaTimesKDataPoints2,
      visible: shouldShowModel2
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
      name: 'Equalibrium2XLine',
      type: 'line',
      data: [equalibrium2, { x: equalibrium2.x, y: 0 }],
      visible: shouldShowModel2,
    }, {
      name: 'Equalibrium2YLine',
      type: 'line',
      data: [equalibrium2, { x: 0, y: equalibrium2.y }],
      visible: shouldShowModel2,
    }]
  }
  

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={myChart} />
    </div>
  )
}