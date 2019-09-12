import React, { Component } from 'react';
import MultivariateNormal from 'multivariate-normal';
import Highcharts from 'highcharts';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';
const quantile = require("distributions-exponential-quantile");
const cdf = require( 'distributions-normal-cdf' );

function ParentInput(props){
  return(
    <div>
        <p> Choose the Mean and Standard Deviation for Parent Height </p>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>Parent Height Mean:</InputGroupAddon>
        <Input type="number" className="slider" min={60} max={80} step={1} value={props.sharkMean} onChange={(event) => {props.saveMean(event)}} />
    </InputGroup>

    <br />

    <InputGroup>
        <InputGroupAddon addonType='prepend'>Parent Height SD:</InputGroupAddon>
        <Input type="number" className="slider" min={1} max={7} value={props.sharkSD} onChange={(event) => {
          // const variance = parseFloat(event.target.value)*parseFloat(event.target.value);
          var sd = parseFloat(event.target.value);
          if (sd > 7) {
            sd = 7;
        }
          // const temp = [[variance,copy[0][1]],copy[1]];
          props.saveSD(sd);
          //this.setState({sharkSD : sd});
          //this.setState({covMatrix: [[parseFloat(event.target.value)].concat(this.state.covMatrix[0][1]), this.state.covMatrix[1]]});
        }} />
    </InputGroup>

    </div>
  );
}

function ChildInput(props){
  return(
      <div>

        <p> Choose the Mean and Standard Deviation for Child Height </p>
    <InputGroup>
        <InputGroupAddon addonType='prepend'>Child Height Mean: </InputGroupAddon>
        <Input type="number" min={60} max={80} step={1} value={props.iceMean} onChange={(event) => {props.saveMean(event)}} />
    </InputGroup>

    <br />

    <InputGroup>
        <InputGroupAddon addonType='prepend'>Child Height SD: </InputGroupAddon>
        <Input type="number" className="slider" min={1} max={7} value={props.iceSD} onChange={(event) => {
            //const copy = this.state.covMatrix;
            var sd = parseFloat(event.target.value);
            if (sd > 7) {
                sd = 7;
            }
          //const temp = [copy[0],[copy[1][0],variance]];
          props.saveSD(sd);
          //this.setState({covMatrix : temp});
          //console.log(this.state.covMatrix);
          //this.setState({covMatrix: [this.state.covMatrix[0], [parseFloat(event.target.value)].concat(this.state.covMatrix[1][1]) ]})
        }} />
    </InputGroup>
    </div>
  );
}

class JointSimple extends Component {
    constructor(props){
        super(props);
        this.state = {
            meanVector : [70,70],
            covMatrix : [[1,1], [1,1]],
            sharkSD : 1,
            iceSD : 1,
            covariance : 1
        }
    }

    render() {

        return(
            <Container fluid>
                <Row>
                    <Col>
                        <ParentInput cov={this.state.covariance} sharkMean={this.state.meanVector[0]} sharkSD={this.state.sharkSD} saveMean={(event) => {this.setState({meanVector: [parseFloat(event.target.value)].concat(this.state.meanVector[1])})}}
                        saveSD={(sd) => {
                            const copy = this.state.covMatrix;
                            const variance = Math.pow(sd,2);
                            const temp = [[variance,copy[0][1]],copy[1]];
                            this.setState({sharkSD : sd});
                            this.setState({covMatrix : temp});
                        }}/>
                    </Col>

                    <Col>
                        <ChildInput cov={this.state.covariance} iceMean={this.state.meanVector[1]} iceSD={this.state.iceSD} saveMean={(event) => {this.setState({meanVector: [this.state.meanVector[0]].concat(parseFloat(event.target.value))})}}
                        saveSD={(sd) => {
                        const copy = this.state.covMatrix;
                        const variance = Math.pow(sd,2);
                        const temp = [copy[0],[copy[1][0],variance]];
                        this.setState({iceSD : sd});
                        this.setState({covMatrix : temp});
                        }}/>

                    </Col>

                    <Col>
                    <div>
                    <p> Set the Covariance</p>
                    <div>
                        <input
                        value={this.state.covariance}
                        type="range"
                        step=".1"
                        min="-1"
                        max="1"
                        onChange={(event) => {
                            this.setState({covariance : parseFloat(event.target.value)});
                            const copy = this.state.covMatrix;
                            const temp = [[copy[0][0],parseFloat(event.target.value)],[parseFloat(event.target.value),copy[1][1]]];
                            this.setState({covMatrix : temp});
                          }}
                    />
                    <p>{this.state.covariance}</p>
                    </div>
                    {/*<div>
                        <Input value={this.state.covariance} type="number" className="slider" step={.1} min={-this.findMax()}
                          max={this.findMax()} onChange={(event) => {
                            this.setState({covariance : parseFloat(event.target.value)});
                            const copy = this.state.covMatrix;
                            const temp = [[copy[0][0],parseFloat(event.target.value)],[parseFloat(event.target.value),copy[1][1]]];
                            this.setState({covMatrix : temp});
                          }}
                    //onChange={(event) => {this.setState({covMatrix: [[parseFloat(event.target.value)].concat(this.state.covMatrix[0][1]), this.state.covMatrix[1]]});}}
                    />
                    </div>*/}

                    {/*<div>
                        <input type="number" value={Math.pow(this.state.sharkSD,2)}
                        //onChange={(event) => {this.setState({covMatrix: [[parseFloat(event.target.value)].concat(this.state.covMatrix[0][1]), this.state.covMatrix[1]]});}}
                        />
                        <input type="number" placeholder="test" value={this.state.covMatrix[0][1]} onChange={(event) => {
                          const copy = this.state.covMatrix;
                          const temp = [[copy[0][0],parseFloat(event.target.value)],copy[1]];
                          this.setState({covMatrix : temp});
                          //this.setState({covMatrix: [[this.state.covMatrix[0][0]].concat(parseFloat(event.target.value)),  this.state.covMatrix[1]]})
                        }} />
                    </div>*/}
                    {/*<div>
                        <input type="number" value={this.state.covMatrix[1][0]} onChange={(event) => {this.setState({covMatrix: [this.state.covMatrix[0], [parseFloat(event.target.value)].concat(this.state.covMatrix[1][1]) ]})}} />
                        <input type="number" value={Math.pow(this.state.iceSD,2)}
                        //onChange={(event) => {this.setState({covMatrix: [this.state.covMatrix[0], [this.state.covMatrix[1][0]].concat(parseFloat(event.target.value))]})}}
                        />
                    </div>*/}
                </div>

                    </Col>
                </Row>

                <Row className='Center'>
                    <Button outline color='primary' style={{margin:"3vh"}} onClick={()=>{this.generate()}}> Generate! </Button>
                </Row>

                <Row>
                    <Col>
                        <span className="Center" id="sharks"/>
                    </Col>

                    <Col>
                        <span className="Center" id="icecream"/>
                    </Col>

                    <Col>
                        <span className="Center" id="joint"/>
                    </Col>
                </Row>




                {/*<div>
                    <h4> Set the Mean Vector </h4>
                    <input type="number" onChange={(event) => {this.setState({meanVector: [parseFloat(event.target.value)].concat(this.state.meanVector[1])})}} />
                    <input type="number" onChange={(event) => {this.setState({meanVector: [this.state.meanVector[0]].concat(parseFloat(event.target.value))})}} />
                </div>*/}

            </Container>

        )
    }


