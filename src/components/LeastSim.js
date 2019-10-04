import React, { Component } from "react";
import Highcharts from "highcharts";
import { Button, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Col } from "reactstrap";

let sumSquares;
let placeHolders = [];
let linearize =[[1,2],[3,4]];
let newPoints = [];

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
      tmpPS: 5
    };
  }
  render() {
    this.state.chart && this.show();
    return (
      <Container fluid className="Plate">
        <div className="MiniLogo"></div>
        <Row>
          <Col>
            <span className="Center" id="container" />
          </Col>
          <Col>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
            </InputGroupAddon>
            <Input
              type='range'
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
                  for (let i = 0; i < this.state.tmpPS; i++) {
                    newPoints.push([Math.round(Math.random() * 600) / 100 , Math.round(Math.random() * 600) / 100]);
                  }
                  this.setState({ points: newPoints, step: 2,
                    cleared: 1, pointSize: this.state.tmpPS,
                    linePoints: [], int: 0, slope: 0});
                  linearize = newPoints.slice();
                }}
                >
                New Points
              </Button>
              </InputGroupAddon>
          </InputGroup>

            {
              this.state.step === 2 &&
              <p>
                Estimated Line: Guess the Slope and Y Intercept
              </p>
            }
            {
              this.state.step === 3 &&
              <p>
                Change Slope and Y Intercept to Reduce Sum of Squares
              </p>
            }

            {
              this.state.step <= 1 ?
              null
              : <div>
                    <h4>Slope</h4>
                    <input
                    type="number"
                    step={0.1}
                    value={this.state.slope}
                    min={-5}
                    max={2}
                    onChange={event => {
                      this.setState({
                        slope: parseFloat(event.target.value) ,
                      });
                    }}
                    />
                    <h4>{this.state.slope}</h4>
                    <h4>Intercept</h4>
                    <input
                    type="number"
                    step={0.1}
                    value={this.state.int}
                    min={0}
                    max={10}
                    onChange={event => {
                      this.setState({
                        int: parseFloat(event.target.value)
                    })}}
                    />
                    <h4>{this.state.int}</h4>
                  </div>
          }

            {this.state.step === 2 && (
              <Button
              outline
              color='primary'
              onClick={() => {
                this.setState({
                  step: 3 });
              }}
              >
                Plot Your Guess
              </Button>
            )}
            <p>{this.state.points}</p>
            <p>{this.state.linePoints}</p>
            <p>{linearize}</p>

            {this.state.step === 3 && (
              <div>
                <h4>
                  Sum of Squares:
                  {Math.round(sumSquares * 100) / 100}
                </h4>
                <h4>Show Least Squares Line</h4>
                <Button
                  outline
                  color="info"
                  onClick={() => {
                    const eq = this.generateTrue();
                    this.setState({ slope: eq[0], int: eq[1] });
                  }}
                  >
                  {" "}
                  Find Least Squares Line{" "}
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

      const linePoints = this.generatePoints(this.state.slope, this.state.int);

      if (!this.state.chart) {
      this.setState({
        chart: Highcharts.chart(
          'container',
          {
            title: {
              text: "Least Squares Example"
            },
            xAxis: {
              min: 0,
              max: 10,
            },
            yAxis: {
              gridLineColor: 'white',
              min: 0,
              max: 10,
            },

            series: [
              {
              type: 'scatter',
              name: 'if statement points',
              data: this.state.points,
              marker: {
                radius: 4
              }
            },
            {
              name: 'If statement line',
              data: linePoints,
              marker: {
                enabled: false
              },
              states: {
                hover: {
                  lineWidth: 0
                }
              },
              enableMouseTracking: false
            }
          ]}
        )
      });
    }

    else {
      const copyChart = this.state.chart;
      const newSeries = [
        {
          type: 'scatter',
          name: 'else statement points',
          data: this.state.points,
          marker: {
            radius: 4
          }
        },
        {
          type: 'line',
          name: 'else statement line',
          data: linePoints,
          marker: {
            enabled: false
          },
          states: {
            hover: {
              lineWidth: 0
            }
          },
          enableMouseTracking: false
        }

      ]

      copyChart.update({ series: newSeries });
      }
    }


    generatePoints(slope, int) {
      let points = linearize;

      if (this.state.step <= 2) {
        points = [null];
      }
      else{
        for (let i = 0; i < points.length; i++) {
          points[i][1] = (int + points[i][0] * slope);
        }
      }
      return points;
    }

  generateSquare(lineX, lineY) {
    const diff = this.state.points[lineX] - lineY;
    const xBox = diff > 0 ? lineX - diff : lineX;
    const yBox = diff > 0 ? this.state.points[lineX] : lineY;
    return xBox;
  }

  generateTrue() {
    let xy = [];
    let yPoints = [];
    let xPoints = [];
    let x_sq = [];

    for (let a = 1; a <= this.state.pointSize; a++) {
      yPoints.push(null);
      xy.push(null);
      xPoints.push(a);
      x_sq.push(a*a);
    }


    for (let j = 1; j <= this.state.pointSize; j++) {
      yPoints[j-1] = this.state.points[j];
    }

    let m;
    let b;
    for (let i = 0; i < this.state.pointSize; i++) {
      xy[i] = xPoints[i] * yPoints[i];
    }
    m = ( (this.state.pointSize * this.sum(xy)) - (this.sum(xPoints) * this.sum(yPoints))) / ( (this.state.pointSize * this.sum(x_sq)) - (this.sum(xPoints) * this.sum(xPoints))) ;
    b = ( this.sum(yPoints) - (m * this.sum(xPoints)) ) / this.state.pointSize;
    m = Math.round(m * 1000) / 1000;
    b = Math.round(b * 1000) / 1000;
    return [m, b];
  }

  sum(array) {
    const ret = array.reduce((a, b) => a + b, 0);
    return ret;
  }
}
export default LeastSim;
