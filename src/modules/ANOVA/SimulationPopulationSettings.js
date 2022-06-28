import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import TeX from '@matejmazur/react-katex';
import { generateNormal, getCounts } from '@/lib/stats-utils';
import LabeledInput from '@/components/LabeledInput';
import LabeledSelector from '@/components/LabeledSelector';
import PropTypes from 'prop-types';
import { stringOrNumberType } from '@/lib/types';

export default function SimulationPopulationSettings({ setPopulations, alpha, setAlpha }) {
  const [numPops, setNumPops] = useState(2);
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(3);

  useEffect(() => {
    setPopulations([]);
  }, [numPops, alpha, mean, stdDev, setPopulations]);

  const generatePopulations = () => {
    const newPopulations = _.range(1, numPops + 1).map((id) => ({
      data: getCounts(generateNormal(500, mean, stdDev, 1)),
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
        label={<>Tolerance <TeX math="\alpha"/>:</>}
        value={alpha}
        setValue={setAlpha}
      />
      <br/>
      <p>
        The null hypothesis <TeX math="H_0"/> is that <TeX math={`\\mu_1 = \\mu_2 ${(numPops > 3) ? '= \\dotsc' : ''} ${(numPops > 2) ? `= \\mu_{${numPops}}` : ''}`}/>.
      </p>
      <LabeledSelector min={-5} max={5} label="Set mean of all populations:" value={mean} setValue={setMean}/>
      <br/>
      <LabeledSelector min={1} max={4} label="Set the standard deviations:" value={stdDev} setValue={setStdDev}/>
      <br/>
      <Button
        variant="outline-primary"
        onClick={() => generatePopulations()}
      >
        Generate Populations
      </Button>
    </>
  )
}

SimulationPopulationSettings.propTypes = {
  setPopulations: PropTypes.func.isRequired,
  alpha: stringOrNumberType.isRequired,
  setAlpha: PropTypes.func.isRequired
}
