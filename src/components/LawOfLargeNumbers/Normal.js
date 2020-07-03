import React from 'react';
import Collapsable from '../Collapsable.js';
import ChartContainer from '../ChartContainer.js';
import SampleArea from '../SampleArea.js';
import SimulateSamples from '../SimulateSamples.js';
import math from 'mathjs';
import { Alert, Button } from 'reactstrap';

function DifferenceOfMeans(props){
    const diff = (
        Math.round((props.popMean - props.sampleMean) * 100) / 100) === 0 ?
        0 :
        Math.round((props.popMean - props.sampleMean) * 100) / 100 || '';
    return (
        <Alert color="success" style={{ padding: 0, marginTop: '1em' }}>
            Sample Mean: {props.sampleMean || ''}
            <br />
            Difference of Means: {diff}
        </Alert>
    );
}


function sortNormal(arr){
    const obj = {}
    arr.forEach(item=>{
        if(!obj[item[0]]){
            obj[item[0]] = [];
            obj[item[0]].push(item);
        }else{
            obj[item[0]].push(item);
        }
    })
    return obj;

}
function generateNormal(){
    const MEAN = 64;
    const STANDARD_DEV = 3;
    const ITERATES = 9;
    const range = Math.sqrt(12) * STANDARD_DEV * STANDARD_DEV;
    const popMin = MEAN - (range / 2);

    const popArray = [];

    const sampleSize = 2000;
    let dict = Array(sampleSize).fill(-1);

    // creates data points for population and stores it in popArray
    for (let i = 0; i < sampleSize; i++){
        let sum = 0;
        for (let j = 0; j < ITERATES; j++){
            sum += Math.random() * range + popMin;
        }

        if (dict[Math.round(sum / ITERATES * 10)] !== -1){
            dict[Math.round(sum / ITERATES * 10)] += 1;
        }
        // Adds first instance of a point
        else {
            dict[Math.round(sum / ITERATES * 10)] = 1;
        }
    }

    for (const point in dict) {
        if (point !== -1) {
            for (let count = 1; count < dict[point] + 1; count++) {
                popArray.push([point/10, count]);
            }
        }
    }
    popArray.sort(() => Math.random() - 0.5);
    popArray.sort((a,b) => b[1] - a[1]);

    return popArray;

}

const distributionArr=generateNormal();
console.log(distributionArr);

var distribution = sortNormal(distributionArr);

//const distributionCopy = Object.create(distribution);




const distributionKeys = Object.keys(distribution);


class Normal extends React.Component {
    constructor(){
        //console.log(props);
        super();
        this.state = {
            sampled: [],

            stage:1,
            mainSampleSize: 2000,
            popArray: distributionArr,
            //popObj:Object.assign({}, distribution),
            popMean:63.894,
            currPopArray:[],
            popType: 'Normal'
        }
        this.distribution = JSON.parse(JSON.stringify(distribution));

        this.changeStage = this.changeStage.bind(this);



    }

    changeStage(stage) {
        this.setState({stage: stage});
    }

    generateNormal(){


    }
    grabFromNormal(){

        //deep copy avoiding modifying state
        const currKeys = Object.keys(this.distribution);
        console.log(Object.keys(this.distribution).length); //length=116

        let popArrayTemp = [];
        let speed;


        if(this.state.currPopArray.length<50){
            speed = 10;
        }else if(this.state.currPopArray.length<250){
            speed = 100;
        }else{
            speed = 1000
        }
        let i = 0;

        //
        //
        while(i<speed){
            // console.log('empty');
            // console.log(this.state.currPopArray.length);

            const j = Math.floor(Math.random()*currKeys.length)+1;
            const key = currKeys[j];
            const objArr = this.distribution[key];
            // console.log(objArr);

            if(objArr){
                popArrayTemp.push(objArr[objArr.length - 1 ]);
                this.distribution[key].pop();
                i+=1;
            }



        }
        let temp = this.state.currPopArray;

        popArrayTemp=popArrayTemp.filter(function(val){
            return !(!val || val === "");
        });
        // console.log(popArrayTemp);

        let addedArray = temp.concat(popArrayTemp);
        return addedArray;

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

    componentDidUpdate() {
        if(this.state.currPopArray.length>=1996){
             clearInterval(this.interval);
        }

    }

    componentDidMount() {


            this.interval = setInterval(() => this.setState({ currPopArray: this.grabFromNormal()}), 600);



    }
    componentWillUnmount() {


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

                                    <ChartContainer
                                        popArray={this.state.currPopArray}
                                        popMean={this.state.popMean}
                                        sampled={this.state.sampled}
                                        popType={'Normal'}
                                        mainSampleSize={this.state.mainSampleSize}
                                        />
                                    <div>
                                        <span>
                                            <p> Try a few different sample sizes and compare sample mean to population mean </p>
                                            <SampleArea
                                                setmean={(mean) => {
                                                    this.setState({
                                                        sampleMean: mean
                                                    })
                                                }}
                                                redraw = {() => {
                                                }}
                                                sample={(size) => {
                                                    const sampleObject = this.sample(size,distributionArr);
                                                    this.setState({
                                                        sampled: sampleObject.pop
                                                    });
                                                    this.changeStage(2);
                                                    return sampleObject;
                                                }}
                                            popArray={distributionArr}
                                            popType={this.state.popType}
                                            />
                                        </span>

                                        {
                                            this.state.stage >= 2 ?
                                                <DifferenceOfMeans
                                                popMean={this.state.popMean}
                                                sampleMean={this.state.sampleMean}
                                                />
                                            :
                                            <div>
                                            </div>
                                        }

                                        { this.state.stage >= 2 ?
                                            <div>
                                            <Alert color="info">
                                                According to the law, the average of the results obtained from a large enough sample should be close to the total average of the population, and will tend to become closer the larger the sample is. Make sure to pick several samples, or click below for a simulation to see the law in action.
                                            </Alert>
                                            <SimulateSamples
                                                type={this.state.popType}
                                                sample={(size) => { return this.sample(size, this.state.popArray).pop }}
                                                pop={this.state.popMean}
                                            />
                                        </div>
                                        :<div></div>
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

export default Normal;
