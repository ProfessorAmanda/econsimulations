import React from 'react';
import Collapsable from '../Collapsable.js';
import ChartContainer from '../ChartContainer.js';
import SampleArea from '../SampleArea.js';
import SimulateSamples from '../SimulateSamples.js';
import math from 'mathjs';
import { Alert, Button } from 'reactstrap';

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

class Normal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sampled: [],
            mainSampleSize: this.props.mainSampleSize,
            popArray: [],
            popType: 'Normal'
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

        return { pop: sampled, mue: Math.round(math.mean(sampled.map(p => p[0])) * 100)/100 };
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
            stage: 1
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
                        {
                            this.state.stage >= 1 ?
                                <div>
                                    <ChartContainer
                                        popArray={this.state.popArray}
                                        popMean={this.state.popMean}
                                        sampled={this.state.sampled}
                                        popType={'Normal'}
                                        mainSampleSize={this.state.mainSampleSize}
                                        />
                                    <div>
                                        <span>
                                            <p> Try a few different sample sizes and compare sample mean to population mean </p>
                                            <SampleArea
                                                setmean={(mean) => {
                                                    this.setState({
                                                        sampleMean: mean
                                                    })
                                                }}
                                                redraw = {() => {
                                                }}
                                                sample={(size) => {
                                                    const sampleObject = this.sample(size,this.state.popArray);
                                                    this.setState({
                                                        sampled: sampleObject.pop
                                                    });
                                                    this.changeStage(2);
                                                    return sampleObject;
                                                }}
                                            popArray={this.state.popArray}
                                            popType={this.state.popType}
                                            />
                                        </span>

                                        {
                                            this.state.stage >= 2 ?
                                                <DifferenceOfMeans
                                                popMean={this.state.popMean}
                                                sampleMean={this.state.sampleMean}
                                                />
                                            :
                                            <div>
                                            </div>
                                        }

                                        { this.state.stage >= 2 ?
                                            <div>
                                            <Alert color="info">
                                                According to the law, the average of the results obtained from a large enough sample should be close to the total average of the population, and will tend to become closer the larger the sample is. Make sure to pick several samples, or click below for a simulation to see the law in action.
                                            </Alert>
                                            <SimulateSamples
                                                type={this.state.popType}
                                                sample={(size) => { return this.sample(size, this.state.popArray).pop }}
                                                pop={this.state.popMean}
                                            />
                                        </div>
                                        :<div></div>
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
