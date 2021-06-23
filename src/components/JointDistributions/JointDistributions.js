/*

  A container component that holds the description and simulation for Joint Distribution

*/
import React from 'react';
import { Alert } from 'reactstrap';
import JDSimulation from './JDSimulation.js';

export default function JointWrapper() {
  return(
    <div className="MainContainer">
      <Alert style={{ width: "50%", margin: 'auto' }} color="primary">
          Joint Distributions
      </Alert>
      <br/>
      <JDSimulation/>
    </div>
  );
}
