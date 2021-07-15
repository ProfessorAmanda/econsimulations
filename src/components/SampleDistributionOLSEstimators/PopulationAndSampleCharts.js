import { Container, Row, Col, Alert } from 'react-bootstrap';
import ScatterPlot from '../ScatterPlot.js';
import SampleSizeInput from '../SampleSizeInput.js';
import _ from 'lodash';
import { dataObjectArrayType, olsSampleType } from '../../lib/types.js';
import PropTypes from 'prop-types';
import SamplesTable from './SamplesTable.js';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { OLSE_VALUES } from '../../lib/constants.js';
import regression from 'regression';

export default function PopulationAndSampleCharts({ data, addSamples, selected, samples, selectSample, populationShape }) {
  const sample = selected || { data: [] };

  const tooltipFormat = (populationShape === 'Binary') ? {
    headerFormat: '',
    pointFormat: '<div><strong>{point.category}</strong><br/><strong>${point.y}</strong><br/></div>'
  } : undefined;

  const mainSeries = [{ name: 'data', data, tooltip: tooltipFormat }, { name: 'sample', data: sample.data, tooltip: tooltipFormat }];

  if (populationShape === 'Binary') {
    const { equation: [slope, intercept] } = regression.linear(data.map(({ x, y }) => [x, y]), { precision: 1 });
    mainSeries.push({
      name: 'best fit line',
      type: 'line',
      data: data.map((point) => ({ x: point.x, y: _.round((point.x * slope) + intercept, 2) })),
      label: false,
      marker: false,
      showInLegend: false,
      color: 'black',
      enableMouseTracking: false,
    });
  }

  const sampleSeries = [
    {
      name: 'best fit line',
      type: 'line',
      data: [{ x: 0 }, { x: OLSE_VALUES[populationShape].xMax }, ...sample.data].map((point) => (
        { x: point.x, y: _.round((point.x * sample.slope) + sample.intercept, 2) }
      )),
      label: false,
      marker: false,
      showInLegend: sample.data.length > 0,
      enableMouseTracking: false,
      color: 'black',
    },
    {
      name: 'sample',
      data: sample.data,
      color: 'orange',
      marker: {
        lineWidth: 1,
        lineColor: 'orange'
      },
      tooltip: tooltipFormat
    },
    ...samples.filter((sample) => sample !== selected).map(({ data, slope, intercept, id }) => ({
      name: `Sample ${id}`,
      type: 'line',
      data: [{ x: 0 }, { x: OLSE_VALUES[populationShape].xMax }, ...data].map((point) => (
        { x: point.x, y: (point.x * slope) + intercept }
      )),
      color: '#dddddd',
      animation: false,
      label: false,
      marker: false,
      showInLegend: false,
      enableMouseTracking: false,
      zIndex: -5
    }))
  ];

  return (
    <Container>
      <Row>
        <Col lg={{ span: 12, offset: 0 }} xl={{ span: 8, offset: 2 }}>
          <ScatterPlot
            series={mainSeries}
            title="Population"
            xMin={OLSE_VALUES[populationShape].xMin}
            xMax={OLSE_VALUES[populationShape].xMax}
            yMin={OLSE_VALUES[populationShape].yMin}
            yMax={OLSE_VALUES[populationShape].yMax}
            xLabel={OLSE_VALUES[populationShape].xLabel}
            yLabel={OLSE_VALUES[populationShape].yLabel}
            zoom
            height="75%"
            xCategories={OLSE_VALUES[populationShape].xCategories}
            yTickInterval={OLSE_VALUES[populationShape].yTickInterval}
          />
        </Col>
      </Row>
      <br/>
      <Row md={1} lg={2}>
        <Col>
          <Alert variant="primary">
            <p>Try drawing some samples and observe the line of best fit on the graph</p>
            <SampleSizeInput maxSize={data.length} minSize={2} handleClick={addSamples}/>
          </Alert>
          <SamplesTable samples={samples} setSelected={selectSample} selected={selected}/>
        </Col>
        <Col>
          {(populationShape === 'Continuous') && (
            <div style={{ marginLeft: '20%' }}>
              <BlockMath math="\widehat{Test\ Score}_i = \hat{\beta}_0 + \hat{\beta}_1{Study\ Hours_i}"/>
              {selected && (
                <BlockMath math={`\\widehat{Test\\ Score}_i = ${selected.intercept} + ${selected.slope}{Study\\ Hours_i}`}/>
              )}
            </div>
          )}
          <ScatterPlot
            series={sampleSeries}
            title={OLSE_VALUES[populationShape].title}
            xMin={OLSE_VALUES[populationShape].xMin}
            xMax={OLSE_VALUES[populationShape].xMax}
            yMin={OLSE_VALUES[populationShape].yMin}
            yMax={OLSE_VALUES[populationShape].yMax}
            xLabel={OLSE_VALUES[populationShape].xLabel}
            yLabel={OLSE_VALUES[populationShape].yLabel}
            xCategories={OLSE_VALUES[populationShape].xCategories}
            yTickInterval={OLSE_VALUES[populationShape].yTickInterval}
          />
        </Col>
      </Row>
    </Container>
  )
}

PopulationAndSampleCharts.propTypes = {
  data: dataObjectArrayType.isRequired,
  addSamples: PropTypes.func.isRequired,
  selected: olsSampleType,
  samples: PropTypes.arrayOf(olsSampleType).isRequired,
  selectSample: PropTypes.func.isRequired,
  populationShape: PropTypes.oneOf(['Continuous', 'Binary']).isRequired
}
