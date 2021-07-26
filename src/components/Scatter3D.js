import { useState } from 'react';
import Plotly from 'plotly.js';
import Plot from 'react-plotly.js';

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
            x: (display === 'YZ') ? y : x,
            y: ((display === 'XY') || (display === '3D')) ? y : z,
            z,
            type: (display === '3D') ? 'scatter3d' : 'scatter',
            mode: 'markers',
            marker: {color: 'red'},
            hoverinfo: 'x+y+z'
          },
          (display === '3D') ?
          {
            z: data1,
            type: 'surface',
            showscale: false,
            opacity: 0.5,
            hoverinfo: 'x+y+z',
            colorscale: [[0, 'rgb(0,0,0)'], [1, 'rgb(0,0,0)']],
            visible: (display === '3D')
          } : {}
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
        config={{
          modeBarButtonsToRemove: ['toImage', 'resetCameraLastSave3d', 'select2d', 'lasso2d', 'autoScale2d', 'pan2d', 'pan3d', 'zoom2d', 'zoom3d', 'zoomIn2d', 'zoomOut2d', 'orbitRotation', 'tableRotation'],
          modeBarButtonsToAdd: [
            {
              name: 'Display 3D',
              icon: {
                width: 1000,
                height: 1000,
                path: 'm833 5l-17 108v41l-130-65 130-66c0 0 0 38 0 39 0-1 36-14 39-25 4-15-6-22-16-30-15-12-39-16-56-20-90-22-187-23-279-23-261 0-341 34-353 59 3 60 228 110 228 110-140-8-351-35-351-116 0-120 293-142 474-142 155 0 477 22 477 142 0 50-74 79-163 96z m-374 94c-58-5-99-21-99-40 0-24 65-43 144-43 79 0 143 19 143 43 0 19-42 34-98 40v216h87l-132 135-133-135h88v-216z m167 515h-136v1c16 16 31 34 46 52l84 109v54h-230v-71h124v-1c-16-17-28-32-44-51l-89-114v-51h245v72z',
                transform: 'matrix(1 0 0 -1 0 850)'
              },
              click: () => setDisplay('3D')
            },
            ...['XY', 'XZ', 'YZ'].map((dims) => (
              {
                name: `Display ${dims}`,
                icon: Plotly.Icons.pan,
                click: () => setDisplay(dims)
              }
            ))
          ]
        }}
      />
    </div>
  )
}
