import { ButtonGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { optionalLaTeXType } from '../lib/types';

export default function SelectorButtonGroup({ options, select, selected }) {
  const buttons = options.map((option) => (
    <Button
      variant={(selected === option) ? 'selected' : 'unselected'}
      onClick={() => select(option)}
      key={`${option}`}
    >
      {option}
    </Button>
  ));

  return (
    <ButtonGroup>
      {buttons}
    </ButtonGroup>
  )
}

SelectorButtonGroup.propTypes = {
  options: PropTypes.arrayOf(optionalLaTeXType).isRequired,
  select: PropTypes.func.isRequired,
  selected: optionalLaTeXType
}
