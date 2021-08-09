import { useState } from 'react';
import PopulationRow from './PopulationRow';
import PopulationSettings from './PopulationSettings';

export default function ANOVA() {
  const [populations, setPopulations] = useState([]);

  return (
    <>
      <PopulationSettings setPopulations={setPopulations}/>
      {populations.map(({ data, id }) => (
        <>
          <hr/>
          <PopulationRow key={id} population={data} id={id + 1}/>
        </>
      ))}
    </>
  )
}
