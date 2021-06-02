/*
  Allows the user to select simulation variations

  props:
    sim     - string
    setPop  - callback
*/
import React, { useState } from 'react';
import { Button} from 'reactstrap';

export default function PopBar({ sim, setPop }) {
  const [selected, setSelected] = useState();

  let modes = [];
  if (sim === "CLT") {
    modes = [ "Normal", "Uniform", "Exponential", "Chi-Squared", "Mystery" ];
  } else if (sim === "LLN") {
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
