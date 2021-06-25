import PropTypes from 'prop-types';
import DotPlot from '../DotPlot';
import { VALUES } from '../../lib/constants';
import { max, round, sqrt } from 'mathjs';
import { popShapeType } from '../../lib/types';

export default function SampleMeanChart({ sampleMeans, normalized, mean, sd, sampleSize, popShape }) {
  const sampleMeanSeries = {name: "Sample Means", data : []};
  let yMax = 30;
  let xAxisMeasurement =[];
  let yAxisMeasurement =[];
  for (const i in sampleMeans){
      const val = !normalized ? sampleMeans[i] : ((sampleMeans[i] - mean) / (sd/ sqrt(sampleSize)));
      let count = 1;
      for (const j of sampleMeanSeries.data){
          if (round(j[0] * 100) / 100 === val){
              count += 1;
          }
      }
      yMax = max(count, yMax);
      sampleMeanSeries.data[i] = [val, count];
      xAxisMeasurement.push(val);
      yAxisMeasurement.push(count);
  }

  let xMin;
  let xMax;
  let xLabel;
  if(!normalized){
    xMin = VALUES[popShape].xminval;
    xMax = VALUES[popShape].xmaxval;
    xLabel = VALUES[popShape].xLabel;
  }
  else{
    xMin = Math.min.apply(Math, xAxisMeasurement);
    xMax = Math.max.apply(Math, xAxisMeasurement);
    yMax = Math.max.apply(Math, yAxisMeasurement);
    xLabel = "Standard Deviations";
  }

  let sampleMax=0;
  let sampleMin=1000000000;
  let sampleMaxX = 0;
  for(let i=0;i<sampleMeanSeries.data.length;i++){
    if(sampleMeanSeries.data[i][1] > sampleMax){
      sampleMax = sampleMeanSeries.data[i][1];
    }
    if(sampleMeanSeries.data[i][0] < sampleMin){
      sampleMin = sampleMeanSeries.data[i][0];
    }
    if(sampleMeanSeries.data[i][0] > sampleMaxX){
      sampleMaxX = sampleMeanSeries.data[i][0];
    }
  }

  return (
    <DotPlot
      series={[sampleMeanSeries]}
      title="Sample Mean Distribution"
      xMin={xMin}
      xMax={xMax}
      yMax={yMax}
      xLabel={xLabel}
      yLabel="Observations of Sample Mean"
    />
  )
}


// class SampleMeanChart extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             chart: undefined,
//             curve: false
//         }
//     }
//     render(){
//         this.state.chart && this.show();
//         return(
//           <div>
//               {
//                   <div id="sim-container" className="Center" />
//               }
//           </div>
//         );
//     }
//     componentDidMount(){
//         this.show();
//     }
//     show(){


//         if (!this.state.chart) {
//             this.setState({chart: Highcharts.chart('sim-container', {
//                             chart: {
//                                 popShape: 'scatter',
//                                 animation: false
//                             },

//                             title: {
//                                 text: 'Sample Mean Distribution'
//                             },
//                             xAxis: {
//                                 min: xMin,
//                                 max: xMax,
//                                 title : {
//                                     enabled: true,
//                                     text: xLabel
//                                 },
//                                 startOnTick: true,
//                                 endOnTick: true,
//                                 showLastLabel: true
//                             },
//                             yAxis: {
//                                 max: yMax,
//                                 title: {
//                                     text: 'Observations of Sample Mean'
//                                 }
//                             },
//                             tooltip: {
//                               enabled: true,
//                               pointFormat: `${xLabel}: <b>{point.x}<b><br />`
//                             },
//                             series: [sampleMeanSeries]

//                             })});
//                           }
//         else {
//             this.state.chart.update({series:[sampleMeanSeries], yAxis: {max: yMax}, xAxis : {title: {text:xLabel},max: xMax, min: xMin}});
//         }
//     }
// }
// export default SampleMeanChart;

SampleMeanChart.propTypes = {
  sampleMeans: PropTypes.arrayOf(PropTypes.number).isRequired,
  mean: PropTypes.number,
  sd: PropTypes.number,
  normalized: PropTypes.bool.isRequired,
  sampleSize: PropTypes.number.isRequired,
  popShape: popShapeType.isRequired
}
