import React, { Component } from 'react';
import styled from 'styled-components';
import MultivariateNormal from 'multivariate-normal';
import Highcharts from 'highcharts';
import regression from 'regression';
const smr = require('smr');
const quantile = require("distributions-exponential-quantile");
const cdf = require( 'distributions-normal-cdf' );
const random = require( 'distributions-normal-random' );
const jsregression = require('js-regression');
const mathjs = require('mathjs');
const OBS = 300;
const INT = 20;


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
                    <label> Beta, the Police Coefficient: </label>
                    <span>{this.state.beta}</span>
                    <input style={{}} type="range" className="slider" step={.1} value={this.state.beta} min={-10} max={10} onChange={(event) => {
                      this.setState({beta:parseFloat(event.target.value)});
                    }}/>
                    </div>
                    <br></br>
                    <div style={{marginLeft: -70}}>
                        <label> Delta, the Density Coefficient: </label>
                        <span>{this.state.delta}</span>
                        <input type="range" className="slider" step={.1} value={this.state.delta} min={-10} max={10} onChange={(event) => {
                          this.setState({delta:parseFloat(event.target.value)});
                        }}/>
                    </div>
                    <br></br>
                    <label> Covariance beween Police and Density: </label>
                    <span>{this.state.cov}</span>
                    <input type="range" className="slider" step={.1} value={this.state.cov} min={-3.4} max={3.4} onChange={(event) => {
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
        let meanVector = [5, .8];

        // covariance between dimensions. This examples makes the first and third
        // dimensions highly correlated, and the second dimension independent.
        let covarianceMatrix = [
            [ 4, this.state.cov],
            [ this.state.cov, 3]
        ];

        console.log('changing covariance');
        console.log(covarianceMatrix);

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

        

        console.log(roundedSeries);

        // generate epsilon
        let epsilon = random( OBS, {
            'mu': 0,
            'sigma': 5,
        });

        // matrix data
        let ones = [];
        let colOne = [];
        let colTwo = [];

        // generate crime data
        let crime = [];
        for(let i=0;i<OBS;i++){
          let crimePoint = INT + beta_X*roundedSeries[i][0] + delta_V*roundedSeries[i][1] + epsilon[i];
          crime.push(Math.round(crimePoint*100)/100);
          ones.push(1);
          colOne.push(roundedSeries[i][0]);
          colTwo.push(roundedSeries[i][1]);
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


        // using matrices
        const X = mathjs.transpose(mathjs.matrix([ones,colOne, colTwo]));
        const Y = mathjs.transpose(mathjs.matrix([crime]));
        let inv = mathjs.inv(mathjs.multiply(mathjs.transpose(X),X));  
        let bHat = mathjs.multiply(mathjs.multiply(inv,mathjs.transpose(X)),Y);
        console.log(bHat);
        console.log(bHat.get([1,0]));
        

        let multipleArray = [];
        for(let i=0;i<OBS;i++){
          let multiplePoint = [roundedSeries[i][0],roundedSeries[i][1],crimePol[i][1]];
          multipleArray.push(multiplePoint);
        }

        let correctedReg = new smr.Regression({ numX: 2, numY: 1 });

        let testList = [];

        for(let i=0;i<OBS;i++){
          correctedReg.push({ x: [multipleArray[i][0], multipleArray[i][1]], y: [multipleArray[i][2]] });
        }

        /* TRY NEW LIBRARY */

        let regData = [];
        for(let x = 0; x < OBS; x++) {
          regData.push([roundedSeries[x][0], roundedSeries[x][1], crimePol[x][1]]); // Note that the last column should be y the output
        }

        // === Create the linear regression === //
        let jsreg = new jsregression.LinearRegression();

        // === Train the linear regression === //
        let newModel = jsreg.fit(regData);

        // === Print the trained model === //
        console.log(newModel);

        /***************************************************************/

        const correctedSlopes = correctedReg.calculateCoefficients();
        console.log(correctedSlopes);
        let calcInt = correctedReg.hypothesize({ x: [0, 0] });
        console.log(calcInt);
        //let testy = correctedReg.hypothesize({ x: [0, 0] }); // Returns [20.93]

        let correctedLine = this.generatePoints(parseFloat(bHat.get([1,0])),parseFloat(bHat.get([0,0])));
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

      for(let i=0;i<11;i++){
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