    generate() {
        // const meanVector = [1, 10];

        // covariance between dimensions. This examples makes the first and third
        // dimensions highly correlated, and the second dimension independent.
        // const covarianceMatrix = [
        //     [ 1.0, 1.0],
        //     [ 1.0, 1.0]
        // ];
        // console.log(this.state);

        // Check for non symmetric Matrix
        if (this.state.covMatrix[0][1] !== this.state.covMatrix[1][0]) {
          //alert("these gotta be the same yo");
          return;
        }

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
        const sharkCDF = cdf(rawSharks);
        const sharkExp = quantile(sharkCDF);
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

        const MINX = 40;
        const MAXX = 120;

        this.sharks = Highcharts.chart('sharks', {
            chart: {
                type: 'scatter',
                zoomtype: 'xy'
            },
            title: {
                text: 'Parent Height'
            },
            xAxis: {
                min: MINX,
                max: MAXX,
                title : {
                    enabled: true,
                    text: 'Parent Height (inches)'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                max: 12,
                title: {
                    text: 'Count'
                }
            },

            tooltip: {
              enabled: false
            },

            legend: {
              enabled: false
            },
            series: [sharkSeries]
        });

        const icecreamSeries = {data : [], color: '#e8bd68', name:"Ice Cream Cones bought per Day"}
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
        this.icecream = Highcharts.chart('icecream', {
            chart: {
                type: 'scatter',
                zoomtype: 'xy'
            },
            title: {
                text: 'Child Height'
            },
            xAxis: {
                min: MINX,
                max: MAXX,
                title : {
                    enabled: true,
                    text: 'Child Height (inches)'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                max: 12,
                title: {
                    text: 'Count'
                }
            },
            tooltip: {
              enabled: false
            },

            legend: {
              enabled: false
            },

            series: [icecreamSeries]
        });

        const jointSeries = {data : [], color: '#EA7200', name:"Parent Height vs Child Height (inches)"}
        for (const i in rawSharks){
            jointSeries.data.push([Math.round(rawSharks[i] * 100) / 100, Math.round(series.data[i][1] * 100) / 100]);
        }

        var that = this;

        Highcharts.chart('joint', {
            chart: {
                type: 'scatter',
                zoomtype: 'xy'
            },
            title: {
                text: 'Parent Height vs Child Height'
            },
            xAxis: {
                min: MINX,
                max: MAXX,
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
                series: {
                    allowPointSelect: true,
                    point: {
                        events: {
                            mouseOver: function() {
                                const x = that.sharks.series[0].data.find(p => p.x === this.x);
                                x.onMouseOver();
                                const y = that.icecream.series[0].data.find(p => p.x === this.y);
                                y.onMouseOver();
                            }
                        }
                    }
                }
            },
            series: [jointSeries]
        });
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
export default JointSimple
