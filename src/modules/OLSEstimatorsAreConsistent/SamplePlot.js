import TeX from '@matejmazur/react-katex';
import ScatterPlot from '@/components/ScatterPlot';
import { olsSampleType } from '@/lib/types';
import PropTypes from 'prop-types';
export default function SamplePlot({ sample, showViolation }) {

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
      name: `${showViolation ? '' : 'without '}violation`,
      data: sampleData.filter((obj) => obj.altered).map((obj) => (
        {
          ...obj,
          x: showViolation ? obj.x : obj.originalX,
          y: showViolation ? obj.y : obj.originalY
        }
      )),
      tooltip: {
        headerFormat: '',
        pointFormat: '<div><strong>{point.category}</strong><br/><strong>${point.y}</strong><br/></div>'
      },
      marker: {
        symbol: 'diamond',
        lineWidth: 1,
        lineColor: showViolation ? 'black' : '#00ff15'
      },
      color: showViolation ? 'red' : '#00ff15'
    },
  ];


  return (
    <>
      <div style={{ marginLeft: '20%' }}>
        <TeX math={'\\widehat{Earnings}_i = \\hat{\\beta}_0 + \\hat{\\beta}_1{Job\\ Corps}_i'} block/>
        {sample && (
          <TeX math={`\\widehat{Earnings}_i = ${(showViolation ? sample.intercept : sample.originalIntercept)} + ${(showViolation ? sample.slope : sample.originalSlope)}{Job\\ Corps}_i`} block/>
        )}
      </div>
      <ScatterPlot
        series={sampleSeries}
        xMin={0}
        xMax={1}
        yLabel="Weekly Earnings"
        xCategories={['Control Group', 'Job Corps']}
      />
    </>
  )
}

SamplePlot.propTypes = {
  sample: olsSampleType,
  showViolation: PropTypes.bool.isRequired
}
