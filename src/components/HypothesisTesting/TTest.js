import React ,{useState}from 'react';
import math from 'mathjs';
import ChartContainer from './ChartContainer.js';
import TToPval from './TToPval.js';
import { Alert, Button, Container, Col, Input, Row, Table,InputGroupText,InputGroupAddon,InputGroup,ButtonGroup } from 'reactstrap';


const TTest = ({ppl,testType,hypo,mue_0,popMean})=>{

    const [popArr, setPopArr]=useState(ppl);
    //const [popMean, setPopMean]=useState(0);
    const [sampleMean, setSampleMean]=useState(0);
    const [sampleSd, setSampleSd]=useState(0);
    const [mainSampleSize, setMainSampleSize] = useState(2000);
    const [sampleSize, setSampleSize] = useState(0);
    const [alpha, setAlpha]=useState(0);
    const [tScore, setTScore] = useState(0);
    const [sim, setSim]=useState(0);
    const [pVal, setPVal]=useState(0);


// Helper functions
// Take a sample given a sample size and a population, update sampleMean and sampleSd
const handleSample = (size,pop)=>{
        if(size===0){
            alert("Sample Size cannot be 0.");
            return;
        }

// Sampling randomly from the population by index
        var index = {};
        for(let i = 0; i < mainSampleSize; i++){
            index[i]=false;
        } // Can be used to check if the index has been generated before
        var sampleArr = [];
        var j = 0;

        while(j < size){
            const ranNum = Math.floor(Math.random()*mainSampleSize);
            console.log(ranNum);
            if(!index[ranNum]){
                index[ranNum] = true;
                sampleArr.push(pop[ranNum][0]);

                j += 1;
            }
        }
        console.log(sampleArr);

        const x_bar = Math.round(math.mean(sampleArr) * 1000)/1000;
        const sd = Math.round(math.std(sampleArr)*1000)/1000;
        const tScore = getT(x_bar, mue_0, sd, size);
        const pVal = getPVal(hypo,tScore,sampleSize - 1);

        setSampleMean(x_bar);
        setSampleSd(sd);
        setTScore(tScore);
        setPVal(pVal);
        setSim(1);
    }

    const getT = (x_bar, mue_0, sd, sampleSize)=>{
        console.log(x_bar, mue_0, sd, sampleSize);
        return Math.round(((x_bar - mue_0)/(sd/Math.sqrt(sampleSize)))*1000)/1000;
    }





    const getPVal = (hypo,t,degreeOF)=>{
        console.log(hypo, t, degreeOF);
        console.log(t.toFixed(1));
        console.log(TToPval);

        var dof;
        if(degreeOF>121){
            dof = 121;
        }else{
            dof = degreeOF;
        }


        if((t > 3)||(t < -3)){
            switch(hypo){
                case 0:
                return 0;


                case 1:
                return 1;


                case 2:
                return 0;
        }}else{
            const p1 = TToPval[dof - 1][t.toFixed(1)];

            switch(hypo){
                case 0:
                return p1;


                case 1:
                return 1 - p1;


                case 2:
                return 2*TToPval[dof - 1][Math.abs(t.toFixed(1))/2];

            }

        }


    }




    return(

        <Container fluid>
        <p>Let’s test your assertion by taking a sample and setting our tolerance for making a type-one error α! </p>
        <Row>
        <Col xs='6'>
          <InputGroup>
            <InputGroupAddon addonType='prepend'><InputGroupText>Sample Size</InputGroupText></InputGroupAddon>
            <Input type="number" step={1} value={sampleSize} min={1} max={2000} onChange={(event) => {
            setSampleSize(event.target.value)
          }}/>
          </InputGroup>
          </Col>
          <Col xs='6'>
          <InputGroup>
            <InputGroupAddon addonType='prepend'><InputGroupText>Alpha</InputGroupText></InputGroupAddon>
            <Input type="number" step={1} value={alpha} min={0} max={1} onChange={(event) => {
            setAlpha(event.target.value);
          }}/>
          </InputGroup>
        </Col>
        </Row>
        <br />
         <Button color='primary' onClick={()=>handleSample(sampleSize, popArr)}> Sample </Button>
         <br />
         <br />
         {sim>=1 && <Container>
             <Alert color="secondary" className="Center" >
             <p>This sample yields the following data:</p>
             <p>Sample Mean: &nbsp;{sampleMean}</p>
             <p>Sample Standard Deviation:&nbsp;{sampleSd} </p>

             <p>The test statistic is &nbsp;{tScore}</p>

             <p>This test statistic yields a p-value of P(Z>teststat)= &nbsp;{pVal}. </p>
             <p>Therefore we {pVal<alpha? 'reject':'fail to reject'} the null hypothesis. </p>


              </Alert>
             </Container>

         }
          <br />

         {sim >=1 &&
         <Row className = 'Center'>
         <p>Press here to reveal the true population distribution and mean.&nbsp; <Button
         color='primary'
         onClick={
             () => {setSim(2);}
         }
         >Reveal</Button></p>
         </Row>
     }


         {sim===2 && <Container>

         <Row className = 'Center'>


         <ChartContainer
             popArray={popArr}
             popMean={popMean}
             sampled={[[0,0]]}
             popType={'Normal'}
             mainSampleSize={2000}
         />
         </Row>
         <Row className = 'Center'>


         <p>Our hypothesis test conclusion was therefore…[Correct or incorrect]. </p>
         </Row>
         </Container>}
        </Container>

    )

}


export default TTest;
