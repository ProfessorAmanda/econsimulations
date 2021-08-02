import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function SimBarOption({ section, setSection }) {
  return (
    <Card border="primary" className="menu-item" data-testid={`module-${section.name}`} onClick={() => setSection(section.name)}>
      <Card.Header className="menu-item-title">{section.name}</Card.Header>
      <Card.Body>
        <Card.Text className="menu-item-text">{section.description}</Card.Text>
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
