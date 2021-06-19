import React from "react";
import { Table } from "reactstrap";

export default function SamplesTable({ samples, setSelected }) {

  console.log(samples.length);
  console.log(samples.filter((s) => s.id));

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
          {samples.map((sampleObject) =>
            <tr
              style={{
                backgroundColor: sampleObject.label ? "rgba(23, 161, 80, 0.233)" : "rgba(161, 23, 23, 0.233)",
                cursor: "pointer"
              }}
              key={sampleObject.id}
              onClick={() => setSelected(sampleObject)}
            >
              <td>{sampleObject.id}</td>
              <td>{sampleObject.size}</td>
              <td>{sampleObject.mean}</td>
              <td>{sampleObject.lowerConf}</td>
              <td>{sampleObject.upperConf}</td>
              <td>{sampleObject.confidenceLevel}</td>
              <td>{sampleObject.distribution.toUpperCase()}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}