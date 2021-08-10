import { randomInt } from 'mathjs';
import { useEffect, useState, Fragment } from 'react';
import FTest from './FTest';
import PopulationRow from './PopulationRow';
import PopulationSettings from './PopulationSettings';

export default function ANOVA() {
  const [showFTest, setShowFTest] = useState(false);
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
    if (populations.some((pop) => pop.data.length === 0)) {
      setShowFTest(false)
    } else {
      setShowFTest(true)
    }
  }, [populations]);

  return (
    <>
      <PopulationSettings populations={populations} setPopulations={setPopulations}/>
      {showFTest && populations.map(({ id, data, sample, sampleSize }) => (
        <Fragment key={id}>
          <hr/>
          <PopulationRow data={data} sample={sample} id={id} sampleSize={sampleSize}/>
        </Fragment>
      ))}
      {showFTest && (
        <>
          <hr/>
          <FTest populations={populations}/>
        </>
      )}
    </>
  )
}
