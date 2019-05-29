import React, { Component } from 'react';
import styled from 'styled-components';
import JointSimple from './JointSimple.js';
import JointDistributions from './JointDistributions.js';
import ToggleJoint from './ToggleJoint.js';


const Toggle=styled.ul`
  list-style: none;
  float: left;
  margin: 10px
`;


class JointWrapper extends Component{
    constructor(){
        super();
        this.state = {
            mode: 'Basic'
    }
}
// <div><ToggleJoint toggleSwitch={(section) => this.setState({mode:section})} /></div>
    render(){
        return(
            <div>
              <div>
                {this.state.mode === 'Basic' && <JointSimple/>}
                { // this.state.mode === 'Advanced' && <JointDistributions/>
                }
              </div>
            </div>
        );
    }
}
export default JointWrapper;
