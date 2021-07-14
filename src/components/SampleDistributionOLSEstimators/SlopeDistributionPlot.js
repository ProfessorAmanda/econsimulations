import DotPlot from '../DotPlot.js';
import { max, min } from 'mathjs';
import PropTypes from 'prop-types';
import { olsSampleType } from '../../lib/types.js';
import { convertToStandardNormal, getCounts, populationMean, populationStandardDev } from '../../lib/stats-utils.js';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { OLSE_VALUES } from '../../lib/constants.js';
import _ from 'lodash';

export default function SlopeDistributionPlot({ samples, populationShape }) {
  const [standardized, setStandardized] = useState(false);

  const slopeMean = populationMean(samples, 'slope');
  const slopeSD = populationStandardDev(samples, 'slope')
  const standardizedData = standardized ? convertToStandardNormal(samples, slopeMean, slopeSD, 'slope') : samples;
  const plotData = getCounts(standardizedData.map(({ slope }) => _.round(slope, 2)));

  return (
    <div>
      <DotPlot
        series={[{ name: 'slopes', data: plotData, showInLegend: false }]}
        title="Distribution of Sample Slopes"
        xMin={standardized ? -3 : min(OLSE_VALUES[populationShape].slopeMin, ...plotData.map(({ x }) => x))}
        xMax={standardized ? 3 : max(OLSE_VALUES[populationShape].slopeMax, ...plotData.map(({ x }) => x))}
        yMax={max(4, ...plotData.map(({ y }) => y))}
        xLabel={standardized ? 'Standard Deviations' : 'Slope'}
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

SlopeDistributionPlot.propTypes = {
  samples: PropTypes.arrayOf(olsSampleType).isRequired,
  populationShape: PropTypes.oneOf(['Continuous', 'Binary']).isRequired
}
