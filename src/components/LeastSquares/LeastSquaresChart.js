import React, { useEffect, useState } from 'react';
import '../../styles/dark-unica.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import 'highcharts/modules/annotations';
import '../../boost.js';

export default function LeastSquaresChart({ points, linePoints }) {
  const [myChart, setMyChart] = useState();

  const generatePairs = () => {
    const pairs = [];
    linePoints.forEach((p1) => {
      points.forEach((p2) => {
        if (p1.x === p2.x) {
          pairs.push({p1: p1, p2: p2})
        }
      });
    });
    return pairs;
  }

  const buildSquare = (p1, p2) => {
    const dist = Math.abs(p1.y - p2.y);
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
      }
    ];
  }

  const generateSquares = (pairs) => {
    return pairs.map(({p1, p2}) => {
      return {
        dashStyle: "solid",
        fill: "rgba(255, 255, 255, 0)",
        points: buildSquare(p1, p2),
        type: 'path'
      }
    });
  }


  useEffect(() => {
    const pairs = generatePairs();
    const squares = generateSquares(pairs);

    const newChart = {
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
        margin : [100,100,100,100],
        width  : 600,
        height : 600
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
      },
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
        }
      ],
      annotations: [{
        draggable: '',
        shapes: squares
      }]
    }

    setMyChart(newChart);
  }, [points, linePoints]);

  return (
    <HighchartsReact highcharts={Highcharts} options={myChart}/>
  );
}
