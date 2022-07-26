import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// A HighChartReact bug when integrating with Next.js's server-side rendering
// Work around: https://github.com/highcharts/highcharts/issues/10588
import HighchartsHistogram from 'highcharts/modules/histogram-bellcurve';
if (typeof Highcharts === 'object') {
  HighchartsHistogram(Highcharts);
}


interface TestingForNormalityHistogramChartProps {
  dataPoints: number[];
  dataAggregated: { lowerBound: number, upperBound: number, count: number }[];
}

export default function TestingForNormalityHistogramChart({ dataPoints, dataAggregated }: TestingForNormalityHistogramChartProps) {

  const processedPoints = dataPoints.map((point, index) => {
    return {
      x: index,
      y: point,
    };
  });

  const myChart = {
    chart: {
      type: 'column',
      height: '300px',
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
      opposite: true
    }, {
      title: { text: 'Histogram' },
      min: -10,
      max: 10,
    }],
    yAxis: [{
      title: { text: 'Data' },
      min: -10,
      max: 10,
      opposite: true,
      endOnTick: false,
    }, {
      title: { text: 'Histogram' },
      max: 50,
      min: 0,
      endOnTick: false,
    }],
    series: [
      {
        type: 'column',
        data: dataAggregated.map(({ lowerBound, upperBound, count }) => ({ x: lowerBound+(upperBound-lowerBound)/2, y: count, lowerBound, upperBound })),
        showInLegend: false,
        marker: { enabled: false },
        zIndex: -1,
        xAxis: 1,
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
        marker: { radius: 1.5 },
        showInLegend: false,
        tooltip: {
          headerFormat: '',
          pointFormat: 'Value: {point.y}',
        }
      }
    ]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={myChart} />
    </div>
  );
}