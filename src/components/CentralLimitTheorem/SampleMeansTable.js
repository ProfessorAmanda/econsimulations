/*

  Displays a table of sample means

*/

import React from 'react';
import { Table } from 'reactstrap';
import { round } from "mathjs";
import { popArrayType } from '../../lib/types.js';

export default function SampleMeansTable({ sampleMeans }) {
  const tableBody = sampleMeans.map((mean, index) =>
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{mean[0]}</td>
      <td>{round(mean[1] * 10) / 10}</td>
    </tr>
  );

  return (
    <Table hover className="PopTable">
      <thead>
        <tr>
          <th>Sample</th>
          <th>Size</th>
          <th>Mean</th>
        </tr>
      </thead>
      <tbody>
        {sampleMeans && tableBody}
      </tbody>
  </Table>
  );
}
SampleMeansTable.propTypes = {
  sampleMeans: popArrayType.isRequired,
}
