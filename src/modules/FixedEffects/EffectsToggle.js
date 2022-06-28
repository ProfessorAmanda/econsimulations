import { Form, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { fixedEffectsToggleType } from '@/lib/types';

export default function EffectsToggle({ effects, toggleEffect, means, toggleMean, olsLines, toggleOLSLine }) {
  return (
    <ListGroup variant="flush" style={{width: 'fit-content', margin: 'auto'}}>
      <ListGroup.Item>
        <Form.Label>Entity Fixed Effects:</Form.Label>
        {[1, 2].map((i) => (
          <Form.Check
            key={i}
            checked={means.entities.includes(i)}
            type="checkbox"
            label={`Show means for Entity ${i}`}
            onChange={() => toggleMean(i, 'entities')}
          />
        ))}
        {[1, 2].map((i) => (
          <Form.Check
            key={i}
            checked={effects.entities.includes(i)}
            type="checkbox"
            label={`De-mean Entity ${i}`}
            onChange={() => toggleEffect(i, 'entities')}
          />
        ))}
      </ListGroup.Item>
      <ListGroup.Item>
        <Form.Label>Period Fixed Effects:</Form.Label>
        {[0, 1, 2].map((i) => (
          <Form.Check
            key={i}
            checked={means.periods.includes(i)}
            type="checkbox"
            label={`Show means for Period ${i+1}`}
            onChange={() => toggleMean(i, 'periods')}
          />
        ))}
        {[0, 1, 2].map((i) => (
          <Form.Check
            key={i}
            checked={effects.periods.includes(i)}
            type="checkbox"
            label={`De-mean Period ${i+1}`}
            onChange={() => toggleEffect(i, 'periods')}
          />
        ))}
      </ListGroup.Item>
      <ListGroup.Item>
        <Form.Label>Show OLS Lines:</Form.Label>
        {['Naive', 'With Entity Fixed Effect', 'With Period Fixed Effect', 'With Both Fixed Effects'].map((type) => (
          <Form.Check
            key={type}
            checked={olsLines.includes(type)}
            type="checkbox"
            label={type}
            onChange={() => toggleOLSLine(type)}
          />
        ))}
      </ListGroup.Item>
    </ListGroup>
  )
}

EffectsToggle.propTypes = {
  effects: fixedEffectsToggleType.isRequired,
  toggleEffect: PropTypes.func.isRequired,
  means: fixedEffectsToggleType.isRequired,
  toggleMean: PropTypes.func.isRequired,
  olsLines: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleOLSLine: PropTypes.func.isRequired
}
