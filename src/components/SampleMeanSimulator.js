import React, {Component} from 'react';
import math from "mathjs"

const NUMBER_OF_STEPS = 10;

class SampleMeanSimulator extends Component{
    constructor(props){
        super(props);
        this.state={
            numberResamples: undefined,
            resampleSize: undefined
        }
    }
    render(){
        return(
            <div>
                <input type="number" placeholder="Resample Size" onChange={(event) => {this.setState({resampleSize: event.target.value})}} value={this.state.resampleSize}/>
                <input type="number" placeholder="Number of Resamples" onChange={(event) => {this.setState({numberResamples:event.target.value})}} value={this.state.numberResamples}/>
                <button onClick={()=>{this.runSim(this.state.resampleSize, this.state.numberResamples, this.props.population, this.props.sample)}} disabled={this.timer || !this.state.numberResamples || !this.state.resampleSize || !this.props.population || this.props.population.length < 1000 || this.state.resampleSize < 1 || this.state.numberResamples < 1}> Run </button>
            </div>
        )
    }

    runSim(resampleSize, numberResamples, population, callback){
        let n = 0;
        const step = Math.max(numberResamples / NUMBER_OF_STEPS, 1);
        this.timer = setInterval(()=>{
            n += step;
            this.resample(resampleSize, numberResamples, population, callback, n);
        }, 200);
    }
    resample(resampleSize, numberResamples, population, callback, n){
        let samplePop = [];
        let sampleMeans = [];
        for (let i = 0; i < numberResamples / NUMBER_OF_STEPS;i++){
            for (let j = 0; j < resampleSize; j++){
                let r = Math.floor(Math.random() * population.length);
                samplePop.push(population[r]);
            }
            let sampleMean = math.mean(samplePop);
            sampleMeans.push(sampleMean);
            samplePop = [];
        }
        callback(sampleMeans);
        if (n >= numberResamples) {clearInterval(this.timer); this.timer = 0; this.setState({numberResamples: numberResamples})} //this is a dummy setstate just to cause a rerender
    }
}
export default SampleMeanSimulator
