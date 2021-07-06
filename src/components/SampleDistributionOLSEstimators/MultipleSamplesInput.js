import { useState } from "react";
import { Button, Input, Alert } from "reactstrap";
import PropTypes from "prop-types";

export default function MultipleSamplesInput({ populationSize, addSamples }) {
  const [numberResamples, setNumberResamples] = useState(0);
  const [resampleSize, setResampleSize] = useState(0);

  return (
    <div>
      <Alert color="primary">
        <p>Simulate drawing many many samples</p>
        <span>Sample Size:</span>
        <Input
          type="number"
          style={{width: "50%", margin: "auto"}}
          placeholder="Sample Size:"
          min={1}
          value={resampleSize}
          onChange={(event) => setResampleSize(event.target.value)}
        />
        <br/>
        <span>Number of Replications:</span>
        <Input
          style={{width: "50%", margin: "auto"}}
          min={1}
          type="number"
          placeholder="Replications:"
          onChange={(event) => setNumberResamples(event.target.value)}
          value={numberResamples}
        />
        <br/>
        <Button
          onClick={() => addSamples(resampleSize, numberResamples)}
          disabled={(resampleSize < 1) || (resampleSize > populationSize) || (numberResamples < 1)}
        >
          Run
        </Button>
        <Button onClick={() => addSamples()}>Clear</Button>
      </Alert>
    </div>
  );
}

MultipleSamplesInput.propTypes = {
  populationSize: PropTypes.number.isRequired,
  addSamples: PropTypes.func.isRequired,
}
