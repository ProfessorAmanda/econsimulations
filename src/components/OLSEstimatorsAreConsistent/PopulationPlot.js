import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { dataObjectArrayType, olsSampleType } from '../../lib/types';
import ScatterPlot from '../ScatterPlot';
import PropTypes from 'prop-types';
import { OLS_ASSUMPTIONS_OPTIONS } from '../../lib/constants';

export default function PopulationPlot({ data, selected, assumption }) {
  const [showViolation, setShowViolation] = useState(false);

  useEffect(() => {
    setShowViolation(false);
  }, [assumption]);

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
      name: `${showViolation ? 'after' : 'before'} violation`,
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
        zoom
        height="75%"
        xCategories={['Control Group', 'Job Corps']}
      />
      {((assumption === 'Large Outliers') || (assumption.props && assumption.props.math === 'E(u|x)\\neq 0')) && (
        <Form.Check
          checked={showViolation}
          inline
          className="form-switch"
          label="Show Violation"
          onChange={() => setShowViolation(!showViolation)}
        />
      )}
    </>
  )
}

PopulationPlot.propTypes = {
  data: dataObjectArrayType.isRequired,
  selected: olsSampleType,
  assumption: PropTypes.oneOf(OLS_ASSUMPTIONS_OPTIONS).isRequired
}
