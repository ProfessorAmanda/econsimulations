import React, { Component } from "react";
import Highcharts from "highcharts";
import { Alert, Button, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Col } from "reactstrap";

let sumSquares;
let placeHolders = [];
let newPoints = [];
let holdXValues =[];
let holdXSingleValues =[];
let holdYSingleValues =[];

class LeastSim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linePoints: [],
      chart: undefined,
      slope: 1,
      int: 3,
      points: [[0,0]],
      diffs: [0, 0, 0, 0],
      step: 1,
      trueM: null,
      trueb: null,
      isRec: 0,
      start: 1,
      pointSize: 5,
      tmpPS: 5,
      original_random_points:[],
      intermediate_points: [],
    };
  }

  render() {
    this.state.chart && this.show();
    return (

        <Container fluid className="Plate">
        <div className="MiniLogo"></div>
        <Alert style={{ width: "50%", margin: 'auto' }} color="primary">
            Least Squares
        </Alert>
        <br/>
        <Row>
          <Col>
            <span className="Center" id="sim-container" />
          </Col>
          <Col>
          <br/>
          <br/>
          <br/>
          <br/>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
            </InputGroupAddon>
            <Input
              type='range'
              className="custom-range"
              min='4'
              max='10'
              step='1'

              value={this.state.tmpPS}
              onChange={(event) => {
                this.setState({
                  tmpPS: parseInt(event.target.value, 10)
                })
              }}
              />
            <InputGroupAddon addonType="append">
            <InputGroupText>{this.state.tmpPS}</InputGroupText>
              <Button
                outline
                color="primary"
                zIndex="1"
                onClick={() => {
                  newPoints =[];
                  holdXValues =[[0]];
                  holdXSingleValues =[];
                  holdYSingleValues =[];
                  for (let i = 0; i < this.state.tmpPS; i++) {
                    let x = Math.floor(Math.random() * 11) + 2;
                    let y = Math.floor(Math.random() * 11) + 2;
                    newPoints.push([x, y]);
                    holdXValues.push([x]);
                    holdXSingleValues.push(x);
                    holdYSingleValues.push(y);
                  }
                  this.setState({
                    original_random_points: newPoints,
                    intermediate_points: newPoints,
                    points: newPoints,
                    step: 2,
                    cleared: 1,
                    pointSize: this.state.tmpPS,
                    linePoints: [],
                    int: 1,
                    slope: 1});
                }}
                >
                New Points
              </Button>
              </InputGroupAddon>
          </InputGroup>


            {
              this.state.step === 2 &&
              <p>
                Guess a Slope and Y-Intercept to fit the points
              </p>
            }
            {
              this.state.step === 3 &&
              <p>
                Want to try again? Guess a different slope and y-intercept to reduce the Sum of Squares!
              </p>
            }

            {
              this.state.step <= 1 ?
              null
              : <div>
                    <h4>Slope</h4>
                    <InputGroup>
                    <Input
                      type='range'
                      className="custom-range"
                      min='-10'
                      max='10'
                      step='0.1'

                      value={this.state.slope}
                      onChange={(event) => {
                        this.setState({

                          slope: parseFloat(event.target.value, 10)
                        })
                      }}
                      />
                      <InputGroupAddon addonType="append">
                      <InputGroupText>{this.state.slope}</InputGroupText>
                      </InputGroupAddon>
                  </InputGroup>


                    <h4>Intercept</h4>
                    <InputGroup>
                    <Input
                      type='range'
                      className="custom-range"
                      min='-20'
                      max='20'
                      step='0.1'

                      value={this.state.int}
                      onChange={(event) => {
                        this.setState({

                          int: parseFloat(event.target.value, 10)
                        })
                      }}
                      />
                      <InputGroupAddon addonType="append">
                      <InputGroupText>{this.state.int}</InputGroupText>
                      </InputGroupAddon>
                  </InputGroup>
                  </div>
          }

             {this.state.step === 2 && (
              <Button
              outline
              color='primary'
              onClick={() => {
                this.setState({
                  step: 3,
                 });
              }}
              >
                Plot Your Guess
              </Button>
            )}
            {this.state.step === 3 && (
              <div>
              <br/>
                <p>
                  Sum of Squares:
                  {Math.round(sumSquares * 100) / 100}
                </p>
                <Button
                  outline
                  color="info"
                  onClick={() => {
                    const eq = this.generateTrue();
                    this.setState({ slope: Math.round(eq[0]*100)/100, int: Math.round(eq[1]*100)/100 });
                  }}
                  >
                  {" "}Click to Reveal the Least Squares Line{" "}
                </Button>
              </div>
            )}
            </Col>
          </Row>
      </Container>
    );
  }

  componentDidMount() {
    this.show();
  }


  show() {
      const linearizedGuessedPoints = this.generate_guessed_points(this.state.slope, this.state.int);

      if (!this.state.chart) {
      this.setState({
        chart: Highcharts.chart(
          'sim-container',
          {
            title: {
              text: ""
            },

            legend: {
              enabled: false
            },

            chart: {
              type: 'line',
              plotBorderColor: '#000000',
              plotBorderWidth: 1,
              margin : [100,100,100,100],
              width  : 600,
              height : 600
            },

            xAxis: {
              min: 0,
              max: 20,
              startOnTick: true,
              tickInterval: 2
            },
            yAxis: {
              min: 0,
              max: 20,
              startOnTick: true,
              endOnTick: true,
              tickInterval: 2
            },

            series: [
              {
                type: "scatter",
                marker: {
                  radius: 5,
                },
                data: this.state.original_random_points,
              },
            {
              type: 'line',
              data: linearizedGuessedPoints,
            }
          ]
        })
      });
    }

    else {
      const copyChart = this.state.chart;
      copyChart.series[0].setData(this.state.original_random_points);
      copyChart.series[1].setData(linearizedGuessedPoints);
      sumSquares = 0;
      const ph = [];

      if (placeHolders.length > 0) {
        placeHolders.forEach(point => {
          point.destroy();
        })
      }

      let ogScatterPoints = this.state.original_random_points.slice();
      let guessedLinePoints = linearizedGuessedPoints.slice();

      if (this.state.step > 2){
        for (let i = 0; i < this.state.tmpPS; i++) {
          const lineX = ogScatterPoints[i][0];

          const originalY = ogScatterPoints[i][1];
          const guessedY = guessedLinePoints[i+1][1];
          const diff = originalY - guessedY;
          const xBox = lineX;
          const yBox = diff > 0 ? originalY : guessedY;
          const firstL =  20 * Math.abs(diff);
          const secondL = 20 * Math.abs(diff);
          sumSquares += Math.round(Math.abs(diff) * Math.abs(diff));

          const tmp = copyChart.renderer
          .rect(
            copyChart.xAxis[0].toPixels(xBox),
            copyChart.yAxis[0].toPixels(yBox),
            firstL,
            secondL,
            1
            )
            .attr({
              "stroke-width": 1,
              stroke: "grey",
              zIndex: 1
            })
            .add();
          ph.push(tmp);
        }
      }
      placeHolders = ph;
    }
  }


  generate_guessed_points(slope, int) {
    let linear = [];
    let xvalue;
    let yvalue ;
    let points = holdXValues;

    if (this.state.step <= 2) {
      linear = [null];
    }
    else{
      for (let i = 0; i < points.length; i++) {
        xvalue = points[i][0];
        yvalue = (xvalue * slope) + int;
        linear.push([xvalue, yvalue]);
      }
    }
    return linear;
  }


  generateTrue() {
    let xpoints = holdXSingleValues;
    let ypoints = holdYSingleValues;

    let averageX = this.sum(xpoints)/xpoints.length;
    let averageY = this.sum(ypoints)/ypoints.length;

    let scovXY = 0;
    for (let i = 0; i < xpoints.length; i++){
      scovXY += (ypoints[i] - averageY)*(xpoints[i] - averageX);
    }
    scovXY = scovXY/xpoints.length;

    let svarX = 0;
    for (let i = 0; i < xpoints.length; i++){
      svarX += (xpoints[i] - averageX)*(xpoints[i] - averageX);
    }
    svarX = svarX/xpoints.length;

    let olsSlope = scovXY/svarX;
    let olsIntercept = averageY - (olsSlope*averageX);

    return [olsSlope, olsIntercept];

  }

  sum(array) {
    const total_add = array.reduce((prev, current) => current += prev);
    return total_add;
  }
}
export default LeastSim;
