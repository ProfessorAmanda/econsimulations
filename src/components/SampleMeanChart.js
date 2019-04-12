import React, {Component} from 'react';
import Highcharts from 'highcharts';

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
            <span style={{float:"left", width:"30%"}} id="sim-container"> </span>
            <button style={{marginTop:"20px",marginLeft:"110px"}} onClick={() => {
              this.setState({curve : !this.state.curve})}}>Plot Normal Curve</button>
          </div>
        );
    }
    componentDidMount(){
        this.show();
    }
    show(){
        //console.log(this.props.type);
        let sampleMeanSeries = {name: "Sample Means", data : []};
        let yMax = 30;
        const popMean = Math.round(this.props.mean *4)/4;
        for (let i in this.props.sampleMeans){
            //const val = ((Math.round(this.props.sampleMeans[i] * 4) / 4)-64)/3;
            // console.log('here we go');
            // console.log(this.props.sampleMeans[i]);
            // console.log(popMean);
            // console.log(this.props.sd);
            // console.log('bigun');
            // console.log(((this.props.sampleMeans[i]-popMean)/(this.props.sd)));
            // console.log(Math.round(((this.props.mean-this.props.sampleMeans[i])/(this.props.sd/100))*4)/4);
            const val = this.props.normalized === 0 ? Math.round(this.props.sampleMeans[i] * 10) / 10 : Math.round(((this.props.sampleMeans[i]-this.props.mean)/(this.props.sd/Math.sqrt(this.props.sampleSize)))*10)/10;
            let count = 1;
            for (let j of sampleMeanSeries.data){
                if (Math.round(j[0] * 10) / 10 === val){
                    count += 1;
                }
            }
            yMax = Math.max(count, yMax);
            sampleMeanSeries.data[i] = [val, count];
            // console.log(sampleMeanSeries.data);
        }
        // console.log(sampleMeanSeries.data);
        let xMin;
        let xMax;
        let xLabel;
        if(this.props.normalized === 0){
            xMin = this.props.type === "Chi-Squared" ? 4 :  this.props.type === "Exponential" ? 0 : 55;
            xMax = this.props.type === "Chi-Squared" ? 12 : this.props.type === "Exponential" ? 150 : 75;
            xLabel = (this.props.type == "Uniform" || this.props.type == "Normal" || this.props.type == "Mystery") ? "Sample Mean (in)" : this.props.type == "Exponential" ? "Sample Mean (seconds)" : "Sample Mean (dollars)";
        }
        else{
          xMin = -3;
          xMax = 3;
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
          let stdDev = getStdDeviation(lowerBound, upperBound);
          let min = lowerBound - 2 * stdDev;
          let max = upperBound + 2 * stdDev;
          let unit = (max - min) / 40;
          let list = [];
          for(let i=min;i<max;i+=unit){
            list.push(i);
          }
          //return _.range(min, max, unit);
          return list;
        }

        let mean = getMean(lowerBound, upperBound);
        let stdDev = getStdDeviation(lowerBound, upperBound);
        let points = generatePoints(lowerBound, upperBound);


        let seriesData = points.map(x => ({ x, y: normalY(x, mean, stdDev)}));
        const bellSeries = {data : seriesData, color: 'black', name:"Normal Curve", plotOptions: {series: {marker: {symbol: "diamond"}}}};

        //console.log(seriesData);

        if (!this.state.chart) {
            this.setState({chart: Highcharts.chart('sim-container', {
                            chart: {
                                type: 'scatter'
                            },
                            title: {
                                text: 'Sample Mean Distribution'
                            },
                            xAxis: {
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
                              enabled: false
                            },
                            plotOptions: {
                              series: {
                                point: {
                                  events: {
                                    mouseOver: function() {
                                      //console.log('hehehe');
                                    }
                                  }
                                }
                              }
                            },
                            series: [sampleMeanSeries]
                            })});
                          }
        else {
            console.log("running");


            if(this.state.curve === true && this.state.chart.series.length < 2){
              this.state.chart.addSeries({bellSeries});
            }
            if(this.state.curve == false && this.state.chart.series.length === 2){
              this.state.chart.series[1].remove();
            }
            this.state.chart.update({series:[sampleMeanSeries,bellSeries], yAxis: {max: yMax}, xAxis : {title: {text:xLabel},max: xMax, min: xMin}});
        }
    }
}
export default SampleMeanChart;
