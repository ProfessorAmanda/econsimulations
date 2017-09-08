import React, {Component} from 'react';
import Highcharts from 'highcharts';

class SampleMeanChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            chart: undefined,
        }
    }
    render(){
        return(
            <div>
                <button onClick={() => {this.setState({chart:undefined,sampleMeans:[],meanDiffs:[]}); this.show()}}> Display Mean Distribution </button>
                <div id="sim-container"> </div>
            </div>
        );
    }
    show(){
        let sampleMeanSeries = {name: "Sample Means", data : []};
        for (let i in this.props.sampleMeans){
            const val = Math.round(this.props.sampleMeans[i] * 10) / 10
            let count = 1;
            for (let j of sampleMeanSeries.data){
                if (Math.round(j[0] * 10) / 10 === val){
                    count += 1;
                }
            }
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
                                    text: 'Height (in)'
                                },
                                startOnTick: true,
                                endOnTick: true,
                                showLastLabel: true
                            },
                            yAxis: {
                                title: {
                                    text: 'Count'
                                }
                            },
                            series: [sampleMeanSeries]
                            })});
        } else {
            this.state.chart.update({series:[sampleMeanSeries]});
        }
    }
}
export default SampleMeanChart;
