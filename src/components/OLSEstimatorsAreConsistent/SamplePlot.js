import { BlockMath } from 'react-katex';
import ScatterPlot from '../ScatterPlot';
import _ from 'lodash';
import { olsSampleType } from '../../lib/types';

export default function SamplePlot({ sample }) {

  const sampleSeries = [
    {
      name: 'best fit line',
      type: 'line',
      data: sample ? [{ x: 0 }, { x: 1 }, ...sample.data].map((point) => (
        { x: point.x, y: _.round((point.x * sample.slope) + sample.intercept, 2) }
      )) : [],
      label: false,
      marker: false,
      showInLegend: false,
      enableMouseTracking: false,
      color: 'black',
    },
    {
      name: 'sample',
      data: sample ? sample.data.filter((obj) => !obj.protocolBreaker) : [],
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
      name: 'protocol breakers',
      data: sample ? sample.data.filter((obj) => obj.protocolBreaker) : [],
      tooltip: {
        headerFormat: '',
        pointFormat: '<div><strong>{point.category}</strong><br/><strong>${point.y}</strong><br/></div>'
      },
      marker: {
        symbol: 'diamond',
        lineWidth: 1,
        lineColor: 'red'
      },
      color: 'red'
    },
  ];


  return (
    <>
      <div style={{ marginLeft: '20%' }}>
        <BlockMath math={'\\widehat{Earnings}_i = \\hat{\\beta}_0 + \\hat{\\beta}_1{Job\\ Corps}_i'}/>
        {sample && (
          <BlockMath math={`\\widehat{Earnings}_i = ${sample.intercept} + ${sample.slope}{Job\\ Corps}_i`}/>
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
}
