import { Container, Row, Alert } from 'react-bootstrap';
import DotPlot from '../DotPlot.js';
import PropTypes from 'prop-types';
import { dataObjectArrayType } from '../../lib/types.js';
import { populationMean } from '../../lib/stats-utils.js';
import { max } from 'mathjs';

export default function PopulationChartReveal({ popArr, popArr2, pVal, alpha, mu0 }) {
  const popMean = populationMean(popArr);
  const popMean2 = populationMean(popArr2);
  const popArrMax = (popArr.length > 0) ? max(popArr.map(({ y }) => y)) : 0;
  const popArr2Max = (popArr2.length > 0) ? max(popArr2.map(({ y }) => y)) : 0;
  const maxHeight = max(popArrMax, popArr2Max);

  const series = [
    {
      name: `Population${(popArr2.length === 0) ? '' : ' 1'}`,
      data: popArr
    },
    {
      name: 'Population 2',
      data: popArr2,
      showInLegend: popArr2.length > 0,
      visible: popArr2.length > 0,
      color: '#903C3D',
      marker: {
        symbol: 'diamond',
        radius: 4,
        lineColor: '#5A2526',
        lineWidth: 1
      }
    },
    {
      type: 'line',
      name: (popArr2.length === 0) ? 'True Population Mean' : 'First Population Mean',
      data: [{ x: popMean || 0, y: 0 }, { x: popMean || 0, y: maxHeight }],
      color: 'blue',
      enableMouseTracking: false,
      showInLegend: false,
      label: {
        format: `<div>${(popArr2.length === 0) ? 'True Population Mean' : 'First Population Mean'}: ${popMean && popMean.toFixed(2)}</div>`
      }
    },
    {
      type: 'line',
      name: 'Second Population Mean',
      data: [{ x: popMean2 || 0, y: 0 }, { x: popMean2 || 0, y: maxHeight }],
      color: 'red',
      enableMouseTracking: false,
      showInLegend: false,
      visible: popArr2.length > 0,
      label: {
        format: `<div>Second Population Mean: ${popMean2 && popMean2.toFixed(2)}</div>`
      }
    },
    {
      type: 'line',
      name: 'Mu_0',
      data: [{ x: mu0 || 0, y: 0 }, { x: mu0 || 0, y: popArrMax }],
      color: 'red',
      enableMouseTracking: false,
      showInLegend: false,
      visible: popArr2.length === 0,
      label: {
        format: `<div>Mu_0: ${mu0}</div>`
      }
    }
  ];

  return (
    <Container>
      <Row>
        <Container fluid>
          <Row>
            <Alert variant="secondary">
              We queried the monthly Milk Production of {(popArr2.length > 0) ? 'two populations of' : ''} {popArr.length} cows and plotted the results on the following chart.
            </Alert>
          </Row>
          <Row>
            <DotPlot
              series={series}
              title="Milk Production"
              xLabel="Gallons"
            />
          </Row>
        </Container>
      </Row>
      <Row>
        <p>Our hypothesis test conclusion was therefore {(pVal < alpha) ? 'correct' : 'incorrect'}.</p>
      </Row>
    </Container>
  )
}

PopulationChartReveal.propTypes = {
  popArr: dataObjectArrayType.isRequired,
  popArr2: dataObjectArrayType.isRequired,
  pVal: PropTypes.number.isRequired,
  alpha: PropTypes.number.isRequired,
  mu0: PropTypes.number.isRequired
}
