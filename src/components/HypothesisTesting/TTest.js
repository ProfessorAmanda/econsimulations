import React ,{useState}from 'react';
import math from 'mathjs';
import ChartContainer from './ChartContainer.js';
import { Alert, Button, Container, Col, Input, Row, Table,InputGroupText,InputGroupAddon,InputGroup,ButtonGroup } from 'reactstrap';


const TTest = ({ppl,testType,hypo,mue_0})=>{
    
    const [mue_0Copy, setMue_0Copy]=useState(mue_0);
    const [popArr, setPopArr]=useState(ppl);
    const [popMean, setPopMean]=useState(0);
    const [sampleMean, setSampleMean]=useState(0);
    const [sampleSd, setSampleSd]=useState(0);
    const [mainSampleSize, setMainSampleSize] = useState(2000);
    const [sampleSize, setSampleSize] = useState(0);
    const [alpha, setAlpha]=useState(0);
    const [tScore, setTScore] = useState(0);
    const [sim, setSim]=useState(0);


// Helper functions
// Take a sample given a sample size and a population, update sampleMean and sampleSd
const handleSample = (size,pop)=>{

// Sampling randomly from the population by index
        var index = {};
        for(let i = 0; i < size; i++){
            index[i]=false;
        } // Can be used to check if the index has been generated before
        var sampleArr = [];
        var j = 0;

        while(j < size){
            const ranNum = Math.floor(Math.random()*size);
            if(!index[ranNum]){
                index[j] = true;
                sampleArr.push(pop[j][0]);
                j += 1;
            }
        }

        const x_bar = Math.round(math.mean(sampleArr) * 1000)/1000;
        const mue_0 = mue_0Copy;
        const sd = Math.round(math.std(sampleArr)*1000)/1000;

        setSampleMean(x_bar);
        setSampleSd(sd);
        setTScore(getT(x_bar, mue_0, sd, size));
        setSim(1);
    }

    const getT = (x_bar, mue_0, sd, sampleSize)=>{
        return Math.round(((x_bar - mue_0)/(sd/Math.sqrt(sampleSize)))*1000)/1000;
    }



    const getPVal = (hypo,t,degreeOF)=>{

    }




    return(

        <Container fluid>
        <p>Let’s test your assertion by taking a sample and setting our tolerance for making a type-one error α! </p>
        <Row>
        <Col xs='6'>
          <InputGroup>
            <InputGroupAddon addonType='prepend'><InputGroupText>Sample Size</InputGroupText></InputGroupAddon>
            <Input type="number" step={1} value={sampleSize} min={1} max={1000} onChange={(event) => {
            setSampleSize(event.target.value)
          }}/>
          </InputGroup>
          </Col>
          <Col xs='6'>
          <InputGroup>
            <InputGroupAddon addonType='prepend'><InputGroupText>Alpha</InputGroupText></InputGroupAddon>
            <Input type="number" step={1} value={alpha} min={1} max={1000} onChange={(event) => {
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

             <p>This test statistic yields a p-value of P(Z>teststat)= [Answer]…therefore we [reject or fail to reject the null hypothesis. </p>

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
