import React, { Component } from 'react';
import '../../styles/dark-unica.css';
import Highcharts from 'highcharts';
import 'highcharts/modules/annotations';
import { Alert, Container, Col, Row } from 'reactstrap';


require("highcharts/modules/annotations")(Highcharts);


class ChartContainer extends Component {
  constructor(props) {
    super(props);
    // const popMean = this.state.popMean[popType];
    this.state = {
        speed: 100,
        popMean: this.props.popMean,
        popArray: this.props.popArray,
        sampled: [],
        done: false,
        values: {
            Normal: { xmaxval: 81, xminval: 55, ymaxval: 40, title: "Milk Production", xLabel: "Gallons" },
            Uniform: { xmaxval: 74, xminval: 56, ymaxval: 25, title: "Alien Female Height", xLabel: "Height (in)"},
            Exponential: { xmaxval: 400, xminval: 0, ymaxval: 10, title: "Duration of Telemarketer Call", xLabel: "Duration (seconds)"},
            "Chi-Squared": {xmaxval: 25, xminval: 0, ymaxval: 40, title: "Money Spent on Lunch", xLabel: "Dollars"}
        },
        texts: {
            Normal: ["monthly Milk Production", "cows"],
            Uniform: ['the height', 'Alien Females from planet Stata'],
            Exponential: ["duration", "Telemarketer Calls"],
            "Chi-Squared": ["expenditure", "workers on lunch"]
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
        series: [{name: 'Population', data: this.props.popArray}, {name: 'Samples', data: this.state.sampled}],
        boost: {
            enabled: true,
            useGPUTranslations: true
        },

      });

      this.dropPoints(this);
  }

  insertPoint() {
    this.setState((prev) => {
        const parr = prev.popArray ? prev.popArray.slice() : [];
        parr.unshift(this.last);
        return {
            popArray: parr
        }
    })
  }

  samplePoint() {
    this.setState((prev) => {
        const parr = prev.sampled ? prev.sampled.slice() : [];
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
      console.log(this.props.popArray);
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
      var that = this;

      if (this.state.popArray.length <= 0) {
            this.faster();
            this.myChart.series[0].setData(that.props.popArray, true, true, true)
      }

        if (prevState.sampled !== this.props.sampled) {
            this.myChart.series[1].setData(that.props.sampled, true, true, true);
        }
  }

  render() {
    return (
      <div>
           <Container fluid >
               <Row>
                   <Alert color="secondary" className="Center">
                        <p>We queried the {this.state.texts[this.props.popType][0]} of {this.props.popArray.length} {this.state.texts[this.props.popType][1]} and plotted the results on the following chart.</p>
                        <p>The population mean is {Math.round(this.state.popMean * 1000)/1000}.</p>
                    </Alert>
               </Row>
                <Row >
                    <Col lg="12">
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
