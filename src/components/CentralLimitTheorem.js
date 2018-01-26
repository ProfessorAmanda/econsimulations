import React, {Component} from 'react'
import styled from 'styled-components';
import PopBar from './PopBar.js';
import SampleArea from './SampleArea.js'
import Highcharts from 'highcharts';
import math from 'mathjs'
import chi from 'chi-squared'
import MeanButton from './MeanButton.js'
import SimulateSamples from './SimulateSamples.js'
import SampleMeanChart from './SampleMeanChart.js'
import SampleMeanSimulator from './SampleMeanSimulator.js'

const SAMPLE_SIZE = 1000;
const BASE_STATE = {
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
class CentralLimitTheorem extends Component {
    constructor(props){
        super(props);
        this.state = BASE_STATE;
    }

    render(){
        const popTable = (<PopTable samples={this.state.sampled} popArray={this.state.popArray} popType={this.state.popType}/>)
        const popDrawn = this.state.popArray[this.state.popType] && this.state.popArray[this.state.popType].length === SAMPLE_SIZE;
        console.log(this.state.popType);
        return(
            <div>
                <div style={{width:"100%", height:"300px"}}>
                    <div style={{width:"10%"}}>
                        <PopBar section={this.state.popType} setPop={(pop) => {this.setState({popType:pop}); this.selectPop(pop)}}/>
                    </div>
                    <span style={{float: "left", width:"30%"}} id="container"></span>
                    {popDrawn ? <SampleMeanChart type={this.state.popType} sampleMeans={this.state.sampleMean[this.state.popType]}/> : null}
                    {popDrawn ? <span style={{width:"25%"}}>
                        <MeanButton string={"Population"} calculable={true}
                        setmean={(mean) => this.setState({popMean:Object.assign(this.state.popMean, {[this.state.popType] : mean})})}
                        popArray = {this.state.popArray} popType={this.state.popType}/>

                        {this.state.stage == 0 ?
                        <span> <p> Try drawing one sample of a specified size and plotting its mean </p>
                        <SampleArea redraw = {() => {this.changePop(this.state.popDict[this.state.popType], this.state.popType); this.sampleMean(math.mean(this.state.samplePop[this.state.popType]))}}
                        sample={(size) => this.setState({stage: 1, calculable: true, sampled: Object.assign(this.state.sampled, {[this.state.popType] : this.sample(size, this.state.popArray[this.state.popType])})})}
                        popArray = {this.state.popArray}
                        popType={this.state.popType}/>
                        </span>: this.state.stage == 1 ?

                        <span> <p> Ok, now see what happens with a different size </p>
                        <SampleArea redraw = {() => {this.changePop(this.state.popDict[this.state.popType], this.state.popType); this.sampleMean(math.mean(this.state.samplePop[this.state.popType]))}}
                        sample={(size) => this.setState({stage: 2, calculable: true, sampled: Object.assign(this.state.sampled, {[this.state.popType] : this.sample(size, this.state.popArray[this.state.popType])})})}
                        popArray = {this.state.popArray}
                        popType={this.state.popType}/>
                        </span> :

                        <span><p> Finally, simulate drawing samples at a specified size many times and plotting each mean </p>
                            <SampleMeanSimulator style={{float:'right'}}
                            clear={()=> this.setState({calculable: false, sampleMean: Object.assign(this.state.sampleMean, {[this.state.popType] : []})})}
                            population={this.state.popArray[this.state.popType]}
                            sample={(means)=>{this.updateSampleMeansFromArray(means)}}/>
                        </span>}

                    </span> : null}
                </div>
                <button onClick={()=>{ this.clearState(); this.myChart.destroy(); this.myChart = null;}}> CLEAR </button>
            </div>
        );
    }

    clearState() {
        for (let i in this.state){
            if (i !== "poptype" || i !== "stage"){
                for (let j of ["Normal", "Uniform", "Exponential", "Chi-Squared"]){
                    this.setState({i: Object.assign(this.state[i], {[j] : []})});
                }

            }
        }
        this.setState({popType:'', stage:0});
        clearInterval(this.timer);
    }

    sampleMean(mean){
        const sampleMeans = this.state.sampleMean[this.state.popType];
        sampleMeans.push(mean);
        this.setState({calculable: false, sampleMean: Object.assign(this.state.sampleMean, {[this.state.popType] : sampleMeans})});
    }

    updateSampleMeansFromArray(means){
        let sampleMeans = this.state.sampleMean[this.state.popType];
        sampleMeans = sampleMeans.concat(means);
        this.setState({calculable: false, sampleMean: Object.assign(this.state.sampleMean, {[this.state.popType] : sampleMeans})});
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

    sum(pop){
        let val = 0
        for (let i of pop){
            if (i){
                val += i
            }
        }
        return val;
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
}

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
            <div style={{float:"left", height:"300px", overflow:"scroll"}}>
                <table style={{width: "100%", border:"1px solid black"}}>
                    <tr>
                        <th> Subject </th>
                        <th> Height </th>
                    </tr>
                </table>
                <table style={{width: "100%", border:"1px solid black"}}>
                    {rows}
                </table>
            </div>
        );
}

function DifferenceOfMeans(props){
    const diff = (Math.round((props.popMean - props.sampleMean) * 100) / 100) === 0 ? 0 : Math.round((props.popMean - props.sampleMean) * 100) / 100 || '';
    return (<h4> Difference of Means:  {diff} </h4>);
}


/*
function SampleMeanTable(props){
    const means = props.sampleMeans;
    const rows = means && means.map( (val, index) => {
        return(<tr><td>{index + 1}</td><td>{Math.round(val * 10) / 10}</td></tr>);
    });
    return (
            <div style={{float:"left", height:"150px", overflow:"scroll", margin:"35px"}}>
                <table style={{width: "100%", border:"1px solid black"}}>
                    <tr>
                        <th> Observation </th>
                        <th> Mean </th>
                    </tr>
                </table>
                <table style={{width: "100%", border:"1px solid black"}}>
                    {rows}
                </table>
            </div>
        );
}
*/

export default CentralLimitTheorem;
