import DotPlot from '@/components/DotPlot';
import { Alert, Container } from 'react-bootstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { dataObjectArrayType, popShapeType } from '@/lib/types';
import { TEXTS_ALT, VALUES_ALT } from '@/lib/constants';

export default function PopulationChart({ popArray, popMean, sampled, popShape }) {
  const { xmaxval, xminval, ymaxval, title, xLabel } = VALUES_ALT[popShape];

  const series = [
    {
      name: 'Population',
      data: popArray
    },
    {
      name: 'Samples',
      data: sampled
    }
  ];

  return (
    <Container fluid>
      <Alert variant="secondary">
        We queried the {TEXTS_ALT[popShape][0]} of {popArray.length} {TEXTS_ALT[popShape][1]} and plotted the results on the following chart.
      </Alert>
      <DotPlot
        series={series}
        title={`${title} <br /> Population Mean: ${_.round(popMean, 2)}`}
        xMin={xminval}
        xMax={xmaxval}
        yMax={ymaxval}
        xLabel={xLabel}
      />
    </Container>
  );
}

PopulationChart.propTypes = {
  popArray: dataObjectArrayType.isRequired,
  popMean: PropTypes.number,
  sampled: dataObjectArrayType.isRequired,
  popShape: popShapeType.isRequired
}
