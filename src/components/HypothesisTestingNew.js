import React, {useState}  from 'react';
import TTest from './HypothesisTesting/TTest.js';
import MysteryPop from './HypothesisTesting/MysteryPop.js';
import math from 'mathjs';
import { Alert,Container, Row, Col,ButtonGroup,Button,Input, InputGroup, InputGroupAddon, InputGroupText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const HypothesisTestingNew=()=>{

    const [pplShape,setPplShape]=useState('');
    const [testType, setTestType]= useState('');
    const [hypo, setHypo]=useState(0);
    const [mue_0, setMue_0]=useState(0);
    const [sampleSize, setSampleSize] = useState(0);
    const [popMean, setPopMean]=useState(0);
    const [showTTest, setShowTTest] = useState(0);
    const [mainSampleSize, setMainSampleSize] = useState(2000);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [popArr, setPopArr]=useState([]);
    const [popArr2, setPopArr2]=useState([]);
    const [hypoOptions, setHypoOptions] = useState([oneSampleHypos]);

// Test types and population distribution shapes
    const testLst = ['oneSample','twoSample'];
    const pplShapeLst = ['Normal', 'Uniform','Mystery','??Unknown??'];

// Text materials
    const oneSampleHypos = [
        {type: '≤',
        hypoText: "Option 1: These cows produce more than ",
        nullH:'H_0: μ ≤  ',
        alterH:'H_a: μ >  '
        },

        {type:'≥',
        hypoText:"Option 2: These cows produce less than " ,
        nullH:'H_0: μ ≥  ',
        alterH:'H_a: μ <  '
        },

        {type:'=',
        hypoText:"Option 3: These cows produce an amount not equal to ",
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
        switch(shape){
            case 'Normal':
            setPopArr(generateNormal());
            break;

            case 'Uniform':
            setPopArr(generateUniform());
            break;

            case 'Mystery':
            setPopArr(generateMystery());
            break;

            case '??Unknown??':
            setPopArr(generateUnknown());
            break;
        }

    }

    const generateNormal=()=>{
        const MEAN = 68;
        const STANDARD_DEV = 3;
        const ITERATES = 9;
        const range = Math.sqrt(12) * STANDARD_DEV * STANDARD_DEV;
        const popMin = MEAN - (range / 2);

        const popArray = [];

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
        const HI = 77;
        const LOW = 59;
        const range = HI - LOW;

        const popArray = [];

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
        // The generageMystery() function in Cental Limit Theorem/Mystery.js may not be usable, so a pre-generated Mystery pop is used.

    setPopMean(math.mean(MysteryPop.map(p => p[0])));


    return MysteryPop;
  }

    const generateUnknown=()=>{
        const ranNum = Math.floor(Math.random()*3);
        var arr;
        console.log(ranNum);

        switch(ranNum){
            case 0:
            arr = generateNormal();
            break;

            case 1:
            arr = generateUniform();
            break;

            case 2:
            arr = generateMystery();
            break;

        }
        console.log(arr);

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
                    setShowTTest(0);
                }
            }>{test}</Button>
    )})

    const pplButton = pplShapeLst.map(shape=>{
        return(
            <Button
            style={{ backgroundColor: pplShape===shape? '#4CAF50':'#555555' }}
            onClick={
                () => {
                    setPopArr([]);

                    setPplShape(shape);
                    generatePop(shape);
                    setShowTTest(0);
                    console.log(popArr);
                }
            }>{shape}</Button>

        )})


    const HypoDropdown = (hypoOptions) =>{

        const toggle = () => setDropdownOpen(prevState => !prevState);

        return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>
             {hypoOptions[hypo].hypoText}
            </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={()=>{setHypo(0);setShowTTest(0);}}>{hypoOptions[0].hypoText}</DropdownItem>
            <DropdownItem onClick={()=>{setHypo(1);setShowTTest(0);}}>{hypoOptions[1].hypoText}</DropdownItem>
            <DropdownItem onClick={()=>{setHypo(2);setShowTTest(0);}}>{hypoOptions[2].hypoText}</DropdownItem>
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
                    {testType==="oneSample"? <p> Suppose that our farmer has changed the variety of feed the cows eat. It might be reasonable to think that the cows now produce more or less milk than they had before. As a researcher, what assertion would you like to make about these cows’ milk production now? Choose an Option and specify a hypothesized amount. To help make an informed guess, note that the distribution of millk production before we changed the feed had a mean of about 64 gallons
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
            <Button color='primary' onClick={()=>{setShowTTest(1);}}> Continue </Button>
            <br />
            <br />

            {showTTest===1&&<Container>
            <Row>
            <Alert color="secondary" className="Center" >
              <p>This means our null and alternative hypotheses are given by:</p>
              <p>{hypoOptions[hypo].nullH} {testType==='oneSample'&&mue_0}</p>
               <p>{hypoOptions[hypo].alterH} {testType==='oneSample'&&mue_0}</p>

              </Alert>
              </Row>
              </Container>}
              </Container>
              }
              <br />

                {showTTest===1&&
                    <Container>
                    <Row className = 'Center'>
                    <TTest
                ppl = {popArr}
                testType={testType}
                hypo = {hypo}
                mue_0={mue_0}
                popMean={popMean}
                />
                </Row>
                </Container>

                }
                <br />
</div>

    )
}


export default HypothesisTestingNew;
