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
            <div style={{margin:"20px"}}>
                <input type="number" placeholder="Sample Size" onChange={(event) => {this.setState({sampleSize: event.target.value})}} value={this.state.sampleSize} />
                <button disabled={!this.props.popArray[this.props.popType] || !this.state.sampleSize || this.state.sampleSize > this.props.popArray[this.props.popType].length || this.state.sampleSize < 1} onClick={()=>{this.props.sample(this.state.sampleSize); this.props.redraw()}}> Sample </button>
            </div>
        )
    }
}
export default SampleArea
