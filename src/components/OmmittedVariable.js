import React, { Component } from 'react';
import styled from 'styled-components';
import MultivariateNormal from 'multivariate-normal';
import Highcharts from 'highcharts';
import regression from 'regression';
const smr = require('smr');
const quantile = require("distributions-exponential-quantile");
const cdf = require( 'distributions-normal-cdf' );
const random = require( 'distributions-normal-random' );
const OBS =300;
const INT = 15;


class OmmittedVariable extends Component {
    constructor(props){
        super(props);
        this.state = {
          stage: 0,
          points: null,
          beta: -2.5,
          delta: 6,
          cov: 2
        }
    }

    render() {
        return(
            <div style={{ marginLeft: 0,marginTop: 10 }}>
                <span style={{width:"30%", float: "left", marginLeft: 100}} id="sharks"/>
                <span>
                    <div style={{marginLeft: -84}}>
                    <h4>Step 1: Choose Population Parameters</h4>
                    <label> Beta, the Police Coefficient </label>
                    <input style={{}} type="number" step={.1} value={this.state.beta} min={-10} max={10} onChange={(event) => {
                      this.setState({beta:parseFloat(event.target.value)});
                    }}/>
                    </div>
                    <br></br>
                    <div style={{marginLeft: -70}}>
                        <label> Delta, the Density Coefficient </label>
                        <input type="number" step={.1} value={this.state.delta} min={-10} max={10} onChange={(event) => {
                          this.setState({delta:parseFloat(event.target.value)});
                        }}/>
                    </div>
                    <br></br>
                    <label> Covariance beween Police and Density </label>
                    <input type="number" step={.1} value={this.state.cov} min={-12} max={12} onChange={(event) => {
                      this.setState({cov:parseFloat(event.target.value)});
                    }}/>
                    <br></br>
                    <h4> Step 2: Generate Regression Using Crime and Police Data </h4>
                    <button style={{margin:"10px"}} onClick={()=>{this.generate(0); this.setState({stage:1})}}> Generate! </button>
                    {this.state.stage < 1 ? null : <div><h4> Step 3: Add Omitted Variable, Density, to Regression </h4><button onClick={() => {
                      this.setState({stage:2});
                      this.generate(1);
                    }}> Show Corrected Regression Line </button></div>}
                </span>
            </div>

        )
    }


    generate(stage) {
        let meanVector = [2, .8];

        // covariance between dimensions. This examples makes the first and third
        // dimensions highly correlated, and the second dimension independent.
        let covarianceMatrix = [
            [ 4, 2],
            [ 2, 3]
        ];

        let beta_X = this.state.beta;
        let delta_V = this.state.delta;
        let cov_XV = this.state.cov;

        // lets you sample from distribution
        let distribution = MultivariateNormal(meanVector, covarianceMatrix);
        let series = {data : [], color: '#1F242A ', name:"Population"}
        // samples 1000
        for (let i = 0; i < OBS; i++){
            series.data.push(distribution.sample());
        }
        let newSeries = {data : [], color: '#006D75', name:"Shark Attacks per Day"}
        // police vs density
        let roundedSeries = series.data.map((s) => {return [Math.round(s[0]*100)/100,
          Math.round(s[1]*100)/100]});
        newSeries.data = roundedSeries;

        // generate epsilon
        let epsilon = random( OBS, {
            'mu': 0,
            'sigma': 5,
        });


        // generate crime data
        let crime = [];
        for(let i=0;i<OBS;i++){
          let crimePoint = beta_X*roundedSeries[i][0] + delta_V*roundedSeries[i][1] + epsilon[i];
          crime.push(Math.round(crimePoint*100)/100);
        }

        // get series with police vs crime
        let crimePol = [];
        for(let i=0;i<OBS;i++){
          crimePol.push([roundedSeries[i][0],crime[i]]);
        }

        // regress police with crime
        const naiveReg = regression.linear(crimePol);
        const naiveSlope = (naiveReg.equation[0]);
        const naiveInt = (naiveReg.equation[1]);
        const naiveLine = this.generatePoints(naiveSlope,naiveInt);

        // Corrected regression

        let multipleArray = [];
        for(let i=0;i<OBS;i++){
          let multiplePoint = [crimePol[i][0],roundedSeries[i][1],crimePol[i][1]];
          multipleArray.push(multiplePoint);
        }

        let correctedReg = new smr.Regression({ numX: 2, numY: 1 });

        for(let i=0;i<OBS;i++){
          correctedReg.push({ x: [multipleArray[i][0], multipleArray[i][1]], y: [multipleArray[i][2]] });
        }

        const correctedSlopes = correctedReg.calculateCoefficients();

        let correctedLine = this.generatePoints(parseFloat(correctedSlopes[0]),INT);
        if(stage === 0){
          correctedLine = null;
        }


        Highcharts.chart('sharks', {
            chart: {
                type: 'scatter',
                zoomtype: 'xy',
                width: 400,
                height: 400
            },
            title: {
                text: 'Police vs. Crime'
            },
            xAxis: {
                min: 0,
                max: 10,
                title : {
                    enabled: true,
                    text: 'Police'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                min: -20,
                title: {
                    text: 'Crime'
                }
            },
            series: [
            	{
            		type: 'scatter',
                data: crimePol,
                name: "Crime"
            	},
              {
            		type: 'line',
                data: naiveLine,
                name: "Naive Regression"
            	},
              {
            		type: 'line',
                data: correctedLine,
                name: "Corrected Regression"
            	}
            ]
        });

    }

    generatePoints(slope,int){
      let points = [];

      for(let i=0;i<OBS;i++){
        points[i] = int + i*slope;
      }

      return points;
    }
    generateCorrected(x1,x2,int){
      let points = [];
      for(let i=0;i<OBS;i++){
        points[i] = i*x1 + i*x2;
      }
      return points;
    }
}
export default OmmittedVariable
