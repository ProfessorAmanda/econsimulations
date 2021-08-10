import PropTypes from 'prop-types';
import LabeledInput from '../LabeledInput';

export default function PopulationSampleSizeInput({ sampleSize, setSampleSize, id }) {

  const setValue = (value) => {
    setSampleSize(id, 'sampleSize', value)
  }

  return (
    <LabeledInput min={1} max={500} label={`Set sample size for Population ${id}: `} value={sampleSize} setValue={setValue}/>
  )
}

PopulationSampleSizeInput.propTypes = {
  sampleSize: PropTypes.number.isRequired,
  setSampleSize: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}
