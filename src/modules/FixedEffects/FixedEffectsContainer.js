import SimulationIntro from '@/components/SimulationIntro';
import FixedEffects from './FixedEffects';

export default function FixedEffectsContainer() {

  return (
    <div className="module-container">
      <SimulationIntro
        name="Fixed Effects"
        text="This module is currently under construction"
      />
      <br/>
      <FixedEffects/>
    </div>
  );
}
