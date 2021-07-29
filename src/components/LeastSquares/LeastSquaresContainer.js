/*

  A container component that holds the description and simulation for Least Squares

*/
import LeastSquares from './LeastSquares';
import { Alert } from 'react-bootstrap';

export default function LeastSquaresContainer() {
  return (
    <div className="module-container">
      <Alert style={{ width: '50%', margin: 'auto' }} variant="primary">
        Least Squares
      </Alert>
      <br/>
      <LeastSquares/>
    </div>
  );
}
