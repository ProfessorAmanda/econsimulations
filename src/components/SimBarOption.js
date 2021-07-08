import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function SimBarOption({ section, setSection }) {
  return (
    <Card body outline color="primary" className="sim-option">
      <Card.Text>{section.description}</Card.Text>
      <Button outline color="primary" onClick={() => setSection(section.name)}>
        {section.name}
      </Button>
    </Card>
  );
}

SimBarOption.propTypes = {
  setSection: PropTypes.func.isRequired,
  section: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
}
