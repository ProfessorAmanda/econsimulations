import MeasurementError from './MeasurementError';
import SimulationIntro from '../../components/SimulationIntro';
import MeasurementErrorPhaseTwo from './MeasurementErrorPhaseTwo';

export default function MeasurementErrorContainer() {
  return (
    <div className="module-container">
      <SimulationIntro
        name="Measurement Error"
        text={'We need a brief introduction here :D'}
      />
      <MeasurementError/>
      <MeasurementErrorPhaseTwo/>
      
    </div>
  );
}
