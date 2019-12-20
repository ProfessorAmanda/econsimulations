import React from 'react';
import Collapsable from '../Collapsable.js';
import ChartContainer from '../ChartContainer.js';
import ToggleStandard from '../ToggleStandard.js';
import SampleMeanChart from '../SampleMeanChart.js'
import SampleAreaCLT from './SampleAreaCLT.js'
import SampleMeanSimulator from '../SampleMeanSimulator.js'
import math from 'mathjs';
import { Alert, Button, Col, Row, Table } from 'reactstrap';

let xvalue = [];

class Mystery extends React.Component {
    constructor(props){
        super(props);

        this.state = {
          popDict:[],
            numberResamples : {
                "Normal": 0,
                "Uniform": 0,
                "Exponential": 0,
                "Chi-Squared": 0,
                "Mystery": 0
            },
            resampleSize : {
                "Normal": 0,
                "Uniform": 0,
                "Exponential": 0,
                "Chi-Squared": 0,
                "Mystery": 0
            },

            clearedArray: [],

            sampleMean: [],
            sampled: [],
            mainSampleSize: this.props.mainSampleSize,
            popArray: [],
            standardNormal : 0,
            sampleSize : 1,
            disableSample : false,
            popType: 'Mystery'
        }

        this.handleInputSampleSize = this.handleInputSampleSize.bind(this);

        this.changeStage = this.changeStage.bind(this);
        this.sum = this.sum.bind(this);
    }

    handleInputSampleSize(event){
      this.setState({
        sampleSize : event.target.value
      });
    }

    changeStage(stage) {
        this.setState({stage: stage});
    }

    sum(pop){
        let val = 0
        for (const i of pop){
            if (i){
                val += i
            }
        }
        return val;
    }

    generateMystery(){

      if (this.state.popArray.length >= this.state.mainSampleSize){
          return null;
      }

      const popArray = [];

      const firstMEAN = 70;
      const firstSTANDARD_DEV = 3;
      const firstITERATES = 9;
      const firstrange = Math.sqrt(12) * firstSTANDARD_DEV * firstSTANDARD_DEV;
      const firstpopMin = firstMEAN - (firstrange / 2);
      const secondMEAN = 55;
      const secondSTANDARD_DEV = 2;
      const secondITERATES = 9;
      const secondrange = Math.sqrt(12) * secondSTANDARD_DEV * secondSTANDARD_DEV;
      const secondpopMin = secondMEAN - (secondrange / 2);

      const sampleSize = this.props.mainSampleSize;

      const newCleared = this.state.clearedArray;
      const stateCopy = this.state.popDict;


      for (let i = 0; i < sampleSize/2; i++){
        let sum = 0;
        if(this.state.clearedArray.length === 0){
            for (let j = 0; j < firstITERATES; j++){
                sum += Math.random() * firstrange + firstpopMin;
            }
        }
        else{
            sum = newCleared.pop() * firstITERATES;
        }
        if (this.state.popDict[Math.round(sum / firstITERATES * 10)]){
            stateCopy[Math.round(sum / firstITERATES * 10)] += 1
        }
        else {
            stateCopy[Math.round(sum / firstITERATES * 10)] = 1
        }
        popArray.push(Math.round((sum / firstITERATES)*100)/100)
    }

    for (let i = 0; i < sampleSize/2; i++){
        let sum = 0;
        if(this.state.clearedArray.length === 0){
            for (let j = 0; j < secondITERATES; j++){
                sum += Math.random() * secondrange + secondpopMin;
            }
        }
        else{
            sum = newCleared.pop() * secondITERATES;
        }
        if (this.state.popDict[Math.round(sum / secondITERATES * 10)]){
            stateCopy[Math.round(sum / secondITERATES * 10)] += 1
        }
        else {
            stateCopy[Math.round(sum / secondITERATES * 10)] = 1
        }
        popArray.push(Math.round((sum / secondITERATES)*100)/100)
    }
    if(this.state.clearedArray.length > 0){
      const tempCleared = this.state.clearedArray;
      tempCleared = newCleared;
      this.setState({clearedArray : tempCleared});
    }

    const finalPopArray = [];

    let count = Array(sampleSize).fill(-1);
    for (let i = 0; i < sampleSize; i++){

        let val = popArray[i];

        if (count[Math.round(val * 10)] !== -1){
            count[Math.round(val * 10)] += 1;
        }
        else {
            count[Math.round(val * 10)] = 1;
        }

        finalPopArray.push([(Math.round(val * 10)/10), count[Math.round(val * 10)] ])
        xvalue.push((Math.round(val * 10)/10))
    }

    finalPopArray.sort(() => Math.random() - 0.5);
    finalPopArray.sort((a,b) => b[1] - a[1]);
    this.setState({
        popMean: math.mean(finalPopArray.map(p => p[0]))
    })

    return finalPopArray
  }


