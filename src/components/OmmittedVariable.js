import React, { Component } from 'react';
import MultivariateNormal from 'multivariate-normal';
import Highcharts from 'highcharts';
import regression from 'regression';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';

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
          <Container className='Plate'>
            <div className="MiniLogo">
                </div>
            <div>
                <Row>
                  <p className="Center">We are studying the relationship between crime and the size of the police force:</p>
                  <p className="Center">Crimeᵢ = β₀ + β₁Policeᵢ + 𝛿Densityᵢ + uᵢ</p>
                  <br/>
                  <p className="Center">Choose Population Parameters:</p>
                </Row>
                <br />
                    <Row>
                      <Col>
                        <InputGroup>
                          <InputGroupAddon className="Center" addonType='prepend'>β₁, the Coefficient on Police:</InputGroupAddon>
                          <Input className="Center" type="number" step={.1} value={this.state.beta} min={-10} max={10} onChange={(event) => {
                          this.setState({beta: parseFloat(event.target.value)});
                        }}/>
                        </InputGroup>
                      </Col>

                      <Col>
                        <InputGroup>
                          <InputGroupAddon className="Center" addonType='prepend'>𝛿, the Coefficient on Density: </InputGroupAddon>
                          <Input className="Center" type="number" step={.1} value={this.state.delta} min={-10} max={10} onChange={(event) => {
                          this.setState({delta: parseFloat(event.target.value)});
                        }}/>
                        </InputGroup>
                      </Col>

                      <Col>
                      <InputGroup>
                        <InputGroupAddon className="Center" addonType='prepend'>Covariance between Police and Density: </InputGroupAddon>
                        <Input className="Center" type="number" step={.1} value={this.state.cov} min={-3.4} max={3.4} onChange={(event) => {
                        this.setState({cov:parseFloat(event.target.value)});
                      }}/>
                      </InputGroup>
                      </Col>

                      </Row>
                      <br />
                      <Row className="Center">
                        <p>Estimate Regression Using Crime and Police Data </p>
                        <Button color='primary' onClick={()=>{this.generate(0); this.setState({stage:1})}}> Generate! </Button>
                      </Row>
                      <Row>
                        <span className="Center" id="sharks"/>
                      </Row>
                      <Row className="Center">
                        {this.state.stage < 1 ?
                          null
                          :<div>
                            <p color='primary'> Add Omitted Variable, Density, to Regression </p>
                            <Button
                            style={{marginBottom: '2em'}}
                            outline color='primary' onClick={() => {
                              this.setState({stage:2});
                              this.generate(1);
                            }}> Show Corrected Regression Line </Button></div>}
                    </Row>

              </div>
            </Container>

        )
    }


    generate(stage) {
        const meanVector = [5, .8];

        // covariance between dimensions. This examples makes the first and third
        // dimensions highly correlated, and the second dimension independent.
        const covarianceMatrix = [
            [ 4, this.state.cov],
            [ this.state.cov, 3]
        ];

        // console.log('changing covariance');
        // console.log(covarianceMatrix);

        const beta_X = this.state.beta;
        const delta_V = this.state.delta;
        const cov_XV = this.state.cov;

        // lets you sample from distribution
        const distribution = MultivariateNormal(meanVector, covarianceMatrix);
        const series = {data : [], name:"Population"}
        // samples 1000
        for (let i = 0; i < OBS; i++){
            series.data.push(distribution.sample());
        }
        const newSeries = {data : [], name:"Shark Attacks per Day"}
        // police vs density
        const roundedSeries = series.data.map((s) => {return [Math.round(s[0]*100)/100,
          Math.round(s[1]*100)/100]});
        newSeries.data = roundedSeries;



        // console.log(roundedSeries);

        // generate epsilon
        const epsilon = random( OBS, {
            'mu': 0,
            'sigma': 5,
        });

        // matrix data
        const ones = [];
        const colOne = [];
        const colTwo = [];

        // generate crime data
        const crime = [];
        for(let i=0;i<OBS;i++){
          const crimePoint = INT + beta_X*roundedSeries[i][0] + delta_V*roundedSeries[i][1] + epsilon[i];
          crime.push(Math.round(crimePoint*100)/100);
          ones.push(1);
          colOne.push(roundedSeries[i][0]);
          colTwo.push(roundedSeries[i][1]);
        }



        // get series with police vs crime
        const crimePol = [];
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
        const inv = mathjs.inv(mathjs.multiply(mathjs.transpose(X),X));
        const bHat = mathjs.multiply(mathjs.multiply(inv,mathjs.transpose(X)),Y);
        // console.log(bHat);
        // console.log(bHat.get([1,0]));


        const multipleArray = [];
        for(let i=0;i<OBS;i++){
          const multiplePoint = [roundedSeries[i][0],roundedSeries[i][1],crimePol[i][1]];
          multipleArray.push(multiplePoint);
        }

        const correctedReg = new smr.Regression({ numX: 2, numY: 1 });

        const testList = [];

        for(let i=0;i<OBS;i++){
          correctedReg.push({ x: [multipleArray[i][0], multipleArray[i][1]], y: [multipleArray[i][2]] });
        }

        /* TRY NEW LIBRARY */

        const regData = [];
        for(let x = 0; x < OBS; x++) {
          regData.push([roundedSeries[x][0], roundedSeries[x][1], crimePol[x][1]]); // Note that the last column should be y the output
        }

        // === Create the linear regression === //
        const jsreg = new jsregression.LinearRegression();

        // === Train the linear regression === //
        const newModel = jsreg.fit(regData);

        // === Print the trained model === //
        // console.log(newModel);

        /***************************************************************/

        const correctedSlopes = correctedReg.calculateCoefficients();
        // console.log(correctedSlopes);
        const calcInt = correctedReg.hypothesize({ x: [0, 0] });
        // console.log(calcInt);
        //let testy = correctedReg.hypothesize({ x: [0, 0] }); // Returns [20.93]

        let correctedLine = this.generatePoints(parseFloat(bHat.get([1,0])),parseFloat(bHat.get([0,0])));
        if(stage === 0){
          correctedLine = null;
        }


        Highcharts.chart('sharks', {
            chart: {
                type: 'scatter',
                zoomtype: 'xy'
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
                floor: 0,
                title: {
                    text: 'Crime'
                }
            },
            series: [
            	{
            		type: 'scatter',
                data: crimePol,
                name: "Crime",
                color: '#33A5FF'
            	},
              {
            		type: 'line',
                data: naiveLine,
                name: "Naive Regression",
                color: '#E30404'
            	},
              {
            		type: 'line',
                data: correctedLine,
                name: "Corrected Regression",
                color: '#2AC208'
            	}
            ]
        });

    }

    generatePoints(slope,int){
      const points = [];

      for(let i=0;i<11;i++){
        points[i] = int + i*slope;
      }

      return points;
    }
    generateCorrected(x1,x2,int){
      const points = [];
      for(let i=0;i<OBS;i++){
        points[i] = i*x1 + i*x2;
      }
      return points;
    }
}
export default OmmittedVariable
