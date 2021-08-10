import { Col, Row } from 'react-bootstrap';
import { getCounts, populationMean, populationStandardDev } from '../../lib/stats-utils';
import DotPlot from '../DotPlot';
import PropTypes from 'prop-types';
import { dataObjectArrayType } from '../../lib/types';
import { max } from 'mathjs';

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

  const sampleMean = populationMean(sample);
  const sampleSD = populationStandardDev(sample);
  const yMax = (sample.length > 0) ? max(getCounts(sample.map(({ x }) => x)).map(({ y }) => y)) + 1 : 0

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
    },
    {
      type: 'line',
      name: 'Sample Mean',
      data: [{ x: sampleMean || 0, y: 0 }, { x: sampleMean || 0, y: yMax }],
      color: 'black',
      enableMouseTracking: false,
      label: {
        format: `<div>Sample Mean: ${sampleMean && sampleMean.toFixed(2)}<br/>Sample SD: ${sampleMean && sampleSD.toFixed(2)}</div>`
      }
    }
  ];

  return (
    <Row>
      <Col xs="12" sm={{span: 8, offset: 2}} md={{span: 4, offset: 2}}>
        <DotPlot
          series={popSeries}
          title={`Population ${id}`}
          xMin={-20}
          xMax={20}
          xLabel="value"
          yLabel="Observations"
        />
      </Col>
      <Col xs="12" sm={{span: 8, offset: 2}} md={{span: 4, offset: 0}}>
        <DotPlot
          series={sampleSeries}
          title={`Sample ${id}`}
          xMin={-20}
          xMax={20}
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
