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
            sd : undefined
        }
    }
    render(){
        this.state.chart && this.show();
        return(
            <span style={{float:"left", width:"30%"}} id="sim-container"> </span>
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
        }
        console.log(sampleMeanSeries.data);
        let xMin;
        let xMax;
        if(this.props.normalized === 0){
            xMin = this.props.type === "Chi-Squared" ? 4 :  this.props.type === "Exponential" ? 0 : 55;
            xMax = this.props.type === "Chi-Squared" ? 12 : this.props.type === "Exponential" ? 150 : 75;
        }
        else{
          xMin = -3;
          xMax = 3;
        }
        const xLabel = (this.props.type == "Uniform" || this.props.type == "Normal" || this.props.type == "Mystery") ? "Sample Mean (in)" : this.props.type == "Exponential" ? "Sample Mean (seconds)" : "Sample Mean (dollars)";

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
        } else {
            this.state.chart.update({series:[sampleMeanSeries], yAxis: {max: yMax}, xAxis : {max: xMax, min: xMin}});
        }
    }
}
export default SampleMeanChart;
