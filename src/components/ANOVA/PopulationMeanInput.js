import LabeledSelector from '../LabeledSelector';
import PropTypes from 'prop-types';

export default function PopulationMeanInput({ mean, setMean, id }) {

  const setValue = (value) => {
    setMean(id, 'mean', +value)
  }

  return (
    <LabeledSelector min={0} max={20} label={`Set mean for Population ${id}: `} value={mean} setValue={setValue}/>
  )
}

PopulationMeanInput.propTypes = {
  mean: PropTypes.number.isRequired,
  setMean: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}
