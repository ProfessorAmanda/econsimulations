import DotPlot from '../DotPlot.js';
import { max, min } from 'mathjs';
import PropTypes from 'prop-types';
import { olsSampleType } from '../../lib/types.js';
import { getCounts } from '../../lib/stats-utils.js';

export default function SlopeDistributionPlot({ samples }) {
  const plotData = getCounts(samples.map(({ slope }) => slope));

  return (
    <DotPlot
      series={[{ name: 'slopes', data: plotData }]}
      title="Distribution of Sample Slopes"
      xMin={min(-5, ...plotData.map(({ x }) => x))}
      xMax={max(5, ...plotData.map(({ x }) => x))}
      yMax={max(4, ...plotData.map(({ y }) => y))}
      xLabel="Slope"
    />
  )
}

SlopeDistributionPlot.propTypes = {
  samples: PropTypes.arrayOf(olsSampleType).isRequired
}
