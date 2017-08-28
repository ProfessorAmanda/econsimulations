import React, { Component } from 'react';
import styled from 'styled-components';
import SimBar from './SimBar.js';
import PopBar from './PopBar.js';
import SampleArea from './SampleArea.js'
import Highcharts from 'highcharts';
import math from 'mathjs'
import chi from 'chi-squared'
import MeanButton from './MeanButton.js'

function PopTable(props) {
    const popArr = props.popArray[props.popType] || [];
    const samples = props.samples[props.popType];
    const rows = popArr.map( (val, index) => {
        for (let i of samples) {
            if (index === i){
                return (<tr style={{background:"red"}}><td>{index}</td><td>{Math.round(val * 10) / 10}</td></tr>);
            }
        }
        return(<tr><td>{index}</td><td>{Math.round(val * 10) / 10}</td></tr>);
    });
    return (
            <div style={{height:"300px", overflow:"scroll"}}>
                <table style={{border:"1px solid black"}}>
                    <tr>
                        <th> Subject </th>
                        <th> Height </th>
                    </tr>
                {rows}
                </table>
            </div>
        );
}



class SimulationContainer extends Component{
    constructor(){
        super();
        this.state = {
            mode: 'Home',
            popType: '',
            popArray:{
                "Normal": [],
                "Uniform": [],
                "Exponential": [],
                "Chi-Squared": []
            },
            popDict:{
                "Normal": [],
                "Uniform": [],
                "Exponential": [],
                "Chi-Squared": []
            },
            sampled:{
                "Normal": [],
                "Uniform": [],
                "Exponential": [],
                "Chi-Squared": []
            }
        }
    }
    selectPop(popType){
        clearInterval(this.timer);
        this.timer = setInterval( () => {
            this.generate(popType);
        }, 1500)
    }
    sample(size) {
        let sampled = []
        const currentPop = this.state.popArray[this.state.popType]
        while (sampled.length < size){
            let r = Math.round(Math.random() * currentPop.length)
            let shouldSample = true;
             for (let i = 0; i < sampled.length; i++){
                 if (sampled[i] === r) {
                     shouldSample = false;
                 }
            }
            shouldSample && sampled.push(r);
        }

        this.setState({sampled: Object.assign(this.state.sampled, {[this.state.popType] : sampled})})
    }
    generate(popType){
        switch (popType) {
            case "Normal":
                let newPopArray1 = Object.assign(this.state.popArray, {"Normal" : this.state.popArray[popType].concat(this.generateNormal())})
                this.setState({popArray :newPopArray1});
                break;
            case "Uniform":
                let newPopArray2 = Object.assign(this.state.popArray, {"Uniform" : this.state.popArray[popType].concat(this.generateUniform())})
                this.setState({popArray : newPopArray2});
                break;
            case "Exponential":
                let newPopArray3 = Object.assign(this.state.popArray, {"Exponential" : this.state.popArray[popType].concat(this.generateExponential())})
                this.setState({popArray : newPopArray3});
                break;
            case "Chi-Squared":
                let newPopArray4 = Object.assign(this.state.popArray, {"Chi-Squared" : this.state.popArray[popType].concat(this.generateChiSquared())})
                this.setState({popArray : newPopArray4});
                break;
        }
    }
    render(){
        const popTable = (<PopTable samples={this.state.sampled} popArray={this.state.popArray} popType={this.state.popType}/>)
        return(
            <div>
            <h1> {this.state.mode} </h1>
            <SimBar section= {this.state.mode} setSection={(section) => this.setState({mode:section})} />
            <PopBar section={this.state.popType} setPop={(pop) => {this.setState({popType:pop}); this.selectPop(pop)}}/>
            {popTable}
            <span style={{width:"800px"}} id="container"></span>
            <MeanButton type={"Population"} popArray = {this.state.popArray} popType={this.state.popType}/>
            <SampleArea sample={(size) => this.sample(size)} popArray = {this.state.popArray} popType={this.state.popType}/>
            <MeanButton type={"Sample"} popArray = {this.state.popArray} popType={this.state.popType}/>
            </div>
        );
    }
    generateNormal(){
        this.changePop(this.state.popDict["Normal"]);
        console.log()
        if (this.sum(this.state.popDict["Normal"]) === 10000){
            clearInterval(this.timer);
            return popArray;
        }
        const MEAN = 64;
        const STANDARD_DEV = 3;
        const ITERATES = 9;
        const range = Math.sqrt(12) * STANDARD_DEV * STANDARD_DEV;
        const popMin = MEAN - (range / 2);
        const popArray = []
        const sampleSize = this.sum(this.state.popDict["Normal"]) > 8000 ? 9999 - this.sum(this.state.popDict["Normal"]) : this.sum(this.state.popDict["Normal"]) + 1
        for (let i = 0; i < sampleSize; i++){
            let sum = 0;
            for (let j = 0; j < ITERATES; j++){
                sum += Math.random() * range + popMin;
            }
            if (this.state.popDict["Normal"][Math.round(sum / ITERATES * 10)]){
                this.state.popDict["Normal"][Math.round(sum / ITERATES * 10)] += 1
            }
            else {
                this.state.popDict["Normal"][Math.round(sum / ITERATES * 10)] = 1
            }
            popArray.push(sum / ITERATES)
        }
        return popArray
    }

