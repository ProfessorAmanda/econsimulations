import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { dataObject } from 'src/lib/ts-types';

// A HighChartReact bug when integrating with Next.js's server-side rendering
// Work around: https://github.com/highcharts/highcharts/issues/10588
import HighchartMore from 'highcharts/highcharts-more';
if (typeof Highcharts === 'object') {
  HighchartMore(Highcharts);
}

interface NormalDistributionChartShadeProps {
  bellCurvePoints: dataObject[];
  bellCurvePointsShading: {x: number, high: number, low: number}[];
  samplePoints: {x: number, y: number}[];
}

export default function NormalDistributionChart({ bellCurvePoints, bellCurvePointsShading, samplePoints }: NormalDistributionChartShadeProps) {
  
  const myChart = {
    chart: {
      type: 'spline',
      animation: false,
      height: '300px',
    },
    title: {
      text: 'Normal Distribution',
    },
    xAxis: {
      title: { text: 'x' },
      min: -10,
      max: 10,
    },
    yAxis: {
      title: { text: 'y' },
      max: 20,
      visible: false,
    },
    tooltip: {
      headerFormat: '',
      pointFormat: 'x: {point.x:.2f}, y: {point.y:.2f}',
    },
    series: [
      {
        type: 'spline',
        name: 'Bell Curve',
        data: bellCurvePoints,
        showInLegend: false,
        marker: { enabled: false },
      },
      {
        type: 'arearange',
        data: bellCurvePointsShading,
        showInLegend: false,
        enableMouseTracking: false,
        color: '#00aa00',
      },
      {
        type: 'scatter',
        name: 'Sample Points',
        data: samplePoints,
        marker: { symbol: 'diamond' },
        showInLegend: true,
        color: 'orange',
      },
    ]
  };

return (
  <>
    <HighchartsReact highcharts={Highcharts} options={myChart} />
  </>
);
}