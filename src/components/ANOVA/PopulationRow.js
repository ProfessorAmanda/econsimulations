import _ from 'lodash';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { getCounts } from '../../lib/stats-utils';
import DotPlot from '../DotPlot';
import PropTypes from 'prop-types';
import { dataObjectArrayType } from '../../lib/types';

export default function PopulationRow({ data, sample, sampleSize, id, setPopulationAttr }) {

  const generateSample = (size) => {
    setPopulationAttr(id, 'sample', _.sampleSize(data, size));
  }

  const adjustSampleSize = (value) => {
    setPopulationAttr(id, 'sampleSize', value);
  }

  const popSeries = [
    {
      name: 'Population Observations',
      data
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
        <InputGroup>
          <Form.Control
            align="right"
            type="number"
            placeholder="Sample Size:"
            min={1}
            max={500}
            value={sampleSize}
            onChange={(event) => adjustSampleSize(event.target.value)}
          />
          <Button
            variant="secondary"
            disabled={!sampleSize || sampleSize > 500 || sampleSize < 1} onClick={() => generateSample(+sampleSize)}
          >
            Sample
          </Button>
        </InputGroup>
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
  data: dataObjectArrayType.isRequired,
  sample: dataObjectArrayType.isRequired,
  sampleSize: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  setPopulationAttr: PropTypes.func.isRequired
}
