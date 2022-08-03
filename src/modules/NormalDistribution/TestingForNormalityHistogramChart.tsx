import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// A HighChartReact bug when integrating with Next.js's server-side rendering
// Work around: https://github.com/highcharts/highcharts/issues/10588
import HighchartsHistogram from 'highcharts/modules/histogram-bellcurve';
import _ from 'lodash';
if (typeof Highcharts === 'object') {
  HighchartsHistogram(Highcharts);
}


interface TestingForNormalityHistogramChartProps {
  dataPoints: number[];
  dataAggregated: { lowerBound: number, upperBound: number, count: number }[];
}

export default function TestingForNormalityHistogramChart({ dataPoints, dataAggregated }: TestingForNormalityHistogramChartProps) {

  const sortedDataPoints = _.sortBy(dataPoints);

  const [minData] = sortedDataPoints;
  const maxData = sortedDataPoints[sortedDataPoints.length - 1];

  const processedPoints: { x: number, y: number }[] = [];
  sortedDataPoints.forEach((v, i) => {
    if (i > 0 && processedPoints[i - 1].x === v) {
      processedPoints.push({ x: v, y: processedPoints[i - 1].y + 1 });
    } else {
      processedPoints.push({ x: v, y: 1 });
    }
  });

  const myChart = {
    chart: {
      type: 'column',
      height: '300px',
      animation: false,
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
        groupPadding: 0,
        shadow: false
      }
    },
    title: {
      text: 'Testing For Normality',
    },
    xAxis: [{
      title: { text: 'Data' },
      min: minData-1,
      max: maxData+1,
      endOnTick: false,
    }],
    yAxis: [{
      title: { text: 'Data Count' },
      max: 30,
      min: 0,
      endOnTick: false,
    }, {
      title: { text: 'Histogram Count' },
      max: 50,
      min: 0,
      endOnTick: false,
      opposite: true,
    }],
    series: [
      {
        type: 'column',
        data: dataAggregated.map(({ lowerBound, upperBound, count }) => ({ x: lowerBound + (upperBound - lowerBound) / 2, y: count, lowerBound, upperBound })),
        showInLegend: false,
        marker: { enabled: false },
        zIndex: -1,
        yAxis: 1,
        visible: dataAggregated.length > 0,
        tooltip: {
          headerFormat: '',
          pointFormat: '<bold>{point.lowerBound:.2f} - {point.upperBound:.2f}</bold><br/>Count: {point.y}',
        }
      },
      {
        type: 'scatter',
        data: processedPoints,
        marker: { radius: 3, symbol: 'diamond' },
        showInLegend: false,
        tooltip: {
          headerFormat: '',
          pointFormat: 'Value: {point.x}',
        },
      }
    ]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={myChart} />
    </div>
  );
}