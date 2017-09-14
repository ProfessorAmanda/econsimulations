import React, {Component} from 'react';
import Highcharts from 'highcharts';

class SampleMeanChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            chart: undefined,
            sampleMeans:[],
            meanDiffs:[]
        }
    }
    render(){
        this.props.sampleMeans && this.props.sampleMeans.length && this.show();
        return(
            <span id="sim-container"> </span>
        );
    }
    componentDidMount(){
        this.show();
    }
    show(){
        let sampleMeanSeries = {name: "Sample Means", data : []};
        let yMax = 30;
        for (let i in this.props.sampleMeans){
            const val = Math.round(this.props.sampleMeans[i]);
            let count = 1;
            for (let j of sampleMeanSeries.data){
                if (Math.round(j[0]) === val){
                    count += 1;
                }
            }
            yMax = Math.max(count, yMax);
            sampleMeanSeries.data[i] = [val, count];
        }
        if (!this.state.chart) {
            this.setState({chart: Highcharts.chart('sim-container', {
                            chart: {
                                type: 'scatter'
                            },
                            title: {
                                text: 'Sample Mean Distribution'
                            },
                            xAxis: {
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
            this.state.chart.update({series:[sampleMeanSeries], yAxis: {max: yMax}});
        }
    }
}
export default SampleMeanChart;

//automate sample mean sampling
//
