import React, { Component } from 'react';
import math from "mathjs";
import Highcharts from "highcharts";
import { Collapse, Card, CardBody } from 'reactstrap';
import '../dark-unica.css';
import '../boost.js';

class SimulateSamples extends Component {
    constructor(props){
        super(props);
        this.state = {
            sampled: [],
            meanDiffs: [],
            chart: undefined,
            type: '',
            started: false,
            collapsed: true
        }
    }

    componentDidUpdate() {
        if (this.state.sampled.length <= 0) {
            this.dropPoints(this);
        }
    }

    componentDidMount() {
        this.myChart = Highcharts.chart('sim-container', {
            chart: {
                type: 'line'
            },
            plotOptions: {
                series: {
                    animation: {
                        duration: 100,
                        easing: 'easeOutBounce'
                    }
                }
            },
            title: {
                text: `Population vs Sample Means <br /> (${this.props.type})`,
            },
            xAxis: {
                title : {
                    enabled: true,
                    text: 'Sample Size'
                },
                min: 0,
                max: 1000,

            },
            yAxis: {
                // min: yMin,
                // max: yMax,
                title: {
                    text: 'Mean'
                }
            },
            tooltip: {
                enabled: true
            },
            series: [{name: 'Population Mean', type: 'line', data: []}, {name: 'Sampled Means', data: this.state.sampled }]
        })

        if (this.state.sampled.length <= 0) {
            this.dropPoints(this);
        }
    }

    samplePoint() {
        this.setState((prev) => {
            const parr = prev.sampled ? prev.sampled.slice() : [];
            parr.push(this.last);
            return {
                sampled: parr
            }
        })
      }

    dropPoints(that) {
        let n = 0;
        this.timer = setTimeout(function run() {
            n++;
            let tmp = that.props.sample(n)
            const series = that.myChart.series[1];
            const x = Math.round(math.mean(tmp.map(p => p[0])) * 100)/100
            if (x) {
                series.addPoint({ y: x}, true, false, false);
                that.myChart.series[0].addPoint( {y: that.props.pop}, true, false, false);
                that.last = x;
                that.samplePoint();
            }
            if (series.data.length < 1000 ) {
                setTimeout(run, 0)
            }
            else {
                clearInterval(that.timer);
            }
        }, 0);
      }

    render(){
        return(
            <div>
            <Collapse isOpen={true}>
                {/* { !this.state.started && <Spinner size="sm" color="primary"/> } */}
                    <Card outline style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>
                        <CardBody style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>
                            <div id="sim-container" style={{ height: '50vh'}}/>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}

export default SimulateSamples;
