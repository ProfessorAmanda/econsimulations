import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default function DataTable({ data, headers, height, setSelected, setRowColor }) {
  const clickRow = (row) => {
    if (setSelected) {
      setSelected(row)
    }
  }

  const determineRowColor = (object) => {
    if (setRowColor) {
      return setRowColor(object)
    }
    return undefined
  }

  const dataTable = data.map((object) => (
    <tr
      style={{ backgroundColor: determineRowColor(object) }}
      key={object.id}
      onClick={() => clickRow(object)}
    >
      {_.values(headers).map(
        (name) => <td key={name}>{!isNaN(object[name]) ? _.round(object[name], 2) : object[name].toUpperCase()}</td>
      )}
    </tr>
  ));

  dataTable.reverse();

  return (
    <div className="data-table-container" style={{height: `${height || 250}px`}}>
      <Table hover={!!setSelected} striped className="data-table" style={{cursor: setSelected ? 'pointer' : 'default'}}>
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

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({id: PropTypes.number.isRequired})).isRequired,
  headers: PropTypes.object.isRequired,
  height: PropTypes.number,
  setSelected: PropTypes.func,
  setRowColor: PropTypes.func  // takes the current object as a parameter and returns a color or undefined
}
