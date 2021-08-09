import _ from 'lodash';
import { useEffect, useState } from 'react'
import LabeledSelector from '../../LabeledSelector';
import PopulationMeanInput from './PopulationMeanInput';
import { Button } from 'react-bootstrap';
import { generateNormal, getCounts } from '../../lib/stats-utils';
import PropTypes from 'prop-types';

export default function PopulationSettings({ setPopulations }) {
  const [numPops, setNumPops] = useState(0);
  const [means, setMeans] = useState([]);
  const [stdDev, setStdDev] = useState(3);

  useEffect(() => {
    setMeans(_.range(0, numPops).map((i) => ({value: 0, id: i})))
  }, [numPops]);

  const setMean = (id, value) => {
    setMeans(means.map((mean) => {
      if (mean.id === id) {
        return {...mean, value}
      } else {
        return mean
      }
    }));
  }

  const generatePopulations = () => {
    setPopulations(means.map(({ value, id }) => (
      {
        data: getCounts(generateNormal(500, value, stdDev, 1)),
        sampleSize: '',
        sample: [],
        id
      }
    )));
  }

  return (
    <>
      <LabeledSelector min={0} max={20} label="Set the number of populations:" value={numPops} setValue={setNumPops}/>
      <hr/>
      {means.map(({ value, id }) => <PopulationMeanInput key={id} mean={value} setMean={setMean} id={id}/>)}
      {(numPops > 0) && (
        <>
          <hr/>
          <LabeledSelector min={0} max={5} label="Set the standard deviations:" value={stdDev} setValue={setStdDev}/>
          <hr/>
        </>
      )}
      <Button onClick={() => generatePopulations()}>Generate Populations</Button>
    </>
  )
}

PopulationSettings.propTypes = {
  setPopulations: PropTypes.func.isRequired
}
