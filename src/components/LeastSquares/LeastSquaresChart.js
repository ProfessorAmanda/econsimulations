/*

  Displays a HighCharts scatterplot for the Least Squares data points

*/
import { useEffect, useState } from 'react';
import '../../styles/dark-unica.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import 'highcharts/modules/annotations';
import { abs } from "mathjs";
import PropTypes from 'prop-types';
import { dataObjectArrayType } from "../../lib/types.js"

export default function LeastSquaresChart({ points, linePoints, setSquareAreas }) {
  const [myChart, setMyChart] = useState({
    title: {
      text: ""
    },
    legend: {
      enabled: false
    },
    chart: {
      type: 'line',
      plotBorderColor: '#000000',
      plotBorderWidth: 1,
      margin: [100, 100, 100, 100],
      width: 600,
      height: 600
    },
    tooltip: {
      headerFormat: "",
      pointFormat: "x: {point.x:.2f}<br/>y: {point.y:.2f}",
      hideDelay: 100
    },
    xAxis: {
      title : {
        enabled: false
      },
      min: 0,
      max: 20,
      tickInterval: 2
    },
    yAxis: {
      title : {
        enabled: false
      },
      min: 0,
      max: 20,
      tickInterval: 2
    }
  });

  // returns an array of points to create a square shape in highcharts
  const buildSquare = (p1, p2) => {
    const dist = abs(p1.y - p2.y);
    const lowestPt = p1.y < p2.y ? p1 : p2;
    return [{
        x: lowestPt.x,
        y: lowestPt.y
      }, {
        x: lowestPt.x + dist,
        y: lowestPt.y
      }, {
        x: lowestPt.x + dist,
        y: lowestPt.y + dist
      }, {
        x: lowestPt.x,
        y: lowestPt.y + dist
      }, {
        x: lowestPt.x,
        y: lowestPt.y
      }
    ];
  }

  useEffect(() => {
    // generate pairs for the corresponding points to create squares
    const pairs = [];
    linePoints.forEach((p1) => {
      points.forEach((p2) => {
        if (p1.x === p2.x) {
          pairs.push({p1: p1, p2: p2})
        }
      });
    });

    const areas = pairs.map(({p1, p2}) => abs(p1.y - p2.y) ** 2);
    setSquareAreas(areas);

    const newChart = {
      series: [
        {
          type: "scatter",
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
        },
        ...pairs.map(({p1, p2}) => (
          {
            type: "scatter",
            animation: false,
            data: buildSquare(p1, p2),
            enableMouseTracking: false,
            lineWidth: 1,
            color: "#888888",
            marker: {
              enabled: false
            },
            label: {
              enabled: false
            },
            zIndex: -5
          })
        )
      ],
    }

    setMyChart(newChart);
  }, [points, linePoints, setSquareAreas]);

  return (
    <HighchartsReact highcharts={Highcharts} options={myChart}/>
  );
}

LeastSquaresChart.propTypes = {
  points: dataObjectArrayType.isRequired,
  linePoints: dataObjectArrayType.isRequired,
  setSquareAreas: PropTypes.func.isRequired
}
