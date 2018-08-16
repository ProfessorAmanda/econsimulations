import React, { Component } from 'react';
import styled from 'styled-components';
import MultivariateNormal from 'multivariate-normal';
import Highcharts from 'highcharts';
const quantile = require("distributions-exponential-quantile");
const cdf = require( 'distributions-normal-cdf' );



function ParentInput(props){
  return(
    <div>
        <h4> Choose the Mean and Standard Deviation for Parent Height </h4>
        <label >Parent Height Mean </label>
        <input type="number" min={50} max={80} step="any" value={props.sharkMean} onChange={(event) => {props.saveMean(event)}} />
        <label >Parent Height SD </label>
        <input type="number" min={1} max={7} value={props.sharkSD} onChange={(event) => {
          // const variance = parseFloat(event.target.value)*parseFloat(event.target.value);
          const sd = parseFloat(event.target.value);
          // const temp = [[variance,copy[0][1]],copy[1]];
          props.saveSD(sd);
          //this.setState({sharkSD : sd});
          //this.setState({covMatrix: [[parseFloat(event.target.value)].concat(this.state.covMatrix[0][1]), this.state.covMatrix[1]]});
        }} />
    </div>
  );
}

function ChildInput(props){
  return(
    <div>
        <h4> Choose the Mean and Standard Deviation for Child Height </h4>
        <label >Child Height Mean </label>
        <input type="number" step="any" value={props.iceMean} onChange={(event) => {props.saveMean(event)}} />
        <label >Child Height SD </label>
        <input type="number" min={1} max={7} value={props.iceSD} onChange={(event) => {
          //const copy = this.state.covMatrix;
          const sd = parseFloat(event.target.value);
          //const temp = [copy[0],[copy[1][0],variance]];
          props.saveSD(sd);
          //this.setState({covMatrix : temp});
          //console.log(this.state.covMatrix);
          //this.setState({covMatrix: [this.state.covMatrix[0], [parseFloat(event.target.value)].concat(this.state.covMatrix[1][1]) ]})
        }} />
    </div>
  );
}

class JointSimple extends Component {
    constructor(props){
        super(props);
        this.state = {
            meanVector : [55,55],
            covMatrix : [[1,1], [1,1]],
            sharkSD : 1,
            iceSD : 1,
            covariance : 1
        }
    }

    render() {

        return(
            <div>
                <ParentInput sharkMean={this.state.meanVector[0]} sharkSD={this.state.sharkSD} saveMean={(event) => {this.setState({meanVector: [parseFloat(event.target.value)].concat(this.state.meanVector[1])})}}
                  saveSD={(sd) => {
                    const copy = this.state.covMatrix;
                    const variance = Math.pow(sd,2);
                    const temp = [[variance,copy[0][1]],copy[1]];
                    this.setState({sharkSD : sd});
                    this.setState({covMatrix : temp});
                }}/>
                <ChildInput iceMean={this.state.meanVector[1]} iceSD={this.state.iceSD} saveMean={(event) => {this.setState({meanVector: [this.state.meanVector[0]].concat(parseFloat(event.target.value))})}}
                    saveSD={(sd) => {
                      const copy = this.state.covMatrix;
                      const variance = Math.pow(sd,2);
                      const temp = [copy[0],[copy[1][0],variance]];
                      this.setState({iceSD : sd});
                      this.setState({covMatrix : temp});
                    }}/>
                {/*<div>
                    <h4> Set the Mean Vector </h4>
                    <input type="number" onChange={(event) => {this.setState({meanVector: [parseFloat(event.target.value)].concat(this.state.meanVector[1])})}} />
                    <input type="number" onChange={(event) => {this.setState({meanVector: [this.state.meanVector[0]].concat(parseFloat(event.target.value))})}} />
                </div>*/}
                <div>
                    <h4> Set the Covariance</h4>
                    <div>
                        <input value={this.state.covariance} type="number" step="any" min={-this.findMax()}
                          max={this.findMax()} onChange={(event) => {
                            this.setState({covariance : parseFloat(event.target.value)});
                            const copy = this.state.covMatrix;
                            const temp = [[copy[0][0],parseFloat(event.target.value)],[parseFloat(event.target.value),copy[1][1]]];
                            this.setState({covMatrix : temp});
                          }}
                    //onChange={(event) => {this.setState({covMatrix: [[parseFloat(event.target.value)].concat(this.state.covMatrix[0][1]), this.state.covMatrix[1]]});}}
                    />
                    </div>
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
                <button style={{margin:"10px"}} onClick={()=>{this.generate()}}> Generate! </button>
                <div>
                    <span style={{width:"30%", float: "left"}} id="sharks"/>
                    <span style={{width:"30%", float: "left"}} id="icecream"/>
                    <span style={{width:"30%", float: "left"}} id="joint"/>
                </div>
            </div>

        )
    }


