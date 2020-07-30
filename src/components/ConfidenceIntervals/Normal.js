import React from 'react';
import Collapsable from '../Collapsable.js';
import ChartContainer from './ChartContainer.js';
import ToggleStandard from '../ToggleStandard.js';
import SampleMeanChart from './SampleMeanChart.js';
import SampleAreaCLT from './SampleAreaCLT.js';
import SampleMeanSimulator from '../SampleMeanSimulator.js';
import TTable from './TTable.js'
import math from 'mathjs';
import { Alert, Button, Col, Label, Input, Row, Table,InputGroupText,InputGroupAddon,InputGroup,ButtonGroup } from 'reactstrap';
//var { jStat } = require('jstat');

//const fs = require("fs");

const pairedVal = {'0.99': 2.575829304, '0.98': 2.326347874, '0.97': 2.170090378, '0.96': 2.053748911, '0.95': 1.959963985, '0.94': 1.880793608, '0.93': 1.811910673, '0.92': 1.750686071, '0.91': 1.69539771, '0.9': 1.644853627, '0.89': 1.59819314, '0.88': 1.554773595, '0.87': 1.514101888, '0.86': 1.475791028, '0.85': 1.439531471, '0.84': 1.40507156, '0.83': 1.372203809, '0.82': 1.340755034, '0.81': 1.310579112, '0.8': 1.281551566, '0.79': 1.253565438, '0.78': 1.22652812, '0.77': 1.200358858, '0.76': 1.174986792, '0.75': 1.15034938, '0.74': 1.126391129, '0.73': 1.103062556, '0.72': 1.080319341, '0.71': 1.058121618, '0.7': 1.036433389, '0.69': 1.015222033, '0.68': 0.994457883, '0.67': 0.974113877, '0.66': 0.954165253, '0.65': 0.934589291, '0.64': 0.915365088, '0.63': 0.896473364, '0.62': 0.877896295, '0.61': 0.859617364, '0.6': 0.841621234, '0.59': 0.82389363, '0.58': 0.806421247, '0.57': 0.789191653, '0.56': 0.772193214, '0.55': 0.755415026, '0.54': 0.738846849, '0.53': 0.722479052, '0.52': 0.706302563, '0.51': 0.690308824, '0.5': 0.67448975, '0.49': 0.658837693, '0.48': 0.643345405, '0.47': 0.628006014, '0.46': 0.612812991, '0.45': 0.597760126, '0.44': 0.582841507, '0.43': 0.568051498, '0.42': 0.55338472, '0.41': 0.53883603, '0.4': 0.524400513, '0.39': 0.510073457, '0.38': 0.495850347, '0.37': 0.48172685, '0.36': 0.467698799, '0.35': 0.45376219, '0.34': 0.439913166, '0.33': 0.426148008, '0.32': 0.412463129, '0.31': 0.398855066, '0.3': 0.385320466, '0.29': 0.371856089, '0.28': 0.358458793, '0.27': 0.345125531, '0.26': 0.331853346, '0.25': 0.318639364, '0.24': 0.305480788, '0.23': 0.292374896, '0.22': 0.279319034, '0.21': 0.266310613, '0.2': 0.253347103, '0.19': 0.240426031, '0.18': 0.227544977, '0.17': 0.214701568, '0.16': 0.201893479, '0.15': 0.189118426, '0.14': 0.176374165, '0.13': 0.163658486, '0.12': 0.150969215, '0.11': 0.138304208, '0.1': 0.125661347, '0.09': 0.113038541, '0.08': 0.100433721, '0.07': 0.087844838, '0.06': 0.075269862, '0.05': 0.062706778, '0.04': 0.050153583, '0.03': 0.037608288, '0.02': 0.025068908, '0.01': 0.01253347, '0': 0.0}

