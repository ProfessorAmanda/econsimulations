import React from 'react';
import Collapsable from '../Collapsable.js';
import ChartContainer from '../ChartContainer.js';
import ToggleStandard from '../ToggleStandard.js';
import SampleMeanChart from '../SampleMeanChart.js'
import SampleAreaCLT from './SampleAreaCLT.js'
import SampleMeanSimulator from '../SampleMeanSimulator.js'
import math from 'mathjs';
import { Alert, Button, Col, Row, Table } from 'reactstrap';

class Uniform extends React.Component {
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
            sampleMean: [],
            sampled: [],
            mainSampleSize: this.props.mainSampleSize,
            popArray: [],
            standardNormal : 0,
            sampleSize : 1,
            disableSample : false,
            popType: 'Uniform'
        }
        this.changeStage = this.changeStage.bind(this);
    }

    changeStage(stage) {
        this.setState({stage: stage});
    }

    generateUniform(){
        const HI = 74;
        const LOW = 54;
        const range = HI - LOW;

        const popArray = this.state.popArray ? this.state.popArray.slice() : []

        const sampleSize = this.state.mainSampleSize;
        let dict = Array(sampleSize).fill(-1); 

        for (let i = 0; i < sampleSize; i++){
            const val = Math.random() * range + LOW;

            if (dict[Math.round(val * 10)]){
                dict[Math.round(val * 10)] += 1;
            } else {
                dict[Math.round(val * 10)] = 1;
            }
        }

        for (const point in dict) {
            if (point !== -1) {
                for (let count = 1; count < dict[point] + 2; count++) {
                    popArray.push([point/10, count]);
                }
            }
        }

       

        popArray.sort(() => Math.random() - 0.3);
        popArray.sort((a,b) => b[1] - a[1]);
        this.setState({
            popMean: math.mean(popArray.map(p => p[0]))
        })

        console.log(popArray, dict);
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

        return { pop: sampled, mue: Math.round(math.mean(sampled.map(p => p[0])) * 100)/100 };
    }

    updateSampleMeansFromArray(means){
        let sampleMeans = this.state.sampleMean;
        const roundedMeans = means;
        sampleMeans = sampleMeans.concat(roundedMeans);
        this.setState({calculable: false,
            sampleMean: sampleMeans
        })
    }

    componentDidUpdate() {
        if (this.state.popArray.length <= 0 && this.state.stage === 1) {
            this.setState({
                popArray: this.generateUniform()
            })
        }
    }

    componentDidMount() {
        this.setState({
            stage: 0
        })
    }

    render() {
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
                    
                    <p> This simulation demonstrates the shape of the sampling distribution of the sample mean. Suppose I draw a large number of samples, each of size 𝑛, from some population. For each sample, I calculate a sample mean 𝑥̅. I now plot a histogram of those sample means. For a sufficiently large sample size, the shape of that histogram will look like a beautiful bell-shaped curve, no matter what shape the underlying population had.</p>

                    <Button outline
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
                                    <ChartContainer 
                                        popArray={this.state.popArray}
                                        popMean={this.state.popMean}
                                        sampled={this.state.sampled}
                                        popType={'Uniform'}
                                        mainSampleSize={this.state.mainSampleSize}
                                        />

                                    <Button
                                        color="success"
                                        onClick={() => {
                                            this.setState({
                                                stage: 2
                                            })
                                        }}
                                        >Continue
                                    </Button>
                                        {
                                            this.state.stage >= 2 ? 
                                        <span>
                                        <Row>
                                            <Col
                                                lg="8">
                                                <ToggleStandard
                                                    section={this.state.standardNormal} 
                                                    toggleSwitch={(set) => {
                                                        this.setState({ 
                                                            standardNormal : set 
                                                        })
                                                    }}
                                                />
                                                <SampleMeanChart
                                                    numberResamples={this.state.numberResamples} 
                                                    resampleSize={this.state.resampleSize[this.state.popType]} 
                                                    mean={this.state.popMean} 
                                                    sd={math.std(this.state.popArray)}
                                                    normalized={this.state.standardNormal} 
                                                    sampleSize={this.state.sampleSize} 
                                                    type={this.state.popType} 
                                                    normal={this.state.standardNormal} 
                                                    sampleMeans={this.state.sampleMean}
                                                />
                                            </Col>
                                            <Col
                                                lg="4">

                                            <Alert color='light'>
                                                <p>Try drawing some samples and calculating means </p>
                                                <SampleAreaCLT 
                                                    disabled={this.state.disableSample} 
                                                    redraw={() => 
                                                        {}
                                                    }
                                                    sample={(size) => {
                                                        const sampleObject = this.sample(size, this.state.popArray);
                                                        
                                                        this.setState({
                                                            sampled: sampleObject.pop
                                                        });
                                                        return sampleObject;
                                                        
                                                    }}
                                                    popArray={this.state.popArray}
                                                    popType={this.state.popType}
                                                    setmean={(size, mue) => {
                                                        const means = this.state.sampleMean;
                                                        means.push([size, mue]);
                                                        this.setState({sampleMean: means});
                                                    }}
                                                    />
                                            </Alert>
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
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{mean[0]}</td>
                                                            <td>{Math.round(mean[1] * 10) / 10}</td>
                                                        </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                                </Col>
                                            </Row>
                                            <Row style={{width: "60%", margin:'auto'}}>
                                                <Alert color='light' className="Center">
                                                    <Alert color="primary" style={{width: "50%", margin: 'auto'}}>
                                                        <p> Simulate drawing many many samples </p>
                                                    </Alert>
                                                    <SampleMeanSimulator 
                                                        style={{margin: 'auto'}}
                                                        clear={() => {
                                                            this.setState({
                                                                calculable: false, 
                                                                sampleMean: []
                                                            })}
                                                        }
                                                        population={this.state.popArray}
                                                        popType={this.state.popType}
                                                        sample={(means) => {
                                                            console.log('means', means);
                                                            this.updateSampleMeansFromArray(means);
                                                            this.setState({disableSample : true});
                                                        }}
                                                    />
                                                </Alert>
                                            </Row>
                                        </span>
                                            :
                                            <div>
                                            </div>
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

export default Uniform;