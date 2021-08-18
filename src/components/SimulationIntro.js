import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { optionalLaTeXType } from '../lib/types';

export default function SimulationIntro({ name, text }) {
  return (
    <Alert className="sim-description" variant="primary">
      <Alert.Heading>{name}</Alert.Heading>
      {text}
    </Alert>
  )
}

SimulationIntro.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.oneOfType(optionalLaTeXType).isRequired
}
