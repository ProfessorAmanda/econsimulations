import { ButtonGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { optionalLaTeXType } from 'src/lib/types';
import styles from '../styles/SelectorButtonGroup.module.css';

export default function SelectorButtonGroup({ options, select, selected } : { options: string[], select: Function, selected: string }) {
  const buttons = options.map((option) => (
    <Button
      className={(selected === option) ? styles.selected : styles.unselected}
      variant={(selected === option) ? styles.selected : styles.unselected}
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
