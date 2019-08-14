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
                {/* <div className="MiniLogo"></div> */}
                <Alert style={{ width: "50%", margin: 'auto' }} color="primary">
                    Law Of Large Numbers
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
