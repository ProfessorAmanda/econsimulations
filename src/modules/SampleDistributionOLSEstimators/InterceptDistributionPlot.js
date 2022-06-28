import DotPlot from '@/components/DotPlot';
import { max, min } from 'mathjs';
import PropTypes from 'prop-types';
import { olsSampleType } from '@/lib/types';
import { convertToStandardNormal, getCounts, populationMean, populationStandardDev } from '@/lib/stats-utils';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { OLSE_VALUES } from '@/lib/constants';
import _ from 'lodash';
import StandardNormalOLS from './StandardNormalOLS';

export default function InterceptDistributionPlot({ samples, regressorType }) {
  const [standardized, setStandardized] = useState(false);

  useEffect(() => {
    setStandardized(false)
  }, [regressorType]);

  const interceptMean = populationMean(samples, 'intercept');
  const interceptSD = populationStandardDev(samples, 'intercept')
  const standardizedData = standardized ? convertToStandardNormal(samples, interceptMean, interceptSD, 'intercept') : samples;
  const plotData = getCounts(standardizedData.map(({ intercept }) => _.round(intercept, 2)));

  return (
    <div>
      {standardized ? (
        <StandardNormalOLS seriesName="Intercepts" data={plotData}/>
      ) : (
        <DotPlot
          series={[{ name: 'Intercepts', data: plotData, showInLegend: false }]}
          title="Distribution of Sample Intercepts"
          xMin={min(OLSE_VALUES[regressorType].interceptMin, ...plotData.map(({ x }) => x))}
          xMax={max(OLSE_VALUES[regressorType].interceptMax, ...plotData.map(({ x }) => x))}
          yMax={max(4, ...plotData.map(({ y }) => y))}
          xLabel="Intercept"
          yLabel="Observations of Sample Intercept"
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

InterceptDistributionPlot.propTypes = {
  samples: PropTypes.arrayOf(olsSampleType).isRequired,
  regressorType: PropTypes.oneOf(['Continuous', 'Binary']).isRequired
}
