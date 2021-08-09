import _ from 'lodash';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getCounts } from '../../lib/stats-utils';
import DotPlot from '../DotPlot';
import SampleSizeInput from '../SampleSizeInput';
import PropTypes from 'prop-types';

export default function PopulationRow({ population, id }) {
  const [sample, setSample] = useState([]);

  const generateSample = (size) => {
    const newSample = _.sampleSize(population, size);
    setSample(newSample);
  }

  const popSeries = [
    {
      name: 'Population Observations',
      data: population
    },
    {
      name: 'Sampled Observations',
      data: sample
    }
  ];

  const sampleSeries = [
    {
      name: 'Sampled Observations',
      data: getCounts(sample.map(({ x }) => x)),
      color: 'orange',
      marker: {
        lineWidth: 1,
        lineColor: 'orange',
        symbol: 'diamond'
      },
    }
  ];

  return (
    <Row className="g-4">
      <Col md="12" lg="4">
        <DotPlot
          series={popSeries}
          title={`Population ${id}`}
          xLabel="value"
          yLabel="Observations"
        />
      </Col>
      <Col md="6" lg="4" style={{display: 'flex', alignItems: 'center'}}>
        <SampleSizeInput maxSize={500} minSize={1} handleClick={generateSample}/>
      </Col>
      <Col md="6" lg="4">
        <DotPlot
          series={sampleSeries}
          title={`Sample ${id}`}
          xLabel="value"
          yLabel="Observations"
        />
      </Col>
    </Row>
  )
}

PopulationRow.propTypes = {
  population: PropTypes.arrayOf(PropTypes.number).isRequired,
  id: PropTypes.number.isRequired
}
