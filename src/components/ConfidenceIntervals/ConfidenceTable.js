import React from "react";
import { Table } from "reactstrap";

export default function SamplesTableCI({ samples }) {
  return (
    <div style={{ height: 500, overflow: "auto", marginTop: -50 }}>
      <Table hover className="ciTable">
        <thead>
          <tr>
            <th>Sample</th>
            <th>Size</th>
            <th>Mean</th>
            <th>Lower Bound for CI</th>
            <th>Upper Bound for CI</th>
            <th>Confidence Level</th>
            <th>Distribution</th>
          </tr>
        </thead>
        <tbody>
          {samples.map(({ size, mean, lowerConf, upperConf, confidenceLevel, distribution, label }, index) =>
            <tr style={{ backgroundColor: label ? "rgba(23, 161, 80, 0.233)" : "rgba(161, 23, 23, 0.233)"} }>
              <td>{index + 1}</td>
              <td>{size}</td>
              <td>{mean}</td>
              <td>{lowerConf}</td>
              <td>{upperConf}</td>
              <td>{confidenceLevel}</td>
              <td>{distribution.toUpperCase()}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}
