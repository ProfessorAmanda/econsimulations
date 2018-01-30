import React, { Component } from 'react';
import styled from 'styled-components';
import MultivariateNormal from 'multivariate-normal';
import Highcharts from 'highcharts';
import * as distriprob from "distriprob";
const cdf = require('cumulative-distribution-function');

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
                <div id="sharks"/>
                <div id="icecream"/>
                <div id="joint"/>
            </div>

        )
    }


    generate() {
        var meanVector = [1, 2];

        // covariance between dimensions. This examples makes the first and third
        // dimensions highly correlated, and the second dimension independent.
        var covarianceMatrix = [
            [ 1.0, 0.0],
            [ 0.0, 1.0]
        ];

        var distribution = MultivariateNormal(meanVector, covarianceMatrix);
        let series = {data : [], color: '#F27474', name:"Population"}
        for (let i = 0; i < 1000; i++){
            series.data.push(distribution.sample());
        }
        let sharkSeries = {data : [], color: '#F27474', name:"Shark Attacks per Day"}
        let sharkDict = {};
        let rawSharks = series.data.map((s) => {return s[0]});
        let sharkCDF = cdf(rawSharks);
        let sharkPois = [];
        for (let s of sharkCDF.ps().slice(0, -1)) {
            sharkPois.push(distriprob.poisson.quantileSync(s, 5));
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

        let icecreamSeries = {data : [], color: '#F27474', name:"icecream Attacks per Day"}
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
                    text: 'icecream Attacks per Day'
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
        

        Highcharts.chart('joint', {
            chart: {
                type: 'scatter',
                zoomtype: 'xy'
            },
            title: {
                text: 'Some Bivariate'
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
            series: [series]
        });
    }
}
export default JointDistributions
