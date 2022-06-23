import { randomInt } from 'mathjs';
import { useState, Fragment, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import FTest from './FTest';
import PopulationRow from './PopulationRow';
import PopulationSettings from './PopulationSettings';
import SimulateType1Error from './SimulateType1Error';

export default function ANOVA() {
  const [showResults, setShowResults] = useState(false);
  const [populations, setPopulations] = useState([
    {
      id: 1,
      mean: randomInt(-5, 6),
      sampleSize: 30,
      data: [],
      sample: []
    },
    {
      id: 2,
      mean: randomInt(-5, 6),
      sampleSize: 30,
      data: [],
      sample: []
    }
  ]);

  useEffect(() => {
    setShowResults(false)
  }, [populations]);

  const samples = populations.map(({ sample }) => sample.map(({ x }) => x));

  return (
    <>
      <PopulationSettings populations={populations} setPopulations={setPopulations}/>
      {populations.every(({ data }) => data.length !== 0) && (
        <>
          {populations.map(({ id, data, sample, sampleSize }) => (
            <Fragment key={id}>
              <hr/>
              <PopulationRow data={data} sample={sample} id={id} sampleSize={sampleSize}/>
            </Fragment>
          ))}
          <hr/>
          <Button
            variant="outline-primary"
            active={showResults}
            onClick={() => setShowResults(true)}
            disabled={samples.some((sample) => sample.length === 0)}
          >
            Run F-Test
          </Button>
          {showResults && (
            <>
              <FTest populations={populations} samples={samples}/>
              <hr/>
              <SimulateType1Error/>
            </>
          )}
        </>
      )}
    </>
  )
}
