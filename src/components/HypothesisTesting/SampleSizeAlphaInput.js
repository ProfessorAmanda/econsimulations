import React from "react";
import PropTypes from "prop-types";
import { Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { stringOrNumberType } from "../../lib/types";

export default function SampleSizeAlphaInputs({ sampleSize, setSampleSize, alpha, setAlpha, popSize }) {
  return (
    <Row>
      <Col xs="6">
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Sample Size</InputGroupText>
          </InputGroupAddon>
          <Input
            type="number"
            step={1}
            value={sampleSize}
            min={1}
            max={popSize}
            onChange={(event) => setSampleSize(event.target.value)}
          />
        </InputGroup>
      </Col>
      <Col xs="6">
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Alpha</InputGroupText>
          </InputGroupAddon>
          <Input
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
  setSampleSize: PropTypes.func.isRequired,
  alpha: stringOrNumberType.isRequired,
  setAlpha: PropTypes.func.isRequired,
  popSize: PropTypes.number.isRequired
}