class Normal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
            zORt:'z',
            sampleMean: [],
            sampled: [],
            mainSampleSize: this.props.mainSampleSize,
            popArray: [],
            standardNormal : 0,
            sampleSize : 1,
            disableSample : false,
            popType: 'Normal',
            ciLevel: '95%',
            zScore:1.960,
            confidence: '',
            freUsedVal:[],
            dOf:1,
            chart:0
        }
        this.changeStage = this.changeStage.bind(this);
    }

    changeStage(stage) {
        this.setState({stage: stage});
    }

    generateNormal(){
        const MEAN = 64;
        const STANDARD_DEV = 3;
        const ITERATES = 9;
        const range = Math.sqrt(12) * STANDARD_DEV * STANDARD_DEV;
        const popMin = MEAN - (range / 2);

        const popArray = this.state.popArray ? this.state.popArray.slice() : []

        const sampleSize = this.state.mainSampleSize;
        let dict = Array(sampleSize).fill(-1);

        // creates data points for population and stores it in popArray
        for (let i = 0; i < sampleSize; i++){
            let sum = 0;
            for (let j = 0; j < ITERATES; j++){
                sum += Math.random() * range + popMin;
            }

            if (dict[Math.round(sum / ITERATES * 10)] !== -1){
                dict[Math.round(sum / ITERATES * 10)] += 1;
            }
            // Adds first instance of a point
            else {
                dict[Math.round(sum / ITERATES * 10)] = 1;
            }
        }

        for (const point in dict) {
            if (point !== -1) {
                for (let count = 1; count < dict[point] + 1; count++) {
                    popArray.push([point/10, count]);
                }
            }
        }
        popArray.sort(() => Math.random() - 0.5);
        popArray.sort((a,b) => b[1] - a[1]);
        this.setState({
            popMean: math.mean(popArray.map(p => p[0]))
        })

        return popArray;

    }

    sample(size, popArray) {
        const sampled = []

        while (sampled.length < size){
            // index to sample ?
            const r = Math.round(Math.random() * (popArray.length - 1))
            let shouldSample = true;
            for (let i = 0; i < sampled.length; i++){
                if (sampled[i][0] === r) {
                    shouldSample = false;
                }
            }
            if (shouldSample) {
                // only pushes if shouldSample is true
                sampled.push(popArray[r]);
            }
        }

        return { pop: sampled, mue: Math.round(math.mean(sampled.map(p => p[0])) * 100)/100, sd: math.std(sampled.map(p => p[0])) };
    }

    updateSampleMeansFromArray(means){
        let sampleMeans = this.state.sampleMean;
        const roundedMeans = means;
        sampleMeans = sampleMeans.concat(roundedMeans);
        this.setState({calculable: false,
            sampleMean: sampleMeans
        })
        console.log('sampleMeans?');
        console.log(sampleMeans);
    }
    updateDisTable(){
        if(this.state.zORt==='z'){
            this.state.freUsedVal=[
            {level:'90%', zValue:1.645},
            {level:'95%', zValue:1.960},
            {level:'99%', zValue:2.576}
        ];
        //this.setState({zScore: pairedVal[this.state.ciLevel.substring(0,this.state.ciLevel.length)]});
        }
        else{
            console.log("DOF DOUBLE");
            console.log(this.state.dOf);
            this.state.freUsedVal=[
            {level:'90%', zValue:parseFloat(TTable[this.state.dOf - 1][9])},
            {level:'95%', zValue:parseFloat(TTable[this.state.dOf - 1][4])},
            {level:'99%', zValue:parseFloat(TTable[this.state.dOf - 1][0])}
        ];

        console.log('zScore update check')
        console.log(this.state.zScore);

        }
        console.log('tableCheck')
        console.log(this.state.freUsedVal);
        console.log('stateCheck'+this.state.zORt);
    }

    componentDidUpdate() {
        if (this.state.popArray.length <= 0 && this.state.stage === 1) {
            this.setState({
                popArray: this.generateNormal()
            })
        }
    }

    componentDidMount() {
        this.setState({
            stage: 0
        })
    }



    render() {
        //console.log(TTable[0][0]);
        this.updateDisTable();





        const ciBar = this.state.freUsedVal.map(obj=>{
            return(

                <Button
                    //className={classnames({ active: this.state.activeTab === section.id }, {disabled: section.id === "0"})}
                    // disabled={section.id === "0"}
                    style={{ backgroundColor: this.state.ciLevel===obj.level? '#4CAF50':'#555555'  }}
                    onClick={() => {


                        this.setState({ ciLevel:obj.level,
                                        zScore:obj.zValue,
                                        sampleMean:[],
                                        chart:0
                                        });

                        console.log(this.state.chart);


                        }
                    }>
                    {obj.level}
                  </Button>

            )

        });

        return (


            <div>
                <Collapsable
                    stage={[0, 1, 2]}
                    changeStage={this.changeStage}
                    parentStage={this.state.stage}
                >
                    <div>
                        <h1
                        // style={{ display: 'inline' }}
                        >
                            Introduction
                        </h1>

                    </div>

                    <p>This simulation demonstrates how confidence intervals provide an estimate for the location of the true population mean µ. In this exercise you will first choose 1) whether to assume that you know the true population standard deviation and 2) what confidence level to impose. Then, you will take random samples from the population, calculation a sample mean for each, and construct confidence intervals around those sample means. The proportion of confidence intervals that contain the true mean corresponds to the chosen confidence level! </p>
                    <Button outline
                        style={{ marginBottom: '2em' }}
                        onClick={
                            () => {
                                this.changeStage(1);
                            }
                        }
                    >
                        Continue
                    </Button>

                    <div>
                        {
                            this.state.stage >= 1 ?
                                <div>
                                    <div>
                                    <Row>
                                    <Col>

                                    <Row>
                                    <p>
                                    1) Do you want to assume that you know σ? If yes, choose Z. If no, choose T.

                                    </p>
                                    </Row>
                                    <Row className="Center">
                                    <ButtonGroup >
                                    <Button
                                    style={{ backgroundColor: this.state.zORt==='z'? '#4CAF50':'#555555' }}
                                    onClick={
                                        () => {

                                            this.setState({
                                                zORt: 'z',
                                                ciLevel: '95%',
                                                sampleMean:[],
                                                sampled:[],

                                                chart:0
                                            });
                                            this.updateDisTable();
                                            console.log('zSocre ch ch' + this.state.ciLevel.substring(0,this.state.ciLevel.length));
                                            this.setState({zScore: pairedVal['0.'+this.state.ciLevel.substring(0,this.state.ciLevel.length-1)]});

                                            console.log(this.state.zScore);
                                            console.log("update ci level check "+this.state.ciLevel);

                                        }
                                    }>Z</Button>
                                    <Button
                                    style={{ backgroundColor: this.state.zORt==='t'? '#4CAF50':'#555555'  }}
                                    onClick={
                                        () => {

                                            this.setState({
                                                zORt: 't',
                                                sampleMean:[],
                                                sampled:[],

                                                chart:0
                                            });
                                            this.updateDisTable();

                                            const temp = parseInt(this.state.ciLevel.substring(0,this.state.ciLevel.length))
                                            const p = temp>50? 100-temp: temp;
                                            console.log('pCheck ' + p)


                                            this.setState({zScore: TTable[this.state.dOf - 1][p - 1],
                                                ciLevel: '95%'

                                            });
                                            console.log("update zscorere level check "+this.state.zScore);

                                        }
                                    }>T</Button>
                                    </ButtonGroup>
                                    </Row>
                                    </Col>

                                    <Col>
                                    <Row className="Center">
                                    <p>2) Confidence Level: <ButtonGroup>{ciBar}</ButtonGroup></p>
                                    </Row>
                                    <Row className="Center">
                                    <InputGroup>
                                    <p>More Levels: &nbsp;  </p>
                                    <Input

                                        type="range"
                                        className="custom-range"
                                        step={.01}
                                        min={0.01}
                                        max={0.99}
                                        onChange={(event) => {
                                            var pOft;
                                            if(this.state.zORt == 't'){

                                                pOft = parseInt(event.target.value *100)>50 ? 1-event.target.value: event.target.value;
                                                this.setState({ciLevel: Math.floor(event.target.value*100).toString()+'%'});

                                            }
                                            console.log('poft')
                                            console.log(pOft)

                                            this.setState({zScore: this.state.zORt==='z'? pairedVal[event.target.value.toString()]: parseFloat(TTable[this.state.dOf-1][parseInt(pOft*100) -1]),
                                                            sampleMean:[],
                                                            sampled:[],
                                                            chart:0,
                                                            ciLevel: Math.floor(event.target.value*100).toString()+'%'

                                                        });
                                            console.log('tCheck');
                                            console.log(this.state.zScore);
                                            //this.setState({ciLevel: this.state.zOrt==='z'? (Math.floor(event.target.value*100)).toString()+'%': parseFloat(TTable[this.state.dOf-1][parseInt(event.target.value *100)]) });



                                          }}
                                    />
                                    <InputGroupAddon addonType="append">
                                    <InputGroupText>{this.state.ciLevel}</InputGroupText>
                                    </InputGroupAddon>
                                     </InputGroup>
                                     </Row>
                                    </Col>
                                    </Row>
                                    <br />
                                    <br />

                                        <Row>

                                        <Col
                                            lg="6">

                                            <ChartContainer
                                                popArray={this.state.popArray}
                                                popMean={this.state.popMean}
                                                sampled={this.state.sampled}
                                                popType={'Normal'}
                                                mainSampleSize={this.state.mainSampleSize}
                                            />
                                        </Col>

                                        <Col
                                            lg="6">
                                            <SampleMeanChart
                                                chart = {this.state.chart}
                                                numberResamples={this.state.numberResamples}
                                                resampleSize={this.state.resampleSize[this.state.popType]}
                                                mean={this.state.popMean}
                                                sd={this.state.popArray.length > 0 ? math.std(this.state.popArray) : 1}
                                                normalized={this.state.standardNormal}
                                                sampleSize={this.state.sampleSize}
                                                type={this.state.popType}
                                                normal={this.state.standardNormal}
                                                sampleMeans={this.state.sampleMean}
                                                confidence={this.state.confidence}

                                                />
                                        </Col>
                                                </Row>
                                                {/* <Row>
                                                    <Col>
                                                        <Label className="text-muted" for="confidence">Pick a confidence level</Label>
                                                            <Input
                                                                id="confidence"
                                                                type="number"
                                                                min="1"
                                                                max="1000"
                                                                step="100"
                                                                value={this.state.confidence}
                                                                onChange={(event) => {
                                                                    this.setState({
                                                                        confidence: event.target.value
                                                                    })
                                                                }}
                                                            />
                                                    </Col>
                                                </Row> */}
                                        {

                                        <span>
                                        <Row>

                                            <Col lg="6">
                                                <Alert color='light'>




                                                    <p>Try drawing some samples and calculating means </p>

                                                    <SampleAreaCLT
                                                        distribution ={this.state.zORt}
                                                        conLevel = {this.state.ciLevel}
                                                        zScore = {this.state.zScore}
                                                        disabled={this.state.disableSample}

                                                        redraw={() =>
                                                            {}
                                                        }
                                                        sample={(size) => {
                                                            console.log('zORt')
                                                            console.log(this.state.zORt);

                                                            this.setState({
                                                                chart: 1,
                                                                dOf:size - 1,

                                                            });

                                                            console.log('dofCheck')
                                                            console.log(this.state.dOf)
                                                            const sampleObject = this.sample(size, this.state.popArray);

                                                            this.setState({
                                                                sampled: sampleObject.pop
                                                            });
                                                            return sampleObject;

                                                        }}
                                                        mean={this.state.popMean}
                                                        popArray={this.state.popArray}
                                                        popType={this.state.popType}
                                                        setmean={(size, mue, sd, lc, uc, label) => {
                                                            const means = this.state.sampleMean;
                                                            means.push([size, mue, sd, lc, uc, label]);
                                                            this.setState({sampleMean: means});
                                                        }}
                                                        />
                                                </Alert>
                                                <Alert color='light' className="Center">
                                                    <Alert color="primary" style={{width: "50%", margin: 'auto'}}>
                                                        <p> Simulate drawing many many samples </p>
                                                    </Alert>
                                                    <SampleMeanSimulator
                                                        conLevel = {this.state.ciLevel}
                                                        zScore = {this.state.zScore}
                                                        setDOF={size=>{
                                                            this.setState({dOf:size - 1});
                                                            this.updateDisTable();
                                                            console.log(this.state.dOf);

                                                        }}
                                                        style={{margin: 'auto'}}
                                                        clear={() => {
                                                            this.setState({
                                                                calculable: false,
                                                                sampleMean: []
                                                            })}
                                                        }
                                                        population={this.state.popArray}
                                                        popType={this.state.popType}
                                                        mean={this.state.popMean}
                                                        sample={(means) => {
                                                            console.log('means', means);
                                                            this.updateSampleMeansFromArray(means);
                                                            this.setState({disableSample : true});
                                                        }}
                                                    />
                                                </Alert>
                                            </Col>
                                            <Col lg="6">
                                                <Table hover className="PopTable">
                                                    <thead>
                                                        <tr>
                                                            <th>Sample</th>
                                                            <th>Size</th>
                                                            <th>Mean</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                    {this.state.sampleMean && this.state.sampleMean.map( (mean, index) => (
                                                        <tr
                                                            style={ mean[5] === 'no' ? {backgroundColor: "rgba(161, 23, 23, 0.233)"} : {backgroundColor: "rgba(23, 161, 80, 0.233)"}}>
                                                            <td>{index + 1}</td>
                                                            <td>{mean[0]}</td>
                                                            <td>{Math.round(mean[1] * 10) / 10}</td>

                                                        </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                                </Col>
                                            </Row>
                                            {
                                                this.state.sampleMean.length > 0 &&

                                                <Row lg="12" >
                                                    <Alert color="info" style={{margin:'auto'}}>
                                                        <p>
                                                            {this.state.sampleMean.filter(point => point[5] === 'no').length} intervals did not contain the true mean <br></br>
                                                            {this.state.sampleMean.filter(point => point[5] === 'yes').length} did
                                                        </p>

                                                    </Alert>
                                                </Row>
                                            }
                                        </span>
                                        }
                                    </div>
                                </div>
                            :
                                <div></div>
                            }
                    </div>
                </Collapsable>
            </div>

        )
    }
}

export default Normal;
