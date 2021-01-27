import React, { useState, useEffect } from 'react';
import '../dark-unica.css';
import Highcharts from 'highcharts';
import 'highcharts/modules/annotations';
import { Alert, Container, Col, Row } from 'reactstrap';

import '../boost.js';
import math from 'mathjs';

require("highcharts/modules/annotations")(Highcharts);

const ChartContainerJoint =({sharkSeries0,iceSeries0,jointSeries0})=> {
    const [sharkSeries, setSharkSeries]=useState(sharkSeries0);
    const [iceSeries, setIceSeries]=useState(iceSeries0);
    const [jointSeries, setJointSeries]=useState(jointSeries);



    useEffect(() => {
        console.log("inheritence check");
        console.log(sharkSeries);
        console.log(sharkSeries0);




        Highcharts.chart('sharks', {
          chart: {
              type: 'scatter',
              zoomtype: 'xy'
          },
          title: {
              text: 'Parent Height'
          },
          xAxis: {

              tickPositions: [40, 60, 80, 100],
              title : {
                  enabled: true,
                  text: 'Parent Height (inches)'
              },
              startOnTick: true,
              endOnTick: true,
              showLastLabel: true
          },
          yAxis: {
              max: 7,
              lineWidth: 1,
              tickInterval: 1,
              title: {
                  text: 'Count'
              }
          },

          tooltip: {
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
          },

          legend: {
            enabled: false
          },
          series: [sharkSeries0]
      });

      Highcharts.chart('icecream', {
          chart: {
              type: 'scatter',
              zoomtype: 'xy'
          },
          title: {
              text: 'Child Height'
          },
          xAxis: {
              tickPositions: [40, 60, 80, 100],
              title : {
                  enabled: true,
                  text: 'Child Height (inches)'
              },
              startOnTick: true,
              endOnTick: true,
              showLastLabel: true
          },
          yAxis: {
              max: 7,
              lineWidth: 1,
              tickInterval: 1,
              title: {
                  text: 'Count'
              }
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
          },
          tooltip: {
            enabled: false
          },

          legend: {
            enabled: false
          },

            series: [iceSeries0]
      });

    Highcharts.chart('joint', {
          chart: {
              type: 'scatter',
              zoomtype: 'xy'
          },
          title: {
              text: 'Parent Height vs Child Height'
          },
          xAxis: {
              tickPositions: [40, 60, 80, 100],
              title : {
                  enabled: true,
                  text: 'Parent Height (inches)'
              },
              startOnTick: true,
              endOnTick: true,
              showLastLabel: true
          },
          yAxis: {
              title: {
                  text: 'Child Height (inches)'
              }
          },

          tooltip: {
            enabled: false
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
                  point: {
                      events: {
                          mouseOver: function() {
                              const x = sharkSeries[0].data.find(p => p.x === this.x);
                              x.onMouseOver();
                              const y = iceSeries[0].data.find(p => p.x === this.y);
                              y.onMouseOver();
                          }
                      }
                  }
              }
          },
           series: [jointSeries0]
      });



  });




    return (
      <div>
           <Container fluid style={{marginBottom: "2vh"}}>
           <Row>
                   <Col>
                       <span className="Center" id="sharks" />
                   </Col>

                   <Col>
                       <span className="Center" id="icecream" />
                   </Col>

                   <Col>
                       <span className="Center" id="joint"/>
                   </Col>
               </Row>
            </Container>
      </div>
    )

}

export default ChartContainerJoint
