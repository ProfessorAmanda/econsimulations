import React, { Component } from 'react';
import styled from 'styled-components';
import SimBar from './SimBar.js';
import PopBar from './PopBar.js';
import Highcharts from 'highcharts';
import math from 'mathjs'
import chi from 'chi-squared'

class SimulationContainer extends Component{
    constructor(){
        super();
        this.state = {
            mode: 'Home',
            popType: '',
            popArray:{},
            popDict:{
                "normal": [],
                "uniform": [],
                "exponential": [],
                "chi-square": []
            }
        }
    }
    selectPop(popType){
        this.timer = setInterval( () => {
            this.generate(popType);
        }, 1000)
    }

    generate(popType){
        switch (popType) {
            case "Normal":
                this.setState({pop:{popType:this.generateNormal()}})
                break;
            case "Uniform":
                this.setState({pop:{popType:this.generateUniform()}})
                break;
            case "Exponential":
                this.setState({pop:{popType:this.generateExponential()}})
                break;
            case "Chi-Squared":
                this.setState({pop:{popType:this.generateChiSquared()}})
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
        if (this.sum(this.state.popDict["normal"]) > 8000){
            clearInterval(this.timer);
            this.changePop(this.state.popDict["normal"]);
            return popArray;
        }
        const MEAN = 64;
        const STANDARD_DEV = 3;
        const ITERATES = 9;
        const range = Math.sqrt(12) * STANDARD_DEV * STANDARD_DEV;
        const popMin = MEAN - (range / 2);
        const popArray = []
        const sampleSize = this.sum(this.state.popDict["normal"]) + 1
        for (let i = 0; i < sampleSize; i++){
            let sum = 0;
            for (let j = 0; j < ITERATES; j++){
                sum += Math.random() * range + popMin;
            }
            if (this.state.popDict["normal"][Math.round(sum / ITERATES * 10)]){
                this.state.popDict["normal"][Math.round(sum / ITERATES * 10)] += 1
            }
            else {
                this.state.popDict["normal"][Math.round(sum / ITERATES * 10)] = 1
            }
            popArray.push(sum / ITERATES)
        }
        this.changePop(this.state.popDict["normal"]);
        return popArray
    }

    generateUniform(){
        if (this.sum(this.state.popDict["uniform"]) > 8000){
            clearInterval(this.timer);
            this.changePop(this.state.popDict["uniform"]);
            return popArray;
        }
        const HI = 74;
        const LOW = 54;
        const range = HI - LOW;
        const popArray = []
        const sampleSize = this.sum(this.state.popDict["uniform"]) + 1
        for (let i = 0; i < sampleSize; i++){
            let val = Math.random()*range + LOW;
            if (this.state.popDict["uniform"][Math.round(val * 10)]){
                this.state.popDict["uniform"][Math.round(val * 10)] += 1;
            } else {
                this.state.popDict["uniform"][Math.round(val * 10)] = 1;
            }
            popArray.push(val);
        }
        this.changePop(this.state.popDict["uniform"]);
        return popArray;
    }

    generateExponential(){
        if (this.sum(this.state.popDict["exponential"]) > 8000){
            clearInterval(this.timer);
            this.changePop(this.state.popDict["exponential"]);
            return popArray;
        }
        const LAMBDA = 1/64;
        const popArray = [];
        const sampleSize = this.sum(this.state.popDict["exponential"]) + 1
        for (let i = 0; i < sampleSize; i++){
            let val = -Math.log(Math.random()) / LAMBDA
            if (this.state.popDict["exponential"][Math.round(val * 10)]){
                this.state.popDict["exponential"][Math.round(val * 10)] += 1;
            } else {
                this.state.popDict["exponential"][Math.round(val * 10)] = 1;
            }
            popArray.push(val);
        }
        this.changePop(this.state.popDict["exponential"]);
        return popArray
    }

    generateChiSquared(){
        if (this.sum(this.state.popDict["chi-square"]) > 8000){
            clearInterval(this.timer);
            this.changePop(this.state.popDict["chi-square"]);
            return popArray;
        }
        const DEGREES_OF_FREEDOM = 8;
        const popArray = [];
        let chiArray = []
        const chiMin = chi.pdf(20, DEGREES_OF_FREEDOM)
        for (let i = 0; i < 20; i+=.1){
            let tmp = chi.pdf(i, DEGREES_OF_FREEDOM)
            for (let j = 0; j < tmp / chiMin; j++){
                chiArray.push(i)
            }
        }
        const sampleSize = this.sum(this.state.popDict["chi-square"]) + 1
        for (let i = 0; i < sampleSize; i++){
            let val = chiArray[Math.round(Math.random() * chiArray.length)]
            if (this.state.popDict["chi-square"][Math.round(val * 10)]){
                this.state.popDict["chi-square"][Math.round(val * 10)] += 1;
            } else {
                this.state.popDict["chi-square"][Math.round(val * 10)] = 1;
            }
            popArray.push(val);
        }
        this.changePop(this.state.popDict["chi-square"]);
        return popArray
    }

    changePop(popDict) {
        let pseries = [{data : [], color: '#F27474', name:"Population"}]
        for (let i in popDict) {
            if (i) {
                for (let j = 1; j < popDict[i] + 1; j++) {
                    pseries[0].data.push([i / 10, j])
                }
            }
        }
        if (!this.myChart) {
            this.myChart = Highcharts.chart('container', {
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
        } else {
            this.myChart.update({series:pseries})
        }
    }
    sum(pop){
        let val = 0
        for (let i of pop){
            if (i){
                val += i
            }
        }
        return val;
    }
}
export default SimulationContainer;
