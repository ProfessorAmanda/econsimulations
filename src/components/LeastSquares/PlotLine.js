/*

  Displays a button for the user to plot their guess or a button to generate the correct best fit line

*/
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function PlotLine({ stage, setStage, squareAreas, generateBestLine }) {
  return (
    (stage === 2) ? (
      <Button variant="outline-primary" onClick={() => setStage(3)}>Plot Your Guess</Button>
    ) : (
      <div>
        <p>Sum Squares: {squareAreas.reduce((a, b) => a + b, 0).toFixed(2)}</p>
        <Button variant="outline-info" onClick={() => generateBestLine()}>Reveal the Least Squares Line</Button>
      </div>
    )
  );
}

PlotLine.propTypes = {
  stage: PropTypes.number.isRequired,
  setStage: PropTypes.func.isRequired,
  squareAreas: PropTypes.arrayOf(PropTypes.number).isRequired,
  generateBestLine: PropTypes.func.isRequired,
}
