import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import { anovaPopulationObjectType } from '@/lib/types';
import LabeledInput from '@/components/LabeledInput';

export default function SimulationSampleSettings({ populations, setPopulations }) {
  const setSampleSize = (id, value) => {
    const newPopulations = populations.map((pop) => ({
      ...pop,
      sampleSize: (pop.id === id) ? value : pop.sampleSize
    }));
    setPopulations(newPopulations);
  }

  return (
    <>
      {populations.map(({ sampleSize, id }) => (
        <Row key={id}>
          <LabeledInput
            min={1}
            max={500}
            label={`Set sample size for Population ${id}: `}
            value={sampleSize}
            setValue={(val) => setSampleSize(id, val)}/>
        </Row>
      ))}
    </>
  )
}

SimulationSampleSettings.propTypes = {
  populations: PropTypes.arrayOf(anovaPopulationObjectType).isRequired,
  setPopulations: PropTypes.func.isRequired
}
