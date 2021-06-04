import React, { Component } from 'react';
import { Button, Container, Input, Row } from 'reactstrap';
import { sqrt, max, floor, random, mean, round } from "mathjs";

class SampleAreaCLT extends Component {
    constructor(props){


        super(props);

        this.state = {
            zORt:this.props.distribution,
            sampleSize: undefined,
            popMean: undefined,
            ciLevel: this.props.conLevel,
            zScore:this.props.zScore,
            resampleSize: 0
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, field) {
        this.setState({[field]: event.target.value});
    }

    render() {


        return (
            <div>
                 <Container>

                    <Row className="Center">
                        <Row>


                            <Input
                                style={{margin: 'auto'}}
                                type="number"
                                min={2}
                                max={101}
                                value={this.state.sampleSize}
                                //max={this.props.popArray.length}
                                onChange={(event) => {
                                    this.setState({
                                        sampleSize: event.target.value
                                    })
                                }}
                            />

                            <Button
                                style={{margin: 'auto'}}
                                disabled={!this.state.sampleSize || this.state.sampleSize > this.props.popArray.length || this.state.sampleSize < 1}
                                onClick={()=> {

                                    const sampleObject = this.props.sample(this.state.sampleSize);
                                    const mue = this.props.distribution === 'z'? 64:sampleObject.mue;
                                    const sd = sampleObject.sd;
                                    const upperConf = (mue + ( (this.props.zScore* sd) / sqrt(this.state.sampleSize)) );
                                    const lowerConf = (mue - ( (this.props.zScore * sd) / sqrt(this.state.sampleSize)) );
                                    const label = (this.props.mean >= lowerConf && this.props.mean <= upperConf) ? 'yes' : 'no' ;
                                    this.setState({
                                        popMean: mue
                                    });
                                    this.props.setmean(this.state.sampleSize, mue, sd, lowerConf, upperConf, label);
                                }}
                            >
                                Sample
                            </Button>
                        </Row>
                    </Row>
                </Container>
            </div>
        )
    }
    onKey(e) {
        if (e.key === "Enter" && this.state.sampleSize && this.state.sampleSize <= this.props.popArray.length && this.state.sampleSize >= 1) {
            this.props.sample(this.state.sampleSize);
            this.props.redraw();
        }
    }

    runSim(resampleSize, numberResamples, population, callback, clear){
        let n = 0;
        const step = max(numberResamples / 10, 1);
        this.timer = setInterval(()=>{
            n += step;
            this.resample(resampleSize, numberResamples, population, callback, n);
        }, 200);
    }

    resample(resampleSize, numberResamples, population, callback, n){
        let samplePop = [];
        const sampleMeans = [];
        for (let i = 0; i < numberResamples / 10 ;i++){
            for (let j = 0; j < resampleSize; j++){
                const r = floor(random() * population.length);
                samplePop.push(population[r]);
            }
            const sampleMean = mean(samplePop);
            sampleMeans.push([resampleSize, sampleMean]);
            samplePop = [];
        }
        callback(sampleMeans, this.state.resampleSize, this.state.numberResamples);
        if (n >= numberResamples) {clearInterval(this.timer); this.timer = 0; this.setState({})} //this is a dummy setstate just to cause a rerender
    }

    newSample(size, array) {
        const sampled = []
        const currentPop = array;

        while (sampled.length < size){
            // index to sample ?
            const r = round(random() * (currentPop.length - 1))
            let shouldSample = true;
            for (let i = 0; i < sampled.length; i++){
                 if (sampled[i][0] === r) {
                     shouldSample = false;
                 }
            }
            let count = 1;
            currentPop.forEach( (val, index) => {
                if (index < r && round(val * 10) === round(currentPop[r] * 10)) {
                    count += 1;
                }
            });
            // only pushes if shouldSample is true
            shouldSample && sampled.push([r, count]);
        }
        const sampledCopy = sampled;
        const sampleVals = [[]];
        const samplePop = [];
        // console.log(sampledCopy);

        for (const j in sampledCopy){
            sampleVals[j] = [];
            sampleVals[j][0] = round(this.props.popArray[sampledCopy[j][0]] * 10)
            sampleVals[j][1] = sampledCopy[j][1];
            samplePop.push(sampleVals[j][0] / 10)
        }
        // console.log(samplePop);
        return samplePop;
    }
}
export default SampleAreaCLT
