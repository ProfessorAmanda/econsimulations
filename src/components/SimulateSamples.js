import React, { Component } from 'react';
import math from "mathjs";
import Highcharts from "highcharts";

class SimulateSamples extends Component {
    constructor(props){
        super(props);
        this.state = {
            sampleMeans: [],
            meanDiffs: [],
            chart: undefined
        }
    }
    render(){
        return(
            <div>
                <button onClick={() => {this.setState({chart:undefined,sampleMeans:[],meanDiffs:[]}); this.simulate()}}> Run Simulation </button>
                <div id="sim-container"> </div>
            </div>
        );
    }

    chart(){
        let popMeanSeries = {name: "Population Mean", data: []};
        let sampleMeanSeries = {name: "Sample Means", data : []};
        for (let i = 0; i < 100; i++){
            popMeanSeries.data[i] = math.mean(this.props.pop);
            sampleMeanSeries.data[i] = null;
        }
        for (let i = 0; i < this.state.sampleMeans.length; i++){
            sampleMeanSeries.data[i] = this.state.sampleMeans[i];
        }
        if (!this.state.chart) {
            let myCategories = [];
            for (let i=0; i < 100; i++){
                myCategories[i]= (this.props.pop.length / 100 * i);
            }
            this.setState({chart: Highcharts.chart('sim-container', {
                            chart: {
                                type: 'line'
                            },
                            title: {
                                text: 'Population vs Sample Means'
                            },
                            xAxis: {
                                categories: myCategories,
                                title : {
                                    enabled: true,
                                    text: 'Sample Size'
                                },
                                startOnTick: true,
                                endOnTick: true,
                                showLastLabel: true
                            },
                            yAxis: {
                                title: {
                                    text: 'Mean'
                                }
                            },
                            series: [popMeanSeries, sampleMeanSeries]
                            })});
        } else {
            this.state.chart.update({series:[popMeanSeries, sampleMeanSeries]});
        }
    }
    simulate(){
        let n = 1;
        this.timer = setInterval( () => {
            this.calculate(n, this.props.pop);
            this.chart();
            n += 1;
            n === 101 && clearInterval(this.timer);
        }, n === 2 ? 1000 : 100);
    }
    calculate(n, pop){
        for (let i = n; i < n + 1; i++){
            let size = pop.length / 100 * i;
            const sample = this.props.sample(size, pop);
            let vals = [];
            for (let j of sample){
                vals.push(pop[j[0]]);
            }
            this.state.sampleMeans.push(math.mean(vals));
            this.state.meanDiffs.push(this.state.popMean - math.mean(vals));
        }
    }
}

export default SimulateSamples;