    generateUniform(){
        this.changePop(this.state.popDict["Uniform"]);
        if (this.sum(this.state.popDict["Uniform"]) === 10000){
            clearInterval(this.timer);
            return popArray;
        }
        const HI = 74;
        const LOW = 54;
        const range = HI - LOW;
        const popArray = []
        const sampleSize = this.sum(this.state.popDict["Uniform"]) > 8000 ? 10000 - this.sum(this.state.popDict["Uniform"]) : this.sum(this.state.popDict["Uniform"]) + 1
        for (let i = 0; i < sampleSize; i++){
            let val = Math.random()*range + LOW;
            if (this.state.popDict["Uniform"][Math.round(val * 10)]){
                this.state.popDict["Uniform"][Math.round(val * 10)] += 1;
            } else {
                this.state.popDict["Uniform"][Math.round(val * 10)] = 1;
            }
            popArray.push(val);
        }
        return popArray;
    }

    generateExponential(){
        this.changePop(this.state.popDict["Exponential"]);
        if (this.sum(this.state.popDict["Exponential"]) === 10000){
            clearInterval(this.timer);
            return popArray;
        }
        const LAMBDA = 1/64;
        const popArray = [];
        const sampleSize = this.sum(this.state.popDict["Exponential"]) > 8000 ? 10000 - this.sum(this.state.popDict["Exponential"]) : this.sum(this.state.popDict["Exponential"]) + 1
        for (let i = 0; i < sampleSize; i++){
            let val = -Math.log(Math.random()) / LAMBDA
            if (this.state.popDict["Exponential"][Math.round(val * 10)]){
                this.state.popDict["Exponential"][Math.round(val * 10)] += 1;
            } else {
                this.state.popDict["Exponential"][Math.round(val * 10)] = 1;
            }
            popArray.push(val);
        }
        return popArray
    }

    generateChiSquared(){
        this.changePop(this.state.popDict["Chi-Squared"]);
        if (this.sum(this.state.popDict["Chi-Squared"]) === 10000){
            clearInterval(this.timer);
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
        const sampleSize = this.sum(this.state.popDict["Chi-Squared"]) > 8000 ? 10000 - this.sum(this.state.popDict["Chi-Squared"]) : this.sum(this.state.popDict["Chi-Squared"]) + 1
        for (let i = 0; i < sampleSize; i++){
            let val = chiArray[Math.round(Math.random() * chiArray.length)]
            if (this.state.popDict["Chi-Squared"][Math.round(val * 10)]){
                this.state.popDict["Chi-Squared"][Math.round(val * 10)] += 1;
            } else {
                this.state.popDict["Chi-Squared"][Math.round(val * 10)] = 1;
            }
            popArray.push(val);
        }
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
        const xmaxval = (this.state.popType == "Uniform" || this.state.popType == "Normal") ? 74 : this.state.popType == "Exponential" ? 350: 25;
        const xminval = (this.state.popType == "Uniform" || this.state.popType == "Normal") ? 56 : 0;
        const ymaxval = (this.state.popType == "Uniform" || this.state.popType == "Normal") ? 200 : this.state.popType == "Exponential" ? 30 : 150;
        if (!this.myChart || this.sum(popDict) === 10000) {
            this.myChart = Highcharts.chart('container', {
            chart: {
                type: 'scatter',
                zoomtype: 'xy'
            },
            title: {
                text: 'Female Height'
            },
            xAxis: {
                min: xminval,
                max: xmaxval,
                title : {
                    enabled: true,
                    text: 'Height (in)'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                max: ymaxval,
                title: {
                    text: 'Count'
                }
            },
            series: pseries
            });
        } else {
            const xvals = {
                min: xminval,
                max: xmaxval,
                title : {
                    enabled: true,
                    text: 'Height (in)'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            }
            const yvals = {
                max: ymaxval,
                title: {
                    text: 'Count'
                }
            }
            this.myChart.update({series:pseries, xAxis: xvals, yAxis: yvals})
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
