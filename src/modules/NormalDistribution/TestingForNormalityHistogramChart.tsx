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
  numberOfBins: number;
}

export default function TestingForNormalityHistogramChart({ dataPoints, numberOfBins }: TestingForNormalityHistogramChartProps) {

  const processedPoints = dataPoints.map((point, index) => {
    return {
      x: index,
      y: point,
    };
  });


  const myChart = {
    chart: {
      type: 'histogram',
      height: '300px',
    },
    plotOptions: {
      histogram: {
        binsNumber: numberOfBins,
        tooltip: {
          pointFormat: '<bold>{point.x:.1f} to {point.x2:.1f}</bold><br/>Count: {point.y}',
        }
      }
    },
    title: {
      text: 'Testing For Normality',
    },
    xAxis: [{
      title: { text: 'Data' },
      alignTicks: false,
      opposite: true
    }, {
      title: { text: 'Histogram' },
      min: -10,
      max: 10,
      alignTicks: false
    }],
    yAxis: [{
      title: { text: 'Data' },
      min: -10,
      max: 10,
      opposite: true,
    }, {
      title: { text: 'Histogram' },
      max: 50,
      min: 0,
      //visible: false,
    }],
    series: [
      {
        type: 'histogram',
        baseSeries: 's1',
        showInLegend: false,
        marker: { enabled: false },
        zIndex: -1,
        xAxis: 1,
        yAxis: 1,
      },
      {
        type: 'scatter',
        data: processedPoints,
        id: 's1',
        marker: {
          radius: 1.5
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