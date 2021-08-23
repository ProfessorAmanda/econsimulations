import { Alert } from 'react-bootstrap';
import SampleSizeInput from '../SampleSizeInput';
import PropTypes from 'prop-types';
import { olsSampleType } from '../../lib/types';
import DataTable from '../DataTable';

export default function SampleInput({ maxSize, addSample, samples, selected, setSelected }) {

  return (
    <>
      <Alert variant="primary">
        <p>Try drawing some samples and observe the line of best fit on the graph</p>
        <SampleSizeInput maxSize={maxSize} minSize={2} handleClick={addSample}/>
      </Alert>
      <DataTable
        data={samples}
        headers={{
          'Sample': 'id',
          'Size': 'size',
          'Slope': 'slope',
          'Intercept': 'intercept'
        }}
        setSelected={setSelected}
        setRowColor={(object) => (selected && (object.id === selected.id)) ? '#747EF2' : undefined}
      />
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
