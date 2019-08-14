import React, {Component} from 'react'
import PopBar from './PopBar.js';
import ToggleStandard from './ToggleStandard.js';
import Highcharts from 'highcharts';
import math from 'mathjs'
import chi from 'chi-squared'
import SampleMeanChart from './SampleMeanChart.js'
import SampleMeanSimulator from './SampleMeanSimulator.js'
import SampleAreaCLT from './CentralLimitTheorem/SampleAreaCLT.js/index.js'
import { Alert, Col, Container, Row, Table } from 'reactstrap';

const SAMPLE_SIZE = 2000;
class CentralLimitTheorem extends Component {
    constructor(props){
        super(props);
        this.state = {
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
            sampleSize : 1,
            disableSample : false
            }
        }

    render(){

        const popTable = (
            <Table hover className="PopTable">
                    <thead>
                        <tr>
                            <th>Sample</th>
                            <th>Size</th>
                            <th>Mean</th>
                        </tr>
                    </thead>
                    <tbody>

                    {this.state.sampleMean[this.state.popType] && this.state.sampleMean[this.state.popType].map( (mean, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{mean[0]}</td>
                            <td>{Math.round(mean[1] * 10) / 10}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
        );

        const popDrawn = this.state.popArray[this.state.popType] && this.state.popArray[this.state.popType].length === SAMPLE_SIZE;

        return(
            <div>
                <div>
                    <PopBar 
                        section={this.state.popType} 
                        mode = "CLT" 
                        setPop={(pop) => {
                            const copy = this.state.stages;
                            copy[this.state.popType] = this.state.stage;
                            this.setState({stages : copy});
                            
                            this.setState({popType:pop});
                            this.setState({popType:pop});
                            this.setState({stage : this.state.stages[pop]});
                            this.selectPop(pop);
                            this.setState({disableSample : false});
                        }}
                    />
                </div>

                {/* <div>
                    <button 
                        onClick={() => {
                            this.clearState();
                            if(this.myChart){
                                this.myChart.destroy();
                            }
                            this.myChart = null;
                    }}> CLEAR </button>
                </div> */}

                <Container fluid className='Plate'>
                    <Row>
                        <Col>
                            <span className="Center" id="container" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            { popDrawn ?
                                // samples chart
                                <div>
                                    <ToggleStandard
                                    section={this.state.standardNormal} 
                                    toggleSwitch={(set) => {
                                        this.setState({ 
                                            standardNormal : set 
                                        })
                                    }} />
                                    <SampleMeanChart
                                        numberResamples={this.state.numberResamples} 
                                        resampleSize={this.state.resampleSize[this.state.popType]} 
                                        mean={this.state.popMean[this.state.popType]} 
                                        sd={math.std(this.state.popArray[this.state.popType])}
                                        normalized={this.state.standardNormal} 
                                        sampleSize={this.state.sampleSize} 
                                        type={this.state.popType} 
                                        normal={this.state.standardNormal} 
                                        sampleMeans={this.state.sampleMean[this.state.popType]}
                                    />
                                </div>
                                :null
                            }
                        </Col>

                        <Col>
                            {popDrawn ?
                                // first control 
                                <div>
                                    <Row>
                                        <Alert color='light'>
                                            <p>Try drawing some samples and calculating means </p>
                                            <SampleAreaCLT 
                                                disabled={this.state.disableSample} 
                                                redraw={() => 
                                                    {}
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
                                                setmean={(size, mue) => {
                                                    const means = this.state.sampleMean;
                                                    const thisMean = means[this.state.popType];
                                                    thisMean.push([size, mue]);
                                                    means[this.state.popType] = thisMean;
                                                    this.setState({stage:3, sampleMean: means});
                                                }}
                                            />
                                        </Alert>
                                    </Row>
                                    <Row>
                                        {this.state.stage >= 3 ?
                                            <Alert color='light'>
                                                <p> Simulate drawing many many samples </p>
                                                <SampleMeanSimulator 
                                                style={{margin: 'auto', marginBottom: '2vh'}}
                                                clear={() => {
                                                    this.setState({
                                                        calculable: false, 
                                                        sampleMean: Object.assign({}, this.state.sampleMean, {[this.state.popType] : []})
                                                    })}
                                                }
                                                population={this.state.popArray[this.state.popType]}
                                                resampleSize={this.state.resampleSize}
                                                numberResamples={this.state.numberResamples}
                                                popType={this.state.popType}
                                                sample={(means, resampleSize, numberResamples) => {
                                                    this.updateSampleMeansFromArray(means, resampleSize, numberResamples);
                                                    this.setState({disableSample : true});
                                                }}
                                                />
                                            </Alert>
                                        :null
                                        }
                                    </Row>
                                </div>
                            :null
                            }  
                        </Col>
                        <Col>
                            { this.state.stage >= 3 && popTable}
                        </Col>                        
                    </Row>
            </Container>
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

    clearState() {
        const tempArray = this.state.popArray;
        const tempCleared = this.state.clearedArray;
        tempCleared[this.state.popType] = tempArray[this.state.popType];
        this.setState({clearedArray : tempCleared});
        for (const i in this.state){
          // changed clear again to keep pop
            if (i !== "poptype" && i !== "clearedArray"){
                this.setState({i: Object.assign(this.state[i], {[this.state.popType] : []})});
            }
        }
        this.setState({popType:'', stage:0});
        this.setState({disableSample : false});
        clearInterval(this.timer);
    }

    updateSampleMeansFromArray(means, resampleSize, numberResamples){
        let sampleMeans = this.state.sampleMean[this.state.popType];
        const roundedMeans = means;
        sampleMeans = sampleMeans.concat(roundedMeans);
        this.setState({calculable: false,
                       sampleMean: Object.assign(this.state.sampleMean, {[this.state.popType] : sampleMeans}),
                       resampleSize : Object.assign(this.state.resampleSize, {[this.state.popType] : resampleSize}),
                       numberResamples : Object.assign(this.state.numberResamples, {[this.state.popType] : numberResamples})});
    }

    selectPop(popType) {
        this.generate(popType);
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
            case "Mystery":
                popArray = this.generateMystery();
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

        if (this.state.popArray['Normal'].length >= SAMPLE_SIZE) {
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

    generateMystery(){
        
        if (this.state.popArray["Mystery"].length >= SAMPLE_SIZE){
            return null;
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

        const sampleSize = SAMPLE_SIZE;
        const newCleared = this.state.clearedArray['Mystery'];

        const stateCopy = this.state.popDict;
        
        for (let i = 0; i < sampleSize/2; i++){
          let sum = 0;
          if(this.state.clearedArray['Mystery'].length === 0){
              for (let j = 0; j < firstITERATES; j++){
                  sum += Math.random() * firstrange + firstpopMin;
              }
          }
          else{
              sum = newCleared.pop() * firstITERATES;
          }
          if (this.state.popDict["Mystery"][Math.round(sum / firstITERATES * 10)]){
              stateCopy["Mystery"][Math.round(sum / firstITERATES * 10)] += 1
          }
          else {
              stateCopy["Mystery"][Math.round(sum / firstITERATES * 10)] = 1
          }
          popArray.push(sum / firstITERATES)
      }

      for (let i = 0; i < sampleSize/2; i++){
          let sum = 0;
          if(this.state.clearedArray['Mystery'].length === 0){
              for (let j = 0; j < secondITERATES; j++){
                  sum += Math.random() * secondrange + secondpopMin;
              }
          }
          else{
              sum = newCleared.pop() * secondITERATES;
          }
          if (this.state.popDict["Mystery"][Math.round(sum / secondITERATES * 10)]){
              stateCopy["Mystery"][Math.round(sum / secondITERATES * 10)] += 1
          }
          else {
              stateCopy["Mystery"][Math.round(sum / secondITERATES * 10)] = 1
          }
          popArray.push(sum / secondITERATES)
      }
      if(this.state.clearedArray['Mystery'].length > 0){
        const tempCleared = this.state.clearedArray;
        tempCleared['Mystery'] = newCleared;
        this.setState({clearedArray : tempCleared});
      }
      return popArray
    }

    generateUniform(){

        if (this.state.popArray["Uniform"].length === SAMPLE_SIZE){
            return null;
        }
        const HI = 74;
        const LOW = 54;
        const range = HI - LOW;

        const popArray = []

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
        if(this.state.clearedArray['Uniform'].length > 0){
          const tempCleared = this.state.clearedArray;
          tempCleared['Uniform'] = newCleared;
          this.setState({clearedArray : tempCleared});
        }

        return popArray;
    }

    generateExponential(){

        if (this.state.popArray["Exponential"].length === SAMPLE_SIZE){
            return null;
        }

        const LAMBDA = 1/64;
        
        const popArray = [];
        
        const sampleSize = SAMPLE_SIZE;
        const newCleared = this.state.clearedArray["Exponential"];

        const stateCopy = this.state.popDict;
        
        for (let i = 0; i < sampleSize; i++){
            let val;
            if(this.state.clearedArray["Exponential"].length === 0){
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

        if (this.state.popArray["Chi-Squared"].length === SAMPLE_SIZE){
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


        const popArray = []

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
            "Chi-Squared": {xmaxval: 25, xminval: 0, ymaxval: 40, title: "Money Spent on Lunch", xLabel: "Dollars"},
            Mystery: { xmaxval: 80, xminval: 50, ymaxval: 50, title: "Alien Female Height", xLabel: "Height (in)" }
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
            type: 'scatter'
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
}

export default CentralLimitTheorem;