  sample(size, popArray) {
      const sampled = []

      while (sampled.length < size){
          // index to sample ?
          const r = Math.round(Math.random() * (popArray.length - 1))
          let shouldSample = true;
          for (let i = 0; i < sampled.length; i++){
              if (sampled[i][0] === r) {
                  shouldSample = false;
              }
          }
          if (shouldSample) {
              // only pushes if shouldSample is true
              sampled.push(popArray[r]);
          }
      }

      return { pop: sampled, mue: Math.round(math.mean(sampled.map(p => p[0])) * 100)/100 };
  }

    updateSampleMeansFromArray(means){
        let sampleMeans = this.state.sampleMean;
        const roundedMeans = means;
        sampleMeans = sampleMeans.concat(roundedMeans);
        this.setState({calculable: false,
            sampleMean: sampleMeans
        })
    }

    componentDidUpdate() {
        if (this.state.popArray.length <= 0 && this.state.stage === 1) {
            this.setState({
                popArray: this.generateMystery()
            })
        }
    }

    componentDidMount() {
        this.setState({
            stage: 1
        })
    }

    render() {
        return (
            <div>
                <Collapsable
                    stage={[0, 1, 2]}
                    changeStage={this.changeStage}
                    parentStage={this.state.stage}
                >
                    <div>
                        {
                            this.state.stage >= 1 ?
                                <div>
                                    <div>
                                    <ChartContainer
                                        popArray={this.state.popArray}
                                        popMean={this.state.popMean}
                                        sampled={this.state.sampled}
                                        popType={'Mystery'}
                                        mainSampleSize={this.state.mainSampleSize}
                                        />

                                    <Button
                                        color="success"
                                        onClick={() => {
                                            this.setState({
                                                stage: 2
                                            })
                                        }}
                                        >Continue
                                    </Button>
                                        {
                                            this.state.stage >= 2 ?
                                        <span>
                                        <Row>
                                            <Col
                                                lg="8">
                                                <ToggleStandard
                                                    section={this.state.standardNormal}
                                                    toggleSwitch={(set) => {
                                                        this.setState({
                                                            standardNormal : set
                                                        })
                                                    }}
                                                />
                                                <SampleMeanChart
                                                    numberResamples={this.state.numberResamples}
                                                    resampleSize={this.state.resampleSize[this.state.popType]}
                                                    mean={this.state.popMean}
                                                    sd={math.std(xvalue)}
                                                    normalized={this.state.standardNormal}
                                                    sampleSize={this.state.sampleSize}
                                                    type={this.state.popType}
                                                    normal={this.state.standardNormal}
                                                    sampleMeans={this.state.sampleMean}
                                                />
                                            </Col>
                                            <Col
                                                lg="4">

                                            <Alert color='light'>
                                                <p>Try drawing some samples and calculating means </p>
                                                <SampleAreaCLT
                                                    disabled={this.state.disableSample}
                                                    redraw={() =>
                                                        {}
                                                    }
                                                    sample={(size) => {
                                                        const sampleObject = this.sample(size, this.state.popArray);

                                                        this.setState({
                                                            sampled: sampleObject.pop
                                                        });
                                                        return sampleObject;

                                                    }}
                                                    popArray={this.state.popArray}
                                                    popType={this.state.popType}
                                                    setmean={(size, mue) => {
                                                        const means = this.state.sampleMean;
                                                        means.push([size, mue]);
                                                        this.setState({sampleMean: means});
                                                    }}
                                                    />
                                            </Alert>
                                            <Table hover className="PopTable">
                                                    <thead>
                                                        <tr>
                                                            <th>Sample</th>
                                                            <th>Size</th>
                                                            <th>Mean</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                    {this.state.sampleMean && this.state.sampleMean.map( (mean, index) => (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{mean[0]}</td>
                                                            <td>{Math.round(mean[1] * 10) / 10}</td>
                                                        </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                                </Col>
                                            </Row>
                                            <Row style={{width: "60%", margin:'auto'}}>
                                                <Alert color='light' className="Center">
                                                    <Alert color="primary" style={{width: "50%", margin: 'auto'}}>
                                                        <p> Simulate drawing many many samples </p>
                                                    </Alert>
                                                    <SampleMeanSimulator
                                                        setsamplesize={this.handleInputSampleSize}
                                                        style={{margin: 'auto'}}
                                                        clear={() => {
                                                            this.setState({
                                                                calculable: false,
                                                                sampleMean: []
                                                            })}
                                                        }
                                                        population={this.state.popArray}
                                                        popType={this.state.popType}
                                                        sample={(means) => {
                                                            console.log('means', means);
                                                            this.updateSampleMeansFromArray(means);
                                                            this.setState({disableSample : true});
                                                        }}
                                                    />
                                                </Alert>
                                            </Row>
                                        </span>
                                            :
                                            <div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            :
                                <div></div>
                            }
                    </div>
                </Collapsable>
            </div>
        )
    }
}
export default Mystery;
