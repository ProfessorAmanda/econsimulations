import LeastSquares from './LeastSquares';
import SimulationIntro from '@/components/SimulationIntro';

export default function LeastSquaresContainer() {
  return (
    <div className="module-container">
      <SimulationIntro
        name="Least Squares"
        text="The Ordinary Least Squares method estimates the intercept and slope of a line that “best fits” the observed data by minimizing the sum of the squared distances between the points and the line."
      />
      <br/>
      <LeastSquares/>
    </div>
  );
}
