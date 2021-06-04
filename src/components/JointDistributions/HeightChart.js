import React, { useEffect, useState } from 'react';
import '../../styles/dark-unica.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import 'highcharts/modules/annotations';
import '../../boost.js';

export default function HeightChart({ heightData, title, xLabel, yLabel, color, maxY }) {
  const [myChart, setMyChart] = useState();

  useEffect(() => {
    const newChart = {
      chart: {
        type: 'scatter',
        zoomtype: 'xy'
      },
      title: {
        text: title
      },
      xAxis: {
        tickPositions: [40, 60, 80, 100],
        title : {
            enabled: true,
            text: xLabel
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
      },
      yAxis: {
        max: maxY,
        lineWidth: 1,
        tickInterval: 1,
        title: {
          text: yLabel
        }
      },
      tooltip: {
        headerFormat: "",
        pointFormat: `${xLabel}: {point.x:.2f}<br/>${yLabel}: {point.y}`,
        hideDelay: 100
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 3,
            states: {
              hover: {
                enabled: true,
                radiusPlus: 10,
                lineColor: 'rgb(100,100,100)'
              }
            }
          },
          states: {
            hover: {
              marker: {
                enabled: false
              }
            }
          }
        },
      },
      legend: {
        enabled: false
      },
      series: [{data: heightData, color: color}]
    }

    setMyChart(newChart);
  }, [heightData, title, xLabel, yLabel, color, maxY]);

  return (
    <HighchartsReact highcharts={Highcharts} options={myChart}/>
  );
}
