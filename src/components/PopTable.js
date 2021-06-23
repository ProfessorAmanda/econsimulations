import React from "react";
import { Table } from "reactstrap";
import PropTypes from "prop-types";
import { dataArrayType } from "../lib/types";

export default function PopTable({ popArray, sampleIDs, popShape }) {
  const rows = popArray.map(({ x, id }) => {
    return (
      <tr key={id} style={{ backgroundColor: sampleIDs.includes(id) ? "#747EF2" : undefined }}>
        <td>{popArray.length - id}</td>
        <td>{x}</td>
      </tr>
    )}
  );

  const values = {
    Uniform: { xmaxval: 74, xminval: 56, ymaxval: 30, title: "Lottery Outcome", yLabel: "Gain/Loss", xLabel: "Participant" },
    Normal: { xmaxval: 84, xminval: 66, ymaxval: 30, title: "Milk Production", yLabel: "Gallons", xLabel: "Cow" },
    Exponential: { xmaxval: 350, xminval: 0, ymaxval: 10, title: "Duration of Telemarketer Call", yLabel: "Seconds", xLabel: "Call" },
    "Chi-Squared": {xmaxval: 25, xminval: 0, ymaxval: 20, title: "Money Spent on Lunch", yLabel: "Dollars", xLabel: "Person" },
    Mystery: {xmaxval: 25, xminval: 0, ymaxval: 20, title: "Female Height", yLabel: "Height (in)", xLabel: "Female" }
  };

  return (
    <Table striped className="PopTable">
      <thead>
        <tr>
          <th>{values[popShape].xLabel}</th>
          <th>{values[popShape].yLabel}</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
  );
}

PopTable.propTypes = {
  popArray: dataArrayType.isRequired,
  sampleIDs: PropTypes.arrayOf(PropTypes.number).isRequired,
  popShape: PropTypes.string.isRequired
}
