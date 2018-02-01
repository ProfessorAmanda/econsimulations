import React, { Component } from 'react';
import styled from 'styled-components';
import MultivariateNormal from 'multivariate-normal';
import Highcharts from 'highcharts';
const distriprob = require("distriprob");
var cdf = require( 'distributions-normal-cdf' );

class JointDistributions extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div>
                <button onClick={()=>{this.generate()}}> Generate! </button>
                <span style={{width:"30%", float: "left"}} id="sharks"/>
                <span style={{width:"30%", float: "left"}} id="icecream"/>
                <span style={{width:"30%", float: "left"}} id="joint"/>
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

        var distribution = MultivariateNormal(meanVector, covarianceMatrix);
        let series = {data : [], color: '#1F242A ', name:"Population"}
        for (let i = 0; i < 1000; i++){
            series.data.push(distribution.sample());
        }
        let sharkSeries = {data : [], color: '#006D75', name:"Shark Attacks per Day"}
        let sharkDict = {};
        let rawSharks = series.data.map((s) => {return s[0]});
        let sharkCDF = cdf(rawSharks);
        let sharkPois = [];
        for (let s of sharkCDF) {
            sharkPois.push(distriprob.poisson.quantileSync(s, 1));
        }
        for (let i of sharkPois){
            const sharkFreq = i;
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

        let icecreamSeries = {data : [], color: '#FFE3B9', name:"Ice Cream Cones bought per Day"}
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
        for (let i in sharkPois){
            jointSeries.data.push([sharkPois[i], Math.round(series.data[i][1] * 100) / 100]);
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
