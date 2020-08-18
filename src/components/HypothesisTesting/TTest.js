import React ,{useState}from 'react';
import math from 'mathjs';
import { Alert, Button, Container, Col, Input, Row, Table,InputGroupText,InputGroupAddon,InputGroup,ButtonGroup } from 'reactstrap';


const TTest = (ppl,testType,hypo,mue_0)=>{
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
const sample = (size,pop)=>{

            var index = {};
            for(let i = 0; i < size; i++){
                index[i]=false;
            }
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
            setSampleMean( Math.round(math.mean(sampleArr.map(p => p[0])) * 100)/100);
            setSampleSd(math.std(sampleArr.map(p => p[0])));



    }

    const getT = (x_bar, mue_0, sd, sampleSize)=>{
        return (x_bar - mue_0)/(sd/Math.sqrt(sampleSize));
    }

    const getPVal = (hypo,t,degreeOF)=>{

    }

// Reactstrap components
    const tTestButton= ()=>{

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
         <Button color='primary' onClick={()=>{setSim(1);}}> Sample </Button>
         <br />
         <br />
         {sim===1 && <Container>
             <Alert color="secondary" className="Center" >
             <p>This sample yields the following data:</p>
             <p>Sample Mean: &nbsp;{sampleMean}</p>
             <p>Sample Standard Deviation:&nbsp;{sampleSd} </p>

             <p>The test statistic is ___</p>

             <p>This test statistic yields a p-value of P(Z>teststat)= [Answer]…therefore we [reject or fail to reject the null hypothesis. </p>

              </Alert>
             </Container>

         }
        </Container>

    )

}


export default TTest;
