/*
  Allows the user to select simulation variations

  Used by Law of Large Numbers and Central Limit Theorem

  props:
    sim     - string
    setPop  - callback
*/
import React, { useState } from 'react';
import { Button} from 'reactstrap';
import PropTypes from 'prop-types';


export default function PopBar({ sim, setPop }) {
  const [selected, setSelected] = useState();

  let modes = [];
  if (sim === "CLT") {
    modes = [ "Normal", "Uniform", "Exponential", "Chi-Squared", "Mystery" ];
  } else if ((sim === "LLN") || (sim === "CI")) {
    modes = [ "Normal", "Uniform", "Exponential", "Chi-Squared" ];
  }

  const onClick = (mode) => {
    setPop(mode);
    setSelected(mode);
  }

  const sections = modes.map((mode)=>
    <Button key={mode} active={selected === mode} onClick={() => onClick(mode)}>
      {mode}
    </Button>
  );

  return (
    <div className="buttonGroup">
      <p>Pick a Population Distribution: </p>
      {sections}
    </div>
  );
}

PopBar.propTypes = {

  sim : PropTypes.string,
  setPop : PropTypes.func,
}
