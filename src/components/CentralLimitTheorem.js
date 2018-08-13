import React, {Component} from 'react'
import styled from 'styled-components';
import PopBar from './PopBar.js';
import ToggleStandard from './ToggleStandard.js';
import SampleArea from './SampleArea.js';
import Highcharts from 'highcharts';
import math from 'mathjs'
import chi from 'chi-squared'
import MeanButton from './MeanButton.js'
import SimulateSamples from './SimulateSamples.js'
import SampleMeanChart from './SampleMeanChart.js'
import SampleMeanSimulator from './SampleMeanSimulator.js'
import SampleAreaCLT from './SampleAreaCLT.js'

const SAMPLE_SIZE = 1000;
const BASE_STATE = {
    popType: '',
    popMean: {
        "Normal": [],
        "Uniform": [],
        "Exponential": [],
        "Chi-Squared": [],
        "Mystery": []
    },
    sampleMean: {
        "Normal": [],
        "Uniform": [],
        "Exponential": [],
        "Chi-Squared": [],
        "Mystery": []
    },
    popArray:{
        "Normal": [],
        "Uniform": [],
        "Exponential": [],
        "Chi-Squared": [],
        "Mystery": []
    },
    popDict:{
        "Normal": [],
        "Uniform": [],
        "Exponential": [],
        "Chi-Squared": [],
        "Mystery": []
    },
    sampled:{
        "Normal": [],
        "Uniform": [],
        "Exponential": [],
        "Chi-Squared": [],
        "Mystery": []
    },
    samplePop: {
        "Normal": [],
        "Uniform": [],
        "Exponential": [],
        "Chi-Squared": [],
        "Mystery": []
    },
    stage : 0,
    numberResamples : {
        "Normal": 0,
        "Uniform": 0,
        "Exponential": 0,
        "Chi-Squared": 0,
        "Mystery": 0
    },
    resampleSize : {
        "Normal": 0,
        "Uniform": 0,
        "Exponential": 0,
        "Chi-Squared": 0,
        "Mystery": 0
    },
    stages: {
      "Normal": 0,
      "Uniform": 0,
      "Exponential": 0,
      "Chi-Squared": 0,
      "Mystery" : 0
    },
    clearedArray: {
      "Normal": [],
      "Uniform": [],
      "Exponential": [],
      "Chi-Squared": [],
      "Mystery": []
    },
    standardNormal : 0,
    sampleSize : 1
}
class CentralLimitTheorem extends Component {
    constructor(props){
        super(props);
        this.state = BASE_STATE;
    }

    render(){
        const popTable = (<PopTable samples={this.state.sampled} popArray={this.state.popArray} popType={this.state.popType}/>)
        const popDrawn = this.state.popArray[this.state.popType] && this.state.popArray[this.state.popType].length === SAMPLE_SIZE;
        return(
            <div>
                <div style={{width:"100%", height:"300px"}}>
                    <div style={{width:"10%"}}>
                        <ToggleStandard section={this.state.standardNormal} toggleSwitch={(set) => {this.setState({standardNormal : set})}} />
                        <PopBar section={this.state.popType} mode = "CLT" setPop={(pop) => {
                          let copy = this.state.stages;
                          copy[this.state.popType] = this.state.stage;
                          //copy[this.state.popType] = 0;
                          this.setState({stages : copy});
                          // erase means
                          // let popCopy = this.state.popMean;
                          // popCopy[this.state.popType] = [];
                          // this.setState({popMean : popCopy});
                          //erase means
                          // let sampCopy = this.state.sampleMean;
                          // sampCopy[this.state.popType] = [];
                          // this.setState({sampleMean : sampCopy});
                          // new dist
                          this.setState({popType:pop});
                          this.setState({popType:pop});
                          this.setState({stage : this.state.stages[pop]});
                          this.selectPop(pop);
                        }}/>
                    </div>
                    <div>
                        <button onClick={()=>{ this.clearState(); this.myChart.destroy(); this.myChart = null;}}> CLEAR </button>
                    </div>
                    <span style={{float: "left", width:"30%"}} id="container"></span>
                    {popDrawn ? <SampleMeanChart mean={math.mean(this.state.popArray[this.state.popType])} sd={math.std(this.state.popArray[this.state.popType])} normalized={this.state.standardNormal} sampleSize={this.state.sampleSize} type={this.state.popType} normal={this.state.standardNormal} sampleMeans={this.state.sampleMean[this.state.popType]}/> : null}
                    {popDrawn ? <span style={{width:"25%"}}>
                        <MeanButton string={"Population"} calculable={true}
                        setmean={(mean) => this.setState({popMean:Object.assign(this.state.popMean, {[this.state.popType] : mean})})}
                        popArray = {this.state.popArray} popType={this.state.popType}/>
                        <h4> {this.state.popType} Mean: {this.state.popMean[this.state.popType] || ''} </h4>

                        <div>
                            <h4> Step 3: Try drawing some samples and calculating means </h4>
                            <SampleAreaCLT redraw = {() => {this.changePop(this.state.popDict[this.state.popType], this.state.popType)}}
                            sample={(size) => this.setState({stage: this.state.stage + 1, sampleSize: parseInt(size), calculable: true, sampled: Object.assign(this.state.sampled, {[this.state.popType] : this.sample(size, this.state.popArray[this.state.popType])})})}
                            popArray = {this.state.popArray}
                            popType={this.state.popType} setmean = {(mean) => {
                              let sum = 0;
                              const sampledCopy = this.state.sampled[this.state.popType];
                              for(let i=0;i<this.state.sampled[this.state.popType].length;i++){
                                sum += Math.round(this.state.popArray[this.state.popType][sampledCopy[i][0]] * 10);
                              }
                              let newMean = Math.round(((sum/this.state.sampled[this.state.popType].length)/10)*10)/10;
                              let means = this.state.sampleMean;
                              let thisMean = means[this.state.popType];
                              thisMean.push(newMean);
                              means[this.state.popType] = thisMean;
                              this.setState({stage:3,sampleMean: means});

                            }}/>
                            <h4> {this.state.popType} Sample Mean: {this.state.sampleMean[this.state.popType][this.state.sampleMean[this.state.popType].length - 1] || ''} </h4>
                        </div>
                        {this.state.stage >= 2 ?
                        <div>
                            <h4> Step 4: Simulate drawing many many samples </h4>
                            <SampleMeanSimulator style={{float:'right'}}
                            clear={()=> this.setState({calculable: false, sampleMean: Object.assign(this.state.sampleMean, {[this.state.popType] : []})})}
                            population={this.state.popArray[this.state.popType]}
                            resampleSize={this.state.resampleSize}
                            numberResamples={this.state.numberResamples}
                            popType={this.state.popType}
                            sample={(means, resampleSize, numberResamples)=>{this.updateSampleMeansFromArray(means, resampleSize, numberResamples)}}/>
                        </div>
                        : null}
                        </span> : null}
                </div>
            </div>
        );
    }

