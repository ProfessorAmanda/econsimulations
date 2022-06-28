import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { optionalLaTeXType } from 'src/lib/types';

export default function SimulationIntro({ name, text }: { name: string, text: React.ReactElement | string }) {
  return (
    <Alert className="sim-description" variant="primary" data-testid={`${name}-into`}>
      <Alert.Heading>{name}</Alert.Heading>
      <hr/>
      {text}
    </Alert>
  )
}

SimulationIntro.propTypes = {
  name: PropTypes.string.isRequired,
  text: optionalLaTeXType.isRequired
}
