/*

  A container component that holds the description and simulation for Least Squares

*/
import React from "react";
import LeastSquaresSimulation from "./LeastSquaresSimulation";
import { Alert } from "reactstrap";

export default function LeastSquares() {
  return (
    <div className="MainContainer">
      <Alert style={{ width: "50%", margin: 'auto' }} color="primary">
        Least Squares
      </Alert>
      <br/>
      <LeastSquaresSimulation/>
    </div>
  );
}
