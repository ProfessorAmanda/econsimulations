import MeasurementError from './MeasurementError';
import SimulationIntro from '../SimulationIntro';

export default function MeasurementErrorContainer() {
  return (
    <div className="module-container">
      <SimulationIntro
        name="Measurement Error"
        text={"Intro!"}
      />
      <MeasurementError/>
      
    </div>
  );
}
