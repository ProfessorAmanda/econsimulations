import { useState } from 'react';
import { Button } from 'react-bootstrap';
import DistributionOfFStatistic from './DistributionOfFStatistic';
import SimulationPopulationsDisplay from './SimulationPopulationsDisplay';
import SimulationPopulationSettings from './SimulationPopulationSettings';
import SimulationSampleSettings from './SimulationSampleSettings';

export default function SimulateType1Error() {
  const [showSim, setShowSim] = useState(false);
  const [populations, setPopulations] = useState([]);
  const [alpha, setAlpha] = useState(0.05);

  return (
    <>
      <Button
        active={showSim}
        variant="outline-primary"
        onClick={() => setShowSim(true)}
      >
        Simulate Type I Error for ANOVA
      </Button>
      <br/>
      <br/>
      {showSim && (
        <>
          <SimulationPopulationSettings
            setPopulations={setPopulations}
            alpha={alpha}
            setAlpha={setAlpha}
          />
          <br/>
          <br/>
          {(populations.length > 0) && (
            <>
              <SimulationPopulationsDisplay populations={populations}/>
              <br/>
              <SimulationSampleSettings populations={populations} setPopulations={setPopulations}/>
              <br/>
              <DistributionOfFStatistic populations={populations} alpha={alpha}/>
            </>
          )}
        </>
      )}
    </>
  )
}
