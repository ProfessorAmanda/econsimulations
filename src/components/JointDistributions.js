import React, { Component } from 'react';
import styled from 'styled-components';
import MultivariateNormal from 'multivariate-normal';
import Highcharts from 'highcharts';
const quantile = require("distributions-exponential-quantile");
const cdf = require( 'distributions-normal-cdf' );




class JointDistributions extends Component {
    constructor(props){
        super(props);
        this.state = {
            meanVector : [],
            covMatrix : [[], []]
        }
    }

    render() {
        return(
            <div>
                <div>
                    <h4> Set the Mean Vector </h4>
                    <input type="number" onChange={(event) => {this.setState({meanVector: [parseFloat(event.target.value)].concat(this.state.meanVector[1])})}} />
                    <input type="number" onChange={(event) => {this.setState({meanVector: [this.state.meanVector[0]].concat(parseFloat(event.target.value))})}} />
                </div>
                <div>
                    <h4> Set the Covariance Matrix </h4>
                    <div>
                        <input type="number" onChange={(event) => {this.setState({covMatrix: [[parseFloat(event.target.value)].concat(this.state.covMatrix[0][1]), this.state.covMatrix[1]]})}} />
                        <input type="number" onChange={(event) => {this.setState({covMatrix: [[this.state.covMatrix[0][0]].concat(parseFloat(event.target.value)),  this.state.covMatrix[1]]})}} />
                    </div>
                    <div>
                        <input type="number" onChange={(event) => {this.setState({covMatrix: [this.state.covMatrix[0], [parseFloat(event.target.value)].concat(this.state.covMatrix[1][1]) ]})}} />
                        <input type="number" onChange={(event) => {this.setState({covMatrix: [this.state.covMatrix[0], [this.state.covMatrix[1][0]].concat(parseFloat(event.target.value))]})}} />
                    </div>
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
        var distribution = MultivariateNormal(this.state.meanVector, this.state.covMatrix);
        let series = {data : [], color: '#1F242A ', name:"Population"}
        for (let i = 0; i < 1000; i++){
            series.data.push(distribution.sample());
        }
        let sharkSeries = {data : [], color: '#006D75', name:"Shark Attacks per Day"}
        let sharkDict = {};
        let rawSharks = series.data.map((s) => {return s[0]});
        let sharkCDF = cdf(rawSharks);
        let sharkExp = quantile(sharkCDF)
        // for (let s of sharkCDF) {
        //     sharkPois.push();
        // }

        for (let i of sharkExp){
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
            series: [icecreamSeries]
        });

        let jointSeries = {data : [], color: '#EA7200', name:"Sharks vs Ice Creams"}
        for (let i in sharkExp){
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
}
export default JointDistributions
