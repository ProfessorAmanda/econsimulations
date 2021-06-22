import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";

const hypothesisOptions = {
  oneSample: [
    {
      type: "≤",
      hypoText: "Option 1: These cows produce more than ",
      nullH: "H_0: μ ≤  ",
      alterH: "H_a: μ >  ",
      id: 0
    },
    {
      type: "≥",
      hypoText: "Option 2: These cows produce less than " ,
      nullH: "H_0: μ ≥  ",
      alterH: "H_a: μ <  ",
      id: 1
    },
    {
      type: "=",
      hypoText: "Option 3: These cows produce an amount not equal to ",
      nullH: "H_0: μ =  ",
      alterH: "H_a: μ ≠  ",
      id: 2
    }
  ],
  twoSample: [
    {
      hypoText: "Option 1: These cows produce more than they did before.",
      nullH: "H_0: μ_1 - μ_2 ≥ 0",
      alterH: "H_a: μ_1 - μ_2 < 0",
      id: 0
    },
    {
      hypoText: "Option 2: These cows produce less than they did before",
      nullH: "H_0: μ_1 - μ_2 ≤ 0",
      alterH: "H_a: μ_1 - μ_2 > 0",
      id: 1
    },
    {
      hypoText: "Option 3: These cows produce a different amount now compared to before.",
      nullH: "H_0: μ_1 - μ_2 = 0",
      alterH: "H_a: μ_1 - μ_2 ≠ 0",
      id: 2
    }
  ]
}

export default function HypothesisDropdown({ testType, setHypothesis }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(hypothesisOptions[testType][0].hypoText)
    setHypothesis(hypothesisOptions[testType][0])
  }, [testType, setHypothesis])

  const selectOption = (option) => {
    setHypothesis(option);
    setSelected(option.hypoText)
  }

  const menuOptions = hypothesisOptions[testType].map((obj) =>
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
