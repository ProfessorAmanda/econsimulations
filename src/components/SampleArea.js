import React, { Component } from 'react';
import styled from 'styled-components';



class SampleArea extends Component {
    constructor(props){
        super(props);
        this.state = {
            sampleSize: '',
            popMean: undefined
        }
    }
    render() {
        return (
            <div>
                <span> Sample Size: </span>
                <input 
                    type="number" 
                    onKeyPress={(e) => this.onKey(e)} 
                    onChange={(event) => { 
                        this.setState({ 
                            sampleSize: event.target.value 
                        })
                    }} 
                    value={this.state.sampleSize} 
                />
                <button 
                    disabled={!this.state.sampleSize || this.state.sampleSize > this.props.popArray[this.props.popType].length || this.state.sampleSize < 1}
                    onClick={()=> {
                        const sampleObject = this.props.sample(this.state.sampleSize);
                        const mue = sampleObject.mue; 
                        this.setState({
                            popMean: mue 
                        });
                        this.props.setmean(mue);
                        this.props.redraw();
                    }}> Sample </button>
                {/*<h4> {this.props.type} Sample Mean: {this.state.popMean || ''} </h4>*/}
            </div>
        )
    }
    onKey(e) {
        if (e.key === "Enter" && this.state.sampleSize && this.state.sampleSize <= this.props.popArray[this.props.popType].length && this.state.sampleSize >= 1) {
            const sampleObject = this.props.sample(this.state.sampleSize);
            const mue = sampleObject.mue; 
            this.setState({
                popMean: mue 
            });
            this.props.setmean(mue);
            this.props.redraw();
        }
    }

    newSample(size, array) {
        const sampled = []
        const currentPop = array;

        while (sampled.length < size){
            // index to sample ?
            const r = Math.round(Math.random() * (currentPop.length - 1))
            let shouldSample = true;
            for (let i = 0; i < sampled.length; i++){
                 if (sampled[i][0] === r) {
                     shouldSample = false;
                 }
            }
            
            if (shouldSample) {
                let count = 1;
                // currentPop.forEach( (val, index) => {
                //     // if the value 
                //     if (index < r && Math.round(val * 10) === Math.round(currentPop[r] * 10)) {
                //         count += 1;
                //     }
                // });
                // only pushes if shouldSample is true
                sampled.push([r, count]);
            }
            console.log(sampled);
        }
        const sampledCopy = sampled;
        const sampleVals = [[]];
        const samplePop = [];

        for (const j in sampledCopy){
            sampleVals[j] = [];
            sampleVals[j][0] = Math.round(this.props.popArray[this.props.popType][sampledCopy[j][0]] * 10)
            sampleVals[j][1] = sampledCopy[j][1];
            samplePop.push(sampleVals[j][0] / 10)
        }
        console.log("pop", sampled);
        return samplePop;
    }
}
export default SampleArea
