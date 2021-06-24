/*

  Displays a table of sample means

*/

import React from 'react';
import { Table } from 'reactstrap';
import { dataObjectArrayType } from '../../lib/types.js';
import _ from 'lodash';

export default function SampleMeansTable({ sampleMeans }) {
  const tableBody = sampleMeans.map(({x: size, y: mean}, index) =>
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{size}</td>
      <td>{_.round(mean, 2)}</td>
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
  sampleMeans: dataObjectArrayType.isRequired,
}