    generate() {
        var meanVector = [1, 10];

        // covariance between dimensions. This examples makes the first and third
        // dimensions highly correlated, and the second dimension independent.
        var covarianceMatrix = [
            [ 1.0, 1.0],
            [ 1.0, 1.0]
        ];
        console.log(this.state);

        // Check for non symmetric Matrix
        if(this.state.covMatrix[0][1] != this.state.covMatrix[1][0]){
          //alert("these gotta be the same yo");
          return;
        }
        console.log(this.state.covMatrix[0][1]);
        console.log(this.state.covMatrix[1][0]);

        // lets you sample from distribution
        var distribution = MultivariateNormal(this.state.meanVector, this.state.covMatrix);
        let series = {data : [], color: '#1F242A ', name:"Population"}
        // samples 1000
        for (let i = 0; i < 1000; i++){
            series.data.push(distribution.sample());
        }
        let sharkSeries = {data : [], color: '#006D75', name:"Shark Attacks per Day"}
        let sharkDict = {};
        let rawSharks = series.data.map((s) => {return s[0]});
        // raw sharks is the sample without the double array thing
        let sharkCDF = cdf(rawSharks);
        let sharkExp = quantile(sharkCDF);
        // for (let s of sharkCDF) {
        //     sharkPois.push();
        // }

        // building dictionary for histogram
        for (let i of rawSharks){
            const sharkFreq = Math.round(i * 100) / 100;
            if (sharkDict[sharkFreq]){
                sharkDict[sharkFreq]++;
            } else {
                sharkDict[sharkFreq] = 1;
            }
        }
        for (let i in sharkDict){
            for (let j = 0; j < sharkDict[i]; j++){
                sharkSeries.data.push([parseFloat(i), j+1]);
            }
        }
        Highcharts.chart('sharks', {
            chart: {
                type: 'scatter',
                zoomtype: 'xy'
            },
            title: {
                text: 'Parent Height'
            },
            xAxis: {
                min: 30,
                max: 70,
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
                    text: 'Count'
                }
            },
            series: [sharkSeries]
        });

        let icecreamSeries = {data : [], color: '#e8bd68', name:"Ice Cream Cones bought per Day"}
        let icecreamDict = {};
        for (let i of series.data){
            const icecreamFreq = Math.round(i[1] * 100) / 100;
            if (icecreamDict[icecreamFreq]){
                icecreamDict[icecreamFreq]++;
            } else {
                icecreamDict[icecreamFreq] = 1;
            }
        }
        for (let i in icecreamDict){
            for (let j = 0; j < icecreamDict[i]; j++){
                icecreamSeries.data.push([parseFloat(i), j+1]);
            }
        }
        Highcharts.chart('icecream', {
            chart: {
                type: 'scatter',
                zoomtype: 'xy'
            },
            title: {
                text: 'Child Height'
            },
            xAxis: {
                min: 30,
                max: 70,
                title : {
                    enabled: true,
                    text: 'Child Height (inches)'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'Count'
                }
            },
            series: [icecreamSeries]
        });

        let jointSeries = {data : [], color: '#EA7200', name:"Parent Height vs Child Height (inches)"}
        for (let i in rawSharks){
            jointSeries.data.push([Math.round(rawSharks[i] * 100) / 100, Math.round(series.data[i][1] * 100) / 100]);
        }

        Highcharts.chart('joint', {
            chart: {
                type: 'scatter',
                zoomtype: 'xy'
            },
            title: {
                text: 'Parent Height vs Child Height'
            },
            xAxis: {

                title : {
                    enabled: true,
                    text: 'Child Height (inches)'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'Parent Height (inches)'
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
