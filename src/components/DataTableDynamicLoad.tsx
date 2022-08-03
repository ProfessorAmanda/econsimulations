import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from '../styles/DataTable.module.css';
import BaseTable, { Column } from 'react-base-table';
import 'react-base-table/styles.css';

interface DataTableDynamicLoadProps {
  data: Record<string, any>[],
  headers: {title: string, dataKey: string, width: number}[],
  height?: number,
}

export default function DataTableDynamicLoad({ data, headers, height }: DataTableDynamicLoadProps) {

  const converted = data.map((obj) => {
    const newObj = {...obj};
    _.keys(newObj).forEach((key) => {
      if (typeof newObj[key] === 'number') {
        newObj[key] = _.round(newObj[key], 2);
      }
    });
    return newObj;
  }).reverse();

  const columns = headers.map((header) => (
    <Column style={{justifyContent: 'center'}} key={header.dataKey} title={header.title} dataKey={header.dataKey} width={header.width} />
  ));

  return (
    <div className={styles.dataTableDynamicContainer}>
      <BaseTable style={{ fontSize: 16 }} data={converted} width={headers.reduce(
        (acc, header) => acc + header.width, 0)} height={height}>
        {columns}
      </BaseTable>
    </div>
  )
}

DataTableDynamicLoad.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })).isRequired,
  headers: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string.isRequired, dataKey: PropTypes.string.isRequired, width: PropTypes.number.isRequired })).isRequired,
  height: PropTypes.number
}
