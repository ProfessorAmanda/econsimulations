import SelectorButtonGroup from '@/components/SelectorButtonGroup';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { distributionType } from '@/lib/types';
import TeX from '@matejmazur/react-katex';

export default function TestInputs({ setDistType, distType, testType, setTestType, popShape, setPopType }) {
  return (
    <div style={{ padding: 20 }}>
      <Row style={{ padding: 10 }}>
        <div>
          Do you want to assume that you know <TeX math="\sigma"/>? If yes, choose Z. If no, choose T: {' '}
          <SelectorButtonGroup options={['Z', 'T']} select={setDistType} selected={distType}/>
        </div>
      </Row>
      <Row style={{ padding: 10 }}>
        <div>
          Choose a kind of hypothesis test: {' '}
          <SelectorButtonGroup options={['oneSample', 'twoSample']} select={setTestType} selected={testType}/>
        </div>
      </Row>
      <Row style={{ padding: 10 }}>
        <div>
          <div style={{ paddingBottom: 10 }}>Choose a population distribution shape:</div>
          <SelectorButtonGroup options={['Normal', 'Uniform', 'Mystery', '??Unknown??']} select={setPopType} selected={popShape}/>
        </div>
      </Row>
    </div>
  )
}

TestInputs.propTypes = {
  testType: PropTypes.string.isRequired,
  setTestType: PropTypes.func.isRequired,
  popShape: PropTypes.string.isRequired,
  setPopType: PropTypes.func.isRequired,
  setDistType: PropTypes.func.isRequired,
  distType: distributionType.isRequired,
}
