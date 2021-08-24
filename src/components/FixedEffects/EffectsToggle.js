import { Alert, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function EffectsToggle({ effects, toggleEffect, showBestFit, setShowBestFit }) {
  return (
    <Alert variant="success" style={{width: 'fit-content'}}>
      <Form.Label>Fix By:</Form.Label>
      <Form.Check
        checked={effects.includes('unit')}
        type="checkbox"
        label="unit"
        onChange={() => toggleEffect('unit')}
      />
      <Form.Check
        checked={effects.includes('time')}
        type="checkbox"
        label="time"
        onChange={() => toggleEffect('time')}
      />
      <hr/>
      <Form.Check
        checked={showBestFit}
        type="checkbox"
        label="Show Best Fit Line"
        onChange={() => setShowBestFit(!showBestFit)}
      />
    </Alert>
  )
}

EffectsToggle.propTypes = {
  effects: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleEffect: PropTypes.func.isRequired,
  showBestFit: PropTypes.bool.isRequired,
  setShowBestFit: PropTypes.func.isRequired
}
