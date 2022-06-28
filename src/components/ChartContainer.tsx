import DotPlot from './DotPlot';
import { Alert, Container, Col, Row } from 'react-bootstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { dataObjectArrayType, popShapeType } from 'src/lib/types';
import { dataObject, popShape, highchartsSeries } from 'src/lib/ts-types';
import { TEXTS, VALUES } from 'src/lib/constants';
import DataTable from './DataTable';

interface ChartContainerProps {
  popArray: dataObject[];
  popMean: number;
  sampled: dataObject[];
  sampleMean?: number;
  popShape: popShape;
}

export default function ChartContainer({ popArray, popMean, sampled, sampleMean, popShape } : ChartContainerProps) {
  const { xmaxval, xminval, ymaxval, title, xLabel } = VALUES[popShape];

  const series : highchartsSeries = [
    {
      name: 'Population Observations',
      data: popArray
    },
    {
      name: 'Sampled Observations',
      data: sampled
    },
    {
      type: 'line',
      name: 'Sample Mean',
      data: [{ x: sampleMean || 0, y: 0, id: 1 }, { x: sampleMean || 0, y: ymaxval, id: 2 }],
      color: 'red',
      enableMouseTracking: false,
      showInLegend: false,
      visible: (sampleMean !== undefined) && (sampled.length > 0),
      label: {
        format: `<div>Sample Mean: ${sampleMean}</div>`
      }
    }
  ];

  return (
    <div>
      <Container fluid>
        <Row>
          <Alert variant="secondary">
            {(popShape !== 'Uniform') ? (
              <p>
                We queried the {TEXTS[popShape][0]} of {popArray.length} {TEXTS[popShape][1]} and plotted the results on the following chart.
              </p>
            ) : (
              <p>
                Behavioral economists studying loss aversion design a lottery among 2000 participants where each amount between -10 and +10 is equally likely.  We plotted the winnings and losses below.
              </p>
            )}
          </Alert>
        </Row>
        <Row>
          <Col lg={9} xs={12}>
            <DotPlot
              series={series}
              title={`${title} <br /> Population Mean: ${_.round(popMean, 2)}`}
              xMin={xminval}
              xMax={xmaxval}
              yMax={ymaxval}
              xLabel={xLabel}
              animation={false}
            />
          </Col>
          <Col style={{ width: 'fit-content', margin: 'auto' }}>
            <DataTable
              data={popArray}
              headers={{
                [VALUES[popShape].tableCol]: 'id',
                [VALUES[popShape].xLabel]: 'x'
              }}
              height={350}
              setRowColor={(object: { id: number }) => sampled.map((obj) => obj.id).includes(object.id) ? '#747EF2' : undefined}
            />
            <br />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

ChartContainer.propTypes = {
  popArray: dataObjectArrayType.isRequired,
  popMean: PropTypes.number.isRequired,
  sampled: dataObjectArrayType.isRequired,
  sampleMean: PropTypes.number,
  popShape: popShapeType.isRequired,
}
