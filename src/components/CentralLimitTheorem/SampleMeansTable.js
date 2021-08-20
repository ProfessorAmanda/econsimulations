import { Table } from 'react-bootstrap';
import { sampleMeanArrayType } from '../../lib/types.js';
import _ from 'lodash';

export default function SampleMeansTable({ sampleMeans }) {
  const tableBody = sampleMeans.map(({ size, mean, id }) => (
    <tr key={id}>
      <td>{id + 1}</td>
      <td>{size}</td>
      <td>{_.round(mean, 2)}</td>
    </tr>
  ));

  return (
    <Table hover className="pop-table">
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
  sampleMeans: sampleMeanArrayType.isRequired,
}
