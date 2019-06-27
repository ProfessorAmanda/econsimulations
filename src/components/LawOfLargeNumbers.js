import React, { Component } from 'react';
import PopBar from './PopBar.js';
import SampleArea from './SampleArea.js'
import Highcharts from 'highcharts';
import '../dark-unica.css';
import chi from 'chi-squared'
import SimulateSamples from './SimulateSamples.js'
import PopTable from './PopTable.js'
import math from 'mathjs';
import { Alert, Col, Container, Row } from 'reactstrap';

// how many data points
const SAMPLE_SIZE = 2000;

function DifferenceOfMeans(props){
    const diff = (
        Math.round((props.popMean - props.sampleMean) * 100) / 100) === 0 ? 
        0 : 
        Math.round((props.popMean - props.sampleMean) * 100) / 100 || '';
    return ( 
        <Alert color="success" style={{ padding: 0, marginTop: '1em' }}>
            Sample Mean: {props.sampleMean || ''}
            <br />
            Difference of Means: {diff} 
        </Alert>
    );
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
            stage : 1,
            newPop : 1,
            stages: {
              "Normal": 1,
              "Uniform": 1,
              "Exponential": 1,
              "Chi-Squared": 1
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
                samples={this.state.sampled} 
                popArray={this.state.popArray} 
                popType={this.state.popType}/>
        );

        // is the population drown? is chart ready?
        const popDrawn = 
            this.state.popArray[this.state.popType] && this.state.popArray[this.state.popType].length === SAMPLE_SIZE;
        
        return(
            <div>
                <PopBar
                section={this.state.popType}
                mode="LLN"
                setPop={(pop) => {
                    // assign proper stages
                    if (pop !== this.state.popType) {
                        this.setState({ 
                            newPop: 0, 
                            stage: this.state.stages[pop], 
                            popType: pop 
                        });
                        this.selectPop(pop);
                    }
                }}/>
                <Container fluid className='Plate'>
                    <Row >
                        <Col lg="2">
                            {popTable}
                        </Col>
                        <Col lg="8">
                            <span className="Center" id="container" />
                        </Col>
                        <Col lg="2">
                {/* Going through the Stages */}
                {popDrawn ? 
                    <span>
                    { this.state.stage >= 1 ?
                         <div>
                            <span>
                                    <p> Try a few different sample sizes and compare sample mean to population mean </p>
                                <SampleArea 
                                    setmean={(mean) => {
                                        const st = this.state.stage > 3 ? this.state.stage : 3;
                                        this.setState({
                                            stage: st,
                                            sampleMean: Object.assign({}, this.state.sampleMean, { [this.state.popType] : mean })
                                        })
                                    }}
                                    redraw = {() => {
                                    }
                                }
                                sample={(size) => {
                                    const popType = this.state.popType;
                                    const copy = Object.assign({} , this.state.stages);
                                    const st = this.state.stage > 3 ? this.state.stage : 3;
                                    copy[popType] = st;
                                    const sampleObject = this.sample(size, this.state.popArray[this.state.popType]);
                                    this.setState({
                                        stages: copy,
                                        stage: st,
                                        sampled: Object.assign( {}, this.state.sampled, { [this.state.popType]: sampleObject.pop})
                                    }, () => {
                                        this.draw(popType);
                                    });
                                    return sampleObject;
                                }}
                                popArray={this.state.popArray} 
                                popType={this.state.popType}
                                />
                                </span>     
                                
                            </div> 
                        :null
                    }
                    { this.state.stage >= 2 ? 
                        <DifferenceOfMeans 
                        popMean={this.state.popMean[this.state.popType]} 
                        sampleMean={this.state.sampleMean[this.state.popType]}
                        /> 
                        :null
                    }
                </span> 
                :null
            }
            </Col>
            </Row>
                { <div style={{ display: this.state.stage >= 3 && popDrawn ? 'block' : 'none' }}>
                        <Alert color="info">
                        According to the law, the average of the results obtained from a large enough sample should be close to the total average of the population, and will tend to become closer the larger the sample is. Make sure to pick several samples, or click below for a simulation to see the law in action.
                        </Alert>
                        <SimulateSamples 
                        type={this.state.popType} 
                        sample={(size, pop) => { return this.sample(size, pop).pop }} 
                        pop={this.state.popArray[this.state.popType]}
                        stage={this.state.stage}
                        setStage={(stage) => {
                            const copy = Object.assign({}, this.state.stages);
                            copy[this.state.popType] = stage;
                            this.setState({
                                stage: stage,
                                stages: copy
                            })
                            
                        }}
                        />
                    </div> 
                }
                </Container>
                <div>
                    {/* <button
                    style={{ position: 'fixed', right: '0px' }}
                    disabled={!popDrawn}
                    onClick={()=> {
                        this.state.clearedArray[this.popType] = this.state.popArray[this.popType];
                        this.clearState(); 
                        this.myChart.destroy(); 
                        this.myChart = null;
                    }}>CLEAR</button> */}
                </div>
                {/* Done with the Stages */}
            </div>
        );
    }

    componentDidMount() {
        this.setState({ 
            newPop: 0, 
            stage: 1, 
            popType: 'Normal' 
        });
        this.selectPop('Normal');
    }

    // called upon selection of population type
    selectPop(popType){
        this.generate(popType);
    }

    generate(popType){
        let popArray;
        switch (popType) {
            case "Normal":
                popArray = this.generateNormal();
                break;
            case "Uniform":
                popArray = this.generateUniform();
                break;
            case "Exponential":
                popArray = this.generateExponential();
                break;
            case "Chi-Squared":
                popArray = this.generateChiSquared();
                break;
            default:
                // do nothing
        }

        if (popArray) {
            const popMean = this.state.popMean;
            popMean[popType] = Math.round(math.mean(popArray) * 100)/100;
            this.setState((prevState) => {
                return { 
                    popArray: Object.assign({}, prevState.popArray, {[popType]: popArray}),
                    popMean: popMean
                }
            });
        }
        this.draw(popType);
        this.setState({newPop : 0});
    }

    generateNormal(){

        if (this.state.popArray['Normal'].length === SAMPLE_SIZE) {
            return null;
        }
        
        const MEAN = 64; // 74.44; // 64
        const STANDARD_DEV = 3; // 13.48; // 3
        const ITERATES = 9;
        const range = Math.sqrt(12) * STANDARD_DEV * STANDARD_DEV;
        const popMin = MEAN - (range / 2);
        
        const popArray = []

        const sampleSize = SAMPLE_SIZE;
        const newCleared = this.state.clearedArray['Normal'];

        const stateCopy = this.state.popDict;
        // creates data points for population and stores it in popArray
        for (let i = 0; i < sampleSize; i++){
            let sum = 0;
            if(this.state.clearedArray['Normal'].length === 0){
              for (let j = 0; j < ITERATES; j++){
                  sum += Math.random() * range + popMin;
              }
            }
            else{
              sum = newCleared.pop() * ITERATES;
            }

            // Adding instances of certain points generated for the histogram
            if (this.state.popDict["Normal"][Math.round(sum / ITERATES * 10)]){
                stateCopy["Normal"][Math.round(sum / ITERATES * 10)] += 1;
            }
            // Adds first instance of a point
            else {
                stateCopy["Normal"][Math.round(sum / ITERATES * 10)] = 1;
            }
            popArray.push(sum / ITERATES);
        }
        if (this.state.clearedArray['Normal'].length > 0){
          const tempCleared = this.state.clearedArray;
          tempCleared['Normal'] = newCleared;
          this.setState({clearedArray : tempCleared});
        }

        return popArray;
    }

    generateUniform(){

        if (this.state.popArray['Uniform'].length === SAMPLE_SIZE) {
            return null;
        }
        
        const HI = 74;
        const LOW = 54;
        const range = HI - LOW;

        const popArray = [];

        const sampleSize = SAMPLE_SIZE;
        const newCleared = this.state.clearedArray['Uniform'];

        const stateCopy = this.state.popDict;

        for (let i = 0; i < sampleSize; i++){
            let val;
            if(this.state.clearedArray['Uniform'].length === 0){
                val = Math.random()*range + LOW;
            }
            else{
                val = newCleared.pop();
            }

            if (this.state.popDict["Uniform"][Math.round(val * 10)]){
                stateCopy["Uniform"][Math.round(val * 10)] += 1;
            } else {
                stateCopy["Uniform"][Math.round(val * 10)] = 1;
            }
            popArray.push(val);
        }

        if (this.state.clearedArray['Uniform'].length > 0){
          const tempCleared = this.state.clearedArray;
          tempCleared['Uniform'] = newCleared;
          this.setState({clearedArray : tempCleared});
        }

        return popArray;
    }

    generateExponential(){

        if (this.state.popArray['Exponential'].length === SAMPLE_SIZE) {
            return null;
        }
        
        const LAMBDA = 1/64;
        const popArray = [];

        const sampleSize = SAMPLE_SIZE;
        const newCleared = this.state.clearedArray['Exponential'];

        const stateCopy = this.state.popDict;


        for (let i = 0; i < sampleSize; i++){
            let val;
            if(this.state.clearedArray['Exponential'].length === 0){
                val = -Math.log(Math.random()) / LAMBDA
            }
            else{
              val = newCleared.pop();
            }

            if (this.state.popDict["Exponential"][Math.round(val * 10)]){
                stateCopy["Exponential"][Math.round(val * 10)] += 1;
            } else {
                stateCopy["Exponential"][Math.round(val * 10)] = 1;
            }
            popArray.push(val);
        }
        if(this.state.clearedArray["Exponential"].length > 0){
          const tempCleared = this.state.clearedArray;
          tempCleared["Exponential"] = newCleared;
          this.setState({clearedArray : tempCleared});
        }
        return popArray
    }

    generateChiSquared(){
        if (this.state.popArray['Chi-Squared'].length === SAMPLE_SIZE) {
            return null;
        }

        const DEGREES_OF_FREEDOM = 8;
        const chiArray = [];
        const chiMin = chi.pdf(20, DEGREES_OF_FREEDOM);
        for (let i = 0; i < 20; i+=.1){
            const tmp = chi.pdf(i, DEGREES_OF_FREEDOM)
            for (let j = 0; j < tmp / chiMin; j++){
                chiArray.push(i)
            }
        }

        const popArray = [];
        
        const sampleSize = SAMPLE_SIZE;
        const newCleared = this.state.clearedArray["Chi-Squared"];

        const stateCopy = this.state.popDict;
        
        for (let i = 0; i < sampleSize; i++){
            let val;
            if(this.state.clearedArray["Chi-Squared"].length === 0){
                val = chiArray[Math.round(Math.random() * chiArray.length)];
            }
            else{
                val = newCleared.pop();
            }
            if (this.state.popDict["Chi-Squared"][Math.round(val * 10)]){
                stateCopy["Chi-Squared"][Math.round(val * 10)] += 1;
            } else {
                stateCopy["Chi-Squared"][Math.round(val * 10)] = 1;
            }
            popArray.push(val);
        }
        if(this.state.clearedArray["Chi-Squared"].length > 0){
          const tempCleared = this.state.clearedArray;
          tempCleared["Chi-Squared"] = newCleared;
          this.setState({clearedArray : tempCleared});
        }
        return popArray;
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

    draw(popType) {
        
        const pseries = {data : [], name:"Population"};
        const sampleSeries = {data : [], name:"Sample"};
        const popDict = this.state.popDict[popType];

        const sampled = this.state.sampled[popType];
        const sampleVals = [[]];
        const samplePop = [];

        for (const j in sampled){
            sampleVals[j] = [];
            sampleVals[j][0] = Math.round(this.state.popArray[popType][sampled[j][0]] * 10)
            sampleVals[j][1] = sampled[j][1];
            samplePop.push(sampleVals[j][0] / 10)
        }

        for (const i in popDict) {
            if (i) {
                for (let j = 1; j < popDict[i] + 1; j++) {
                    for (const subArr of sampleVals){
                        // with three equals it doesn't work
                        // also need to take care of state updates. Always one slower.
                        if (subArr[0] === parseInt(i, 10) && subArr[1] === j){
                            sampleSeries.data.push([i / 10, j]);
                        }
                    }
                    pseries.data.push([i/10, j])
                }
            }
        }

        const values = { 
            Normal: { xmaxval: 74, xminval: 56, ymaxval: 40, title: "Milk Production", xLabel: "Gallons" },
            Uniform: { xmaxval: 74, xminval: 56, ymaxval: 25, title: "Alien Female Height", xLabel: "Height (in)"},
            Exponential: { xmaxval: 400, xminval: 0, ymaxval: 10, title: "Duration of Telemarketer Call", xLabel: "Duration (seconds)"},
            "Chi-Squared": {xmaxval: 25, xminval: 0, ymaxval: 40, title: "Money Spent on Lunch", xLabel: "Dollars"}
        };
        
        if (!this.myChart) {
            this.createChart(values[popType], popType, pseries, sampleSeries);
        }
        else {
            this.updateChart(values[popType], popType, pseries, sampleSeries);
        }
    }

    createChart(values, popType, pseries, sampleSeries) {

        const popMean = this.state.popMean[popType];
        const { xmaxval, xminval, ymaxval, title, xLabel } = values;
        this.myChart = Highcharts.chart('container', {
        chart: {
            type: 'scatter',
            events: {
                load: function() {
                    setInterval(function() {
                        
                    })
                }
            }
        },
        title: {
            text: `${title} <br /> Population Mean: ${popMean}`
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
        tooltip: {
            enabled: true,
            pointFormat: `${xLabel}: <b>{point.x}<b><br />`
        },
        series: [pseries, sampleSeries]
        });
    }

    updateChart(values, popType, pseries, sampleSeries) {
        const popMean = this.state.popMean[popType];
        const { xmaxval, xminval, ymaxval, title, xLabel } = values;

        const titleNew = {
            text: `${title} <br /> Population Mean: ${popMean}`
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
        const ttip = {
                enabled: true,
                pointFormat: `${xLabel}: <b>{point.x}<b><br />`
        };
        
        this.myChart.update({ 
            series:[pseries, sampleSeries],
            xAxis: xvals, 
            yAxis: yvals, 
            title:titleNew, 
            tooltip: ttip
        });
    }

    sum(pop){
        let val = 0
        for (const i of pop){
            if (i){
                val += i
            }
        }
        return val;
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
        // clearInterval(this.timer);
    }
}
export default LawOfLargeNumbers;
