import React, { Component } from 'react';
import '../dark-unica.css';
import Highcharts from 'highcharts';
import 'highcharts/modules/annotations';
import { Alert, Container, Col, Row } from 'reactstrap';
import PopTable from './PopTable.js'
import '../boost.js';
import math from 'mathjs';

require("highcharts/modules/annotations")(Highcharts);


class ChartContainer extends Component {
  constructor(props) {
    super(props);
    // const popMean = this.state.popMean[popType];
    this.state = {
        speed: 50,
        popMean: this.props.popMean,
        popArray: this.props.popArray,
        sampled: [],
        done: true,
        values: {
            Normal: { xmaxval: 74, xminval: 56, ymaxval: 40, title: "Milk Production", xLabel: "Gallons" },
            Uniform: { xmaxval: 74, xminval: 56, ymaxval: 25, title: "Wait Time at the DMV in VT", xLabel: "Minutes (min)"},
            Exponential: { xmaxval: 400, xminval: 0, ymaxval: 10, title: "Duration of Telemarketer Call", xLabel: "Duration (seconds)"},
            "Chi-Squared": {xmaxval: 25, xminval: 0, ymaxval: 40, title: "Money Spent on Lunch", xLabel: "Dollars"},
            Mystery: { xmaxval: 80, xminval: 50, ymaxval: 40, title:"Alien Female Height", xLabel: "Height (in)"}
        },
        texts: {
            Normal: ["monthly Milk Production", "cows","produced", " gallons a month."],
            Uniform: ['the wait time', 'people at the DMV in VT', "reported a total time of", " minutes."],
            Exponential: ["duration", "Telemarketer Calls","reported a duration of", " seconds on a call."],
            "Chi-Squared": ["expenditure", "workers on lunch","reported an expenditure of"," dollars on lunch."],
            Mystery: ['the height', 'Alien Females from planet Stata', "reported a height of", " inches."],
        }
    };

    this.insertPoint = this.insertPoint.bind(this);
    this.faster = this.faster.bind(this);

}

componentDidMount() {
    const { xmaxval, xminval, ymaxval, title, xLabel } = this.state.values[this.props.popType];

      this.myChart = Highcharts.chart('container', {
        chart: {
            type: 'scatter',
        },
        plotOptions: {
            series: {
                animation: {
                    duration: 100,
                    easing: 'easeOutBounce'
                }
            }
        },
        legend: {
            symbolHeight: 12,
            symbolWidth: 12,
            symbolRadius: 6
        },
        xAxis: {
            min: xminval,
            max: xmaxval,
            title : {
                enabled: true,
                text: xLabel
            },
            startOnTick: true,
            endOnTick: true
        },
        title: {
            text: `${title}`
        },
        yAxis: {
            max: ymaxval,
            startOnTick: true,
            endOnTick: true,
            title: {
                text: 'Count'
            }
        },
        tooltip: {
            enabled: true,
            pointFormat: `${xLabel}: <b>{point.x}<b><br />`
        },
        series: [{name: 'Population Observations', data: this.props.popArray}, {name: 'Sampled Observations', data: this.state.sampled}],
        boost: {
            enabled: true,
            useGPUTranslations: true
        },

      });

      //this.dropPoints(this);
  }


  insertPoint() {
    this.setState((prev) => {
        const parr = prev.popArray ? prev.popArray.slice() : [];
        console.log(parr);
        parr.unshift(this.last);
        return {
            popArray: parr
        }
    })
  }

  samplePoint() {
    this.setState((prev) => {
        const parr = prev.sampled ? prev.sampled.slice() : [];
        console.log(parr);
        parr.unshift(this.last);
        return {
            sampled: parr
        }
    })
  }

  faster() {
    this.myChart.title.update({
        text: `${this.state.values[this.props.popType].title} <br /> Population Mean: ${Math.round(this.props.popMean * 100) / 100}`
    });


    this.setState({ popArray: this.props.popArray })
  }

