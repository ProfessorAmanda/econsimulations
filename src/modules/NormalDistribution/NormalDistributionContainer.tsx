import SimulationIntro from 'src/components/SimulationIntro';
import NormalDistribution from './NormalDistribution';

export default function LeastSquaresContainer() {
  return (
    <div className="module-container">
      <SimulationIntro
        name="Normal Distribution"
        text="Intro here :D"
      />
      <br/>
      <NormalDistribution />
    </div>
  );
}
