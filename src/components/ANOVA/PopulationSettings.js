import _ from 'lodash';
import { useState } from 'react'
import LabeledSelector from '../../LabeledSelector';
import PopulationMeanInput from './PopulationMeanInput';
import { Button } from 'react-bootstrap';
import { generateNormal, getCounts } from '../../lib/stats-utils';
import PropTypes from 'prop-types';

export default function PopulationSettings({ setPopulations }) {
  const [means, setMeans] = useState([{value: 0, id: 1}]);
  const [stdDev, setStdDev] = useState(3);

  const setNumPops = (numPops) => {
    if (numPops <= means.length) {
      const newMeans = means.slice(0, numPops);
      setMeans(newMeans);
    } else {
      const newMeans = [...means, ..._.range(means.length, numPops).map((i) => ({value: 0, id: i + 1}))];
      setMeans(newMeans);
    }
  };

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
      <LabeledSelector min={1} max={20} label="Set the number of populations:" value={means.length} setValue={setNumPops}/>
      <br/>
      {means.map(({ value, id }) => <PopulationMeanInput key={id} mean={value} setMean={setMean} id={id}/>)}
      {(means.length > 0) && (
        <>
          <br/>
          <LabeledSelector min={1} max={5} label="Set the standard deviations:" value={stdDev} setValue={setStdDev}/>
          <br/>
        </>
      )}
      <Button onClick={() => generatePopulations()}>Generate Populations</Button>
    </>
  )
}

PopulationSettings.propTypes = {
  setPopulations: PropTypes.func.isRequired
}
