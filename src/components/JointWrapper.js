import React, { Component } from 'react';
import styled from 'styled-components';
import JointSimple from './JointSimple.js';
import JointDistributions from './JointDistributions.js';
import ToggleJoint from './ToggleJoint.js';
import PopBar from './PopBar.js';
import { Container, Alert } from 'reactstrap';

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
          <Container fluid className='Plate'>
            <div className="MiniLogo"></div>
            <Alert style={{ width: "50%", margin: 'auto' }} color="primary">
                Joint Distributions
            </Alert>
            <br/>
            {this.state.mode === 'Basic' && <JointSimple/>}
            { // this.state.mode === 'Advanced' && <JointDistributions/>
            }
          </Container>
          </div>
        );
    }
}
export default JointWrapper;
