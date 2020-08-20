import React, {useState}  from 'react';
import TTest from './HypothesisTesting/TTest.js';
import math from 'mathjs';
import { Alert,Container, Row, Col,ButtonGroup,Button,Input, InputGroup, InputGroupAddon, InputGroupText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const HypothesisTestingNew=(v)=>{
    const [pplShape,setPplShape]=useState('');
    const [testType, setTestType]= useState('');
    const [mue_0, setMue_0]=useState(0);
    const [hypo, setHypo]=useState(0);
    const [sampleSize, setSampleSize] = useState(0);
    const [popMean, setPopMean]=useState(0);
    const [showChart, setShowChart] = useState(0);
    const [mainSampleSize, setMainSampleSize] = useState(2000);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [popArr, setPopArr]=useState([]);
    const [hypoOptions, setHypoOptions] = useState([]);

// Test types and population distribution shapes
    const testLst = ['oneSample','twoSample'];
    const pplShapeLst = ['Normal', 'Uniform','Mystery','??Unknown??'];

// Text materials
    const oneSampleHypos = [
        {hypoText: "Option 1: These cows produce more than ",
        nullH:'H_0: μ ≤  ',
        alterH:'H_a: μ >  '
        },

        {hypoText:"Option 2: These cows produce less than " ,
        nullH:'H_0: μ ≥  ',
        alterH:'H_a: μ <  '
        },

        {hypoText:"Option 3: These cows produce an amount not equal to ",
        nullH:'H_0: μ =  ',
        alterH:'H_a: μ ≠  '
    }
    ];

    const twoSampleHypos = [
        {hypoText: "Option 1: These cows produce more than they did before.",
        nullH:'H_0: μ_1 - μ_2 ≥ 0',
        alterH:'H_a: μ_1 - μ_2 < 0'
        },

        {hypoText:"Option 2: These cows produce less than they did before",
        nullH:'H_0: μ_1 - μ_2 ≤ 0',
        alterH:'H_a: μ_1 - μ_2 > 0'
        },

        {hypoText:"Option 3: These cows produce a different amount now compared to before.",
        nullH:'H_0: μ_1 - μ_2 = 0',
        alterH:'H_a: μ_1 - μ_2 ≠ 0'
        }
    ];

// Helper functions
// Generste 4 kinds of distributions
    const generatePop=(shape)=>{
        setPopArr([]);
        (shape==='Normal') && setPopArr(generateNormal());
        (shape==='Uniform') && setPopArr(generateUniform());
        (shape==='Mystery') && setPopArr(generateMystery());
        (shape==='Unknown') && setPopArr(generateUnknown());

    }

    const generateNormal=()=>{
        const MEAN = 64;
        const STANDARD_DEV = 3;
        const ITERATES = 9;
        const range = Math.sqrt(12) * STANDARD_DEV * STANDARD_DEV;
        const popMin = MEAN - (range / 2);

        const popArray = popArr ? popArr.slice() : []

        const sampleSize = mainSampleSize;
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
        setPopMean(math.mean(popArray.map(p => p[0])));
        return popArray;

    }
    const generateUniform=()=>{
        const HI = 74;
        const LOW = 54;
        const range = HI - LOW;

        const popArray = popArr ? popArr.slice() : []

        const sampleSize = mainSampleSize;

        let dict = Array(sampleSize).fill(-1);

        for (let i = 0; i < sampleSize; i++){
            const val = Math.random() * range + LOW;

            if (dict[Math.round(val * 10)]){
                dict[Math.round(val * 10)] += 1;
            } else {
                dict[Math.round(val * 10)] = 1;
            }
        }

        for (const point in dict) {
            if (point !== -1) {
                for (let count = 1; count < dict[point] + 2; count++) {
                    popArray.push([point/10, count]);
                }
            }
        }

        popArray.sort(() => Math.random() - 0.3);
        popArray.sort((a,b) => b[1] - a[1]);
        setPopMean(math.mean(popArray.map(p => p[0])));
        return popArray;

    }

// Double-humped Distribution
    const generateMystery=()=>{
    let xvalue = [];

      if (popArr.length >= mainSampleSize){
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

      const sampleSize = mainSampleSize;

      const newCleared = []
      const stateCopy = [];

      const clearedArray = [];
      const popDict = [];


      for (let i = 0; i < sampleSize/2; i++){
        let sum = 0;
        if(clearedArray.length === 0){
            for (let j = 0; j < firstITERATES; j++){
                sum += Math.random() * firstrange + firstpopMin;
            }
        }
        else{
            sum = newCleared.pop() * firstITERATES;
        }
        if (popDict[Math.round(sum / firstITERATES * 10)]){
            stateCopy[Math.round(sum / firstITERATES * 10)] += 1
        }
        else {
            stateCopy[Math.round(sum / firstITERATES * 10)] = 1
        }
        popArray.push(Math.round((sum / firstITERATES)*100)/100)
    }

    for (let i = 0; i < sampleSize/2; i++){
        let sum = 0;
        if(clearedArray === 0){
            for (let j = 0; j < secondITERATES; j++){
                sum += Math.random() * secondrange + secondpopMin;
            }
        }
        else{
            sum = newCleared.pop() * secondITERATES;
        }
        if (popDict[Math.round(sum / secondITERATES * 10)]){
            stateCopy[Math.round(sum / secondITERATES * 10)] += 1
        }
        else {
            stateCopy[Math.round(sum / secondITERATES * 10)] = 1
        }
        popArray.push(Math.round((sum / secondITERATES)*100)/100)
    }
    if(clearedArray.length > 0){
      var tempCleared = clearedArray;
      tempCleared = newCleared;
     clearedArray =tempCleared
 };


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
    setPopMean(math.mean(finalPopArray.map(p => p[0])));

    return finalPopArray
  }

    const generateUnknown=()=>{
        const ranNum = Math.floor(Math.random()*3);
        var arr;
        (ranNum ===0) && (arr = generateNormal());
        (ranNum ===1) && (arr = generateUniform());
        (ranNum ===2) && (arr = generateMystery());
        return arr;

    }


// Reactstrap components
    const testButton = testLst.map(test=>{
        return(
            <Button
            style={{ backgroundColor: testType===test? '#4CAF50':'#555555' }}
            onClick={
                () => {
                    setTestType(test);
                    setHypoOptions(testType==='oneSample'? twoSampleHypos:oneSampleHypos);
                    setHypo(0);
                }
            }>{test}</Button>
    )})

    const pplButton = pplShapeLst.map(shape=>{
        return(
            <Button
            style={{ backgroundColor: pplShape===shape? '#4CAF50':'#555555' }}
            onClick={
                () => {
                    setPplShape(shape);
                    generatePop(shape);
                    console.log(popArr);
                }
            }>{shape}</Button>

        )})

    const revealButton = () =>{
        return(
        <Button
        color='primary'
        onClick={
            () => {}
        }
        >Reveal</Button>
    )
    }

    const HypoDropdown = (hypoOptions) =>{

        const toggle = () => setDropdownOpen(prevState => !prevState);

        return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>
             {hypoOptions[hypo].hypoText}
            </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={()=>{setHypo(0)}}>{hypoOptions[0].hypoText}</DropdownItem>
            <DropdownItem onClick={()=>{setHypo(1)}}>{hypoOptions[1].hypoText}</DropdownItem>
            <DropdownItem onClick={()=>{setHypo(2)}}>{hypoOptions[2].hypoText}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }

    const SetMue_0_Input = ()=>{
        return (
            <InputGroup>
             <Input
             className="Center"
             type="number"
             value = {mue_0}
             step={1}
             min={1}
             max={1000}
             onChange={(event) => {
             setMue_0(event.target.value)
           }}/>
           <InputGroupAddon addonType="append">
         <InputGroupText>gallons of milk per day.</InputGroupText>
       </InputGroupAddon>
           </InputGroup>
        )
    }



// Rendering
    return(
        <div className="MainContainer">

            <Alert style={{ width: "90%", margin: 'auto' }} color="primary">
                Hypothesis Testing
            </Alert>
            <Alert style={{ width: "90%", margin: 'auto' }} color="primary">
            <p>
            When we conduct a test of hypotheses, we use the information provided by a sample to make a conclusion about population parameters that we cannot directly observe. We are able to make a connection between the sample and the population by using the rules that govern probability distributions. Due to the central limit theorem, we can make a variety of assertions about the probable location of points in a distribution, which allows us to make assertions about where population parameters might be located relative to the data we have collected from a sample. This allows us to test hypotheses.
            </p>

            <p>
            The goal of this exercise, then, is to try out our decision-making framework for hypothesis testing with simulated population data. At first, the user must make decisions from samples collected from that population without seeing that population. Then, the true population is revealed, and the user can compare the result of the hypothesis test to the “truth.”  Finally, we allow the user to automate this process, taking many samples and testing each, to see how often hypothesis testing leads us to the correct conclusion.
            </p>

            </Alert>
            <br />
            <p>Choose a kind of hypothesis test: &nbsp;
            <ButtonGroup>{testButton}</ButtonGroup>
            </p>

            <p>Choose a population distribution shape: &nbsp;
            <ButtonGroup>{pplButton}</ButtonGroup>
            </p>

            {testType && pplShape &&
                <Container fluild>
                <Row>
                    <Alert color="secondary" className="Center">
                    <p>The true population distribution will be revealed at the end.</p>
                    {testType==="oneSample"? <p>Suppose that our farmer has changed the variety of feed the cows eat. It might be reasonable to think that the cows now produce more or less milk than they had before. As a researcher, what assertion would you like to make about these cows’ milk production now? Choose an Option and specify a hypothesized amount.
                     </p>: <p>
                      Suppose that our farmer has changed the variety of feed the cows eat. It might be reasonable to think that the cows now produce more or less milk than they had before. As a researcher, what assertion would you like to make about these cows’ milk production now? Let Population 1 denote the cows before the feed change and Population 2 denote the cows after the change. Choose an Option below.
                      </p>}
                      </Alert>
                </Row>

                        <br />
            <Row>

            {testType==='oneSample'? <Col xs='6'>
            {HypoDropdown(hypoOptions)}
            </Col>: <Col sm="12" md={{ size: 6, offset: 3 }}>
            {HypoDropdown(hypoOptions)}
            </Col>
            }

            <Col xs='4'>
            {testType==='oneSample'  && SetMue_0_Input()}
            </Col>

            </Row>
            <br />
            <Row>
            <Alert color="secondary" className="Center" >
              <p>This means our null and alternative hypotheses are given by:</p>
              <p>{hypoOptions[hypo].nullH} {testType==='oneSample'&&mue_0}</p>
               <p>{hypoOptions[hypo].alterH} {testType==='oneSample'&&mue_0}</p>

              </Alert>
              </Row>
              </Container>
              }
              <br />

                {testType && pplShape&&popArr&&
                    <Container>
                    <Row className = 'Center'>
                     {console.log(popArr)}
                    <TTest
                ppl = {popArr}
                testType={testType}
                hypo = {hypo}
                mue_0={mue_0}
                />
                </Row>
                </Container>

                }
                <br />
</div>

    )
}


export default HypothesisTestingNew;
