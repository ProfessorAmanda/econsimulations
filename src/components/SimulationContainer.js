import React, { Component } from 'react';
import styled from 'styled-components';
import SimBar from './SimBar.js';
import PopBar from './PopBar.js';
import Highcharts from 'highcharts';
import math from 'mathjs'
import chi from 'chi-squared'


function popTable(props) {
    let rows = props.popArray.forEach( (val, index) => {
        return (<tr> <td> {index} </td> <td> {val} </td> </tr>);
    });
    return (<table> <tr> <th> "Subject" </th> <th> "Height" </th> </tr> {rows} </table>);
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
            }
        }
    }
    selectPop(popType){
        clearInterval(this.timer);
        this.timer = setInterval( () => {
            this.generate(popType);
        }, 1500)
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
        return(
            <div>
            <h1> {this.state.mode} </h1>
            <SimBar section= {this.state.mode} setSection={(section) => this.setState({mode:section})} />
            <PopBar section={this.state.popType} setPop={(pop) => {this.setState({popType:pop}); this.selectPop(pop)}}/>
            <div style={{width:"800px"}} id="container"></div>
            <popTable popArray={this.state.popArray[this.state.popType]}/>
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
        const sampleSize = this.sum(this.state.popDict["Normal"]) > 8000 ? 10000 - this.sum(this.state.popDict["Normal"]) : this.sum(this.state.popDict["Normal"]) + 1
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
        if (this.sum(this.state.popDict["Uniform"]) === 8000){
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
