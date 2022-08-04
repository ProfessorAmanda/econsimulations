import { ButtonGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { optionalLaTeXType } from 'src/lib/types';
import styles from '@/styles/components/SelectorButtonGroup.module.css';
import useWindowDimensions from 'src/lib/useWindowDimensions';

export default function SelectorButtonGroup({ options, select, selected }: { options: string[], select: Function, selected: string }) {
  const windowDimensions = useWindowDimensions();

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
    <div className={styles.container}>
      {/* If the screen is super small (phone in portrait orientation), we want to use smaller buttons.
      Note that undefined means a medium size button that we want for all other screens,
      not 'lg' which is too big) */}
      <ButtonGroup size={windowDimensions.isMobilePortrait ? 'sm' : undefined}>
        {buttons}
      </ButtonGroup>
    </div>
  )
}

SelectorButtonGroup.propTypes = {
  options: PropTypes.arrayOf(optionalLaTeXType).isRequired,
  select: PropTypes.func.isRequired,
  selected: optionalLaTeXType
}
