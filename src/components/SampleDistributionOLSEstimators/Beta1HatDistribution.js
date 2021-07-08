import { Container, Row, Col } from 'react-bootstrap';
import DotPlot from '../DotPlot.js';
import MultipleSamplesInput from './MultipleSamplesInput.js';
import { max, min } from 'mathjs';
import PropTypes from 'prop-types';
import { dataObjectArrayType, olsSampleType } from '../../lib/types.js';
import { getCounts } from '../../lib/stats-utils.js';

export default function Beta1HatDistribution({ data, samples, addSamples }) {
  const plotData = getCounts(samples.map(({ slope }) => slope));

  return (
    <Container>
      <Row md={1} lg={2}>
        <Col>
          <DotPlot
            series={[{ name: 'slopes', data: plotData }]}
            title="Distribution of Sample Slopes"
            xMin={min(-5, ...plotData.map(({ x }) => x))}
            xMax={max(5, ...plotData.map(({ x }) => x))}
            yMax={max(4, ...plotData.map(({ y }) => y))}
            xLabel="Slope"
          />
        </Col>
        <Col>
          <MultipleSamplesInput populationSize={data.length} addSamples={addSamples}/>
        </Col>
      </Row>
    </Container>
  )
}

Beta1HatDistribution.propTypes = {
  data: dataObjectArrayType.isRequired,
  samples: PropTypes.arrayOf(olsSampleType).isRequired,
  addSamples: PropTypes.func.isRequired
}
