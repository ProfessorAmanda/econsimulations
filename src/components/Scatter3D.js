import { useState } from 'react';
import Plot from 'react-plotly.js';
import SelectorButtonGroup from './SelectorButtonGroup.js';

export default function Scatter3D() {
  const [display, setDisplay] = useState('3D');

  const data = [
    [1, 6, 5], [8, 7, 9], [1, 3, 4], [4, 6, 8], [5, 7, 7], [6, 9, 6],
    [7, 0, 5], [2, 3, 3], [3, 9, 8], [3, 6, 5], [4, 9, 4], [2, 3, 3],
    [6, 9, 9], [0, 7, 0], [7, 7, 9], [7, 2, 9], [0, 6, 2], [4, 6, 7],
    [3, 7, 7], [0, 1, 7], [2, 8, 6], [2, 3, 7], [6, 4, 8], [3, 5, 9],
    [7, 9, 5], [3, 1, 7], [4, 4, 2], [3, 6, 2], [3, 1, 6], [6, 8, 5]
  ];

  const x = [];
  const y = [];
  const z = [];
  data.forEach(([a, b, c]) => {
    x.push(a);
    y.push(b);
    z.push(c);
  })

  const data1 = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  ];

  return (
    <div style={{border: '1px solid black', height: 702, width: 802, margin: 'auto', padding: 0}}>
      <Plot
        data={[
          {
            x: (display === 'yz') ? y : x,
            y: ((display === 'xy') || (display === '3D')) ? y : z,
            z,
            type: (display === '3D') ? 'scatter3d' : 'scatter',
            mode: 'markers',
            marker: {color: 'red'},
            hoverinfo: 'x+y+z'
          },
          // {
          //   z: data1,
          //   type: 'surface',
          //   showscale: false,
          //   opacity: 0.5,
          //   hoverinfo: 'x+y+z',
          //   colorscale: [[0, 'rgb(0,0,0)'], [1, 'rgb(0,0,0)']]
          // }
        ]}
        layout={{
          width: 800,
          height: 700,
          title: 'Fancy Plot',
          margin: {
            l: 0,
            r: 0,
            t: 80,
            b: 0
          }
        }}
      />
      <SelectorButtonGroup options={['3D', 'xy', 'xz', 'yz']} select={setDisplay} selected={display}/>
    </div>
  )
}
