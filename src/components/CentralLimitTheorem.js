import React, { Component } from 'react';
import PopBar from './PopBar.js';
import { Alert, Input } from 'reactstrap';
import Normal from './CentralLimitTheorem/Normal.js';
import Uniform from './CentralLimitTheorem/Uniform.js';
import Exponential from './CentralLimitTheorem/Exponential.js';
import ChiSquared from './CentralLimitTheorem/ChiSquared.js';
import Mystery from './CentralLimitTheorem/Mystery.js';

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
            popType: type
        })
    }

    render() {
        return (
            <div className="MainContainer">
                {/* <div className="MiniLogo"></div> */}
                <Alert style={{ width: "50%", margin: 'auto' }} color="primary">
                    Central Limit Theorem
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

            </div>
        )
    }
}

export default CentralLimitTheorem;
