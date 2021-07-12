import DotPlot from '../DotPlot.js';
import { max, min } from 'mathjs';
import PropTypes from 'prop-types';
import { olsSampleType } from '../../lib/types.js';
import { getCounts } from '../../lib/stats-utils.js';
import { OLSE_VALUES } from '../../lib/constants.js';

export default function SlopeDistributionPlot({ samples, populationShape }) {
  const plotData = getCounts(samples.map(({ slope }) => slope));

  return (
    <DotPlot
      series={[{ name: 'slopes', data: plotData, showInLegend: false }]}
      title="Distribution of Sample Slopes"
      xMin={min(OLSE_VALUES[populationShape].slopeMin, ...plotData.map(({ x }) => x))}
      xMax={max(OLSE_VALUES[populationShape].slopeMax, ...plotData.map(({ x }) => x))}
      yMax={max(4, ...plotData.map(({ y }) => y))}
      xLabel="Slope"
    />
  )
}

SlopeDistributionPlot.propTypes = {
  samples: PropTypes.arrayOf(olsSampleType).isRequired,
  populationShape: PropTypes.oneOf(['Continuous', 'Binary']).isRequired
}
