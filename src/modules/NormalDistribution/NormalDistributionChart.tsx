import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { dataObject } from 'src/lib/ts-types';

export default function NormalDistributionChart({ bellCurvePoints }: { bellCurvePoints: dataObject[] }) {
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
      max: 1,
      visible: false,
    },
    series: [
      {
        type: 'spline',
        data: bellCurvePoints,
        showInLegend: false,
      }
    ]
  };

return (
  <>
    <HighchartsReact highcharts={Highcharts} options={myChart} />
  </>
);
}