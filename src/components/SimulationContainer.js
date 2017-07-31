import React, { Component } from 'react';
import styled from 'styled-components';
import SimBar from './SimBar.js';
import PopBar from './PopBar.js';
import Highcharts from 'highcharts';
import math from 'mathjs'

class SimulationContainer extends Component{
    constructor(){
        super();
        this.state = {
            mode: 'Home',
            popType: '',
            pop:[]
        }
    }
    selectPop(popType){
        switch (popType) {
            case "Normal":
            this.setState({pop:this.generateNormal()})
            break;
            case "Uniform":

            break;
            case "Exponential":

            break;
            case "Chi-Square":

            break;
        }
    }
    render(){
        return(
            <div>
            <h1> {this.state.mode} </h1>
            <SimBar section= {this.state.mode} setSection={(section) => this.setState({mode:section})} />
            <PopBar section={this.state.pop} setPop={(pop) => {this.setState({popType:pop}); this.selectPop(pop)}}/>
            <div id="container"></div>
            </div>
        )
    }
    generateNormal(){
        const MEAN = 64;
        const STANDARD_DEV = 3;
        const ITERATES = 9;
        const range = Math.sqrt(12) * STANDARD_DEV * STANDARD_DEV;
        const popMin = MEAN - (range / 2);
        const popArray = []
        let pdict = []
        for (let i = 0; i < 10000; i++){
            let sum = 0;
            for (let j = 0; j < ITERATES; j++){
                sum += Math.random() * range + popMin;
            }
            if (pdict[Math.round(sum / ITERATES * 10)])
                pdict[Math.round(sum / ITERATES * 10)] += 1
            else {
                pdict[Math.round(sum / ITERATES * 10)] = 1
            }
            popArray.push(sum / ITERATES)
        }
        let pseries = [{data : [], color: '#F27474', name:"Female"}]
        for (let i in pdict) {
            if (i) {
                for (let j = 1; j < pdict[i] + 1; j++) {
                    pseries[0].data.push([i / 10, j])
                }
            }
        }
        this.changePop(pseries);
        console.log(popArray);
        console.log(math.std(popArray));
        console.log(math.mean(popArray));
        return popArray
    }

    changePop(pseries) {
        let myChart = Highcharts.chart('container', {
        chart: {
            type: 'scatter',
            zoomtype: 'xy'
        },
        title: {
            text: 'Female Height'
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
        series: pseries
    });
    }
}
export default SimulationContainer;
