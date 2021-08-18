import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { InlineMath } from 'react-katex';
import { generateNormal, getCounts } from '../../lib/stats-utils';
import LabeledInput from '../LabeledInput';
import LabeledSelector from '../LabeledSelector';
import PropTypes from 'prop-types';

export default function SimulationPopulationSettings({ activeButton, setPopulations }) {
  const [numPops, setNumPops] = useState(2);
  const [alpha, setAlpha] = useState(0.05);
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(3);

  useEffect(() => {
    setPopulations([]);
  }, [numPops, alpha, mean, stdDev, setPopulations]);

  const generatePopulations = () => {
    const newPopulations = _.range(1, numPops + 1).map((id) => ({
      data: getCounts(generateNormal(500, mean, stdDev, 0)),
      id,
      sampleSize: 30
    }));
    setPopulations(newPopulations);
  }

  return (
    <>
      <LabeledSelector min={2} max={20} label="Number of populations:" value={numPops} setValue={setNumPops}/>
      <br/>
      <LabeledInput
        min={0}
        max={1}
        step={0.01}
        label={<>Tolerance <InlineMath math="\alpha"/>:</>}
        value={alpha}
        setValue={setAlpha}
      />
      <br/>
      <p>
        The null hypothesis <InlineMath math="H_0"/> is that <InlineMath math={`\\mu_1 = \\mu_2 ${(numPops > 3) ? '= \\dotsc' : ''} ${(numPops > 2) ? `= \\mu_{${numPops}}` : ''}`}/>.
      </p>
      <LabeledSelector min={-5} max={5} label="Set mean of all populations:" value={mean} setValue={setMean}/>
      <br/>
      <LabeledSelector min={1} max={4} label="Set the standard deviations:" value={stdDev} setValue={setStdDev}/>
      <br/>
      <Button
        active={activeButton}
        variant="outline-primary"
        onClick={() => generatePopulations()}
      >
        Generate Populations
      </Button>
    </>
  )
}

SimulationPopulationSettings.propTypes = {
  activeButton: PropTypes.bool.isRequired,
  setPopulations: PropTypes.func.isRequired
}
