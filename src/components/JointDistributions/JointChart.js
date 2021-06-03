import React, { useEffect, useState } from 'react';
import '../../styles/dark-unica.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import 'highcharts/modules/annotations';
import '../../boost.js';

export default function JointChart({ data, title, xLabel, yLabel, color}) {
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
        showLastLabel: true,
        crosshair: true
      },
      yAxis: {
        tickPositions: [40, 60, 80, 100],
        title: {
          text: yLabel
        },
        crosshair: true
      },
      tooltip: {
        headerFormat: "",
        pointFormat: `${xLabel}: {point.x:.2f}<br/>${yLabel}: {point.y:.2f}`,
        hideDelay: 100
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 3,
            states: {
              hover: {
                enabled: true,
                radiusPlus:10,
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
        series: {
          allowPointSelect: true,
          // point: {  // TODO: do we need this mouse-over functionality
          //     events: {
          //         mouseOver: function() {
          //             //console.log("this.sharks");
          //             //console.log(this.sharks);
          //         const x = that.sharks.series[0].data.find(p => p.x === this.x);
          //         if(x){x.onMouseOver();}
          //         const y = that.icecream.series[0].data.find(p => p.x === this.y);
          //         if(y){
          //             y.onMouseOver();
          //         }
          //         }
          //     }
          // }
        }
      },
      series: [{data: data, color: color}]
    }

    setMyChart(newChart);
  }, [data, title, xLabel, yLabel, color]);

  return (
    <HighchartsReact highcharts={Highcharts} options={myChart}/>
  );
}
