import { useState } from 'react';
import PropTypes from 'prop-types';
import DotPlot from '@/components/DotPlot';
import { VALUES } from '@/lib/constants';
import { max, min, sqrt } from 'mathjs';
import { popShapeType, sampleMeanArrayType } from '@/lib/types';
import _ from 'lodash';
import { Form } from 'react-bootstrap';
import { getCounts } from '@/lib/stats-utils';

export default function SampleMeanChart({ sampleMeans, popMean, sd, popShape }) {
  const [normalized, setNormalized] = useState(false);

  const newSampleMeans = normalized
    ? sampleMeans.map(({ size, mean }) => _.round((mean - popMean) / (sd / sqrt(size)), 2))
    : sampleMeans.map(({ mean }) => _.round(mean, 2));

  const sampleMeansPoints = getCounts(newSampleMeans);

  // these lists are used to determine axis sizing as more samples are added to the plot
  const onlyValues = sampleMeansPoints.map((obj) => obj.x);
  const onlyCounts = sampleMeansPoints.map((obj) => obj.y);

  return (
    <div>
      <DotPlot
        series={[{ name: 'Sample Means', data: sampleMeansPoints }]}
        title="Sample Mean Distribution"
        xMin={normalized ? min(-3, ...onlyValues) : VALUES[popShape].xminval}
        xMax={normalized ? max(3, ...onlyValues) : VALUES[popShape].xmaxval}
        yMax={max(8, ...onlyCounts)}
        xLabel={normalized ? 'Standard Deviations' : VALUES[popShape].xLabel}
        yLabel="Observations of Sample Mean"
      />
      <Form.Check
        checked={normalized}
        inline
        className="form-switch"
        label="Convert to Standard Normal"
        onChange={() => setNormalized(!normalized)}
      />
    </div>
  )
}

SampleMeanChart.propTypes = {
  sampleMeans: sampleMeanArrayType.isRequired,
  popMean: PropTypes.number,
  sd: PropTypes.number,
  popShape: popShapeType.isRequired
}
