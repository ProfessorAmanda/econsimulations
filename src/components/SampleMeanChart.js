import React, {Component} from 'react';
import Highcharts from 'highcharts';

class SampleMeanChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            chart: undefined,
            sampleMeans:[]
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
        console.log(this.props.sampleMeans);
        for (let i in this.props.sampleMeans){
            const val = Math.round(this.props.sampleMeans[i] * 4) / 4;
            let count = 1;
            for (let j of sampleMeanSeries.data){
                if (Math.round(j[0] * 4) / 4 === val){
                    count += 1;
                }
            }
            yMax = Math.max(count, yMax);
            sampleMeanSeries.data[i] = [val, count];
        }
        const xMin = this.props.type === "Chi-Squared" ? 4 :  this.props.type === "Exponential" ? 0 : 55;
        const xMax = this.props.type === "Chi-Squared" ? 12 : this.props.type === "Exponential" ? 150 : 75;
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
                                    text: 'Sample Mean (in)'
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
                            series: [sampleMeanSeries]
                            })});
        } else {
            this.state.chart.update({series:[sampleMeanSeries], yAxis: {max: yMax}, xAxis : {max: xMax, min: xMin}});
        }
    }
}
export default SampleMeanChart;
