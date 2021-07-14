import DotPlot from '../DotPlot.js';
import { max, min } from 'mathjs';
import PropTypes from 'prop-types';
import { olsSampleType } from '../../lib/types.js';
import { convertToStandardNormal, getCounts, populationMean, populationStandardDev } from '../../lib/stats-utils.js';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { OLSE_VALUES } from '../../lib/constants.js';
import _ from 'lodash';

export default function InterceptDistributionPlot({ samples, populationShape }) {
  const [standardized, setStandardized] = useState(false);

  const interceptMean = populationMean(samples, 'intercept');
  const interceptSD = populationStandardDev(samples, 'intercept')
  const standardizedData = standardized ? convertToStandardNormal(samples, interceptMean, interceptSD, 'intercept') : samples;
  const plotData = getCounts(standardizedData.map(({ intercept }) => _.round(intercept, 2)));

  return (
    <div>
      <DotPlot
        series={[{ name: 'intercepts', data: plotData, showInLegend: false }]}
        title="Distribution of Sample Intercepts"
        xMin={standardized ? -3 : min(OLSE_VALUES[populationShape].interceptMin, ...plotData.map(({ x }) => x))}
        xMax={standardized ? 3 : max(OLSE_VALUES[populationShape].interceptMax, ...plotData.map(({ x }) => x))}
        yMax={max(4, ...plotData.map(({ y }) => y))}
        xLabel={standardized ? 'Standard Deviations' : 'Intercept'}
      />
      <Form.Check
        inline
        type="checkbox"
        label="Convert to Standard Normal"
        onClick={() => setStandardized(!standardized)}
      />
    </div>
  )
}

InterceptDistributionPlot.propTypes = {
  samples: PropTypes.arrayOf(olsSampleType).isRequired,
  populationShape: PropTypes.oneOf(['Continuous', 'Binary']).isRequired
}