  dropPoints(that) {
    let tmp = this.props.popArray.slice();
    const ymaxval = this.state.values[this.props.popType].ymaxval;
    this.timer = setTimeout(function run() {
      const series = that.myChart.series[0];
      const x = tmp.pop();
      if (x) {
          series.addPoint({name:x[1], id: 'asd', x: x[0], y: ymaxval}, true, false, false);
          const point = series.data.find(d => d.id === 'asd');
          point.update({y: point.name, id: ''});
          that.last = x;
          that.insertPoint();
      }
      if (series.data.length < that.props.popArray.length && !that.state.done) {
          setTimeout(run, that.state.speed)
      }
      else {
          that.faster();
          series.setData(that.props.popArray, true, true, true)
          clearInterval(that.timer);
      }
    }, 0);
  }

  componentDidUpdate(prevState) {
      //const { xmaxval, xminval, ymaxval, title, xLabel } = this.state.values[this.props.popType];
      var that = this;

      if (this.state.popArray.length <= 0) {
          this.dropPoints(that);
      }

        if (prevState.sampled !== this.props.sampled) {
            this.myChart.series[1].setData(that.props.sampled, true, true, true);
            if (this.line) {
                this.line.destroy();
            }
            this.line = this.myChart.renderer.rect(that.myChart.xAxis[0].toPixels(math.mean(that.props.sampled.map(p => p[0]))), 200 , 1, 100)
            .attr({
                'stroke-width': 1,
                stroke: 'orange',
                zIndex: 3
            })
            .add();
        }

        // this.myChart = Highcharts.chart('container', {
        //   chart: {
        //       type: 'scatter',
        //   },
        //   plotOptions: {
        //       series: {
        //           animation: {
        //               duration: 100,
        //               easing: 'easeOutBounce'
        //           }
        //       }
        //   },
        //   legend: {
        //       symbolHeight: 12,
        //       symbolWidth: 12,
        //       symbolRadius: 6
        //   },
        //   xAxis: {
        //       min: xminval,
        //       max: xmaxval,
        //       title : {
        //           enabled: true,
        //           text: xLabel
        //       },
        //       startOnTick: true,
        //       endOnTick: true
        //   },
        //   title: {
        //       text: `${title}`
        //   },
        //   yAxis: {
        //       max: ymaxval,
        //       startOnTick: true,
        //       endOnTick: true,
        //       title: {
        //           text: 'Count'
        //       }
        //   },
        //   tooltip: {
        //       enabled: true,
        //       pointFormat: `${xLabel}: <b>{point.x}<b><br />`
        //   },
        //   series: [{name: 'Population Observations', data: this.props.popArray}, {name: 'Sampled Observations', data: this.state.sampled}],
        //   boost: {
        //       enabled: true,
        //       useGPUTranslations: true
        //   },
        //
        // });

  }

  render() {
    return (
      <div>
           <Container fluid style={{marginBottom: "2vh"}}>
               <Row>
                   <Alert color="secondary" className="Center">
                        <p>We queried the {this.state.texts[this.props.popType][0]} of {this.props.popArray.length} {this.state.texts[this.props.popType][1]} and plotted the results on the following chart.</p>
                    </Alert>
               </Row>
                <Row >
                    <Col lg="2">
                        <PopTable
                            samples={this.props.sampled}
                            popArray={this.props.popArray}
                            popType={this.props.popType}
                        />
                    </Col>
                    <Col lg="8">
                        {
                            <div id="container" className="Center" />
                        }
                    </Col>
                </Row>
            </Container>
      </div>
    )
  }
}

export default ChartContainer


/*
//Taken from around line 182 this is meant to report each point as it is plotted,
Include when the rain feature works correctly.

<Alert color="success" className="Center">
    <p>Subject number {this.state.popArray.length} {this.state.texts[this.props.popType][2]} {this.state.popArray[0]}{this.state.texts[this.props.popType][3]}</p>
</Alert>

This is the code to add the rainfall feature to the population distribution. removed from
around line 199, note this sets state to true, so it could originally be false in line 22
<Col lg="2">
    <Label className="text-muted" for="speed">Pick a plotting speed</Label>
    <Input
        id="speed"
        type="range"
        min="1"
        max="2000"
        step="-50"
        value={2000 - this.state.speed}
        onChange={(event) => {
            this.setState({
                speed: (2000 - event.target.value)
            })
        }}
    />
    <Button
        onClick={() => {
            this.setState({
                done: true
            }, () => {

            });
        }}
    >Finish</Button>

</Col>
*/
