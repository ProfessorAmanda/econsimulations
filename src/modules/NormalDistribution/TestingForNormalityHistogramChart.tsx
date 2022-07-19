import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { dataObject } from 'src/lib/ts-types';

// A HighChartReact bug when integrating with Next.js's server-side rendering
// Work around: https://github.com/highcharts/highcharts/issues/10588
import HighchartsHistogram from 'highcharts/modules/histogram-bellcurve';
if (typeof Highcharts === 'object') {
  HighchartsHistogram(Highcharts);
}


interface TestingForNormalityHistogramChartProps {
  dataPoints: number[];
}

export default function TestingForNormalityHistogramChart({ dataPoints }: TestingForNormalityHistogramChartProps) {

  const myChart = {
    chart: {
      type: 'histogram',
      height: '300px',
    },
    plotOptions: {
      histogram: {
        binWidth: 1,
      }
    },
    title: {
      text: 'Testing For Normality',
    },
    xAxis: {
      title: { text: 'value' },
      min: -10,
      max: 10,
    },
    yAxis: {
      title: { text: 'count' },
      max: 50,
      min: 0,
      //visible: false,
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '{index}. {point.x:.3f} to {point.x2:.3f}. Count: {point.y}',
    },
    series: [
      {
        type: 'histogram',
        name: 'Data',
        baseSeries: 's1',
        showInLegend: false,
        marker: { enabled: false },
      },
      {
        name: 'Data',
        type: 'scatter',
        data: dataPoints,
        id: 's1',
        marker: {
            radius: 1.5
        },
        visible: false,
      }
    ]
  };

return (
  <>
    <HighchartsReact highcharts={Highcharts} options={myChart} />
  </>
);
}