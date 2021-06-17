import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Alert } from "reactstrap";
import _ from "lodash";

export default function ConfidenceIntervalsChart({ confidenceLevel, samples }) {
  const sample = samples[samples.length - 1];

  return (
    <div>
      {
        sample &&
        <Alert color={sample.label ? "success" : "danger"} className="Center">
          Sample number {samples.length} has a mean of {sample.mean.toFixed(2)}, with {confidenceLevel}% CI ({_.round(sample.lowerConf, 2)}, {_.round(sample.upperConf, 2)}). CI contains the true mean? {sample.label.toString()}
        </Alert>
      }
      <p>placeholder chart!</p>
    </div>
  );
}
