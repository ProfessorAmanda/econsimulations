import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default function SelectableDataTable({ data, setSelected, selected, headers }) {
  const dataTable = data.map((object) => (
    <tr
      style={{ backgroundColor: (selected && (object.id === selected.id)) ? '#747EF2' : undefined, cursor: 'pointer' }}
      key={object.id}
      onClick={() => setSelected(object)}
    >
      {_.values(headers).map((name) => <td key={name}>{object[name]}</td>)}
    </tr>
  ));

  dataTable.reverse();

  return (
    <div className="ols-table-container">
      <Table hover striped className="ci-table">
        <thead>
          <tr>
            {_.keys(headers).map((name) => <th key={name}>{name}</th>)}
          </tr>
        </thead>
        <tbody>
          {dataTable}
        </tbody>
      </Table>
    </div>
  )
}

SelectableDataTable.propTypes = {
  data: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
  selected: PropTypes.shape({id: PropTypes.number.isRequired}),
  headers: PropTypes.object.isRequired
}
