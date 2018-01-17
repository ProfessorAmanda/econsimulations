import React, { Component } from 'react';
import styled from 'styled-components';
import SimBar from './SimBar.js';
import LawOfLargeNumbers from './LawOfLargeNumbers.js'
import CentralLimitTheorem from './CentralLimitTheorem.js'
import JointDistributions from './JointDistributions.js'

class SimulationContainer extends Component{
    constructor(){
        super();
        this.state = {
            mode: 'Home'
    }
}
    render(){
        return(
            <div>
            <h1> {this.state.mode} </h1>
            <SimBar section= {this.state.mode} setSection={(section) => this.setState({mode:section})} />
            {this.state.mode === 'Law of Large Numbers' && <LawOfLargeNumbers/>}
            {this.state.mode === 'Central Limit Theorem' && <CentralLimitTheorem/>}
            {this.state.mode === 'Joint Distributions' && <JointDistributions/>}
            </div>
        );
    }
}
export default SimulationContainer;
