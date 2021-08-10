import { Alert } from 'react-bootstrap';
import SamplesTable from '../SampleDistributionOLSEstimators/SamplesTable';
import SampleSizeInput from '../SampleSizeInput';
import PropTypes from 'prop-types';
import { olsSampleType } from '../../lib/types';

export default function SampleInput({ maxSize, addSample, samples, selected, setSelected }) {

  return (
    <>
      <Alert variant="primary">
        <p>Try drawing some samples and observe the line of best fit on the graph</p>
        <SampleSizeInput maxSize={maxSize} minSize={2} handleClick={addSample} classname="sample-size-input"/>
      </Alert>
      <SamplesTable samples={samples} setSelected={setSelected} selected={selected}/>
    </>
  )
}

SampleInput.propTypes = {
  maxSize: PropTypes.number.isRequired,
  addSample: PropTypes.func.isRequired,
  samples: PropTypes.arrayOf(olsSampleType).isRequired,
  selected: olsSampleType,
  setSelected: PropTypes.func.isRequired,
}
