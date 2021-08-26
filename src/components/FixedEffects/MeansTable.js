import { mean } from 'mathjs';
import { Table } from 'react-bootstrap';
import { fixedEffectsDataType } from '../../lib/types';

export default function MeansTable({ data }) {

  const getMean = (id, dim, index) => {
    if (isNaN(index)) {
      return mean(data[id][dim]).toFixed(2)
    }
    return mean(data[1][dim][index], data[2][dim][index]).toFixed(2);
  };

  return (
    <Table>
      <thead>
        <tr>
          <th/>
          <th>Entity 1</th>
          <th>Entity 2</th>
          <th>Period 1</th>
          <th>Period 2</th>
          <th>Period 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Mean of X</th>
          <td>{getMean(1, 'x')}</td>
          <td>{getMean(2, 'x')}</td>
          <td>{getMean(1, 'x', 0)}</td>
          <td>{getMean(1, 'x', 1)}</td>
          <td>{getMean(1, 'x', 2)}</td>
        </tr>
        <tr>
          <th>Mean of Y</th>
          <td>{getMean(1, 'y')}</td>
          <td>{getMean(2, 'y')}</td>
          <td>{getMean(1, 'y', 0)}</td>
          <td>{getMean(1, 'y', 1)}</td>
          <td>{getMean(1, 'y', 2)}</td>
        </tr>
      </tbody>
    </Table>
  )
}

MeansTable.propTypes = {
  data: fixedEffectsDataType.isRequired
}
