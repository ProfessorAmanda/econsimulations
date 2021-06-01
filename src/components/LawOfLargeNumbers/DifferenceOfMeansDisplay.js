import React from "react";
import { differenceOfMeans } from "../../lib/stats-utils";
import { Alert } from 'reactstrap';

export default function DifferenceOfMeans({ popMean, sampleMean }) {
  return (
    <Alert color="success" style={{ padding: 0, marginTop: '1em' }}>
      Sample Mean: {sampleMean || ''}
      <br/>
      Difference of Means: {differenceOfMeans(popMean, sampleMean)}
    </Alert>
  );
}
