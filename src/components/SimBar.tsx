import SimBarOption from './SimBarOption';
import { MODULES } from 'src/lib/constants';
import { Col, Row } from 'react-bootstrap';
import { Section } from 'src/lib/ts-types';

export default function SimBar() {
  const sections = MODULES.map((section : Section) => (
    <Col key={section.name}>
      <SimBarOption section={section} />
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
