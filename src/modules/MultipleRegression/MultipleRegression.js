import { useEffect, useState } from 'react';
import Scatter3D from './Scatter3D';
import _ from 'lodash';
import SelectorButtonGroup from '@/components/SelectorButtonGroup';
import { fetchCSV } from '@/lib/data-utils';
import { MULTIPLE_REGRESSION_VALUES } from '@/lib/constants';

export default function MultipleRegression() {
  const [data, setData] = useState([]);
  const [dataSet, setDataSet] = useState('California Schools Data');

  useEffect(() => {
    const parseData = (results) => {
      setData(results.map((object) => _.values(object).map((val) => +val)));
    }

    fetchCSV(`/public/data/${MULTIPLE_REGRESSION_VALUES[dataSet].path}`, parseData);
  }, [dataSet]);

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
