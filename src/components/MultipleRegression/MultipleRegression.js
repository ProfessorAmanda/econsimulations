import { useState } from 'react';
import jsonData from '../../data/3d_scatter_data.json';
import Scatter3D from './Scatter3D';
import _ from 'lodash';

export default function MultipleRegression() {
  const [data] = useState(jsonData.map(({test_score, str, pct_el}) => [str, pct_el, test_score]));

  const [x, y, z] = _.unzip(data);

  return (
    <Scatter3D x={x} y={y} z={z}/>
  )
}
