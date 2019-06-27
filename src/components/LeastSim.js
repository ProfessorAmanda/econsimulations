import React, { Component } from "react";
import Highcharts from "highcharts";
import { Button, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Col } from "reactstrap";

let sumSquares;
let placeHolders = [];

class LeastSim extends Component {
  constructor(props) {
    super(props);
    const p = [];
    this.state = {
      chart: undefined,
      slope: 1,
      int: 3,
      points: p,
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
            <span className="Center" id="sim-container" />
          </Col>
          <Col>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Generate</InputGroupText>
            </InputGroupAddon>
            <Input
              type='number'
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
              <Button
                outline
                color="primary"
                zIndex="1"
                onClick={() => {
                  const newPoints = [null];
                  for (let i = 0; i < this.state.tmpPS; i++) {
                    newPoints.push(Math.round(Math.random() * 600) / 100);
                  }
                  this.setState({ points: newPoints, step: 2, cleared: 1, pointSize: this.state.tmpPS, int: 0, slope: 0 });                
                }}
                >
                New Points
              </Button>
              </InputGroupAddon>
          </InputGroup>
            
            {
              this.state.step === 2 &&
              <p>
                Choose a Slope and Y Intercept for Your Estimated Line
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
                      this.setState({ slope: parseFloat(event.target.value) });
                    }}
                    />
                    <h4>Y Intercept</h4>
                    <input
                    type="number"
                    step={0.1}
                    value={this.state.int}
                    min={-10}
                    max={10}
                    onChange={event => {
                      this.setState({ int: parseFloat(event.target.value) });
                    }}
                    />
                  </div>
          }
            
            {this.state.step === 2 && (
              <Button
              outline
              color='primary'
              onClick={() => {
                this.setState({ step: 3 });
              }}
              >
                Plot Estimated Line
              </Button>
            )}
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
          "sim-container",
          {
            title: {
              text: "Least Squares Example"
            },
            xAxis: {
              min: -1,
              max: 8,
              startOnTick: true,
              endOnTick: true
            },
            yAxis: {
              gridLineColor: 'white',

              min: -1,
              max: 8,
              startOnTick: true,
              endOnTick: true
            },
            series: [
              {
                type: "scatter",
                data: this.state.points
              },
              {
                type: "line",
                data: linePoints
              }
            ]
          } 
        )
      });
    } else {
      const copyChart = this.state.chart;
      const newSeries = [
        {
          name: "points",
          type: "scatter",
          data: this.state.points
        },
        {
          name: "line",
          type: "line",
          data: linePoints
        }
      ];
      
      copyChart.update({ series: newSeries });
      
      const scatPoints = this.state.points;
      sumSquares = 0;

      const ph = [];

      if (placeHolders.length > 0) {
        placeHolders.forEach(point => {
          point.destroy();
        })
      }

      for (let i = 1; i <= this.state.pointSize; i++) {
        const lineY = linePoints[i];
        const lineX = i;
        const diff = scatPoints[i] - lineY;
        const xBox = lineX;
        const yBox = diff > 0 ? scatPoints[i] : lineY;
        const firstL =  14 * Math.abs(diff);
        const secondL = 14 * Math.abs(diff);
        sumSquares += diff * diff;
        
        if (this.state.step > 2) {
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
    
  generatePoints(slope, int) {
    let points = [null];

    for (let i = 1; i <= this.state.pointSize; i++) {
      points[i] = (int + i * slope);
    }
    if (this.state.step <= 2) {
      points = [null, null, null, null, null, null, null, null, null, null];
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
