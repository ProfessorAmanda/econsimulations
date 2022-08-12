import MeasurementError from './MeasurementError';
import SimulationIntro from 'src/components/SimulationIntro';
import MeasurementErrorPhaseTwo from './MeasurementErrorPhaseTwo';

export default function MeasurementErrorContainer() {
  return (
    <div className="module-container">
      <SimulationIntro
        name="Measurement Error"
        text={''}
      />
      <MeasurementError/>
      <MeasurementErrorPhaseTwo/>
      
    </div>
  );
}
