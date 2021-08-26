import { Container, Row, Col, Alert } from 'react-bootstrap';
import ScatterPlot from '../ScatterPlot.js';
import SampleSizeInput from '../SampleSizeInput.js';
import _ from 'lodash';
import { dataObjectArrayType, olsSampleType } from '../../lib/types.js';
import PropTypes from 'prop-types';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { OLSE_VALUES } from '../../lib/constants.js';
import DataTable from '../DataTable.js';

export default function PopulationAndSampleCharts({ data, addSamples, selected, samples, selectSample, regressorType }) {
  const sample = selected || { data: [] };

  const tooltipFormat = (regressorType === 'Binary') ? {
    headerFormat: '',
    pointFormat: '<div><strong>{point.category}</strong><br/><strong>${point.y}</strong><br/></div>'
  } : undefined;

  const mainSeries = [
    {
      name: 'data',
      data,
      tooltip: tooltipFormat
    },
    {
      name: 'sample',
      data: sample.data,
      tooltip: tooltipFormat
    }
  ];

  const sampleSeries = [
    {
      name: 'best fit line',
      type: 'line',
      data: [{ x: 0 }, ...sample.data, { x: OLSE_VALUES[regressorType].xMax }].map((point) => (
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
      type: 'scatter',
      data: sample.data,
      color: 'orange',
      marker: {
        lineWidth: 1,
        lineColor: 'orange'
      },
      tooltip: tooltipFormat
    },
    // add a new series for each 'grayed-out' line
    // couldn't figure out how to add multiple lines to one series, so this makes it slower with more replications
    ...samples.filter((sample) => sample !== selected).map(({ data, slope, intercept, id }) => ({
      name: `Sample ${id}`,
      type: 'line',
      data: [{ x: 0 }, ...data.sort((a, b) => a.x - b.x), { x: OLSE_VALUES[regressorType].xMax }].map((point) => (
        { x: point.x, y: (point.x * slope) + intercept }
      )),
      color: '#dddddd',
      animation: false,
      label: false,
      marker: false,
      showInLegend: false,
      enableMouseTracking: false,
      zIndex: -5,
      states: {
        hover: {
          enabled: false
        },
        inactive: {
          enabled: false
        }
      }
    }))
  ];

  return (
    <Container>
      <Row>
        <Col lg={{ span: 12, offset: 0 }} xl={{ span: 8, offset: 2 }}>
          <ScatterPlot
            series={mainSeries}
            title="Population"
            xMin={OLSE_VALUES[regressorType].xMin}
            xMax={OLSE_VALUES[regressorType].xMax}
            yMin={OLSE_VALUES[regressorType].yMin}
            yMax={OLSE_VALUES[regressorType].yMax}
            xLabel={OLSE_VALUES[regressorType].xLabel}
            yLabel={OLSE_VALUES[regressorType].yLabel}
            height="75%"
            xCategories={OLSE_VALUES[regressorType].xCategories}
            yTickInterval={OLSE_VALUES[regressorType].yTickInterval}
          />
        </Col>
      </Row>
      <br/>
      <Row md={1} lg={2}>
        <Col>
          <Alert variant="primary">
            <p>Try drawing some samples and observe the line of best fit on the graph</p>
            <SampleSizeInput maxSize={data.length} minSize={2} handleClick={addSamples} classname="sample-size-input"/>
          </Alert>
          <DataTable
            data={samples}
            headers={{
              'Sample': 'id',
              'Size': 'size',
              'Slope': 'slope',
              'Intercept': 'intercept'
            }}
            setSelected={selectSample}
            setRowColor={(object) => (selected && (object.id === selected.id)) ? '#747EF2' : undefined}
          />
        </Col>
        <Col>
          <div style={{ marginLeft: '20%' }}>
            <BlockMath math={`\\widehat{${(regressorType === 'Continuous') ? 'Test\\ Score' : 'Earnings'}}_i = \\hat{\\beta}_0 + \\hat{\\beta}_1{${(regressorType === 'Continuous') ? 'Study\\ Hours' : 'Job\\ Corps'}_i}`}/>
            {selected && (
              <BlockMath math={`\\widehat{${(regressorType === 'Continuous') ? 'Test\\ Score' : 'Earnings'}}_i = ${selected.intercept} + ${selected.slope}{${(regressorType === 'Continuous') ? 'Study\\ Hours' : 'Job\\ Corps'}_i}`}/>
            )}
          </div>
          <ScatterPlot
            series={sampleSeries}
            xMin={OLSE_VALUES[regressorType].xMin}
            xMax={OLSE_VALUES[regressorType].xMax}
            yMin={OLSE_VALUES[regressorType].yMin}
            yMax={OLSE_VALUES[regressorType].yMax}
            xLabel={OLSE_VALUES[regressorType].xLabel}
            yLabel={OLSE_VALUES[regressorType].yLabel}
            xCategories={OLSE_VALUES[regressorType].xCategories}
            yTickInterval={OLSE_VALUES[regressorType].yTickInterval}
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
  regressorType: PropTypes.oneOf(['Continuous', 'Binary']).isRequired
}
