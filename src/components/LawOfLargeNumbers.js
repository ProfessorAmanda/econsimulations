import React, { Component } from 'react';
import PopBar from './PopBar.js';
import { Alert, Input } from 'reactstrap';
import Normal from './LawOfLargeNumbers/Normal.js';
import Uniform from './LawOfLargeNumbers/Uniform.js';
import Exponential from './LawOfLargeNumbers/Exponential.js';
import ChiSquared from './LawOfLargeNumbers/ChiSquared.js';

const SAMPLE_SIZE = 2000;


class LawOfLargeNumbers extends Component{
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
                <br/>
                <div className="MiniLogo"></div>
                <Alert style={{ width: "90%", margin: 'auto' }} color="primary">
                    Law Of Large Numbers
                </Alert>
                <Alert style={{ width: "90%", margin: 'auto' }} color="primary">
                The Law of Large Numbers (LLN) is a statement about the relationship between a population and a random sample drawn from that population. Let 𝜇 denote the true mean of a variable when calculated using the entire population, let 𝜎 denote the true standard deviation of that variable when calculated using the entire population, let 𝑥̅ denote the mean calculated from a sample drawn from that population, and let 𝑠 denote the standard deviation calculated from that sample. We would like to use information from the sample to make conclusions about the population. The LLN is helpful in this endeavor, because it states that as the sample size gets larger, the sample mean approaches the true population mean. This simulation’s goal is to demonstrate this handy property.
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

export default LawOfLargeNumbers;
