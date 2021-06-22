import React from "react";
import { ButtonGroup, Button } from "reactstrap";

export default function SelectorButtonGroup({ options, select, selected }) {
  const buttons = options.map((option) =>
    <Button
      style={{ backgroundColor: (selected === option) ? "#4CAF50" : "#555555" }}
      onClick={() => select(option)}
      key={`${option}`}
    >
      {option}
    </Button>
  );

  return (
    <ButtonGroup>
      {buttons}
    </ButtonGroup>
  )
}
