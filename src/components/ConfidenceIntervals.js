import React, { Component } from 'react';
import PopBar from './PopBar.js';
import { Alert, Input } from 'reactstrap';
import Normal from './ConfidenceIntervals/Normal.js';
import Uniform from './ConfidenceIntervals/Uniform.js';
import Exponential from './ConfidenceIntervals/Exponential.js';
import ChiSquared from './ConfidenceIntervals/ChiSquared.js';

const SAMPLE_SIZE = 2000;


class ConfidenceIntervals extends Component{
    constructor(props){
        super(props);
        this.state = {
            popType: ""
        }
        this.selectPop = this.selectPop.bind(this);
    }

    selectPop(type) {
        this.setState({
            popType: type
        })
    }

    render() {
        return (
            <div className="MainContainer">
                {/* <div className="MiniLogo"></div> */}
                <Alert style={{ width: "50%", margin: 'auto' }} color="primary">
                    Confidence Intervals
                </Alert>
                <PopBar
                    section={this.state.popType}
                    mode="LLN"
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
            </div>
        )
    }
}

export default ConfidenceIntervals;
