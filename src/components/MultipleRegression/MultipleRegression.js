import { useEffect, useState } from 'react';
import Scatter3D from './Scatter3D';
import _ from 'lodash';
import SelectorButtonGroup from '../SelectorButtonGroup.js';
import { fetchCsv } from '../../lib/data-utils';
import { MULTIPLE_REGRESSION_VALUES } from '../../lib/constants';

export default function MultipleRegression() {
  const [data, setData] = useState([]);
  const [dataSet, setDataSet] = useState('California Schools Data');

  useEffect(() => {
    const getData = async () => {
      const csvData = await fetchCsv(`${process.env.PUBLIC_URL}/data/${MULTIPLE_REGRESSION_VALUES[dataSet].path}`);
      setData(csvData.map((object) => _.values(object).map((val) => +val)));
    }
    getData();
  }, [dataSet])

  const [z, x, y] = _.unzip(data);

  return (
    <>
      <SelectorButtonGroup
        options={['California Schools Data', 'CPS Earnings Data', 'CPS Log Earnings Data']}
        select={setDataSet}
        selected={dataSet}
      />
      <br/>
      <br/>
      <Scatter3D x={x || []} y={y || []} z={z || []} dataSet={dataSet}/>
    </>
  )
}
