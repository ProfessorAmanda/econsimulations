import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import { HYPOTHESIS_OPTIONS } from "../../lib/constants";

export default function HypothesisDropdown({ testType, setHypothesis }) {
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
    <DropdownItem onClick={() => selectOption(obj)} key={obj.hypoText}>{obj.hypoText}</DropdownItem>
  );

  return (
    <Dropdown isOpen={open} toggle={() => setOpen(!open)}>
      <DropdownToggle caret>
        {selected}
      </DropdownToggle>
      <DropdownMenu>
        {menuOptions}
      </DropdownMenu>
    </Dropdown>
  )
}

HypothesisDropdown.propTypes = {
  testType: PropTypes.string.isRequired,
  setHypothesis: PropTypes.func.isRequired
}
