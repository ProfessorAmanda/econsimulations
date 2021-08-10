import { Col, Row } from 'react-bootstrap';
import { getCounts } from '../../lib/stats-utils';
import DotPlot from '../DotPlot';
import PropTypes from 'prop-types';
import { dataObjectArrayType } from '../../lib/types';

export default function PopulationRow({ data, sample, id }) {

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
    <Row>
      <Col xs="12" sm={{span: 8, offset: 2}} md={{span: 4, offset: 2}}>
        <DotPlot
          series={popSeries}
          title={`Population ${id}`}
          xLabel="value"
          yLabel="Observations"
        />
      </Col>
      <Col xs="12" sm={{span: 8, offset: 2}} md={{span: 4, offset: 0}}>
        <DotPlot
          series={sampleSeries}
          title={`Sample ${id}`}
          yMax={5}
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
  id: PropTypes.number.isRequired
}
