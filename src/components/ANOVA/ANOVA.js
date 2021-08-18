import { randomInt } from 'mathjs';
import { useState, Fragment } from 'react';
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

  return (
    <>
      <PopulationSettings populations={populations} setPopulations={setPopulations} setShowFTest={setShowFTest}/>
      {showFTest && (
        <>
          {populations.map(({ id, data, sample, sampleSize }) => (
            <Fragment key={id}>
              <hr/>
              <PopulationRow data={data} sample={sample} id={id} sampleSize={sampleSize}/>
            </Fragment>
          ))}
          <hr/>
          <FTest populations={populations}/>
        </>
      )}
    </>
  )
}
