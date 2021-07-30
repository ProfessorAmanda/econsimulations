/*

  A container component that holds the description and simulation for Least Squares

*/
import LeastSquares from './LeastSquares';
import { Alert } from 'react-bootstrap';

export default function LeastSquaresContainer() {
  return (
    <div className="module-container">
      <Alert className="sim-description" variant="primary">
        Least Squares
      </Alert>
      <Alert className="sim-description" variant="primary">
        The Ordinary Least Squares method estimates the intercept and slope of a line that “best fits” the observed data by minimizing the sum of the squared distances between the points and the line.
      </Alert>
      <br/>
      <LeastSquares/>
    </div>
  );
}
