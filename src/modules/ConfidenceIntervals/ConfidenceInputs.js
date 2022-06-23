import { Row, Col } from 'react-bootstrap';
import InputSlider from '@/components/InputSlider';
import SelectorButtonGroup from '@/components/SelectorButtonGroup';
import PropTypes from 'prop-types';
import { distributionType, stringOrNumberType } from '@/lib/types';
import TeX from '@matejmazur/react-katex';

export default function ConfidenceInputs({ distType, setDistType, confLevel, setConfLevel }) {
  return (
    <div>
      <Row>
        <div>
          1) Do you want to assume that you know <TeX math="\sigma"/>? If yes, choose Z. If no, choose T: {' '}
          <SelectorButtonGroup options={['Z', 'T']} select={setDistType} selected={distType}/>
        </div>
      </Row>
      <br/>
      <Row>
        <div>
          2) Confidence Level: {' '}
          <SelectorButtonGroup
            options={['90%', '95%', '99%']}
            select={(pct) => setConfLevel(pct.slice(0, 2))}
            selected={`${confLevel}%`}
          />
        </div>
      </Row>
      <br/>
      <Row>
        <Col sm="12" md={{ span: 6, offset: 3 }}>
          <div>
            More Levels:
            <InputSlider value={confLevel} min={1} max={99} step={1} onChange={setConfLevel}/>
          </div>
        </Col>
      </Row>
    </div>
  );
}

ConfidenceInputs.propTypes = {
  distType: distributionType.isRequired,
  setDistType: PropTypes.func.isRequired,
  confLevel: stringOrNumberType.isRequired,
  setConfLevel: PropTypes.func.isRequired,
}
