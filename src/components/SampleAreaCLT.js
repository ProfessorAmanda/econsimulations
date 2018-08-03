import React, { Component } from 'react';
import styled from 'styled-components';
import math from 'mathjs';

class SampleAreaCLT extends Component {
    constructor(props){
        super(props);
        this.state = {
            sampleSize: undefined,
            popMean: undefined
        }
    }
    render() {
        return (
            <div>
                <span> Sample Size: </span>
                <input type="number" onKeyPress={(e) => this.onKey(e)} onChange={(event) => {this.setState({sampleSize: event.target.value})}} value={this.state.sampleSize} />
                <button disabled={!this.state.sampleSize || this.state.sampleSize > this.props.popArray[this.props.popType].length || this.state.sampleSize < 1} onClick={()=>{
                  this.props.sample(this.state.sampleSize);
                  this.props.redraw();
                  const array = this.newSample(this.state.sampleSize,this.props.popArray[this.props.popType]);
                  this.setState({popMean:Math.round(math.mean(array) * 100) / 100});
                  this.props.setmean(Math.round(math.mean(array) * 100) / 100);
                }}> Sample </button>
                {/*}<h4> {this.props.type} Sample Mean: {this.state.popMean || ''} </h4>*/}
            </div>
        )
    }
    onKey(e) {
        if (e.key === "Enter" && this.state.sampleSize && this.state.sampleSize <= this.props.popArray[this.props.popType].length && this.state.sampleSize >= 1) {
            this.props.sample(this.state.sampleSize);
            this.props.redraw();
        }
    }

    newSample(size, array) {
        let sampled = []
        const currentPop = array;

        while (sampled.length < size){
            // index to sample ?
            let r = Math.round(Math.random() * (currentPop.length - 1))
            let shouldSample = true;
            for (let i = 0; i < sampled.length; i++){
                 if (sampled[i][0] === r) {
                     shouldSample = false;
                 }
            }
            let count = 1;
            currentPop.forEach( (val, index) => {
                if (index < r && Math.round(val * 10) === Math.round(currentPop[r] * 10)) {
                    count += 1;
                }
            });
            // only pushes if shouldSample is true
            shouldSample && sampled.push([r, count]);
        }
        let sampledCopy = sampled;
        let sampleVals = [[]];
        let samplePop = [];

        for (let j in sampledCopy){
            sampleVals[j] = [];
            sampleVals[j][0] = Math.round(this.props.popArray[this.props.popType][sampledCopy[j][0]] * 10)
            sampleVals[j][1] = sampledCopy[j][1];
            samplePop.push(sampleVals[j][0] / 10)
        }

        return samplePop;
    }
}
export default SampleAreaCLT
