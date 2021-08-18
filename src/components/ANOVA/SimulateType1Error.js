import { useState } from 'react';
import { Button } from 'react-bootstrap';
import SimulationPopulationsDisplay from './SimulationPopulationsDisplay';
import SimulationPopulationSettings from './SimulationPopulationSettings';

export default function SimulateType1Error() {
  const [showSim, setShowSim] = useState(false);
  const [populations, setPopulations] = useState([]);

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
          <SimulationPopulationSettings activeButton={populations.length > 0} setPopulations={setPopulations}/>
          <br/>
          <br/>
          {(populations.length > 0) && <SimulationPopulationsDisplay populations={populations}/>}
        </>
      )}
    </>
  )
}
