import DotPlot from '../DotPlot.js';
import { max, min } from 'mathjs';
import PropTypes from 'prop-types';
import { olsSampleType } from '../../lib/types.js';
import { getCounts } from '../../lib/stats-utils.js';

export default function InterceptDistributionPlot({ samples }) {
  const plotData = getCounts(samples.map(({ intercept }) => intercept));

  return (
    <DotPlot
      series={[{ name: 'intercepts', data: plotData }]}
      title="Distribution of Sample Intercepts"
      xMin={min(20, ...plotData.map(({ x }) => x))}
      xMax={max(100, ...plotData.map(({ x }) => x))}
      yMax={max(4, ...plotData.map(({ y }) => y))}
      xLabel="Intercept"
    />
  )
}

InterceptDistributionPlot.propTypes = {
  samples: PropTypes.arrayOf(olsSampleType).isRequired
}
