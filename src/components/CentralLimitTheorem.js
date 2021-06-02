import React, { Component } from 'react';
import PopBar from './PopBar.js';
import { Alert } from 'reactstrap';
import Normal from './CentralLimitTheorem/Normal.js';
import Uniform from './CentralLimitTheorem/Uniform.js';
import Exponential from './CentralLimitTheorem/Exponential.js';
import ChiSquared from './CentralLimitTheorem/ChiSquared.js';
import Mystery from './CentralLimitTheorem/Mystery.js';
//import Intro from './CLTLLNIntro.js';

const SAMPLE_SIZE = 2000;


class CentralLimitTheorem extends Component{
    constructor(props){
        super(props);
        this.state = {
            popType: ""
        }
        this.selectPop = this.selectPop.bind(this);
    }

    selectPop(type) {
        this.setState({
            popType: type,
            intro: true
        })
    }

    render() {
        return (
            <div className="MainContainer">
                <Alert style={{ width: "90%", margin: 'auto' }} color="primary">
                    Central Limit Theorem
                </Alert>
                <Alert style={{ width: "90%", margin: 'auto' }} color="primary">
                This simulation demonstrates the shape of the sampling distribution of the sample mean. Suppose I draw a large number of samples, each of size 𝑛, from some population. For each sample, I calculate a sample mean 𝑥̅. I now plot a histogram of those sample means. For a sufficiently large sample size, the shape of that histogram will look like a beautiful bell-shaped curve, no matter what shape the underlying population had.
                </Alert>
                <PopBar
                    section={this.state.popType}
                    mode="CLT"
                    setPop={(pop) => {
                            this.selectPop(pop);
                        }
                    }
                />
                {this.state.popType === "Normal" &&
                    <Normal
                        mainSampleSize={SAMPLE_SIZE}
                    />}
                {this.state.popType === "Uniform" &&
                    <Uniform
                        mainSampleSize={SAMPLE_SIZE}
                    />}

                {this.state.popType === "Exponential" &&
                    <Exponential
                        mainSampleSize={SAMPLE_SIZE}
                    />}

                {this.state.popType === "Chi-Squared" &&
                    <ChiSquared
                        mainSampleSize={SAMPLE_SIZE}
                    />}
                {this.state.popType === "Mystery" &&
                      <Mystery
                        mainSampleSize={SAMPLE_SIZE}
                    />}
            </div>
        )
    }
}

export default CentralLimitTheorem;
