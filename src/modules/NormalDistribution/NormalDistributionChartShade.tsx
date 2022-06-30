import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { dataObject } from 'src/lib/ts-types';
// A HighChartReact bug when integrating with Next.js's server-side rendering
// Work around: https://github.com/highcharts/highcharts/issues/10588
import HighchartMore from 'highcharts/highcharts-more';
if (typeof Highcharts === 'object') {
  HighchartMore(Highcharts);
}

export default function NormalDistributionChartShade({ bellCurvePoints, bellCurvePointsShading }: { bellCurvePoints: dataObject[], bellCurvePointsShading: {x: number, high: number, low: number}[] }) {
  const myChart = {
    chart: {
      type: 'spline',
      animation: false,
      height: '300px',
    },
    title: {
      text: 'Shading!',
    },
    xAxis: {
      title: { text: 'x' },
      min: -10,
      max: 10,
    },
    yAxis: {
      title: { text: 'y' },
      max: 1,
      visible: false,
    },
    series: [
      {
        type: 'arearange',
        data: bellCurvePointsShading,
        showInLegend: false,
        enableMouseTracking: false,
        color: '#00aa00',
      },
      {
        type: 'spline',
        data: bellCurvePoints,
        showInLegend: false,
        marker: { enabled: false },
      }
    ]
  };

return (
  <>
    <HighchartsReact highcharts={Highcharts} options={myChart} />
  </>
);
}