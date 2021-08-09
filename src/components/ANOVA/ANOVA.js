import { useState, Fragment } from 'react';
import FTest from './FTest';
import PopulationRow from './PopulationRow';
import PopulationSettings from './PopulationSettings';

export default function ANOVA() {
  const [populations, setPopulations] = useState([]);

  const setPopulationAttr = (id, attr, value) => {
    const newPopulations = populations.map((pop) => {
      if (pop.id === id) {
        return {...pop, [attr]: value}
      } else {
        return pop
      }
    });
    setPopulations(newPopulations);
  }

  return (
    <>
      <PopulationSettings setPopulations={setPopulations}/>
      {populations.map(({ id, data, sample, sampleSize }) => (
        <Fragment key={id}>
          <hr/>
          <PopulationRow data={data} sample={sample} id={id} sampleSize={sampleSize} setPopulationAttr={setPopulationAttr}/>
        </Fragment>
      ))}
      {(populations.length > 0) && (
        <>
          <hr/>
          <FTest populations={populations}/>
        </>
      )}
    </>
  )
}
