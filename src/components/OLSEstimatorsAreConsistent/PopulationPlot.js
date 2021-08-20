import { dataObjectArrayType, olsAssumptionType, olsSampleType } from '../../lib/types';
import ScatterPlot from '../ScatterPlot';
import PropTypes from 'prop-types';
import { Alert, Form } from 'react-bootstrap';
import { OLS_ASSUMPTIONS_TEXTS } from '../../lib/constants';

export default function PopulationPlot({ data, selected, assumption, showViolation, setShowViolation }) {

  const tooltipFormat = {
    headerFormat: '',
    pointFormat: '<div><strong>{point.category}</strong><br/><strong>${point.y}</strong><br/></div>'
  }

  const sampleData = selected ? selected.data : [];

  const series = [
    {
      name: 'data',
      data,
      tooltip: tooltipFormat
    },
    {
      name: 'sample',
      data: sampleData.filter((obj) => !obj.altered),
      tooltip: tooltipFormat
    },
    {
      name: `${showViolation ? '' : 'without '}violation`,
      data: sampleData.filter((obj) => obj.altered).map((obj) => ({...obj, y: showViolation ? obj.y : obj.originalY})),
      tooltip: tooltipFormat,
      color: showViolation ? 'red' : '#00ff15',
      marker: {
        symbol: 'diamond',
        lineWidth: 1,
        lineColor: showViolation ? 'red' : '#00ff15'
      },
    },
  ];

  return (
    <>
      <ScatterPlot
        series={series}
        title="Population"
        xMin={0}
        xMax={1}
        yLabel="Weekly Earnings"
        height="75%"
        xCategories={['Control Group', 'Job Corps']}
      />
      {(selected && selected.data) && (
        <Alert variant="danger">
          <p>{OLS_ASSUMPTIONS_TEXTS[assumption]}</p>
          {((assumption === 'Large Outliers') || (assumption === 'E(u|x) != 0')) && (
            <Form.Check
              checked={showViolation}
              inline
              className="form-switch"
              label="Toggle Violation"
              onChange={() => setShowViolation(!showViolation)}
            />
            )}
        </Alert>
      )}
    </>
  )
}

PopulationPlot.propTypes = {
  data: dataObjectArrayType.isRequired,
  selected: olsSampleType,
  assumption: olsAssumptionType.isRequired,
  showViolation: PropTypes.bool.isRequired,
  setShowViolation: PropTypes.func.isRequired
}
