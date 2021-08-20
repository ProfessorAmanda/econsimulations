import PropTypes from 'prop-types';
import { highchartsSeriesType } from '../lib/types';
import ScatterPlot from './ScatterPlot';

export default function DotPlot({ series, title, xMin, xMax, yMax, xLabel, yLabel, animation, zoom }) {
  return (
    <ScatterPlot
      series={series}
      title={title}
      xMin={xMin}
      xMax={xMax}
      yMin={0}
      yMax={yMax}
      xLabel={xLabel}
      yLabel={yLabel || 'Count'}
      animation={animation}
      zoom={zoom}
      allowDecimalsY={false}
      tooltipFormat={`${xLabel}: <b>{point.x}</b><br />`}
    />
  )
}

DotPlot.propTypes = {
  series: highchartsSeriesType.isRequired,
  title: PropTypes.string,
  xMin: PropTypes.number,
  xMax: PropTypes.number,
  yMax: PropTypes.number,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  animation: PropTypes.bool,
  zoom: PropTypes.bool
}
