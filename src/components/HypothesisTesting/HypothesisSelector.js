import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { HYPOTHESIS_OPTIONS } from '../../lib/constants';
import { stringOrNumberType } from '../../lib/types';

export default function HypothesisSelector({ testType, setHypothesis, mu0, setMu0 }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(HYPOTHESIS_OPTIONS[testType][0].hypoText)
    setHypothesis(HYPOTHESIS_OPTIONS[testType][0])
  }, [testType, setHypothesis])

  const selectOption = (option) => {
    setHypothesis(option);
    setSelected(option.hypoText)
  }

  const menuOptions = HYPOTHESIS_OPTIONS[testType].map((obj) =>
    <Dropdown.Item onClick={() => selectOption(obj)} key={obj.hypoText}>{obj.hypoText}</Dropdown.Item>
  );

  return (
    <InputGroup>
      <DropdownButton isOpen={open} toggle={() => setOpen(!open)} addonType="prepend">
        <Dropdown.Toggle caret>
          {selected}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {menuOptions}
        </Dropdown.Menu>
      </DropdownButton>
      {(testType === 'oneSample') && (
        <>
          <Form.Control
            type="number"
            value={mu0}
            step={1}
            min={1}
            max={1000}
            onChange={(event) => setMu0(event.target.value)}
          />
          <InputGroup.Text>gallons of milk per day.</InputGroup.Text>
        </>
      )}
    </InputGroup>
  )
}

HypothesisSelector.propTypes = {
  testType: PropTypes.string.isRequired,
  setHypothesis: PropTypes.func.isRequired,
  mu0: stringOrNumberType.isRequired,
  setMu0: PropTypes.func.isRequired
}
