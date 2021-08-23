import SimulationIntro from '../SimulationIntro';
import FixedEffects from './FixedEffects';

export default function FixedEffectsContainer() {

  return (
    <div className="module-container">
      <SimulationIntro
        name="Fixed Effects"
        text=""
      />
      <br/>
      <FixedEffects/>
    </div>
  );
}
