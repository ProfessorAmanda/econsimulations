import { useState } from 'react';
import Plotly from 'plotly.js';
import Plot from 'react-plotly.js';
import jsonData from '../../data/3d_scatter_data.json';
import _ from 'lodash';
import { column, inv, matrix, max, min, multiply, transpose } from 'mathjs';
import regression from 'regression';

export default function Scatter3D() {
  const [data] = useState(jsonData.map(({test_score, str, pct_el}) => [pct_el, str, test_score]));
  const [display, setDisplay] = useState('3D');
  const [showBestFit, setShowBestFit] = useState(false);

  const [x, y, z] = _.unzip(data);

  const plotData = [
    {
      x: (display === 'YZ') ? y : x,
      y: ((display === 'XY') || (display === '3D')) ? y : z,
      z,
      type: (display === '3D') ? 'scatter3d' : 'scatter',
      mode: 'markers',
      marker: {
        size: (display === '3D') ? 8 : 12,
        color: 'red',
        line: {
          color: 'black',
          width: (display === '3D') ? 1 : 0.5
        }
      },
      hoverinfo: 'x+y+z'
    }
  ];

  if (display === '3D' && showBestFit) {
    const A = matrix(_.zip(_.range(0, x.length).map(() => 1), x, y));

    const theta = multiply(inv(multiply(transpose(A), A)), multiply(transpose(A), matrix(z)));

    const equation = (x, y) => {
      return column([theta], 0) + column([theta], 1) * x + column([theta], 2) * y
    }

    // surface plot must be of the form:
    // [
    //  [z, z, z, z, z, ...],  <-- x
    //  [z, z, z, z, z, ...],
    //  ...
    // ]
    //     ^y

    // fill from 0 to min(y) with lists of undefined so the surface isn't displayed in this space
    const bestFitPlane = _.range(0, _.round(min(y) - 1)).map(() => _.range(0, _.round(max(x) + 1)).map(() => undefined));

    for (let yi = _.round(min(y)); yi <= _.round(max(y) + 1); yi++) {
      const temp = []
      for (let xi = _.round(min(x)); xi <= _.round(max(x) + 1); xi++) {
        temp.push(equation(xi, yi));
      }
      bestFitPlane.push(temp)
    }

    plotData.push({
      z: bestFitPlane,
      type: 'surface',
      showscale: false,
      opacity: 0.5,
      hoverinfo: 'x+y+z',
      colorscale: [[0, 'rgb(0,0,0)'], [1, 'rgb(0,0,0)']],
      visible: (display === '3D')
    });

  } else if (showBestFit) {
    const displayPointsMap = {
      'XY': _.zip(x, y),
      'YZ': _.zip(y, z),
      'XZ': _.zip(x, z)
    }

    const { equation: [slope, intercept] } = regression.linear(displayPointsMap[display]);
    const [lineX, lineY] = _.unzip(displayPointsMap[display].map((point) => ([point[0], (point[0] * slope) + intercept ])));

    plotData.push({
      x: lineX,
      y: lineY,
      mode: 'lines',
      name: '',
      marker: {color: 'black'},
    });
  }

  return (
    <div style={{border: '1px solid black', height: 702, width: 802, margin: 'auto', padding: 0}}>
      <Plot
        data={plotData}
        layout={{
          width: 800,
          height: 700,
          title: 'Fancy Plot',
          margin: {
            l: 80,
            r: 80,
            t: 80,
            b: 80
          },
          showlegend: false,
          xaxis: {
            title: (display === 'YZ') ? 'Student-Teacher Ratio' : 'Percent English Learners'
          },
          yaxis: {
            title: (display === 'XY') ? 'Student-Teacher Ratio' : 'Test Score'
          },
          scene: {
            xaxis: {
              title: {
                text: 'Percent English Learners'
              },
              range: [0, 100]
            },
            yaxis: {
              title: {
                text: 'Student-Teacher Ratio'
              },
              range: [10, 30]
            },
            zaxis: {
              title: {
                text: 'Test Score'
              },
              range: [600, 720]
            },
            camera: {
              up: {
                x: 0,
                y: 1,
                z: 0
              },
              eye: {
                x: 0,
                y: 0.1,
                z: 2.1
              }
            }
          }
        }}
        config={{
          scrollZoom: true,
          displayModeBar: true,
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
            )),
            {
              name: `Show best fit ${(display === '3D' ? 'plane' : 'line')}`,
              icon: {
                'width': 875,
                'height': 1000,
                'path': 'm1 787l0-875 875 0 0 875-875 0z m687-500l-187 0 0-187-125 0 0 187-188 0 0 125 188 0 0 187 125 0 0-187 187 0 0-125z',
                'transform': 'matrix(1 0 0 -1 0 850)'
              },
              click: () => setShowBestFit(true)
            },
            {
              name: `Hide best fit ${(display === '3D' ? 'plane' : 'line')}`,
              icon: {
                'width': 875,
                'height': 1000,
                'path': 'm0 788l0-876 875 0 0 876-875 0z m688-500l-500 0 0 125 500 0 0-125z',
                'transform': 'matrix(1 0 0 -1 0 850)'
              },
              click: () => setShowBestFit(false)
            }
          ]
        }}
      />
    </div>
  )
}
