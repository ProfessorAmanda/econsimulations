import SimBarOption from './SimBarOption';
import PropTypes from 'prop-types'
import { MODULES } from '../lib/constants';
import { Col, Row } from 'react-bootstrap';

export default function SimBar({ setSection }) {
  const sections = MODULES.map((section) => (
    <Col key={section.name}>
      <SimBarOption section={section} setSection={setSection}/>
    </Col>
  ));

  return (
    <div className="menu" data-testid="menu">
      <div className="mini-logo"/>
      <br/>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">{sections}</Row>
    </div>
  );
}

SimBar.propTypes = {
  setSection: PropTypes.func.isRequired,
}
