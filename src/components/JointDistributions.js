import React, { Component } from 'react';
// import './dropdown.css';
import styled from 'styled-components';
import MultivariateNormal from 'multivariate-normal';
import Highcharts from 'highcharts';
const quantile = require("distributions-exponential-quantile");
const cdf = require( 'distributions-normal-cdf' );

const ToolBarButton=styled.a`
  background-color: white;
  border: 2px solid black;
  color: #555555;
  padding: 10px 24px;
  margin-left: 580px;
  width: 50px;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 12px;
  -webkit-transition-duration: 0.4s; /* Safari */
   transition-duration: 0.4s;
   cursor: pointer;
   &:focus {outline:0}
   &:hover {
       background-color: #555555;
       color: white;
   }

`;

function SharkInput(props){
  return(
    <div>
        <h4> Choose the Mean and Standard Deviation for Shark Attacks </h4>
        <label >Shark Attack Mean</label><span>:  {props.sharkMean}</span>
        <input type="range" className="slider" min={0} max={5} step=".1" value={props.sharkMean} onChange={(event) => {props.saveMean(event)}} />

    </div>
  );
}

function IceInput(props){
  return(
    <div>
        <h4> Choose the Mean and Standard Deviation for Ice Cream Cones </h4>
        <label >Ice Cream Cone Mean: </label><span>{props.iceMean}</span>
        <input type="range" className="slider" min={10} max={500} step="1" value={props.iceMean} onChange={(event) => {props.saveMean(event)}} />
        <br />
        <br />
        <label >Ice Cream Cone SD: </label><span>{props.iceSD}</span>
        <input type="range" className="slider" min={1} max={5} value={props.iceSD} onChange={(event) => {
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

class JointDistributions extends Component {
    constructor(props){
        super(props);
        this.state = {
            meanVector : [1,70],
            covMatrix : [[1,1], [1,1]],
            sharkSD : 1,
            iceSD : 1,
            covariance : 1,
            covSelected: 0,
            selectedCov: "low"
        }
    }

    render() {

      return(
          <div>
              <SharkInput sharkMean={this.state.meanVector[0]} sharkSD={this.state.sharkSD} saveMean={(event) => {this.setState({meanVector: [parseFloat(event.target.value)].concat(this.state.meanVector[1])})}}
                saveSD={(sd) => {
                  const copy = this.state.covMatrix;
                  const variance = Math.pow(sd,2);
                  const temp = [[variance,copy[0][1]],copy[1]];
                  this.setState({sharkSD : sd});
                  this.setState({covMatrix : temp});
                  this.setState({covSelected : 0 });
              }}/>
              <IceInput iceMean={this.state.meanVector[1]} iceSD={this.state.iceSD} saveMean={(event) => {this.setState({meanVector: [this.state.meanVector[0]].concat(parseFloat(event.target.value))})}}
                  saveSD={(sd) => {
                    const copy = this.state.covMatrix;
                    const variance = Math.pow(sd,2);
                    const temp = [copy[0],[copy[1][0],variance]];
                    this.setState({iceSD : sd});
                    this.setState({covMatrix : temp});
                    this.setState({covSelected : 0 });
                  }}/>
              {/*<div>
                  <h4> Set the Mean Vector </h4>
                  <input type="number" onChange={(event) => {this.setState({meanVector: [parseFloat(event.target.value)].concat(this.state.meanVector[1])})}} />
                  <input type="number" onChange={(event) => {this.setState({meanVector: [this.state.meanVector[0]].concat(parseFloat(event.target.value))})}} />
              </div>*/}
              <div>
                  <h4> Set the Covariance</h4>
                  <div>
                      {/*}<input value={this.state.covariance} type="range" className="slider" step=".1" min={-this.findMax()}
                        max={this.findMax()} onChange={(event) => {
                          this.setState({covariance : parseFloat(event.target.value)});
                          const copy = this.state.covMatrix;
                          const temp = [[copy[0][0],parseFloat(event.target.value)],[parseFloat(event.target.value),copy[1][1]]];
                          this.setState({covMatrix : temp});
                        }}
                  //onChange={(event) => {this.setState({covMatrix: [[parseFloat(event.target.value)].concat(this.state.covMatrix[0][1]), this.state.covMatrix[1]]});}}
                  />*/}
                  {/*}<span>{this.state.covariance}</span>*/}
                  {/* Code for dropdown menu found at https://www.w3schools.com/howto/howto_css_dropdown.asp */}
                  <ToolBarButton style={this.setStyle("low")} onClick={()=>{
                    this.setState({ covariance : 0, covSelected : 1, selectedCov:"low" });
                    // console.log("setting variance low");
                  }}>Low</ToolBarButton>
                  <ToolBarButton style={this.setStyle("med")} onClick={()=>{
                    this.setState({ covariance : (this.findMax()/2), covSelected : 1, selectedCov:"med" });
                    // console.log("setting variance medium");
                  }}>Medium</ToolBarButton>
                  <ToolBarButton style={this.setStyle("hi")} onClick={()=>{
                    this.setState({ covariance : (this.findMax()), covSelected : 1, selectedCov:"hi" });
                    // console.log("setting variance high");
                  }}>High</ToolBarButton>

                  {/*<div className="dropdown">
                    <button className="dropbtn">Dropdown</button>
                    <div className="dropdown-content">
                      <a onClick={()=>{
                        console.log("test dropdown");
                      }}>High</a>
                      <a >Medium</a>
                      <a >Low</a>
                    </div>
                  </div>*/}
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
              <button style={{margin:"10px"}} disabled={!this.state.covSelected} onClick={()=>{this.generate()}}> Generate! </button>
              <div>
                  <span style={{width:"30%", float: "left"}} id="sharks"/>
                  <span style={{width:"30%", float: "left"}} id="icecream"/>
                  <span style={{width:"30%", float: "left"}} id="joint"/>
              </div>
          </div>

      )
    }


    generate() {
        //const meanVector = [1, 10];

        // covariance between dimensions. This examples makes the first and third
        // dimensions highly correlated, and the second dimension independent.
        // const covarianceMatrix = [
        //     [ 1.0, 1.0],
        //     [ 1.0, 1.0]
        // ];
        // console.log(this.state);

        // Check for non symmetric Matrix
        if(this.state.covMatrix[0][1] !== this.state.covMatrix[1][0]){
          //alert("these gotta be the same yo");
          return;
        }

        // lets you sample from distribution
        const distribution = MultivariateNormal(this.state.meanVector, this.state.covMatrix);
        const series = {data : [], color: '#1F242A ', name:"Population"}
        // samples 1000
        for (let i = 0; i < 1000; i++){
            series.data.push(distribution.sample());
        }
        const sharkSeries = {data : [], color: '#006D75', name:"Shark Attacks per Day"}
        const sharkDict = {};
        const rawSharks = series.data.map((s) => {return s[0]});
        // raw sharks is the sample without the double array thing
        const sharkCDF = cdf(rawSharks);
        const sharkExp = quantile(sharkCDF);
        // console.log(sharkExp);
        // for (let s of sharkCDF) {
        //     sharkPois.push();
        // }

        // building dictionary for histogram
        for (const i of sharkExp){
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
        Highcharts.chart('sharks', {
            chart: {
                type: 'scatter',
                zoomtype: 'xy'
            },
            title: {
                text: 'Shark Attacks!'
            },
            xAxis: {
                title : {
                    enabled: true,
                    text: 'Shark Attacks per Day'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'Days of Occurence'
                }
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
        Highcharts.chart('icecream', {
            chart: {
                type: 'scatter',
                zoomtype: 'xy'
            },
            title: {
                text: 'Ice Cream Cones'
            },
            xAxis: {
                title : {
                    enabled: true,
                    text: 'Ice Cream Cones bought per day'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'Days of Occurence'
                }
            },
            series: {
                data:[icecreamSeries],
                color: 'rgba(119, 152, 191, .5)'
            }
        });

        const jointSeries = {data : [], color: '#EA7200', name:"Sharks vs Ice Creams"}
        for (const i in sharkExp){
            jointSeries.data.push([Math.round(sharkExp[i] * 100) / 100, Math.round(series.data[i][1] * 100) / 100]);
        }
        Highcharts.chart('joint', {
            chart: {
                type: 'scatter',
                zoomtype: 'xy'
            },
            title: {
                text: 'Ice Cream Cones per Shark Attack'
            },
            xAxis: {
                title : {
                    enabled: true,
                    text: 'Ice Cream Cones per Day'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'Shark Attacks Per Day'
                }
            },
            series: [jointSeries]
        });
    }

    setStyle(button){
      if(button === this.state.selectedCov && this.state.covSelected === 1){
        return {
            background: '#555555',
            color: 'white'
        };
      }
      return {};
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
export default JointDistributions
