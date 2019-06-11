import React, { Component } from 'react';
import math from "mathjs";
import Highcharts from "highcharts";
import { Collapse, Button, ButtonGroup, Card, CardBody, Spinner } from 'reactstrap';

class SimulateSamples extends Component {
    constructor(props){
        super(props);
        this.state = {
            sampleMeans: [],
            meanDiffs: [],
            chart: undefined,
            type: '',
            started: false,
            collapsed: true,
            stage: this.props.stage
        }
    }

    componentDidMount() {
        if (this.state.stage >= 4) {
            if (!this.state.chart) {
                this.setState({
                    chart:undefined, 
                    sampleMeans:[],
                    meanDiffs:[], 
                    type:''
                });
                this.simulate()
            }
            this.setState({
                collapsed: false,
            });
        }
    }
    render(){
        return(
            <div>
                { this.state.collapsed ? 
                <Button 
                    color='primary'
                    disabled={this.timer} 
                    onClick={() => {
                        if (this.state.collapsed) {
                            if (!this.state.started) {
                                this.setState({
                                    chart:undefined, 
                                    sampleMeans:[],
                                    meanDiffs:[], 
                                    type:''
                                }); 
                                this.simulate()
                            }
                            this.setState({
                                collapsed: false,
                            })
                        }
                        else {
                            this.setState({
                                collapsed: true
                            })
                        }
                    }
                }>
                    Show Simulation 
                </Button> 
                : <ButtonGroup style={{ marginBottom: '1em'}}>
                    <Button 
                color='secondary'
                disabled={this.timer} 
                onClick={() => {
                    this.setState({
                        collapsed: true
                    })
                }
            }> 
                Hide Simulation 
            </Button> 
             <Button 
             color='info'
             disabled={this.timer} 
             onClick={() => {
                this.setState({
                    chart:undefined, 
                    sampleMeans:[],
                    meanDiffs:[], 
                    type:'',
                    started: false
                }); 
                this.simulate()
                }
            }> 
             New Simulation 
         </Button> 
            </ButtonGroup>
            

            }
            <Collapse isOpen={!this.state.collapsed}>
                { !this.state.started && <Spinner size="sm" color="primary"/> }
                    <Card outline style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>
                        <CardBody style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>
                            <div id="sim-container" style={{ display: this.state.started ? 'block' : 'none'}}/>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }


    simulate(){
        this.chart();
        this.props.setStage(4);
        setTimeout(() => {
            this.setState({
                started: true,
                collapsed: false
            });

            let n = 1;
            // iterations of this add points to the graph
            this.timer = setInterval( () => {
                this.calculate(n, this.props.pop);
                this.chart();
                n += 1;
                if (n === 101) {
                    clearInterval(this.timer);
                    this.timer = null;
                    this.setState({});
                }
            }, 10);
        }, 2000);
    }

    chart(){
        const popMeanSeries = {name: "Population Mean", data: []};
        const sampleMeanSeries = {name: "Sample Means", data : []};
        const popType = this.props.type;
        // making arrays null
        for (let i = 0; i < 100; i++){
            popMeanSeries.data[i] = null;
            sampleMeanSeries.data[i] = null;
        }
        // called over and over
        for (let i = 0; i < this.state.sampleMeans.length; i++){
            popMeanSeries.data[i] = Math.round(math.mean(this.props.pop) * 10) / 10;
            sampleMeanSeries.data[i] = this.state.sampleMeans[i];
        }
        if (!this.state.chart) {
            const myCategories = [];
            // this is x axis
            for (let i=0; i < 50; i++){
                myCategories[i]= (2 * (i+1));
            }
            for (let i=50; i < 100; i++){
                myCategories[i]= 100 + (18 * (i-49));
            }

            const values = { 
                Uniform: { ymax: 110, ymin: 40},
                Normal: { ymax: 85, ymin: 68 },
                Exponential: { ymax: 90, ymin: 40 },
                'Chi-Squared': { ymax: 10, ymin: 6 }
            };

            const yMax = values[this.props.type].ymax;
            const yMin = values[this.props.type].ymin;
            // const yMax = this.props.type === "Chi-Squared" ? 10 : this.props.type === "Exponential" ? 90 : 67;
            // const yMin = this.props.type === "Chi-Squared" ? 6 : this.props.type === "Exponential" ? 40 : 61
            this.setState({chart: Highcharts.chart('sim-container', {
                            chart: {
                                type: 'line'
                            },
                            title: {
                                text: `Population vs Sample Means <br /> (${popType})`,
                            },
                            xAxis: {
                                categories: myCategories,
                                title : {
                                    enabled: true,
                                    text: 'Sample Size'
                                },
                                startOnTick: true,
                                endOnTick: true,
                                showLastLabel: true

                            },
                            yAxis: {
                                // min: yMin,
                                // max: yMax,
                                title: {
                                    text: 'Mean'
                                }
                            },
                            tooltip: {
                              enabled: false
                            },
                            plotOptions: {
                              series: {
                                point: {
                                  events: {
                                    mouseOver: function() {
                                    //   console.log('hehehe');
                                    }
                                  }
                                }
                              }
                            },
                            series: [popMeanSeries, sampleMeanSeries]
                            })});
        } else {
            this.state.chart.update({series:[popMeanSeries, sampleMeanSeries]});
        }
    }

    calculate(n, pop){
        for (let i = n; i < n + 1; i++){
            // controls size!!!  still need to change the x-axis though
            //let size = pop.length / 200 * i;
            let size;
            if(i < 50){
              size = 2 * i;
            }
            else{
              size = 100 + (18 * (i-50));
            }
            const sample = this.props.sample(size, pop);
            const vals = [];
            for (const j of sample){
                vals.push(pop[j[0]]);
            }
            // adds pop means to this.state.sampleMeans
            this.state.sampleMeans.push(Math.round(math.mean(vals) * 10) / 10);
            this.state.meanDiffs.push(this.state.popMean - math.mean(vals));
        }

    }
}

export default SimulateSamples;
