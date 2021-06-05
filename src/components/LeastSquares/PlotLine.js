import React from "react";
import { Button } from "reactstrap";

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