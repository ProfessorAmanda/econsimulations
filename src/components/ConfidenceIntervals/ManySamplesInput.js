import React, { useState } from "react";
import { Button, Input, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { popArrayType } from "../../lib/types";

export default function ManySamplesInput({ population, addSamples }) {
  const [numberResamples, setNumberResamples] = useState(0);
  const [resampleSize, setResampleSize] = useState(0);

  return (
    <div style={{ padding: 50 }}>
      <Alert color="primary" style={{width: "50%", margin: 'auto'}}>
        Simulate drawing many many samples
      </Alert>
      <br/>
      <span> Sample Size: </span>
      <Input
        style={{width: "40%", margin: "auto"}}
        min={1}
        type="number"
        placeholder="Sample Size:"
        onChange={(event) => setResampleSize(event.target.value)}
        value={resampleSize}
      />
      <br/>
      <span> Number of Replications: </span>
      <Input
        style={{width: "40%", margin: "auto"}}
        min={1}
        type="number"
        placeholder="Number of Replications:"
        onChange={(event) => setNumberResamples(event.target.value)}
        value={numberResamples}
      />
      <br/>
      <Button
        onClick={() => addSamples(resampleSize, numberResamples)}
        disabled={(resampleSize < 1) || (resampleSize > population.length) || (numberResamples < 1)}
      >
        Run
      </Button>
      <Button onClick={() => addSamples()}>Clear</Button>
    </div>
  );
}

ManySamplesInput.propTypes = {
  population: popArrayType.isRequired,
  addSamples: PropTypes.func.isRequired,
}
