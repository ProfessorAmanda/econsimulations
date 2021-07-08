import { ButtonGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function SelectorButtonGroup({ options, select, selected }) {
  const buttons = options.map((option) => (
    <Button
      style={{ backgroundColor: (selected === option) ? '#4CAF50' : '#555555' }}
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
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  select: PropTypes.func.isRequired,
  selected: PropTypes.string
}
