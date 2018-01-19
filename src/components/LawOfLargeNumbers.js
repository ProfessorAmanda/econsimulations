import React, { Component } from 'react';
import styled from 'styled-components';
import PopBar from './PopBar.js';
import SampleArea from './SampleArea.js'
import Highcharts from 'highcharts';
import math from 'mathjs'
import chi from 'chi-squared'
import MeanButton from './MeanButton.js'
import HelpModal from './HelpModal.js'
import SimulateSamples from './SimulateSamples.js'

const SAMPLE_SIZE = 1000

function PopTable(props) {
    const popArr = props.popArray[props.popType] || [];
    const samples = props.samples[props.popType];
    const rows = popArr.map( (val, index) => {
        if (val){
            for (let i of samples) {
                if (index === i[0]){
                    return (<tr style={{background:"#747EF2"}}><td>{index + 1}</td><td>{Math.round(val * 10) / 10}</td></tr>);
                }
            }
            return(<tr><td>{index + 1}</td><td>{Math.round(val * 10) / 10}</td></tr>);
        }
    });
    return (
            <div style={{float:"left", width:"10%", height:"300px", overflow:"scroll"}}>
                <table style={{width: "100%", border:"1px solid black"}}>
                    <tbody>
                        <tr>
                            <th> Subject </th>
                            <th> Height </th>
                        </tr>
                    </tbody>
                </table>
                <table style={{width: "100%", border:"1px solid black"}}>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
}

function DifferenceOfMeans(props){
    const diff = (Math.round((props.popMean - props.sampleMean) * 100) / 100) === 0 ? 0 : Math.round((props.popMean - props.sampleMean) * 100) / 100 || '';
    return (<h4> Difference of Means:  {diff} </h4>);
}



class LawOfLargeNumbers extends Component{
    constructor(props){
        super(props);
        this.state = {
            popType: '',
            popMean: {
                "Normal": [],
                "Uniform": [],
                "Exponential": [],
                "Chi-Squared": []
            },
            sampleMean: {
                "Normal": [],
                "Uniform": [],
                "Exponential": [],
                "Chi-Squared": []
            },
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
            },
            samplePop: {
                "Normal": [],
                "Uniform": [],
                "Exponential": [],
                "Chi-Squared": []
            },
            stage : 0
        }
    }

    render(){
        const popTable = (<PopTable style={{width:"50%"}}  samples={this.state.sampled} popArray={this.state.popArray} popType={this.state.popType}/>)
        const popDrawn = this.state.popArray[this.state.popType] && this.state.popArray[this.state.popType].length === SAMPLE_SIZE;
        return(
            <div>
                <div style={{width:"10%"}}>
                    <PopBar section={this.state.popType} setPop={(pop) => {this.setState({popType:pop}); this.selectPop(pop)}}/>
                </div>
                {popTable}
                <span style={{float:'left', width:"30%"}} id="container"></span>
                {popDrawn ? <span style={{width:"20%"}}>
                    <MeanButton string={"Population"} calculable={true} setmean={(mean) => this.setState({stage:1,popMean:Object.assign(this.state.popMean, {[this.state.popType] : mean})})} popArray = {this.state.popArray} popType={this.state.popType}/>
                    { this.state.stage >= 1 ? <span> <label> Step 3: Sampling </label> <HelpModal content={"Sampling"}/> </span> : null }
                    { this.state.stage >= 1 ? <span> <p> Take a Sample:</p> {this.state.stage >= 2 ? <p> Try a few different sample sizes and compare sample mean to population mean </p> : null}<SampleArea redraw = {() => this.changePop(this.state.popDict[this.state.popType], this.state.popType)} sample={(size) => this.setState({stage:2,sampled: Object.assign(this.state.sampled, {[this.state.popType] : this.sample(size, this.state.popArray[this.state.popType])})})} popArray = {this.state.popArray} popType={this.state.popType}/></span> : null}
                    { this.state.stage >= 2 ? <MeanButton string={"Sample"} calculable={true} setmean={(mean) => this.setState({stage:3,sampleMean:Object.assign(this.state.sampleMean, {[this.state.popType] : mean})})} popArray = {this.state.samplePop} popType={this.state.popType}/> : null}
                    { this.state.stage >= 3 ? <DifferenceOfMeans popMean={this.state.popMean[this.state.popType]} sampleMean={this.state.sampleMean[this.state.popType]}/> : null}
                    <button onClick={()=>{ this.clearState(); this.myChart.destroy(); this.myChart = null;}}> CLEAR </button>
                </span> : null}
                { this.state.stage >= 2 && popDrawn ? <div style={{width:"100%"}}> <p> See simulation of different sample sizes below main plot: </p> <SimulateSamples type={this.state.popType} sample={(size, pop) => {return this.sample(size, pop)}} pop={this.state.popArray[this.state.popType]}/> <HelpModal content={"SimulateSamples"}/></div> : null}
            </div>
        );
    }


    selectPop(popType){
        this.changePop(this.state.popDict[popType], popType);
        setTimeout(() => {
            clearInterval(this.timer); //stop any populating that may be happening
            this.timer = setInterval( () => {
                this.generate(popType);
            }, 200);
        }, 500)
    }
    sample(size, array) {
        let sampled = []
        const currentPop = array;
        while (sampled.length < size){
            let r = Math.round(Math.random() * (currentPop.length - 1))
            let shouldSample = true;
             for (let i = 0; i < sampled.length; i++){
                 if (sampled[i][0] === r) {
                     shouldSample = false;
                 }
            }
            let count = 1;
            currentPop.forEach( (val, index) => {
                if (index < r && Math.round(val * 10) === Math.round(currentPop[r] * 10)) {
                    count += 1;
                }
            });
            shouldSample && sampled.push([r, count]);
        }
        return sampled
    }
    generate(popType){
        switch (popType) {
            case "Normal":
                this.setState({popArray : Object.assign(this.state.popArray, {"Normal" : this.state.popArray[popType].concat(this.generateNormal())})});
                break;
            case "Uniform":
                this.setState({popArray : Object.assign(this.state.popArray, {"Uniform" : this.state.popArray[popType].concat(this.generateUniform())})});
                break;
            case "Exponential":
                this.setState({popArray : Object.assign(this.state.popArray, {"Exponential" : this.state.popArray[popType].concat(this.generateExponential())})});
                break;
            case "Chi-Squared":
                this.setState({popArray : Object.assign(this.state.popArray, {"Chi-Squared" : this.state.popArray[popType].concat(this.generateChiSquared())})});
                break;
        }
    }

    clearState() {
        for (let i in this.state){
            if (i !== "poptype" || i !== "stage"){
                for (let j of ["Normal", "Uniform", "Exponential", "Chi-Squared"]){
                    this.setState({i: Object.assign(this.state[i], {[j] : []})});
                }

            }
        }
        this.setState({popType: '', stage: 0});
        clearInterval(this.timer);
    }
    generateNormal(){
        this.changePop(this.state.popDict["Normal"], "Normal");
        if (this.sum(this.state.popDict["Normal"]) === SAMPLE_SIZE){
            clearInterval(this.timer);
            return [];
        }
        const MEAN = 64;
        const STANDARD_DEV = 3;
        const ITERATES = 9;
        const range = Math.sqrt(12) * STANDARD_DEV * STANDARD_DEV;
        const popMin = MEAN - (range / 2);
        const popArray = []
        const sampleSize = this.sum(this.state.popDict["Normal"]) > SAMPLE_SIZE / 2 ? SAMPLE_SIZE - this.sum(this.state.popDict["Normal"]) : this.sum(this.state.popDict["Normal"]) / 4 + 1
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
        this.changePop(this.state.popDict["Uniform"], "Uniform");
        if (this.sum(this.state.popDict["Uniform"]) === SAMPLE_SIZE){
            clearInterval(this.timer);
            return [];
        }
        const HI = 74;
        const LOW = 54;
        const range = HI - LOW;
        const popArray = []
        const sampleSize = this.sum(this.state.popDict["Uniform"]) > SAMPLE_SIZE * 1/2 ? SAMPLE_SIZE - this.sum(this.state.popDict["Uniform"]) : this.sum(this.state.popDict["Uniform"]) / 2 + 1
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
        this.changePop(this.state.popDict["Exponential"], "Exponential");
        if (this.sum(this.state.popDict["Exponential"]) === SAMPLE_SIZE){
            clearInterval(this.timer);
            return [];
        }
        const LAMBDA = 1/64;
        const popArray = [];
        const sampleSize = this.sum(this.state.popDict["Exponential"]) > SAMPLE_SIZE / 2 ? SAMPLE_SIZE - this.sum(this.state.popDict["Exponential"]) : this.sum(this.state.popDict["Exponential"]) + 1
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
        this.changePop(this.state.popDict["Chi-Squared"], "Chi-Squared");
        if (this.sum(this.state.popDict["Chi-Squared"]) === SAMPLE_SIZE){
            clearInterval(this.timer);
            return [];
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
        const sampleSize = this.sum(this.state.popDict["Chi-Squared"]) > SAMPLE_SIZE / 2 ? SAMPLE_SIZE - this.sum(this.state.popDict["Chi-Squared"]) : this.sum(this.state.popDict["Chi-Squared"]) + 1
        for (let i = 0; i < sampleSize; i++){
            let val = chiArray[Math.round(Math.random() * chiArray.length)]
            if (this.state.popDict["Chi-Squared"][Math.round(val * 10)]){
                this.state.popDict["Chi-Squared"][Math.round(val * 10)] += 1;
            } else {
                this.state.popDict["Chi-Squared"][Math.round(val * 10)] = 1;
            }
            popArray.push(val);
        }
        return popArray;
    }

    changePop(popDict, popType) {
        let pseries = {data : [], color: '#F27474', name:"Population"}
        let sampleSeries = {data : [], color: '#747EF2', name:"Sample"}
        let sampledCopy = this.state.sampled[popType];
        let sampleVals = [[]];
        let samplePop = []
        for (let j in sampledCopy){
            sampleVals[j] = [];
            sampleVals[j][0] = Math.round(this.state.popArray[popType][sampledCopy[j][0]] * 10)
            sampleVals[j][1] = sampledCopy[j][1];
            samplePop.push(sampleVals[j][0] / 10)
        }
        for (let i in popDict) {
            if (i) {
                for (let j = 1; j < popDict[i] + 1; j++) {
                    for (let subArr of sampleVals){
                        if (subArr[0] == i && subArr[1] == j){
                            sampleSeries.data.push([i / 10, j]);
                        }
                    }
                    pseries.data.push([i / 10, j])
                }
            }
        }
        const xmaxval = (popType == "Uniform" || popType == "Normal") ? 74 : popType == "Exponential" ? 350: 25;
        const xminval = (popType == "Uniform" || popType == "Normal") ? 56 : 0;
        const ymaxval = (popType == "Uniform" || popType == "Normal") ? 30 : popType == "Exponential" ? 10 : 20;
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
            series: [pseries, sampleSeries]
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
            this.myChart.update({series:[pseries, sampleSeries], xAxis: xvals, yAxis: yvals})
        }
        this.setState({samplePop : Object.assign(this.state.samplePop, {[this.state.popType]: samplePop})})
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
export default LawOfLargeNumbers;
