import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function SimBarOption({ section, setSection }) {
  return (
    <Card border="primary" className="menu-item" onClick={() => setSection(section.name)}>
      <Card.Header>{section.name}</Card.Header>
      <Card.Body>
        <Card.Text className="menu-item-text">{section.description}</Card.Text>
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
