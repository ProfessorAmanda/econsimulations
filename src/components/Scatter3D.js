import { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/highcharts-3d')(Highcharts);

export default function Scatter3D() {
  const [alpha, setAlpha] = useState(10);
  const [beta, setBeta] = useState(30);
  const [posX, setPosX] = useState();
  const [posY, setPosY] = useState();
  const [dragging, setDragging] = useState(false);

  const data = [
    [1, 6, 5], [8, 7, 9], [1, 3, 4], [4, 6, 8], [5, 7, 7], [6, 9, 6],
    [7, 0, 5], [2, 3, 3], [3, 9, 8], [3, 6, 5], [4, 9, 4], [2, 3, 3],
    [6, 9, 9], [0, 7, 0], [7, 7, 9], [7, 2, 9], [0, 6, 2], [4, 6, 7],
    [3, 7, 7], [0, 1, 7], [2, 8, 6], [2, 3, 7], [6, 4, 8], [3, 5, 9],
    [7, 9, 5], [3, 1, 7], [4, 4, 2], [3, 6, 2], [3, 1, 6], [6, 8, 5],
    [6, 6, 7], [4, 1, 1], [7, 2, 7], [7, 7, 0], [8, 8, 9], [9, 4, 1],
    [8, 3, 4], [9, 8, 9], [3, 5, 3], [0, 2, 4], [6, 0, 2], [2, 1, 3],
    [5, 8, 9], [2, 1, 1], [9, 7, 6], [3, 0, 2], [9, 9, 0], [3, 4, 8],
    [2, 6, 1], [8, 9, 2], [7, 6, 5], [6, 3, 1], [9, 3, 1], [8, 9, 3],
    [9, 1, 0], [3, 8, 7], [8, 0, 0], [4, 9, 7], [8, 6, 2], [4, 3, 0],
    [2, 3, 5], [9, 1, 4], [1, 1, 4], [6, 0, 2], [6, 1, 6], [3, 8, 8],
    [8, 8, 7], [5, 5, 0], [3, 9, 6], [5, 4, 3], [6, 8, 3], [0, 1, 5],
    [6, 7, 3], [8, 3, 2], [3, 8, 3], [2, 1, 6], [4, 6, 7], [8, 9, 9],
    [5, 4, 2], [6, 1, 3], [6, 9, 5], [4, 8, 2], [9, 7, 4], [5, 4, 2],
    [9, 6, 1], [2, 7, 3], [4, 5, 4], [6, 8, 1], [3, 4, 0], [2, 2, 6],
    [5, 1, 2], [9, 9, 7], [6, 9, 9], [8, 4, 3], [4, 1, 7], [6, 2, 5],
    [0, 4, 9], [3, 5, 9], [6, 9, 1], [1, 9, 2]
  ];

  const chartOptions = {
    chart: {
      margin: 100,
      type: 'scatter3d',
      animation: false,
      options3d: {
        axisLabelPosition: 'auto',
        enabled: true,
        alpha,
        beta,
        depth: 250,
        viewDistance: 25,
        fitToPlot: false,
        frame: {
          bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
          back: { size: 1, color: 'rgba(0,0,0,0.04)' },
          side: { size: 1, color: 'rgba(0,0,0,0.06)' }
        }
      }
    },
    title: {
      text: 'Draggable box'
    },
    subtitle: {
      text: 'Click and drag the plot area to rotate in space'
    },
    plotOptions: {
      scatter: {
        width: 10,
        height: 10,
        depth: 10
      }
    },
    yAxis: {
      min: 0,
      max: 10,
      title: null
    },
    xAxis: {
      min: 0,
      max: 10,
      gridLineWidth: 1
    },
    zAxis: {
      min: 0,
      max: 10,
      showFirstLabel: false
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: 'Data',
        colorByPoint: true,
        data
      },
      {
        name: 'Poly',
        type: 'polygon',
        opacity: 0.5,
        data: [{
            x: 1,
            y: 1,
            z: 10,
            name: 'Point1',
            color: '#00FF00'
          }, {
            x: 1,
            y: 8,
            z: 10,
            name: 'Point2',
            color: '#FF00FF'
          }, {
            x: 3,
            y: 5,
            z: 10,
            name: 'Point3',
            color: '#FF00FF'
          }
        ]
      }
      // {
      //   type: 'polygon',
      //   marker: false,
      //   color: 'rgba(0,0,0,0.04)',
      //   data: [[0, 5, 5], [1, 0, 5], [5, 2, 5], [3, 10, 5]].map(([x, y, z]) => ({x, y, z})),
      //   zIndex: -1
      // }
    ]
  }

  const dragStart = (e) => {
    setPosX(e.screenX);
    setPosY(e.screenY);
    setDragging(true);
  }

  const drag = (e) => {
    if (dragging) {
      setAlpha(alpha + (e.screenY - posY) / 50);
      setBeta(beta + (posX - e.screenX) / 50)
    }
  }

  return (
    <div
      onMouseDown={(e) => dragStart(e)}
      onMouseMove={(e) => drag(e)}
      onMouseUp={() => setDragging(false)}
    >
      <HighchartsReact className="container" highcharts={Highcharts} options={chartOptions}/>
    </div>
  )
}
