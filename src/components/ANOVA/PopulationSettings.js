import _ from 'lodash';
import { useState } from 'react'
import LabeledSelector from '../LabeledSelector';
import PopulationMeanInput from './PopulationMeanInput';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import { generateNormal, getCounts } from '../../lib/stats-utils';
import PropTypes from 'prop-types';
import PopulationSampleSizeInput from './PopulationSampleSizeInput';
import { anovaObjectType } from '../../lib/types.js';
import { randomInt } from 'mathjs';

export default function PopulationSettings({ populations, setPopulations }) {
  const [stdDev, setStdDev] = useState(3);

  const setNumPops = (numPops) => {
    if (numPops <= populations.length) {
      const newPops = populations.slice(0, numPops).map((pop) => (
        {
          ...pop,
          data: [],
          sample: []
        }
      ));
      setPopulations(newPops);
    } else {
      const newPops = [
        ...populations.map((pop) => ({...pop, data: [], sample: []})),
        ..._.range(populations.length, numPops).map((i) => (
          {
            id: i+1,
            mean: randomInt(-5, 6),
            sampleSize: 30,
            data: [],
            sample: []
          }
        ))
      ];
      setPopulations(newPops);
    }
  };

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

  const generatePopulations = () => {
    setPopulations(populations.map((pop) => {
      const data = getCounts(generateNormal(500, pop.mean, stdDev, 0));
      // const sample = _.sampleSize(data, pop.sampleSize);
      return { ...pop, data }
    }));
  }

  const generateSamples = () => {
    setPopulations(populations.map((pop) => {
      const sample = _.sampleSize(pop.data, pop.sampleSize);
      return { ...pop, sample }
    }));
  }

  return (
    <>
      <LabeledSelector min={2} max={20} label="Set the number of populations:" value={populations.length} setValue={setNumPops}/>
      {(populations.length > 0) && (
        <>
          <br/>
          <LabeledSelector min={1} max={4} label="Set the standard deviations:" value={stdDev} setValue={setStdDev}/>
          <br/>
        </>
      )}
      {populations.map(({ sampleSize, mean, id }) => (
        <Row key={id}>
          <Col xl={{span: 4, offset: 2}} xs="6">
            <PopulationMeanInput mean={mean} setMean={setPopulationAttr} id={id}/>
          </Col>
          <Col xl="4" xs="6">
            <PopulationSampleSizeInput sampleSize={sampleSize} setSampleSize={setPopulationAttr} id={id}/>
          </Col>
        </Row>
      ))}
      <br/>
      <ButtonGroup>
        <Button variant="outline-primary" onClick={() => generatePopulations()}>Generate Populations</Button>
        <Button
          variant="outline-primary"
          disabled={populations.some(({ data }) => data.length === 0)}
          onClick={() => generateSamples()}
        >
          Take Samples
        </Button>
      </ButtonGroup>
    </>
  )
}

PopulationSettings.propTypes = {
  populations: PropTypes.arrayOf(anovaObjectType).isRequired,
  setPopulations: PropTypes.func.isRequired
}
