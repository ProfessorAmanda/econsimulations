import React from 'react';
import Collapsable from '../Collapsable.js';
import ChartContainer from './ChartContainer.js';
import SampleMeanChart from './SampleMeanChart.js';
import SampleAreaCLT from './SampleAreaCLT.js';
import SampleMeanSimulator from '../SampleMeanSimulator.js';
import TTable from './TTable.js';
import ZTable from './ZTable.js';
import math from 'mathjs';
import { Alert, Button, Col, Input, Row, Table,InputGroupText,InputGroupAddon,InputGroup,ButtonGroup } from 'reactstrap';


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

    }
    updateDisTable(){
        if(this.state.zORt==='z'){
                this.state.freUsedVal=[
                {level:'90%', zValue:1.645},
                {level:'95%', zValue:1.960},
                {level:'99%', zValue:2.576}
            ];

        //this.setState({zScore: ZTable[this.state.ciLevel.substring(0,this.state.ciLevel.length)]});
        }
        else{

            const modDof = this.state.dOf > 120? 121: this.state.dOf;
                    this.state.freUsedVal=[
                    {level:'90%', zValue:parseFloat(TTable[modDof - 1][9])},
                    {level:'95%', zValue:parseFloat(TTable[modDof - 1][4])},
                    {level:'99%', zValue:parseFloat(TTable[modDof - 1][0])}
                ]


        }

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

                                    <Row className = 'Center'>
                                    <p>
                                    1) Do you want to assume that you know σ? If yes, choose Z. If no, choose T. &nbsp;
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
                                            this.setState({zScore: ZTable['0.'+this.state.ciLevel.substring(0,this.state.ciLevel.length-1)]});

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
                                            const modDof = this.state.dOf > 121? 122: this.state.dOf;
                                            this.setState({zScore: TTable[modDof - 1][p - 1],
                                                ciLevel: '95%'
                                            });


                                        }
                                    }>T</Button>
                                    </ButtonGroup>
                                    </p>


                                    </Row>

                                    <Row className="Center">
                                    <br />

                                    <p>2) Confidence Level: <ButtonGroup>{ciBar}</ButtonGroup></p>
                                    </Row>
                                    <Row className="Center">
                                    <Col sm="12" md={{ size: 6, offset: 3 }}>
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
                                            if(this.state.zORt === 't'){

                                                pOft = parseInt(event.target.value *100)>50 ? 1-event.target.value: event.target.value;
                                                this.setState({ciLevel: Math.floor(event.target.value*100).toString()+'%'});
                                            }
                                            const modDof = this.state.dOf > 121? 122: this.state.dOf;


                                            this.setState({zScore: this.state.zORt==='z'? ZTable[event.target.value.toString()]: parseFloat(TTable[modDof-1][parseInt(pOft*100) -1]),
                                                            sampleMean:[],
                                                            sampled:[],
                                                            chart:0,
                                                            ciLevel: Math.floor(event.target.value*100).toString()+'%'
                                                        });
                                          }}
                                    />
                                    <InputGroupAddon addonType="append">
                                    <InputGroupText>{this.state.ciLevel}</InputGroupText>
                                    </InputGroupAddon>
                                     </InputGroup>
                                     </Col>
                                     </Row>

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

                                                            this.setState({
                                                                chart: 1,
                                                                dOf:size - 1,

                                                            });
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

                                                            const modSize = size<2? 2: size;

                                                            this.setState({dOf:modSize - 1});
                                                            this.updateDisTable();


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
