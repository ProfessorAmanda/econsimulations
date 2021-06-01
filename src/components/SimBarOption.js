import React from 'react';
import { Button, Card, CardText } from 'reactstrap';

export default function SimBarOption({ section, setSection }) {
  return (
    <Card body outline color="primary" className="simOption">
      <CardText style={{overflowY: 'auto', boxSizing: 'content-box' }}>{section.description}</CardText>
      <Button outline color='primary' onClick={() => setSection(section.name)}>
        {section.name}
      </Button>
    </Card>
  );
}
