import { min } from 'mathjs';
import { Col, Row } from 'react-bootstrap';
import DotPlot from '../DotPlot';
import PropTypes from 'prop-types';
import { anovaPopulationObjectType } from '../../lib/types';

export default function SimulationPopulationsDisplay({ populations }) {
  return (
    <Row xs={1} sm={2} md={min(populations.length, 4)}>
      {populations.map(({ id, data }) => (
        <Col key={id}>
          <DotPlot
            series={[{ name: 'Population Observations', data, showInLegend: false }]}
            title={`Population ${id}`}
            xMin={-20}
            xMax={20}
            xLabel="Value"
            yLabel="Observations"
          />
        </Col>
      ))}
    </Row>
  )
}

SimulationPopulationsDisplay.propTypes = {
  populations: PropTypes.arrayOf(anovaPopulationObjectType).isRequired
}
