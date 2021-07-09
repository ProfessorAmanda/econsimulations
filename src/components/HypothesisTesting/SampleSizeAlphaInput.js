import PropTypes from 'prop-types';
import { Row, Col, InputGroup, Form } from 'react-bootstrap';
import { stringOrNumberType } from '../../lib/types';

export default function SampleSizeAlphaInputs({ sampleSize, setSampleSize, alpha, setAlpha, popSize, sampleSize2, setSampleSize2, showSecondInput }) {
  return (
    <Row sm="1" md={showSecondInput ? 1 : 2} lg="2">
      <Col>
        <InputGroup>
          <InputGroup.Text>{showSecondInput ? 'First' : ''} Sample Size</InputGroup.Text>
          <Form.Control
            type="number"
            step={1}
            value={sampleSize}
            min={1}
            max={popSize}
            onChange={(event) => setSampleSize(event.target.value)}
          />
        </InputGroup>
        {showSecondInput && (
          <InputGroup>
            <InputGroup.Text>Second Sample Size</InputGroup.Text>
            <Form.Control
              type="number"
              step={1}
              value={sampleSize2}
              min={1}
              max={popSize}
              onChange={(event) => setSampleSize2(event.target.value)}
            />
          </InputGroup>
        )}
      </Col>
      <Col>
        <InputGroup>
          <InputGroup.Text>Alpha</InputGroup.Text>
          <Form.Control
            type="number"
            step={0.01}
            value={alpha}
            min={0}
            max={1}
            onChange={(event) => setAlpha(event.target.value)}
          />
        </InputGroup>
      </Col>
    </Row>
  )
}

SampleSizeAlphaInputs.propTypes = {
  sampleSize: stringOrNumberType.isRequired,
  sampleSize2: stringOrNumberType.isRequired,
  setSampleSize: PropTypes.func.isRequired,
  setSampleSize2: PropTypes.func.isRequired,
  alpha: stringOrNumberType.isRequired,
  setAlpha: PropTypes.func.isRequired,
  popSize: PropTypes.number.isRequired,
  showSecondInput: PropTypes.bool.isRequired
}
