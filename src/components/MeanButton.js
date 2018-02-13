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
        const array = this.props.popArray[this.props.popType]
        return (<div>
                    <h4> Step {this.props.string === "Population" ? 2 : 4}: Calculate {this.props.string} Mean </h4>
                    <button disabled={!array || !array.length || !this.props.calculable} onClick={() => {this.setState({popMean:Math.round(math.mean(array) * 100) / 100}); this.props.setmean(Math.round(math.mean(array) * 100) / 100)}}> Calculate! </button>
                    <h4> {this.props.type} Mean: {this.state.popMean || ''} </h4>
                </div>);
    }
}
export default MeanButton;
