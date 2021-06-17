import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Alert } from "reactstrap";
import _ from "lodash";

export default function ConfidenceIntervalsChart({ sampleMeans }) {
  const [lowerConf, setLowerConf] = useState(0);
  const [upperConf, setUpperConf] = useState(1);

  const point = sampleMeans[sampleMeans.length - 1];

  let label;
  if (point) {
    label = (point[1] >= lowerConf && point[1] <= upperConf);
  }

  return (
    <div>
      {
        point &&
        <Alert color={label ? "success" : "danger"} className="Center">
          Sample number {sampleMeans.length} has a mean of {point[1].toFixed(2)}, with 95% CI ({_.round(lowerConf, 2)}, {_.round(upperConf, 2)}). CI contains the true mean? {label}
        </Alert>
      }
      <p>placeholder chart!</p>
    </div>
  );
}
