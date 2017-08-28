import React, { Component } from 'react';
import math from 'mathjs'

class MeanButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            popMean: undefined
        }
    }
    render () {
        return (<div> <button disabled={!this.props.popArray[this.props.popType]} onClick={() => {this.setState({popMean:Math.round(math.mean(this.props.popArray[this.props.popType].slice(0, 10000)) * 100) / 100})}}> Calculate Mean </button> <h4> {this.props.type} Mean: {this.state.popMean || ''} </h4> </div>);
    }
}
export default MeanButton;
