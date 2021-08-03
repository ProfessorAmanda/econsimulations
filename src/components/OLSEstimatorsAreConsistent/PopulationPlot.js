import { dataObjectArrayType, olsSampleType } from '../../lib/types';
import ScatterPlot from '../ScatterPlot';

export default function PopulationPlot({ data, selected }) {

  const tooltipFormat = {
    headerFormat: '',
    pointFormat: '<div><strong>{point.category}</strong><br/><strong>${point.y}</strong><br/></div>'
  }

  const series = [
    {
      name: 'data',
      data,
      tooltip: tooltipFormat
    },
    {
      name: 'sample',
      data: selected ? selected.data : [],
      tooltip: tooltipFormat
    }
  ];

  return (
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
  )
}

PopulationPlot.propTypes = {
  data: dataObjectArrayType.isRequired,
  selected: olsSampleType
}
