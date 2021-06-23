/*

  Displays a button for the user to plot their guess or a button to generate the correct best fit line

  props:
    stage            - int
    setStage         - callback
    squareAreas      - float
    generateBestLine - callback

*/
import React from "react";
import { Button } from "reactstrap";
import PropTypes from 'prop-types';

export default function PlotLine({ stage, setStage, squareAreas, generateBestLine }) {

  return (
    (stage === 2)
      ? <Button outline color='primary' onClick={() => setStage(3)}>Plot Your Guess</Button>
      : <div>
          <p>Sum Squares: {squareAreas.reduce((a, b) => a + b, 0).toFixed(2)}</p>
          <Button outline color="info" onClick={() => generateBestLine()}>Reveal the Least Squares Line</Button>
        </div>
  );
}

PlotLine.propTypes = {
  stage: PropTypes.number.isRequired,
  setStage: PropTypes.func.isRequired,
  squareAreas: PropTypes.arrayOf(PropTypes.number).isRequired,
  generateBestLine: PropTypes.func.isRequired,
}
