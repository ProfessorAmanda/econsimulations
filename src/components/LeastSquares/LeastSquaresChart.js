import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import { abs } from 'mathjs';
import PropTypes from 'prop-types';
import { dataObjectArrayType } from '../../lib/types.js'
import { Form } from 'react-bootstrap';
require('highcharts/modules/annotations')(Highcharts);

export default function LeastSquaresChart({ points, addPoint, linePoints, setSquareAreas }) {
  const [enableClick, setEnableClick] = useState(false);
  const [myChart, setMyChart] = useState({
    tooltip: {
      headerFormat: '',
      pointFormat: 'x: {point.x:.2f}<br/>y: {point.y:.2f}',
    },
    title: {
      text: ''
    },
    xAxis: {
      title: {
        enabled: false
      },
      min: 0,
      max: 20,
      tickInterval: 2
    },
    yAxis: {
      title: {
        enabled: false
      },
      min: 0,
      max: 20,
      tickInterval: 2
    },
    legend: {
      enabled: false
    }
  });

  useEffect(() => {
    // generate pairs for the corresponding points to create squares
    const pairs = [];
    linePoints.forEach((p1) => {
      points.forEach((p2) => {
        if (p1.x === p2.x) {
          pairs.push({ p1, p2 })
        }
      });
    });

    const areas = pairs.map(({ p1, p2 }) => abs(p1.y - p2.y) ** 2);
    setSquareAreas(areas);

    // returns an array of points to create a square shape in highcharts
    const buildSquare = (p1, p2) => {
      const dist = abs(p1.y - p2.y);
      const lowestPt = p1.y < p2.y ? p1 : p2;
      return [{
        x: lowestPt.x,
        y: lowestPt.y,
        xAxis: 0,
        yAxis: 0
      }, {
        x: lowestPt.x + dist,
        y: lowestPt.y,
        xAxis: 0,
        yAxis: 0
      }, {
        x: lowestPt.x + dist,
        y: lowestPt.y + dist,
        xAxis: 0,
        yAxis: 0
      }, {
        x: lowestPt.x,
        y: lowestPt.y + dist,
        xAxis: 0,
        yAxis: 0
      }, {
        x: lowestPt.x,
        y: lowestPt.y,
        xAxis: 0,
        yAxis: 0
      }];
    }

    // create the actual square objects for highcharts
    const squares = pairs.map(({ p1, p2 }) => (
      {
        dashStyle: 'solid',
        fill: 'rgba(255, 255, 255, 0)',
        points: buildSquare(p1, p2),
        type: 'path'
      })
    );

    const newChart = {
      chart: {
        animation: false,
        type: 'line',
        plotBorderColor: '#000000',
        plotBorderWidth: 1,
        margin: [100, 100, 100, 100],
        width: 600,
        height: 600,
        events: {
          click: (e) => {
            if (enableClick) {
              const x = e.xAxis[0].value;
              const y = e.yAxis[0].value;
              addPoint({x, y});
            }
          }
        }
      },
      caption: {
        align: 'center',
        y: 0,
        style: {fontSize: 15},
        text: enableClick ? 'Click on the chart to add a data point. <br/> Notice how it affects the slope and intercept of the estimated line.' : '',
        verticalAlign: 'bottom'
      },
      series: [
        {
          type: 'scatter',
          marker: {
            radius: 5,
          },
          data: points,
        },
        {
          type: 'line',
          data: linePoints,
          marker: {
            enabled: true,
            fillColor: 'orange'
          },
          label: {
            enabled: false
          }
        }
      ],
      annotations: [{
        draggable: '',
        shapes: squares
      }]
    }

    setMyChart(newChart);
  }, [points, addPoint, linePoints, setSquareAreas, enableClick]);

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={myChart}/>
      <Form.Check
        checked={enableClick}
        inline
        type="checkbox"
        label="Enable Click for New Points"
        onClick={() => setEnableClick(!enableClick)}
      />
    </>
  );
}

LeastSquaresChart.propTypes = {
  points: dataObjectArrayType.isRequired,
  addPoint: PropTypes.func.isRequired,
  linePoints: dataObjectArrayType.isRequired,
  setSquareAreas: PropTypes.func.isRequired
}
