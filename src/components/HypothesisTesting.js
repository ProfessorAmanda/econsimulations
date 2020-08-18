import React, { Component } from 'react';
import PopBar from './PopBar.js';
import { Alert,ButtonGroup,Button } from 'reactstrap';
import Normal from './ConfidenceIntervals/Normal.js';
import Uniform from './ConfidenceIntervals/Uniform.js';
import Exponential from './ConfidenceIntervals/Exponential.js';
import ChiSquared from './ConfidenceIntervals/ChiSquared.js';

const SAMPLE_SIZE = 2000;


class HypothesisTesting extends Component{
    constructor(props){
        super(props);
        this.state = {
            popType: "",
            oneOrTwo: 1
        }
        this.selectPop = this.selectPop.bind(this);
    }

    selectPop(type) {
        this.setState({
            popType: type
        })
    }

    render() {
        const testButton = ()=>{
            return(
            <ButtonGroup>
            <Button
            style={{ backgroundColor: this.state.oneOrTwo===1? '#4CAF50':'#555555' }}
            onClick={
                () => {
                    this.setState({
                        oneOrTwo:1
                    });
                }
            }>One Sample</Button>
            <Button
            style={{ backgroundColor: this.state.oneOrTwo===2? '#4CAF50':'#555555'  }}
            onClick={
                () => {
                    this.setState({
                        oneOrTwo:2
                    });
                }
            }>Two Sample</Button>
            </ButtonGroup>)
        }

        return (
            <div className="MainContainer">
                {/* <div className="MiniLogo"></div> */}
                <Alert style={{ width: "90%", margin: 'auto' }} color="primary">
                    Hypothesis Testing
                </Alert>
                <Alert style={{ width: "90%", margin: 'auto' }} color="primary">
                When we conduct a test of hypotheses, we use the information provided by a sample to make a conclusion about population parameters that we cannot directly observe. We are able to make a connection between the sample and the population by using the rules that govern probability distributions. Due to the central limit theorem, we can make a variety of assertions about the probable location of points in a distribution, which allows us to make assertions about where population parameters might be located relative to the data we have collected from a sample. This allows us to test hypotheses.
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                The goal of this exercise, then, is to try out our decision-making framework for hypothesis testing with simulated population data. At first, the user must make decisions from samples collected from that population without seeing that population. Then, the true population is revealed, and the user can compare the result of the hypothesis test to the “truth.”  Finally, we allow the user to automate this process, taking many samples and testing each, to see how often hypothesis testing leads us to the correct conclusion.

                </Alert>
                <br />
                <p>
                Choose a kind of hypothesis test: &nbsp;
                {testButton}
                </p>

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

export default HypothesisTesting;
