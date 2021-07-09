/*

  Displays a slider for the user to choose a number of random points and a button to generate them

*/
import { useState } from 'react';
import { Button, Form, InputGroup, } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function NewPointsInput({ generatePoints }) {
  const [numPoints, setNumPoints] = useState(5);

  return (
    <InputGroup className="input-slider-group">
      <Form.Control
        type="range"
        className="custom-range"
        data-testid="new-points-slider"
        style={{ width: '50%' }}
        min={4}
        max={10}
        value={numPoints}
        onChange={(event) => setNumPoints(event.target.value)}
      />
      <InputGroup.Text>{numPoints}</InputGroup.Text>
      <Button variant="outline-primary" onClick={() => generatePoints(numPoints)}>New Points</Button>
    </InputGroup>
  );
}

NewPointsInput.propTypes = {
  generatePoints: PropTypes.func.isRequired,
}
