
import React, { Component } from 'react';
import MultivariateNormal from 'multivariate-normal';
import Highcharts from 'highcharts';
import {  Container, Row, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Button } from 'reactstrap';

import ChartContainerJoint from './ChartContainerJoint.js';
//const quantile = require("distributions-exponential-quantile");
//const cdf = require( 'distributions-normal-cdf' );



class JointSimple2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            meanVector : [70,70],
            covMatrix : [],
            sharkSD : 1,
            iceSD : 1,
            covariance : 0,
            covariance_shown : 0,
            correlation: 0,
            correlation_shown:0,
            sharkSeries:[],
            iceSeries:[],
            jointSeries:[],
            stage:0


        }

    }

// componentDidUpdate() {
//         this.generate();
//     }

 render() {
        return(
            <Container fluid>
                <Row>
                    <Col>
                    <div>
                        <p> Choose the Mean and Standard Deviation for Parent Height </p>
                        <InputGroup>
                        <InputGroupAddon addonType='prepend'>Parent Height Mean:</InputGroupAddon>
                        <Input type="number" className="slider" min={60} max={80} step={1} value={70} onChange={(event) => {this.setState({meanVector: [parseFloat(event.target.value)].concat(this.state.meanVector[1]),
                        stage:0})}} />
                    </InputGroup>
                    <br />
                    <br />

                    <InputGroup>
                        <InputGroupAddon addonType='prepend'>Parent Height SD:</InputGroupAddon>
                        <Input type="number" className="slider" min={1} max={6} value={this.state.sharkSD} onChange={(event) => {
                          // const variance = parseFloat(event.target.value)*parseFloat(event.target.value);
                          var sd = parseFloat(event.target.value);
                          if (sd > 6) {
                            sd = 6;
                        }
                          // const temp = [[variance,copy[0][1]],copy[1]];
                          this.setState({sharkSD : event.target.value});
                          this.setState({covariance : parseFloat(this.state.correlation*(event.target.value * this.state.iceSD))});
                          this.setState({stage:0});
                          //this.setState({sharkSD : sd});
                          //this.setState({covMatrix: [[parseFloat(event.target.value)].concat(this.state.covMatrix[0][1]), this.state.covMatrix[1]]});
                        }} />
                    </InputGroup>

                    </div>
                    </Col>

                    <Col>
                    <div>

                      <p> Choose the Mean and Standard Deviation for Child Height </p>
                  <InputGroup>
                      <InputGroupAddon addonType='prepend'>Child Height Mean: </InputGroupAddon>
                      <Input type="number" min={60} max={80} step={1} value={70} onChange={(event) => {this.setState({meanVector: [parseFloat(event.target.value)].concat(this.state.meanVector[1]),
                     stage:0}
                 )}} />
                  </InputGroup>

                  <br />
                  <br />

                  <InputGroup>
                      <InputGroupAddon addonType='prepend'>Child Height SD: </InputGroupAddon>
                      <Input type="number" className="slider" min={1} max={6} value={this.state.iceSD} onChange={(event) => {
                          //const copy = this.state.covMatrix;
                          this.setState({stage:0});
                          this.setState({iceSD:event.target.value});
                          this.setState({covariance : parseFloat(this.state.correlation*(event.target.value * this.state.sharkSD))});

                      }} />
                  </InputGroup>
                  </div>

                    </Col>

                    <Col>
                    <div>
                    <p> Set the Correlation</p>
                    <br/>
                    <div>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                      </InputGroupAddon>
                      <Input
                          value={this.state.correlation_shown}
                          type="range"
                          className="custom-range"
                          step={0.1}
                          min={-1}
                          max={1}
                          onChange={(event) => {
                              this.setState({stage:0});

                              // let tempCorr= event.target.value;
                              // console.log('event.target.value');
                              // console.log(event.target.value);
                              if (event.target.value== 1){
                                  this.setState({correlation : parseFloat(0.999999)});
                              }else if (event.target.value==-1){
                                  this.setState({correlation : parseFloat(-0.999999)});
                              }else{
                                  this.setState({correlation : event.target.value});
                              }


                              this.setState({correlation_shown : parseFloat(event.target.value)});
                              //this.setState({correlation : parseFloat(tempCorr)});
                              //this.setState({covariance : parseFloat(this.state.correlation*(this.state.sharkSD * this.state.iceSD))});
                              this.setState({covariance_shown : parseFloat(event.target.value*(this.state.sharkSD * this.state.iceSD))});
                              // const copy = this.state.covMatrix;
                              //
                              // const temp = [[copy[0][0],this.state.covariance],[this.state.covariance,copy[1][1]]];
                              // console.log("corr check");
                              // console.log(this.state.correlation);
                              // this.setState({covMatrix : temp});
                            }}
                      />

                      <InputGroupAddon addonType="append">
                      <InputGroupText>{this.state.correlation_shown}</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    </div>
                    </div>
                    <p> Covariance </p>
                    <InputGroupText>
                      {Math.round((this.state.correlation_shown*(this.state.sharkSD * this.state.iceSD))*1000)/1000}
                    </InputGroupText>
                  </Col>
                </Row>

                <Row className='Center'>
                    <Button outline color='primary' style={{margin:"3vh"}} onClick={()=>{this.setState({stage : 1});this.generate()}}> Generate! </Button>
                </Row>

                 {this.state.stage===1 && <ChartContainerJoint
                    sharkSeries0={this.state.sharkSeries}
                    iceSeries0={this.state.iceSeries}
                    jointSeries0={this.state.jointSeries}
                />}

            </Container>

        )
    }


    async generate() {


        console.log("Matrix Check");
        console.log(this.state.covMatrix);
        //this.setState({covariance : temp});
        //this.setState({covMatrix: [[parseFloat(event.target.value)].concat(this.state.covMatrix[0][1]), this.state.covMatrix[1]]});


        const temp = [[Math.pow(this.state.sharkSD,2), this.state.covariance],[this.state.covariance,Math.pow(this.state.iceSD,2) ]];
        this.setState({covMatrix : temp});

        console.log("Matrix Check2");
        console.log(this.state.covMatrix);

        // lets you sample from distribution
        const distribution = MultivariateNormal(this.state.meanVector, this.state.covMatrix);
        const series = {data : [], color: '#1F242A ', name:"Population"}
        // samples 1000
        for (let i = 0; i < 500; i++){
            series.data.push(distribution.sample());
        }
        const sharkSeries = {data : [], color: '#006D75', name:""}
        const sharkDict = {};
        const rawSharks = series.data.map((s) => {return s[0]});
        // raw sharks is the sample without the double array thing
        //const sharkCDF = cdf(rawSharks);
        //const sharkExp = quantile(sharkCDF);
        // for (let s of sharkCDF) {
        //     sharkPois.push();
        // }

        // building dictionary for histogram
        for (const i of rawSharks){
            const sharkFreq = Math.round(i * 100) / 100;
            if (sharkDict[sharkFreq]){
                sharkDict[sharkFreq]++;
            } else {
                sharkDict[sharkFreq] = 1;
            }
        }
        for (const i in sharkDict){
            for (let j = 0; j < sharkDict[i]; j++){
                sharkSeries.data.push([parseFloat(i), j+1]);
            }
        }

     this.setState({sharkSeries : sharkSeries});

        console.log("[sharkSeries]");
        console.log([sharkSeries]);



     //      Highcharts.chart('sharks', {
     //        chart: {
     //            type: 'scatter',
     //            zoomtype: 'xy'
     //        },
     //        title: {
     //            text: 'Parent Height'
     //        },
     //        xAxis: {
     //
     //            tickPositions: [40, 60, 80, 100],
     //            title : {
     //                enabled: true,
     //                text: 'Parent Height (inches)'
     //            },
     //            startOnTick: true,
     //            endOnTick: true,
     //            showLastLabel: true
     //        },
     //        yAxis: {
     //            max: 7,
     //            lineWidth: 1,
     //            tickInterval: 1,
     //            title: {
     //                text: 'Count'
     //            }
     //        },
     //
     //        tooltip: {
     //          enabled: false
     //        },
     //        plotOptions: {
     //            scatter: {
     //     marker: {
     //        radius: 3,
     //        states: {
     //           hover: {
     //              enabled: true,
     //              radiusPlus:10,
     //              lineColor: 'rgb(100,100,100)'
     //
     //           }
     //        }
     //     },
     //     states: {
     //        hover: {
     //           marker: {
     //              enabled: false
     //           }
     //        }
     //     }
     // },
     //        },
     //
     //        legend: {
     //          enabled: false
     //        },
     //        series: [sharkSeries]
     //    });

        const icecreamSeries = {data : [], color: '#ff0000', name:"Ice Cream Cones bought per Day"}
        const icecreamDict = {};
        for (const i of series.data){
            const icecreamFreq = Math.round(i[1] * 100) / 100;
            if (icecreamDict[icecreamFreq]){
                icecreamDict[icecreamFreq]++;
            } else {
                icecreamDict[icecreamFreq] = 1;
            }
        }
        for (const i in icecreamDict){
            for (let j = 0; j < icecreamDict[i]; j++){
                icecreamSeries.data.push([parseFloat(i), j+1]);
            }
        }
        await this.setState({iceSeries : icecreamSeries});
     //    Highcharts.chart('icecream', {
     //        chart: {
     //            type: 'scatter',
     //            zoomtype: 'xy'
     //        },
     //        title: {
     //            text: 'Child Height'
     //        },
     //        xAxis: {
     //            tickPositions: [40, 60, 80, 100],
     //            title : {
     //                enabled: true,
     //                text: 'Child Height (inches)'
     //            },
     //            startOnTick: true,
     //            endOnTick: true,
     //            showLastLabel: true
     //        },
     //        yAxis: {
     //            max: 7,
     //            lineWidth: 1,
     //            tickInterval: 1,
     //            title: {
     //                text: 'Count'
     //            }
     //        },
     //
     //        plotOptions: {
     //            scatter: {
     //     marker: {
     //        radius: 3,
     //        states: {
     //           hover: {
     //              enabled: true,
     //              radiusPlus:10,
     //              lineColor: 'rgb(100,100,100)'
     //
     //           }
     //        }
     //     },
     //     states: {
     //        hover: {
     //           marker: {
     //              enabled: false
     //           }
     //        }
     //     }
     // },
     //        },
     //        tooltip: {
     //          enabled: false
     //        },
     //
     //        legend: {
     //          enabled: false
     //        },
     //
     //        series: [icecreamSeries]
     //    });
        //console.log([jointSeries]);
        const jointSeries = {data : [], color: '#FF9655', name:"Parent Height vs Child Height (inches)"}
        for (const i in rawSharks){
            jointSeries.data.push([Math.round(rawSharks[i] * 100) / 100, Math.round(series.data[i][1] * 100) / 100]);
        }

        var that = this;
        console.log([jointSeries]);

        await this.setState({jointSeries : jointSeries});
     //    await Highcharts.chart('joint', {
     //        chart: {
     //            type: 'scatter',
     //            zoomtype: 'xy'
     //        },
     //        title: {
     //            text: 'Parent Height vs Child Height'
     //        },
     //        xAxis: {
     //            tickPositions: [40, 60, 80, 100],
     //            title : {
     //                enabled: true,
     //                text: 'Parent Height (inches)'
     //            },
     //            startOnTick: true,
     //            endOnTick: true,
     //            showLastLabel: true
     //        },
     //        yAxis: {
     //            title: {
     //                text: 'Child Height (inches)'
     //            }
     //        },
     //
     //        tooltip: {
     //          enabled: false
     //        },
     //
     //        legend: {
     //          enabled: false
     //        },
     //
     //        plotOptions: {
     //            scatter: {
     //     marker: {
     //        radius: 3,
     //        states: {
     //           hover: {
     //              enabled: true,
     //              radiusPlus:10,
     //              lineColor: 'rgb(100,100,100)'
     //
     //           }
     //        }
     //     },
     //     states: {
     //        hover: {
     //           marker: {
     //              enabled: false
     //           }
     //        }
     //     }
     // },
     //
     //            series: {
     //                allowPointSelect: true,
     //                point: {
     //                    events: {
     //                        mouseOver: function() {
     //                            const x = that.state.sharkSeries[0].data.find(p => p.x === this.x);
     //                            x.onMouseOver();
     //                            const y = that.state.iceSeries[0].data.find(p => p.x === this.y);
     //                            y.onMouseOver();
     //                        }
     //                    }
     //                }
     //            }
     //        },
     //        series: [jointSeries]
     //    });
    await this.setState({stage : 1});

    }

    findMax(){
      const firstSD = this.state.sharkSD;
      const secondSD = this.state.iceSD;
      if(firstSD === 1 && secondSD === 1){
        return 1;
      }
      return firstSD * secondSD;
    }
}
export default JointSimple2
