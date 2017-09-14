import React, {Component} from 'react';
import math from "mathjs"


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
                <input type="number" placeholder="Resample Size" onChange={(event) => {this.setState({resampleSize:Math.max(event.target.value, 1)})}} value={this.state.resampleSize}/>
                <input type="number" placeholder="Number of Resamples" onChange={(event) => {this.setState({numberResamples:Math.max(event.target.value, 1)})}} value={this.state.numberResamples}/>
                <button onClick={()=>{this.runSim(this.state.resampleSize, this.state.numberResamples, this.props.population, this.props.sample)}} disabled={!this.state.numberResamples || !this.state.resampleSize || !this.props.population || this.props.population.length < 1000}> Run </button>
            </div>
        )
    }

    runSim(resampleSize, numberResamples, population, callback){
        const NUMBER_OF_STEPS = 10;
        let n = 0;
        const step = population.length / NUMBER_OF_STEPS;
        this.timer = setInterval(()=>{
            n += step;
            this.resample(resampleSize, numberResamples, population, callback, n);
        }, 200);
    }
    resample(resampleSize, numberResamples, population, callback, n){
        let samplePop = [];
        for (let i = 0; i < numberResamples;i++){
            for (let j = 0; j < resampleSize; j++){
                let r = Math.floor(Math.random() * population.length);
                samplePop.push(population[r]);
            }
            let sampleMean = math.mean(samplePop);
            callback(sampleMean)
            samplePop = [];
        }
        n >= numberResamples && clearInterval(this.timer);
    }
}
export default SampleMeanSimulator
