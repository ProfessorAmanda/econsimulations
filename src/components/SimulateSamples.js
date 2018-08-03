import React, { Component } from 'react';
import math from "mathjs";
import Highcharts from "highcharts";

class SimulateSamples extends Component {
    constructor(props){
        super(props);
        this.state = {
            sampleMeans: [],
            meanDiffs: [],
            chart: undefined,
            type: ''
        }
    }
    render(){
        if (this.props.type !== this.state.type) {
            this.state.chart && this.state.chart.destroy();
            this.state = {chart:undefined,sampleMeans:[],meanDiffs:[], type:this.props.type};
        }
        return(
            <div>
                <button disabled = {this.timer} onClick={() => {this.setState({chart:undefined,sampleMeans:[],meanDiffs:[], type:''}); this.simulate()}}> Run Simulation </button>
                <div id="sim-container"> </div>
            </div>
        );
    }


    simulate(){
        this.chart();
        setTimeout(()=> {
            let n = 1;
            // iterations of this add points to the graph
            this.timer = setInterval( () => {
                this.calculate(n, this.props.pop);
                this.chart();
                n += 1;
                if (n === 101) {
                    clearInterval(this.timer);
                    this.timer = null;
                    this.setState({});
                }
            }, 175);
        }, 600);
    }

    chart(){
        let popMeanSeries = {name: "Population Mean", data: []};
        let sampleMeanSeries = {name: "Sample Means", data : []};
        // making arrays null
        for (let i = 0; i < 100; i++){
            popMeanSeries.data[i] = null;
            sampleMeanSeries.data[i] = null;
        }
        // called over and over
        for (let i = 0; i < this.state.sampleMeans.length; i++){
            popMeanSeries.data[i] = Math.round(math.mean(this.props.pop) * 10) / 10;
            sampleMeanSeries.data[i] = this.state.sampleMeans[i];
        }
        if (!this.state.chart) {
            let myCategories = [];
            // this is x axis
            for (let i=0; i < 50; i++){
                myCategories[i]= (2 * (i+1));
            }
            for (let i=50; i < 100; i++){
                myCategories[i]= 100 + (18 * (i-49));
            }
            const yMax = this.props.type === "Chi-Squared" ? 10 : this.props.type === "Exponential" ? 90 : 67;
            const yMin = this.props.type === "Chi-Squared" ? 6 : this.props.type === "Exponential" ? 40 : 61
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
                                min: yMin,
                                max: yMax,
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

    calculate(n, pop){
        window.scrollBy(0, 400);
        for (let i = n; i < n + 1; i++){
            // controls size!!!  still need to change the x-axis though
            //let size = pop.length / 200 * i;
            let size;
            if(i < 50){
              size = 2 * i;
            }
            else{
              size = 100 + (18 * (i-50));
            }
            const sample = this.props.sample(size, pop);
            let vals = [];
            for (let j of sample){
                vals.push(pop[j[0]]);
            }
            // adds pop means to this.state.sampleMeans
            this.state.sampleMeans.push(Math.round(math.mean(vals) * 10) / 10);
            this.state.meanDiffs.push(this.state.popMean - math.mean(vals));
        }

    }
}

export default SimulateSamples;
