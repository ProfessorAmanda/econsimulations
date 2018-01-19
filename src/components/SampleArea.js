import React, { Component } from 'react';
import styled from 'styled-components';


class SampleArea extends Component {
    constructor(props){
        super(props);
        this.state = {
            sampleSize: undefined
        }
    }
    render() {
        return (
            <div>
                <span> Sample Size: </span>
                <input type="number" onKeyPress={(e) => this.onKey(e)} onChange={(event) => {this.setState({sampleSize: event.target.value})}} value={this.state.sampleSize} />
                <button disabled={!this.state.sampleSize || this.state.sampleSize > this.props.popArray[this.props.popType].length || this.state.sampleSize < 1} onClick={()=>{this.props.sample(this.state.sampleSize); this.props.redraw()}}> Sample </button>
            </div>
        )
    }
    onKey(e) {
        if (e.key === "Enter" && this.state.sampleSize && this.state.sampleSize <= this.props.popArray[this.props.popType].length && this.state.sampleSize >= 1) {
            this.props.sample(this.state.sampleSize);
            this.props.redraw();
        }
    }
}
export default SampleArea
