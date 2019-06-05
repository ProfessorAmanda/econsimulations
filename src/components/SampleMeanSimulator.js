import React, {Component} from 'react';
import math from "mathjs"

const NUMBER_OF_STEPS = 10;

class SampleMeanSimulator extends Component{
    constructor(props){
        super(props);
        this.state={
            numberResamples : this.props.numberResamples,
            resampleSize : this.props.resampleSize
        }
    }
    render(){
        // console.log(this.state);
        return(
            <div>
                <div style={{float: "left"}}>
                    <span> Sample Size: </span> <input type="number" placeholder="Sample Size" onKeyPress={(e)=> this.onKey(e)} onChange={(event) => {this.setState({resampleSize : Object.assign(this.state.resampleSize, {[this.props.popType] : event.target.value})})}} value={this.state.resampleSize[this.props.popType]}/>
                </div>
                <div style={{float: "left"}}>
                    <span> Number of Replications: </span><input type="number" placeholder="Number of Replications" onKeyPress={(e)=> this.onKey(e)} onChange={(event) => {this.setState({numberResamples : Object.assign(this.state.numberResamples, {[this.props.popType] : event.target.value})})}} value={this.state.numberResamples[this.props.popType]}/>
                </div>
                <div style={{float: "left"}}>
                    <button onClick={()=>{this.runSim(this.state.resampleSize[this.props.popType], this.state.numberResamples[this.props.popType], this.props.population, this.props.sample, this.props.clear)}}
                    disabled={this.timer || !this.state.numberResamples[this.props.popType] || !this.state.resampleSize[this.props.popType] || this.state.resampleSize[this.props.popType] < 1 || this.state.numberResamples[this.props.popType] < 1}> Run </button>
                </div>
            </div>
        )
    }

    onKey(e) {
        if (e.key === "Enter" && !this.timer && this.state.numberResamples[this.props.popType] && this.state.resampleSize[this.props.popType] && this.state.resampleSize[this.props.popType] >= 1 && this.state.numberResamples[this.props.popType] >= 1) {
            this.runSim(this.state.resampleSize[this.props.popType], this.state.numberResamples[this.props.popType], this.props.population, this.props.sample, this.props.clear)
        }
    }

    runSim(resampleSize, numberResamples, population, callback, clear){
        clear()
        let n = 0;
        const step = Math.max(numberResamples / NUMBER_OF_STEPS, 1);
        this.timer = setInterval(()=>{
            n += step;
            this.resample(resampleSize, numberResamples, population, callback, n);
        }, 200);
    }
    resample(resampleSize, numberResamples, population, callback, n){
        let samplePop = [];
        const sampleMeans = [];
        for (let i = 0; i < numberResamples / NUMBER_OF_STEPS;i++){
            for (let j = 0; j < resampleSize; j++){
                const r = Math.floor(Math.random() * population.length);
                samplePop.push(population[r]);
            }
            const sampleMean = math.mean(samplePop);
            sampleMeans.push(sampleMean);
            samplePop = [];
        }
        callback(sampleMeans, this.state.resampleSize[this.props.popType], this.state.numberResamples[this.props.popType]);
        if (n >= numberResamples) {clearInterval(this.timer); this.timer = 0; this.setState({})} //this is a dummy setstate just to cause a rerender
    }
}
export default SampleMeanSimulator
