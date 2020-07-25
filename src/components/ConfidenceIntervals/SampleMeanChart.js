import React, {Component} from 'react';
import Highcharts from 'highcharts';
import { Alert, Col } from 'reactstrap';

class SampleMeanChart extends Component {
    constructor(props){
        super(props);
        this.state = {

            ifChart:this.props.chart,
            chart: undefined,
            sampleMeans:[],
            popMeans:{
              "Normal" : 64,
              "Uniform" : 64,
              "Exponential" : 64,
              "Chi-Squared" : 8,
              "Mystery" : 62.5
            },
            values: {
              Normal: { xmaxval: 74, xminval: 56, ymaxval: 40, title: "Milk Production", xLabel: "Gallons" },
              Uniform: { xmaxval: 74, xminval: 56, ymaxval: 25, title: "Alien Female Height", xLabel: "Height (in)"},
              Exponential: { xmaxval: 400, xminval: 0, ymaxval: 10, title: "Duration of Telemarketer Call", xLabel: "Duration (seconds)"},
              "Chi-Squared": {xmaxval: 25, xminval: 0, ymaxval: 40, title: "Money Spent on Lunch", xLabel: "Dollars"}
          },
            sd : undefined,
            curve: false

        }
        this.upperConf = 1;
        this.lowerConf = 0;
        this.label = 'no';

    }
    render(){
        console.log(this.props.chart)
        const all = this.props.sampleMeans.slice();
        const point = all.pop();
        if (point) {
          this.upperConf = point[4];
          this.lowerConf = point[3];
          this.label = (this.props.mean >= this.lowerConf && this.props.mean <= this.upperConf) ? 'yes' : 'no' ;
        }
        this.state.chart && this.show();
        return(
          <div>
            {
              point &&
            <Alert color={this.label === 'no' ? "danger" : "success"} className="Center">
                <p>Sample number {this.props.sampleMeans.length} has a mean of {point[1]}, with 95% CI ({Math.round(this.lowerConf * 100) /100}, {Math.round(this.upperConf * 100)/100}). CI contains the true mean? {this.label}</p>
            </Alert>
            }
            <div id="sim-container" className="Center" />
            {/* <button style={{marginTop:"20px",marginLeft:"110px"}} onClick={() => {
              this.setState({curve : !this.state.curve})}}>Plot Normal Curve</button> */}
          </div>
        );
    }

    // componentDidUpdate(prevProps) {
    //   if (this.props.sampleMeans.length >= 1) {
    //     const all = this.props.sampleMeans.slice();
    //     const point = all.pop();
    //     this.upperConf = (point[1] + ( (1.960 * point[2]) / Math.sqrt(point[0])) );
    //     this.lowerConf = (point[1] - ( (1.960 * point[2]) / Math.sqrt(point[0])) );
    //     this.label = (this.props.mean >= this.lowerConf && this.props.mean <= this.upperConf) ? 'yes' : 'no' ;
    //     console.log(this.lowerConf, this.upperConf);
    //   }
    // }

    componentDidMount(){
        this.show();
    }

    show(){
        //console.log(this.props.sampleMeans);
        const sampleMeanSeries = {name: "Sample Means", data : []};
        let yMax = 30;
        // const popMean = Math.round(this.props.mean *4)/4;
        for (const i in this.props.sampleMeans){
            const val = this.props.normalized === 0 ?
              Math.round(this.props.sampleMeans[i][1] * 10) / 10
              : Math.round(( (this.props.sampleMeans[i][1] - this.props.mean) / (this.props.sd/Math.sqrt(this.props.sampleMeans.length)) )*10)/10;
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
        if(!this.props.normalized){
          console.log(this.props.type)
          xMin = this.state.values[this.props.type].xminval;
          xMax = this.state.values[this.props.type].xmaxval;
          xLabel = this.state.values[this.props.type].xLabel;
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
        console.log('check');
        console.log(this.state.chart);
        if (!this.state.chart) {
            this.setState({chart: Highcharts.chart('sim-container', {
                            chart: {
                                type: 'scatter',
                                animation: false
                            },

                            title: {
                                text: 'Sample Mean Distribution'
                            },
                            xAxis: {
                                plotBands: !this.props.chart? []:[{
                                            color: 'orange', // Color value
                                            from: 3, // Start of the plot band
                                            to: 4 // End of the plot band
                                          }],
                                min: xMin,
                                max: xMax,
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
            console.log(this.props.chart);
            this.state.chart.update({series:[sampleMeanSeries], yAxis: {max: yMax}, xAxis : {title: {text:xLabel},max: xMax, min: xMin, plotBands: !this.props.chart? []:[{ color:'orange',from: this.lowerConf, to: this.upperConf }, {from: this.props.mean, to: this.props.mean + 0.001, label: { text: "true mean"}}]}});

        }

        // console.log(sampleMeanSeries);
    }
}
export default SampleMeanChart;
