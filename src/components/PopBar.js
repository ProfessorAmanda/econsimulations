/*
  Allows the user to select simulation variations

  Used by Law of Large Numbers and Central Limit Theorem

  props:
    sim     - string
    setPop  - callback
*/
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SelectorButtonGroup from './SelectorButtonGroup';


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

  return (
    <div className="buttonGroup">
      <p>Pick a Population Distribution: </p>
      <SelectorButtonGroup options={modes} select={onClick} selected={selected}/>
    </div>
  );
}

PopBar.propTypes = {

  sim : PropTypes.string,
  setPop : PropTypes.func,
}
