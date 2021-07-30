import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function SimBarOption({ section, setSection }) {
  return (
    <Card border="primary" className="sim-option">
      <Card.Body>
        <Card.Text>{section.description}</Card.Text>
        <Button variant="outline-primary" onClick={() => setSection(section.name)} style={{width: '100%'}}>
          {section.name}
        </Button>
      </Card.Body>
    </Card>
  );
}

SimBarOption.propTypes = {
  setSection: PropTypes.func.isRequired,
  section: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]).isRequired
  }).isRequired,
}