    clearState() {
        let tempArray = this.state.popArray;
        let tempCleared = this.state.clearedArray;
        tempCleared[this.state.popType] = tempArray[this.state.popType];
        this.setState({clearedArray : tempCleared});
        for (let i in this.state){
          // changed clear again to keep pop
            if (i !== "poptype" && i !== "clearedArray"){
                this.setState({i: Object.assign(this.state[i], {[this.state.popType] : []})});
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

    updateSampleMeansFromArray(means, resampleSize, numberResamples){
        let sampleMeans = this.state.sampleMean[this.state.popType];
        let roundedMeans = means.map((mean) => {
            return Math.round(mean * 10) / 10;
        });
        sampleMeans = sampleMeans.concat(roundedMeans);
        this.setState({calculable: false,
                       sampleMean: Object.assign(this.state.sampleMean, {[this.state.popType] : sampleMeans}),
                       resampleSize : Object.assign(this.state.resampleSize, {[this.state.popType] : resampleSize}),
                       numberResamples : Object.assign(this.state.numberResamples, {[this.state.popType] : numberResamples})});
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
            case "Mystery":
                this.setState({popArray : Object.assign(this.state.popArray, {"Mystery" : this.state.popArray[popType].concat(this.generateMystery())})});
                break;
        }
    }

    generateNormal(){
        this.changePop(this.state.popDict["Normal"], "Normal");
        // if pop is already fully drawn
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
        const sampleSize =  this.sum(this.state.popDict["Normal"]) > SAMPLE_SIZE / 2 ? SAMPLE_SIZE - this.sum(this.state.popDict["Normal"]) : this.sum(this.state.popDict["Normal"]) / 4 + 1;
        let newCleared = this.state.clearedArray[this.state.popType];
        for (let i = 0; i < sampleSize; i++){
            let sum = 0;
            if(this.state.clearedArray[this.state.popType].length === 0){
              for (let j = 0; j < ITERATES; j++){
                  sum += Math.random() * range + popMin;
              }
            }
            else{

              //console.log(this.state.clearedArray[this.state.popType]);
              sum = newCleared.pop() * ITERATES;
              //sum = this.state.clearedArray[this.state.popType][i]*ITERATES;
            }

            // Adding instances of certain points generated for the histogram
            if (this.state.popDict["Normal"][Math.round(sum / ITERATES * 10)]){
                this.state.popDict["Normal"][Math.round(sum / ITERATES * 10)] += 1;
            }
            // Adds first instance of a point
            else {
                this.state.popDict["Normal"][Math.round(sum / ITERATES * 10)] = 1;
            }
            popArray.push(sum / ITERATES);
        }
        if(this.state.clearedArray[this.state.popType].length > 0){
          let tempCleared = this.state.clearedArray;
          //const tempL = tempCleared[this.state.popType].length;
          //tempCleared[this.state.popType] = tempCleared[this.state.popType].slice(sampleSize,tempL);
          tempCleared[this.state.popType] = newCleared;
          this.setState({clearedArray : tempCleared});
        }


        return popArray
    }

    generateMystery(){
      this.changePop(this.state.popDict["Mystery"], "Mystery");
      if (this.sum(this.state.popDict["Mystery"]) === SAMPLE_SIZE){
          clearInterval(this.timer);
          return [];
      }
      const popArray = []
      const firstMEAN = 70;
      const firstSTANDARD_DEV = 3;
      const firstITERATES = 9;
      const firstrange = Math.sqrt(12) * firstSTANDARD_DEV * firstSTANDARD_DEV;
      const firstpopMin = firstMEAN - (firstrange / 2);
      const secondMEAN = 55;
      const secondSTANDARD_DEV = 2;
      const secondITERATES = 9;
      const secondrange = Math.sqrt(12) * secondSTANDARD_DEV * secondSTANDARD_DEV;
      const secondpopMin = secondMEAN - (secondrange / 2);
      const sampleSize = (this.sum(this.state.popDict["Mystery"]) > SAMPLE_SIZE / 2 ? SAMPLE_SIZE - this.sum(this.state.popDict["Mystery"]) : this.sum(this.state.popDict["Mystery"]) / 4 + 1)/2;
      let newCleared = this.state.clearedArray[this.state.popType];

      for (let i = 0; i < sampleSize; i++){
          let sum = 0;
          if(this.state.clearedArray[this.state.popType].length === 0){
              for (let j = 0; j < firstITERATES; j++){
                  sum += Math.random() * firstrange + firstpopMin;
              }
          }
          else{
              sum = newCleared.pop() * firstITERATES;
          }
          if (this.state.popDict["Mystery"][Math.round(sum / firstITERATES * 10)]){
              this.state.popDict["Mystery"][Math.round(sum / firstITERATES * 10)] += 1
          }
          else {
              this.state.popDict["Mystery"][Math.round(sum / firstITERATES * 10)] = 1
          }
          popArray.push(sum / firstITERATES)
      }

      for (let i = 0; i < sampleSize; i++){
          let sum = 0;
          if(this.state.clearedArray[this.state.popType].length === 0){
              for (let j = 0; j < secondITERATES; j++){
                  sum += Math.random() * secondrange + secondpopMin;
              }
          }
          else{
              sum = newCleared.pop() * secondITERATES;
          }
          if (this.state.popDict["Mystery"][Math.round(sum / secondITERATES * 10)]){
              this.state.popDict["Mystery"][Math.round(sum / secondITERATES * 10)] += 1
          }
          else {
              this.state.popDict["Mystery"][Math.round(sum / secondITERATES * 10)] = 1
          }
          popArray.push(sum / secondITERATES)
      }
      if(this.state.clearedArray[this.state.popType].length > 0){
        let tempCleared = this.state.clearedArray;
        //const tempL = tempCleared[this.state.popType].length;
        //tempCleared[this.state.popType] = tempCleared[this.state.popType].slice(sampleSize,tempL);
        tempCleared[this.state.popType] = newCleared;
        this.setState({clearedArray : tempCleared});
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
        let newCleared = this.state.clearedArray[this.state.popType];

        for (let i = 0; i < sampleSize; i++){
            let val;
            if(this.state.clearedArray[this.state.popType].length === 0){
                val = Math.random()*range + LOW;
            }
            else{
                val = newCleared.pop();
            }

            if (this.state.popDict["Uniform"][Math.round(val * 10)]){
                this.state.popDict["Uniform"][Math.round(val * 10)] += 1;
            } else {
                this.state.popDict["Uniform"][Math.round(val * 10)] = 1;
            }
            popArray.push(val);
        }
        if(this.state.clearedArray[this.state.popType].length > 0){
          let tempCleared = this.state.clearedArray;
          //const tempL = tempCleared[this.state.popType].length;
          //tempCleared[this.state.popType] = tempCleared[this.state.popType].slice(sampleSize,tempL);
          tempCleared[this.state.popType] = newCleared;
          this.setState({clearedArray : tempCleared});
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
        let newCleared = this.state.clearedArray[this.state.popType];
        for (let i = 0; i < sampleSize; i++){
            let val;
            if(this.state.clearedArray[this.state.popType].length === 0){
                val = -Math.log(Math.random()) / LAMBDA
            }
            else{
              val = newCleared.pop();
            }

            if (this.state.popDict["Exponential"][Math.round(val * 10)]){
                this.state.popDict["Exponential"][Math.round(val * 10)] += 1;
            } else {
                this.state.popDict["Exponential"][Math.round(val * 10)] = 1;
            }
            popArray.push(val);
        }
        if(this.state.clearedArray[this.state.popType].length > 0){
          let tempCleared = this.state.clearedArray;
          //const tempL = tempCleared[this.state.popType].length;
          //tempCleared[this.state.popType] = tempCleared[this.state.popType].slice(sampleSize,tempL);
          tempCleared[this.state.popType] = newCleared;
          this.setState({clearedArray : tempCleared});
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
        let newCleared = this.state.clearedArray[this.state.popType];
        const popArray = [];
        let chiArray = [];
        const chiMin = chi.pdf(20, DEGREES_OF_FREEDOM);
        for (let i = 0; i < 20; i+=.1){
            let tmp = chi.pdf(i, DEGREES_OF_FREEDOM)
            for (let j = 0; j < tmp / chiMin; j++){
                chiArray.push(i)
            }
        }
        const sampleSize = this.sum(this.state.popDict["Chi-Squared"]) > SAMPLE_SIZE / 2 ? SAMPLE_SIZE - this.sum(this.state.popDict["Chi-Squared"]) : this.sum(this.state.popDict["Chi-Squared"]) + 1;
        for (let i = 0; i < sampleSize; i++){
            let val;
            if(this.state.clearedArray[this.state.popType].length === 0){
                val = chiArray[Math.round(Math.random() * chiArray.length)];
            }
            else{
                val = newCleared.pop();
            }
            if (this.state.popDict["Chi-Squared"][Math.round(val * 10)]){
                this.state.popDict["Chi-Squared"][Math.round(val * 10)] += 1;
            } else {
                this.state.popDict["Chi-Squared"][Math.round(val * 10)] = 1;
            }
            popArray.push(val);
        }
        if(this.state.clearedArray[this.state.popType].length > 0){
          let tempCleared = this.state.clearedArray;
          //const tempL = tempCleared[this.state.popType].length;
          //tempCleared[this.state.popType] = tempCleared[this.state.popType].slice(sampleSize,tempL);
          tempCleared[this.state.popType] = newCleared;
          this.setState({clearedArray : tempCleared});
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
            sampleVals[j][0] = Math.round(this.state.popArray[popType][sampledCopy[j][0]] * 10);
            console.log(sampleVals[j][0]);
            sampleVals[j][1] = sampledCopy[j][1];
            samplePop.push(sampleVals[j][0] / 10);
        }
        for (let i in popDict) {
            if (i) {
                for (let j = 1; j < popDict[i] + 1; j++) {
                    for (let subArr of sampleVals){
                        //console.log(subArr);
                        if (subArr[0] == i && subArr[1] == j){
                            sampleSeries.data.push([i / 10, j]);
                        }
                    }
                    pseries.data.push([i / 10, j])
                }
            }
        }

        const xmaxval = (popType == "Uniform" || popType == "Normal") ? 74 : popType == "Exponential" ? 350: popType == "Mystery" ? 74:25;
        const xminval = (popType == "Uniform" || popType == "Normal" || popType == "Mystery") ? 56 : 0;
        const ymaxval = (popType == "Uniform" || popType == "Normal" || popType == "Mystery") ? 30 : popType == "Exponential" ? 10 : 20;
        const title = (popType == "Uniform" || popType == "Normal" || popType == "Mystery") ? "Female Height" : popType == "Exponential" ? "Duration of Telemarketer Call" : "Money Spent on Lunch";
        const xLabel = (popType == "Uniform" || popType == "Normal" || popType == "Mystery") ? "Height (in)" : popType == "Exponential" ? "Duration (seconds)" : "Dollars";
        if (!this.myChart) {
            this.myChart = Highcharts.chart('container', {
            chart: {
                type: 'scatter',
                zoomtype: 'xy'
            },
            title: {
                text: title
            },
            xAxis: {
                min: xminval,
                max: xmaxval,
                title : {
                    enabled: true,
                    text: xLabel
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
            series: [pseries, sampleSeries],
            tooltip: {
              enabled: false
            },
            plotOptions: {
              series: {
                point: {
                  events: {
                    mouseOver: function() {
                      //console.log('hehehe');
                    }
                  }
                }
              }
            }
            });
        } else {
            const titleNew = {
                text: title
            }
            const xvals = {
                min: xminval,
                max: xmaxval,
                title : {
                    enabled: true,
                    text: xLabel
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
            this.myChart.update({series:[pseries, sampleSeries], xAxis: xvals, yAxis: yvals,title:titleNew});
        }
        this.setState({samplePop : Object.assign(this.state.samplePop, {[this.state.popType]: samplePop})});
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
