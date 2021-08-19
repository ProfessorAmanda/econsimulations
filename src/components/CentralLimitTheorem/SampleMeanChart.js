import { useState } from 'react';
import PropTypes from 'prop-types';
import DotPlot from '../DotPlot.js';
import { VALUES } from '../../lib/constants.js';
import { max, min, sqrt } from 'mathjs';
import { popShapeType } from '../../lib/types.js';
import _ from 'lodash';
import { Form } from 'react-bootstrap';

export default function SampleMeanChart({ sampleMeans, popMean, sd, popShape }) {
  const [normalized, setNormalized] = useState(false);

  const newSampleMeans = normalized ? sampleMeans.map(({ size, mean }) => ((mean - popMean) / (sd / sqrt(size)))) : sampleMeans.map(({ mean }) => mean);

  const meanCounts = _.countBy(newSampleMeans.map((mean) => _.round(mean, 2)));
  const sampleMeansPoints = [];
  _.entries(meanCounts).forEach(([amt, count]) => {
    for (let i = 1; i <= count; i++) {
      sampleMeansPoints.push({ x: +amt, y: i })
    }
  });

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
  sampleMeans: PropTypes.arrayOf(PropTypes.number).isRequired,
  popMean: PropTypes.number,
  sd: PropTypes.number,
  popShape: popShapeType.isRequired
}
