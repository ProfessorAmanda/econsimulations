import React, { Component } from 'react';
// import styled from 'styled-components';
import PopBar from './PopBar.js';
import SampleArea from './SampleArea.js'
import Highcharts from 'highcharts';
// import math from 'mathjs'
import chi from 'chi-squared'
import MeanButton from './MeanButton.js'
// import HelpModal from './HelpModal.js'
import SimulateSamples from './SimulateSamples.js'
import PopTable from './PopTable.js'
import math from 'mathjs';

// how many data points
const SAMPLE_SIZE = 1000;

function DifferenceOfMeans(props){
    const diff = (
        Math.round((props.popMean - props.sampleMean) * 100) / 100) === 0 ? 
        0 : 
        Math.round((props.popMean - props.sampleMean) * 100) / 100 || '';
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
            stage : 0,
            newPop : 0,
            stages: {
              "Normal": 0,
              "Uniform": 0,
              "Exponential": 0,
              "Chi-Squared": 0
            },
            clearedArray: {
              "Normal": [],
              "Uniform": [],
              "Exponential": [],
              "Chi-Squared": []
            }
        }
    }

    render(){
        const popTable = (
            <PopTable 
                style={{width:"50%"}} 
                samples={this.state.sampled} 
                popArray={this.state.popArray} 
                popType={this.state.popType}/>
        );

        // is the population drown? is chart ready?
        const popDrawn = 
            this.state.popArray[this.state.popType] && this.state.popArray[this.state.popType].length === SAMPLE_SIZE;
        
        return(
            <div>
                <div style={{width:"10%"}}>
                    <PopBar 
                    section={this.state.popType}
                    mode="LLN"
                    setPop={(pop) => {
                        // assign proper stages
                        const copy = Object.assign({} , this.state.stages);
                        copy[this.state.popType] = this.state.stage;
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

                        this.setState({newPop : 1}); // not sure why
                        this.setState({popType: pop}); // population type
                        this.setState({stage : copy[pop]}); // update the current stage?
                        this.selectPop(pop);
                        
                    }}/>
                </div>
                {popTable}
                <span style={{float:'left', width:"30%"}} id="container" />

                {/* Going through the Stages */}
                {popDrawn ? 
                    <span style={{width:"20%"}}>
                    <MeanButton 
                        string={"Population"} 
                        reset={this.state.newPop} 
                        calculable 
                        setmean={(mean) => 
                            this.setState({
                                stage: 2,
                                popMean: Object.assign({}, this.state.popMean, { [this.state.popType]: mean })
                            })} 
                        popArray={this.state.popArray} 
                        popType={this.state.popType}/>
                    <h4> 
                    {this.state.popType} Mean: {this.state.popMean[this.state.popType] || ''} 
                    </h4>
                    { this.state.stage >= 1 ? 
                        <span> <h4> Step 3: Sampling </h4> </span> 
                        :null }
                    { this.state.stage >= 1 ?
                         <div>
                            <span>
                                <p> Take a Sample:</p> 
                                { this.state.stage >= 1 ?
                                    <p> Try a few different sample sizes and compare sample mean to population mean </p> 
                                    :null}
                                <SampleArea 
                                    setmean={(mean) => {
                                        this.setState({
                                            stage: 3,
                                            sampleMean: Object.assign({}, this.state.sampleMean, { [this.state.popType] : mean })
                                        })
                                        }}
                                    redraw = {() => {
                                        }
                                        }
                                    sample={(size) => {
                                        const sampleObject = this.sample(size, this.state.popArray[this.state.popType]);
                                        this.setState({
                                            stage: 2,
                                            sampled: Object.assign( {}, this.state.sampled, { [this.state.popType]: sampleObject.pop})
                                        }, () => {
                                            this.changePop(this.state.popDict[this.state.popType], this.state.popType);
                                         });
                                        return sampleObject;
                                        }}
                                    popArray={this.state.popArray} 
                                    popType={this.state.popType}
                                    />
                                </span>     
                                <h4> 
                                    {this.state.popType} Sample Mean: {this.state.sampleMean[this.state.popType] || ''}
                                </h4>
                            </div> 
                        :null
                    }
                    {/*{ this.state.stage >= 2 ? <MeanButton string={"Sample"} calculable={true} setmean={(mean) => this.setState({stage:3,sampleMean:Object.assign(this.state.sampleMean, {[this.state.popType] : mean})})} popArray = {this.state.samplePop} popType={this.state.popType}/> : null}*/}
                    { this.state.stage >= 3 ? 
                        <DifferenceOfMeans 
                            popMean={this.state.popMean[this.state.popType]} 
                            sampleMean={this.state.sampleMean[this.state.popType]}
                        /> 
                        :null
                    }
                </span> 
                :null
                }
                { this.state.stage >= 2 && popDrawn ? 
                    <div style={{width:"100%"}}> 
                        <h4> Step 4: Run the Simulation </h4> 
                        <SimulateSamples 
                        type={this.state.popType} 
                        sample={(size, pop) => { return this.sample(size, pop).pop }} 
                        pop={this.state.popArray[this.state.popType]}
                        />
                    </div> 
                    :null
                }
                <div>
                    <button
                    style={{ position: 'fixed', right: '0px' }}
                    disabled={!popDrawn}
                    onClick={()=> {
                        this.state.clearedArray[this.popType] = this.state.popArray[this.popType];
                        this.clearState(); 
                        this.myChart.destroy(); 
                        this.myChart = null;
                        }}>CLEAR</button>
                </div>
                {/* Done with the Stages */}
            </div>
        );
    }

    // called upon selection of population type
    selectPop(popType){
        // poptype is a string indicating the population type
        setTimeout(() => {
            clearInterval(this.timer); //stop any populating that may be happening
                this.timer = setInterval( () => {
                    this.changePop(this.state.popDict[popType], popType);
                        this.generate(popType);
                    }, 100);
                }, 100);
        // setTimeout(() => {
        //     this.generate(popType);
        // }, 100);
    }

    sample(size, array) {
        const sampled = []
        const currentPop = array;

        while (sampled.length < size){
            // index to sample ?
            const r = Math.round(Math.random() * (currentPop.length - 1))
            let shouldSample = true;
            for (let i = 0; i < sampled.length; i++){
                 if (sampled[i][0] === r) {
                     shouldSample = false;
                 }
            }
            if (shouldSample) {
                let count = 1;
                currentPop.forEach( (val, index) => {
                    if (index < r && Math.round(val * 10) === Math.round(currentPop[r] * 10)) {
                        count += 1;
                    }
                });
                // only pushes if shouldSample is true
                sampled.push([r, count]);
            }
        }
        const sampleVals = [[]];
        const sampledCopy = [];
        const samplePop = [];

        for (const j in sampled){
            sampleVals[j] = [];
            sampleVals[j][0] = Math.round(this.state.popArray[this.state.popType][sampled[j][0]])
            sampleVals[j][1] = sampled[j][1];
            samplePop.push(sampleVals[j]);
            sampledCopy.push(sampleVals[j][0]);
        }
        return { arr: samplePop, pop: sampled, mue: Math.round(math.mean(sampledCopy) * 100)/100 };
    }


    generate(popType){
        switch (popType) {

          // Changes Normal of popArray to this.generateNormal
          // Looks like it concatenates instead of reassigning?
          // Can't generate it twice though so no issues
            case "Normal":
                this.setState({
                    popArray : Object.assign({}, this.state.popArray, {"Normal" : this.state.popArray[popType].concat(this.generateNormal())})
                });
                break;
            case "Uniform":
                this.setState({popArray : Object.assign({}, this.state.popArray, {"Uniform" : this.state.popArray[popType].concat(this.generateUniform())})});
                break;
            case "Exponential":
                this.setState({popArray : Object.assign({}, this.state.popArray, {"Exponential" : this.state.popArray[popType].concat(this.generateExponential())})});
                break;
            case "Chi-Squared":
                this.setState({popArray : Object.assign({}, this.state.popArray, {"Chi-Squared" : this.state.popArray[popType].concat(this.generateChiSquared())})});
                break;
            default:
            // do nothing
        }
        this.setState({newPop : 0});
    }

    clearState() {
        const tempArray = this.state.popArray;
        const tempCleared = this.state.clearedArray;
        tempCleared[this.state.popType] = tempArray[this.state.popType];
        this.setState({clearedArray : tempCleared});

        for (const i in this.state){
            // Changed these to and from or because I don't think it was checking any of these
            if (i !== "poptype" && i !== "stage" && i !== "clearedArray"){
              for (const j of ["Normal", "Uniform", "Exponential", "Chi-Squared"]){
                this.setState({i: Object.assign(this.state[i], {[j] : []})});
              }

            }
        }
        this.setState({popType: '', stage: 0});
        clearInterval(this.timer);
    }

    generateNormal(){
        // if pop is already fully drawn
        // this.changePop(this.state.popDict["Normal"], "Normal");
        if (this.sum(this.state.popDict["Normal"]) === SAMPLE_SIZE){
            console.log(this.state.popDict['Normal']);
            clearInterval(this.timer);
            return [];
        }
        const MEAN = 64; // 74.44; // 64
        const STANDARD_DEV = 3; // 13.48; // 3
        const ITERATES = 9;
        const range = Math.sqrt(12) * STANDARD_DEV * STANDARD_DEV;
        const popMin = MEAN - (range / 2);
        const popArray = []
        // if more than 500: 1000 - current length of sample
        // if less than 500: ( current length / 4 ) + 1
        const sampleSize = SAMPLE_SIZE;
        const newCleared = this.state.clearedArray && this.state.clearedArray[this.state.popType];

        const stateCopy = Object.assign({}, this.state.popDict);
        for (let i = 0; i < sampleSize; i++){
            let sum = 0;
            if(this.state.clearedArray[this.state.popType].length === 0){
                // if clearedArray is empty. Not sure what it is.
              for (let j = 0; j < ITERATES; j++){
                  sum += Math.random() * range + popMin;
              }
            }
            else{

              //console.log(this.state.clearedArray[this.state.popType]);
              sum = newCleared.pop() * ITERATES;
              //sum = this.state.clearedArray[this.state.popType][i]*ITERATES;
            }

            // More correct but way slower
            if (stateCopy["Normal"][Math.round(sum / ITERATES * 10)]){
                stateCopy["Normal"][Math.round(sum  / ITERATES * 10)] += 1;
            }
            // Adds first instance of a point
            else {
                stateCopy["Normal"][Math.round(sum / ITERATES * 10)] = 1;
            }

            // stateCopy["Normal"].push(1);
            
            popArray.push(sum / ITERATES);
        }
        if(this.state.clearedArray[this.state.popType].length > 0){
          const tempCleared = this.state.clearedArray;
          //const tempL = tempCleared[this.state.popType].length;
          //tempCleared[this.state.popType] = tempCleared[this.state.popType].slice(sampleSize,tempL);
          tempCleared[this.state.popType] = newCleared;
          this.setState({clearedArray : tempCleared});
        }
        this.setState({
            popDict: Object.assign({}, this.state.popDict, stateCopy)
        })

        return popArray;
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
        const newCleared = this.state.clearedArray[this.state.popType];

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
          const tempCleared = this.state.clearedArray;
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
        const newCleared = this.state.clearedArray[this.state.popType];
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
          const tempCleared = this.state.clearedArray;
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
        const newCleared = this.state.clearedArray[this.state.popType];
        const popArray = [];
        const chiArray = [];
        const chiMin = chi.pdf(20, DEGREES_OF_FREEDOM);
        for (let i = 0; i < 20; i+=.1){
            const tmp = chi.pdf(i, DEGREES_OF_FREEDOM)
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
          const tempCleared = this.state.clearedArray;
          //const tempL = tempCleared[this.state.popType].length;
          //tempCleared[this.state.popType] = tempCleared[this.state.popType].slice(sampleSize,tempL);
          tempCleared[this.state.popType] = newCleared;
          this.setState({clearedArray : tempCleared});
        }
        return popArray;
    }

    // changePop seems to build graph
    changePop(popDict, popType) {
        console.log(popDict.length);
        const pseries = {data : [], color: '#F27474', name:"Population", updatePoints: false}
        const sampleSeries = {data : [], color: '#747EF2', name:"Sample"}
        const sampledCopy = this.state.sampled[popType];
        const sampleVals = [[]];
        const samplePop = [];

        const tmp = Object.assign({}, pseries);

        // Rounding everything??? Multiplies by 10, rounds, and then divides by 10
        for (const j in sampledCopy){
            sampleVals[j] = [];
            sampleVals[j][0] = Math.round(this.state.popArray[popType][sampledCopy[j][0]] * 10)
            sampleVals[j][1] = sampledCopy[j][1];
            samplePop.push(sampleVals[j][0] / 10)
        }

        // Adds everything in popDict to the highcharts plot
        for (const i in popDict) {
            if (i) {
                for (let j = 1; j < popDict[i] + 1; j++) {
                    for (const subArr of sampleVals){
                        // with three equals it doesn't work
                        // also need to take care of state updates. Always one slower.
                        if (subArr[0] == i && subArr[1] == j){
                            sampleSeries.data.push([i / 10, j]);
                        }
                    }
                    pseries.data.push([i / 10, j])
                }
            }
        }

        const values = { 
            Uniform: { xmaxval: 74, xminval: 56, ymaxval: 30, title: "Female Height", xLabel: "Height (in)"},
            Normal: { xmaxval: 74, xminval: 56, ymaxval: 30, title: "Milk Production", xLabel: "Gallons" },
            Exponential: { xmaxval: 350, xminval: 0, ymaxval: 10, title: "Duration of Telemarketer Call", xLabel: "Duration (seconds)"},
            "Chi-Squared": {xmaxval: 25, xminval: 0, ymaxval: 20, title: "Money Spent on Lunch", xLabel: "Dollars"}
        };
        const { xmaxval, xminval, ymaxval, title, xLabel } = values[popType];

        if (!this.myChart) {
            this.myChart = Highcharts.chart('container', {
            chart: {
                type: 'scatter'
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
            },
            tooltip: {
              enabled: true
            },
            series: [pseries, sampleSeries]
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

            // console.log('data', pseries.data);
            // console.log('popdict', popDict.length, this.sum(popDict));
            // console.log('tmp', tmp.data);
            this.myChart.update({ 
                series:[pseries, sampleSeries], xAxis: xvals, yAxis: yvals, title:titleNew}
                );
        }

        // when called for generating initial population, it doesn't return anything
        this.setState({
            samplePop : Object.assign({}, this.state.samplePop, {[this.state.popType]: samplePop})
        })
    }


    // Actually just sums population, kind of a misleading name
    // gives the total length of population
    sum(pop){
        let val = 0
        for (const i of pop){
            if (i){
                val += i
            }
        }
        return val;
    }
}
export default LawOfLargeNumbers;
