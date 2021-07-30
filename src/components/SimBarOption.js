import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function SimBarOption({ section, setSection }) {
  return (
    <Card border="primary">
      <Card.Body>
        <Card.Text className="menu-item-text">{section.description}</Card.Text>
        <Button variant="outline-primary" onClick={() => setSection(section.name)} className="module-button">
          {section.name}
        </Button>
      </Card.Body>
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
