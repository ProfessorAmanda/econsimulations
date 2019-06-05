import React, { Component } from 'react';
import SimBar from './SimBar.js';
import LawOfLargeNumbers from './LawOfLargeNumbers.js';
import CentralLimitTheorem from './CentralLimitTheorem.js';
import JointWrapper from './JointWrapper.js';
import LeastSim from './LeastSim.js';
import OmmittedVariable from './OmmittedVariable.js';
import StartHere from './StartHere';
import Logo from '../ECONSIMS.png';
import bg from '../bg.png';

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
                <img width="30%" alt="Logo" src={Logo} />
              <h1 style={{ color:"#c46907"}} >{this.state.mode} </h1>
              <SimBar section= {this.state.mode} setSection={(section) => this.setState({mode:section})} />
              {this.state.mode === 'Law of Large Numbers' && <LawOfLargeNumbers/>}
              {this.state.mode === 'Central Limit Theorem' && <CentralLimitTheorem/>}
              {this.state.mode === 'Joint Distributions' && <JointWrapper/>}
              {this.state.mode === 'Least Squares' && <LeastSim/>}
              {this.state.mode === 'Omitted Variable Bias' && <OmmittedVariable/>}
              {this.state.mode === 'Start Here' && <StartHere/>}
            </div>
        );
    }
}
export default SimulationContainer;
