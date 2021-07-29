import { useEffect, useState } from 'react';
import PerformTest from './PerformTest.js';
import { Alert, Container, Row, Button } from 'react-bootstrap';
import TestInputs from './TestInputs.js';
import HypothesisSelector from './HypothesisSelector.js';
import _ from 'lodash';

export default function HypothesisTesting() {
  const [popShape, setPopShape] = useState('');
  const [testType, setTestType] = useState('');
  const [hypothesis, setHypothesis] = useState();
  const [mu0, setMu0] = useState(64);
  const [stage, setStage] = useState(1);
  const [distType, setDistType] = useState('Z'); // can be "Z" or "T"

  useEffect(() => {
    if ((popShape !== '') && (testType !== '')) {
      setStage(2)
    }
  }, [popShape, testType, distType]);

  return (
    <div className="module-container">
      <TestInputs
        testType={testType}
        setDistType={setDistType}
        distType={distType}
        setTestType={setTestType}
        popShape={popShape}
        setPopType={setPopShape}
      />
      {(stage >= 2) && (
        <Container fluid>
          <Row>
            <Alert variant="secondary">
              <p>The true population distribution will be revealed at the end.</p>
              {(testType === 'oneSample') ? (
                <p>
                  Suppose that our farmer has changed the variety of feed the cows eat. It might be reasonable to think that the cows now produce more or less milk than they had before. As a researcher, what assertion would you like to make about these cows’ milk production now? Choose an Option and specify a hypothesized amount. To help make an informed guess, note that the distribution of milk production before we changed the feed had a mean of about 64 gallons
                </p>
              ) : (
                <p>
                  Suppose that our farmer has changed the variety of feed the cows eat. It might be reasonable to think that the cows now produce more or less milk than they had before. As a researcher, what assertion would you like to make about these cows’ milk production now? Let Population 1 denote the cows before the feed change and Population 2 denote the cows after the change. Choose an Option below.
                </p>
              )}
            </Alert>
          </Row>
          <br/>
          <Row style={{ width: '95%', margin: 'auto' }}>
            <HypothesisSelector testType={testType} setHypothesis={setHypothesis} mu0={mu0} setMu0={setMu0}/>
          </Row>
          <br/>
          <Button
            variant="outline-primary"
            onClick={() => setStage(3)}
            active={stage >= 3}
          >
            Continue
          </Button>
          <br/>
          <br/>
          {(stage >= 3) && (
            <Container>
              <Row>
                <Alert variant="secondary" >
                  <p>This means our null and alternative hypotheses are given by:</p>
                  <p>{hypothesis.nullH} {(testType === 'oneSample') && mu0}</p>
                  <p>{hypothesis.alterH} {(testType === 'oneSample') && mu0}</p>
                </Alert>
              </Row>
              <br/>
              <Row>
                <PerformTest
                  distType={distType}
                  shape={(popShape === '??Unknown??') ? _.sample(['Normal', 'Uniform', 'Mystery']) : popShape}
                  sides={hypothesis.sides}
                  mu0={+mu0}
                  equality={hypothesis.type}
                  testType={testType}
                />
              </Row>
            </Container>
          )}
        </Container>
      )}
    </div>
  )
}
