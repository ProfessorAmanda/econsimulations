import DotPlot from '../DotPlot.js';
import { max, min } from 'mathjs';
import PropTypes from 'prop-types';
import { olsSampleType } from '../../lib/types.js';
import { convertToStandardNormal, getCounts, populationMean, populationStandardDev } from '../../lib/stats-utils.js';
import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { OLSE_VALUES } from '../../lib/constants.js';
import _ from 'lodash';
import StandardNormalOLS from './StandardNormalOLS.js';

export default function SlopeDistributionPlot({ samples, regressorType }) {
  const [standardized, setStandardized] = useState(false);

  useEffect(() => {
    setStandardized(false)
  }, [regressorType]);

  const slopeMean = populationMean(samples, 'slope');
  const slopeSD = populationStandardDev(samples, 'slope')
  const standardizedData = standardized ? convertToStandardNormal(samples, slopeMean, slopeSD, 'slope') : samples;
  const plotData = getCounts(standardizedData.map(({ slope }) => _.round(slope, 2)));

  return (
    <div>
      {standardized ? (
        <StandardNormalOLS seriesName="Slopes" data={plotData}/>
      ) : (
        <DotPlot
          series={[{ name: 'Slopes', data: plotData, showInLegend: false }]}
          title="Distribution of Sample Slopes"
          xMin={min(OLSE_VALUES[regressorType].slopeMin, ...plotData.map(({ x }) => x))}
          xMax={max(OLSE_VALUES[regressorType].slopeMax, ...plotData.map(({ x }) => x))}
          yMax={max(4, ...plotData.map(({ y }) => y))}
          xLabel="Slope"
          yLabel="Observations of Sample Slope"
        />
      )}
      <Form.Check
        checked={standardized}
        inline
        className="form-switch"
        label="Convert to Standard Normal"
        onChange={() => setStandardized(!standardized)}
      />
    </div>
  )
}

SlopeDistributionPlot.propTypes = {
  samples: PropTypes.arrayOf(olsSampleType).isRequired,
  regressorType: PropTypes.oneOf(['Continuous', 'Binary']).isRequired
}
