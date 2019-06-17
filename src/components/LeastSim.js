import React, { Component } from "react";
import Highcharts from "highcharts";
import { Button, Container, Row, Col } from "reactstrap";

const POINT_SIZE = 5;

let rectOne;
let rectTwo;
let rectThree;
let rectFour;
let sumSquares;

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
      start: 1
    };
  }

  render() {
    this.state.chart && this.show();

    return (
      <Container fluid className="Plate">
        <div className="MiniLogo"></div>
        <Row>
          <Col>
            <span style={{ width: "50%" }} className="Center" id="sim-container" />
          </Col>
        </Row>
            <Button
              outline
              color="primary"
              onClick={() => {
                const one = Math.round(Math.random() * 600) / 100;
                const two = Math.round(Math.random() * 600) / 100;
                const three = Math.round(Math.random() * 600) / 100;
                const four = Math.round(Math.random() * 600) / 100;
                const newPoints = [null, one, two, three, four];
                this.setState({ points: newPoints, step: 1, cleared: 1 });
                if (this.state.step > 1) {
                  // this.setState({isRec : 0});
                  rectOne.destroy();
                  rectTwo.destroy();
                  rectThree.destroy();
                  rectFour.destroy();
                }
                rectOne = null;
                rectTwo = null;
                rectThree = null;
                rectFour = null;
              }}
            >
              New Data
            </Button>
            {this.state.step === 1 ? (
              <p>
                Choose a Slope and Y Intercept for Your Estimated Line
              </p>
            ) : (
              <p>
                Change Slope and Y Intercept to Reduce Sum of Squares
              </p>
            )}
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
            
            {this.state.step !== 1 ? null : (
              <Button
                outline
                color='primary'
                onClick={() => {
                  this.setState({ step: 2 });
                }}
              >
                Generate Regression Line
              </Button>
            )}
            {this.state.step === 1 ? null : (
              <div>
                <h4>
                  Sum of Squares:
                  {this.state.step === 1
                    ? 0
                    : Math.round(sumSquares * 100) / 100}
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
              min: -4,
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
      // const lineMax = copyChart.series[1].dataMax;
      // const lineMin = copyChart.series[1].dataMin;
      // const slope = (lineMax - lineMin) / 4;
      const ids = [null, "first", "second", "third", "fourth"];
      sumSquares = 0;
      for (let i = 1; i < 5; i++) {
        const lineY = linePoints[i];
        const lineX = i;
        const diff = scatPoints[i] - lineY;
        const xBox = diff > 0 ? lineX : lineX;
        const yBox = diff > 0 ? scatPoints[i] : lineY;
        const firstL = 14 * Math.abs(diff);
        const secondL = 14 * Math.abs(diff);
        sumSquares += diff * diff;
        
        // console.log("running this");
        
        if (i == 1 && this.state.step > 1) {
          //console.log(this.state.isRec);
          if (rectOne) {
            rectOne.destroy();
          }
          
          rectOne = copyChart.renderer
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
              zIndex: 1,
              id: ids[i]
            })
            .add();
          } else if (i == 2 && this.state.step > 1) {
            if (rectTwo) {
              rectTwo.destroy();
            }
            
            rectTwo = copyChart.renderer
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
              zIndex: 1,
              id: ids[i]
            })
            .add();
          } else if (i == 3 && this.state.step > 1) {
          if (rectThree) {
            rectThree.destroy();
          }
          
          rectThree = copyChart.renderer
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
              zIndex: 1,
              id: ids[i]
            })
            .add();
          } else if (i == 4 && this.state.step > 1) {
            if (rectFour) {
            rectFour.destroy();
          }

          rectFour = copyChart.renderer
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
              zIndex: 1,
              id: ids[i]
            })
            .add();
          }
        }
        // copyChart.redraw();
      }
    }
    
  generatePoints(slope, int) {
    let points = [];

    for (let i = 0; i < POINT_SIZE; i++) {
      points[i] = int + i * slope;
    }
    if (this.state.step === 1) {
      points = [null, null, null, null, null];
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
    const yPoints = [null, null, null, null];
    for (let j = 1; j < 5; j++) {
      yPoints[j - 1] = this.state.points[j];
    }
    const xPoints = [1, 2, 3, 4];
    const x_sq = [1, 4, 9, 16];
    const xy = [null, null, null, null];
    let m;
    let b;
    for (let i = 0; i < 4; i++) {
      xy[i] = xPoints[i] * yPoints[i];
    }
    m =
      (4 * this.sum(xy) - this.sum(xPoints) * this.sum(yPoints)) /
      (4 * this.sum(x_sq) - this.sum(xPoints) * this.sum(xPoints));
    b = (this.sum(yPoints) - m * this.sum(xPoints)) / 4;
    m = Math.round(m * 10) / 10;
    b = Math.round(b * 10) / 10;
    // console.log(b);
    return [m, b];
  }

  sum(array) {
    const ret = array.reduce((a, b) => a + b, 0);
    return ret;
  }
}
export default LeastSim;
