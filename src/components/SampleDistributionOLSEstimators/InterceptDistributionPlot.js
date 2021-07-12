import DotPlot from '../DotPlot.js';
import { max, min } from 'mathjs';
import PropTypes from 'prop-types';
import { olsSampleType } from '../../lib/types.js';
import { getCounts } from '../../lib/stats-utils.js';
import { OLSE_VALUES } from '../../lib/constants.js';

export default function InterceptDistributionPlot({ samples, populationShape }) {
  const plotData = getCounts(samples.map(({ intercept }) => intercept));

  return (
    <DotPlot
      series={[{ name: 'intercepts', data: plotData, showInLegend: false }]}
      title="Distribution of Sample Intercepts"
      xMin={min(OLSE_VALUES[populationShape].interceptMin, ...plotData.map(({ x }) => x))}
      xMax={max(OLSE_VALUES[populationShape].interceptMax, ...plotData.map(({ x }) => x))}
      yMax={max(4, ...plotData.map(({ y }) => y))}
      xLabel="Intercept"
    />
  )
}

InterceptDistributionPlot.propTypes = {
  samples: PropTypes.arrayOf(olsSampleType).isRequired,
  populationShape: PropTypes.oneOf(['Continuous', 'Binary']).isRequired
}
