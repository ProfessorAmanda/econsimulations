import React, { Component } from 'react';
import styled from 'styled-components';


class SampleArea extends Component {
    constructor(props){
        super(props);
        this.state = {
            sampleSize: 0
        }
    }
    render() {
        return (
            <div style={{margin:"20px"}}>
                <input type="number" placeholder="Sample Size" onChange={(event) => {this.setState({sampleSize:event.target.value})}} />
                <button disabled={this.state.sampleSize < 1 || this.state.sampleSize > this.props.popArray[this.props.popType].length || !this.props.popArray[this.props.popType]}onClick={()=>{this.props.sample(this.state.sampleSize)}}> Sample </button>
            </div>
        )
    }
}
export default SampleArea
