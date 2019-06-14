import React, {Component} from 'react';
import Highcharts from 'highcharts';
// import NormalDistribution from 'normal-distribution';

class SampleMeanChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            chart: undefined,
            sampleMeans:[],
            popMeans:{
              "Normal" : 64,
              "Uniform" : 64,
              "Exponential" : 64,
              "Chi-Squared" : 8,
              "Mystery" : 62.5
            },
            sd : undefined,
            curve: false
        }
    }
    render(){
        this.state.chart && this.show();
        return(
          <div>
            <span id="sim-container" />
            {/* <button style={{marginTop:"20px",marginLeft:"110px"}} onClick={() => {
              this.setState({curve : !this.state.curve})}}>Plot Normal Curve</button> */}
          </div>
        );
    }
    componentDidMount(){
        this.show();
    }
    show(){
        const sampleMeanSeries = {name: "Sample Means", data : []};
        let yMax = 30;
        const popMean = Math.round(this.props.mean *4)/4;
        console.log('oy', this.props.sampleMeans);
        for (const i in this.props.sampleMeans){
            const val = this.props.normalized === 0 ? Math.round(this.props.sampleMeans[i][1] * 10) / 10 : Math.round(((this.props.sampleMeans[i][1]-this.props.mean)/(this.props.sd/Math.sqrt(this.props.sampleSize)))*10)/10;
            console.log(val);
            let count = 1;
            for (const j of sampleMeanSeries.data){
                if (Math.round(j[0] * 10) / 10 === val){
                    count += 1;
                }
            }
            yMax = Math.max(count, yMax);
            sampleMeanSeries.data[i] = [val, count];
            // console.log(sampleMeanSeries.data);
        }

        let xMin;
        let xMax;
        let xLabel;
        if(this.props.normalized === 0){
            xMin = this.props.type === "Chi-Squared" ? 4 :  this.props.type === "Exponential" ? 0 : 55;
            xMax = this.props.type === "Chi-Squared" ? 12 : this.props.type === "Exponential" ? 150 : 75;
            xLabel = (this.props.type == "Uniform" || this.props.type == "Normal" || this.props.type == "Mystery") ? "Sample Mean (in)" : this.props.type == "Exponential" ? "Sample Mean (seconds)" : "Sample Mean (dollars)";
        }
        else{
          xMin = -2;
          xMax = 2;
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
        // console.log(sampleMax);
        // console.log(sampleMin);
        // console.log(sampleMaxX);

        const lowerBound = sampleMin - 2, upperBound = sampleMaxX + 2;

        const normalY = (x, mean, stdDev) => Math.exp((-0.5) * Math.pow((x - mean) / stdDev, 2)) * (sampleMax+3);

        const getMean = (lowerBound, upperBound) => (upperBound + lowerBound) / 2;

        // distance between mean and each bound of a 95% confidence interval
        // is 2 stdDeviation, so distance between the bounds is 4
        const getStdDeviation = (lowerBound, upperBound) => (upperBound - lowerBound) / 4;

        const generatePoints = (lowerBound, upperBound) => {
          const stdDev = getStdDeviation(lowerBound, upperBound);
          const min = lowerBound - 2 * stdDev;
          const max = upperBound + 2 * stdDev;
          const unit = (max - min) / 40;
          const list = [];
          for(let i=min;i<max;i+=unit){
            list.push(i);
          }
          //return _.range(min, max, unit);
          return list;
        }

        const mean = getMean(lowerBound, upperBound);
        const stdDev = getStdDeviation(lowerBound, upperBound);
        const points = generatePoints(lowerBound, upperBound);


        const seriesData = points.map(x => ({ x, y: normalY(x, mean, stdDev)}));
        const bellSeries = {data : seriesData, color: 'black', name:"Normal Curve", plotOptions: {series: {marker: {symbol: "diamond"}}}};

        /* Try making normal curve other way  */
        
        // console.log(this.props.resampleSize[this.props.type])
        // const normDist = new NormalDistribution(64,3/Math.sqrt(this.props.resampleSize[this.props.type]));
        // let normalPoints = [];
        // let nPoint;
        // let sd = 3/Math.sqrt(10);
        // let meanN = 64;
        // for(let i=60;i<=70;i+=.1){
        //   //nPoint = (1/(Math.sqrt(2*Math.PI*Math.pow(sd,2))))*(Math.pow(Math.E,-(Math.pow(i - meanN,2)/(2*Math.pow(sd,2)))));
        //   nPoint = normDist.probabilityBetween(i,i+.1);
        //   normalPoints.push([i,nPoint * this.props.numberResamples[this.props.type]]);
        // }

        // console.log(normDist.probabilityBetween(61.5,67));

        // console.log(normalPoints);
        // bellSeries.data = normalPoints;

        // console.log(seriesData);

        console.log(sampleMeanSeries);

        if (!this.state.chart) {
            this.setState({chart: Highcharts.chart('sim-container', {
                            chart: {
                                type: 'scatter'
                            },
                            title: {
                                text: 'Sample Mean Distribution'
                            },
                            xAxis: {
                                // min: 60,
                                // max: 70,
                                title : {
                                    enabled: true,
                                    text: xLabel
                                },
                                startOnTick: true,
                                endOnTick: true,
                                showLastLabel: true
                            },
                            yAxis: {
                                max: yMax,
                                title: {
                                    text: 'Observations of Sample Mean'
                                }
                            },
                            tooltip: {
                              enabled: true,
                              pointFormat: `${xLabel}: <b>{point.x}<b><br />`
                            },
                            series: [sampleMeanSeries]
                            })});
                          }
        else {
            // console.log("running");


            // if(this.state.curve === true && this.state.chart.series.length < 2){
            //   this.state.chart.addSeries({bellSeries});
            // }
            // if(this.state.curve == false && this.state.chart.series.length === 2){
            //   this.state.chart.series[1].remove();
            // }
            // this.state.chart.update({series:[sampleMeanSeries,bellSeries], yAxis: {max: yMax}, xAxis : {title: {text:xLabel},max: xMax, min: xMin}});
            this.state.chart.update({series:[sampleMeanSeries], yAxis: {max: yMax}, xAxis : {title: {text:xLabel},max: xMax, min: xMin}});
        }
    }
}
export default SampleMeanChart;
