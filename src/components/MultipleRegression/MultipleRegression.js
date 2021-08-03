import { useEffect, useState } from 'react';
import Scatter3D from './Scatter3D';
import _ from 'lodash';
import { csv } from 'd3-fetch';
import SelectorButtonGroup from '../SelectorButtonGroup.js';

export default function MultipleRegression() {
  const [data, setData] = useState([]);
  const [dataSet, setDataSet] = useState('1');

  useEffect(() => {
    const getData = async () => {
      const dataSetPaths = {
        1: 'Class_size_Test_Scores_3vars.csv',
        2: 'Small_CPS_earnings_data.csv'
      }
      const csvData = await csv(`${process.env.PUBLIC_URL}/data/${dataSetPaths[dataSet]}`);
      setData(csvData);
    }
    getData();
  }, [dataSet])

  const [z, x, y] = _.unzip(data.map((object) => _.values(object).map((val) => +val)));

  return (
    <>
      <SelectorButtonGroup options={['1', '2']} select={setDataSet} selected={dataSet}/>
      <Scatter3D x={x || []} y={y || []} z={z || []} dataSet={dataSet}/>
    </>
  )
}
