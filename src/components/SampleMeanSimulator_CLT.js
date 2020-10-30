import React, { Component } from "react";
import {Button, Input } from 'reactstrap';
import math from "mathjs";

const NUMBER_OF_STEPS = 10;

class SampleMeanSimulator_CLT extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ciLevel: this.props.conLevel,
        zScore:this.props.zScore,
      numberResamples: 0,
      resampleSize: 0,
    };
  }
  render() {
    // console.log(this.state);
    return (
      <div>
        <div style={{ float: "center" }}>
          <span> Sample Size: </span>{" "}
          <Input
            min={2}

            type="number"
            placeholder="Sample Size"
            onKeyPress={e => this.onKey(e)}
            onChange={event => {

              this.props.setsamplesize(event);
              //this.props.setDOF(event.target.value);
              this.setState({
                resampleSize: event.target.value
              });

            }}
            value={this.state.resampleSize}
          />
        </div>
        <div style={{ float: "center" }}>
          <span> Number of Replications: </span>
          <Input
            min={0}

            type="number"
            placeholder="Number of Replications"
            onKeyPress={e => this.onKey(e)}
            onChange={event => {
              this.setState({
                numberResamples: event.target.value
              });
            }}
            value={this.state.numberResamples}
          />
        </div>
        <div style={{ float: "center" }}>
          <Button
            onClick={() => {
              this.runSim(
                this.state.resampleSize,
                this.state.numberResamples,
                this.props.population,
                this.props.sample,
                this.props.clear
              );

            }}
            disabled={
              this.timer ||
              !this.state.numberResamples ||
              !this.state.resampleSize ||
              this.state.resampleSize < 1 ||
              this.state.numberResamples < 1
            }
          >
            {" "}
            Run{" "}
          </Button>
        </div>
      </div>
    );
  }

  onKey(e) {
    if (
      e.key === "Enter" &&
      !this.timer &&
      this.state.numberResamples &&
      this.state.resampleSize &&
      this.state.resampleSize >= 1 &&
      this.state.numberResamples >= 1
    ) {
      this.runSim(
        this.state.resampleSize,
        this.state.numberResamples,
        this.props.population,
        this.props.sample,
        this.props.clear
      );
    }
  }

  runSim(resampleSize, numberResamples, population, callback, clear) {
    clear();
    let n = 0;
    const step = Math.max(numberResamples / NUMBER_OF_STEPS, 1);
    this.timer = setInterval(() => {
      n += step;
      this.resample(resampleSize, numberResamples, population, callback, n);
    }, 200);
  }

  resample(resampleSize, numberResamples, population, callback, n) {
    let samplePop = [];
    const sampleMeans = [];
    for (let i = 0; i < numberResamples / NUMBER_OF_STEPS; i++) {
      for (let j = 0; j < resampleSize; j++) {
        const r = Math.floor(Math.random() * population.length);
        samplePop.push(population[r][0]);
      }
      const sampleMean = math.mean(samplePop);
      const sd = math.std(samplePop);
      console.log(this.props.zScore);
      const upperConf = (sampleMean + ( (this.props.zScore * sd) / Math.sqrt(resampleSize)) );
      const lowerConf = (sampleMean - ( (this.props.zScore * sd) / Math.sqrt(resampleSize)) );
      const label = (this.props.mean >= lowerConf && this.props.mean <= upperConf) ? 'yes' : 'no' ;
      sampleMeans.push([resampleSize, sampleMean, sd, lowerConf, upperConf, label]);
      samplePop = [];
    }
    callback(
      sampleMeans
    );
    if (n >= numberResamples) {
      clearInterval(this.timer);
      this.timer = 0;
      this.setState({});
    } //this is a dummy setstate just to cause a rerender
  }
}
export default SampleMeanSimulator_CLT;
