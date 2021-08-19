import { BlockMath } from 'react-katex';
import ScatterPlot from '../ScatterPlot';
import { olsSampleType } from '../../lib/types';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { OLS_ASSUMPTIONS_OPTIONS } from '../../lib/constants';
import { Form } from 'react-bootstrap';

export default function SamplePlot({ sample, assumption }) {
  const [showViolation, setShowViolation] = useState(false);

  useEffect(() => {
    setShowViolation(false);
  }, [assumption]);

  const sampleData = sample ? sample.data : [];

  const lineData = sample ? [
    {
      x: 0,
      y: showViolation ? sample.intercept : sample.originalIntercept
    },
    {
      x: 1,
      y: (showViolation ? sample.slope : sample.originalSlope) + (showViolation ? sample.intercept : sample.originalIntercept)
    }
  ] : [];

  const sampleSeries = [
    {
      name: 'best fit line',
      type: 'line',
      data: lineData,
      label: false,
      marker: false,
      showInLegend: false,
      enableMouseTracking: false,
      color: 'black',
    },
    {
      name: 'sample',
      data: sampleData.filter((obj) => !obj.altered),
      color: 'orange',
      marker: {
        lineWidth: 1,
        lineColor: 'orange'
      },
      tooltip: {
        headerFormat: '',
        pointFormat: '<div><strong>{point.category}</strong><br/><strong>${point.y}</strong><br/></div>'
      }
    },
    {
      name: `${showViolation ? 'after' : 'before'} violation`,
      data: sampleData.filter((obj) => obj.altered).map((obj) => ({...obj, y: showViolation ? obj.y : obj.originalY})),
      tooltip: {
        headerFormat: '',
        pointFormat: '<div><strong>{point.category}</strong><br/><strong>${point.y}</strong><br/></div>'
      },
      marker: {
        symbol: 'diamond',
        lineWidth: 1,
        lineColor: showViolation ? 'red' : '#00ff15'
      },
      color: showViolation ? 'red' : '#00ff15'
    },
  ];


  return (
    <>
      <div style={{ marginLeft: '20%' }}>
        <BlockMath math={'\\widehat{Earnings}_i = \\hat{\\beta}_0 + \\hat{\\beta}_1{Job\\ Corps}_i'}/>
        {sample && (
          <BlockMath math={`\\widehat{Earnings}_i = ${(showViolation ? sample.intercept : sample.originalIntercept)} + ${(showViolation ? sample.slope : sample.originalSlope)}{Job\\ Corps}_i`}/>
        )}
      </div>
      <ScatterPlot
        series={sampleSeries}
        xMin={0}
        xMax={1}
        yLabel="Weekly Earnings"
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

SamplePlot.propTypes = {
  sample: olsSampleType,
  assumption: PropTypes.oneOf(OLS_ASSUMPTIONS_OPTIONS).isRequired
}
