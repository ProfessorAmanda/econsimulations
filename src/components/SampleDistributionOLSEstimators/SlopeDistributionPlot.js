import DotPlot from '../DotPlot.js';
import { max, min } from 'mathjs';
import PropTypes from 'prop-types';
import { olsSampleType } from '../../lib/types.js';
import { getCounts } from '../../lib/stats-utils.js';
import { Form } from 'react-bootstrap';
import { useState } from 'react';

export default function SlopeDistributionPlot({ samples }) {
  const plotData = getCounts(samples.map(({ slope }) => slope));
  const [standardized, setStandardized] = useState(false);

  let plot = <DotPlot
  series={[{ name: 'slopes', data: plotData }]}
  title="Distribution of Sample Slopes"
  xMin={min(-5, ...plotData.map(({ x }) => x))}
  xMax={max(5, ...plotData.map(({ x }) => x))}
  yMax={max(4, ...plotData.map(({ y }) => y))}
  xLabel="Slope"
/> 
if (standardized) {
  plot = <> </>
}
  return  <>
    {plot}
    <Form.Check
    inline
    type="checkbox"
    label="Convert to Standard Normal"
     onClick={() => setStandardized(!standardized)}/>  
     </>
  }

SlopeDistributionPlot.propTypes = {
  samples: PropTypes.arrayOf(olsSampleType).isRequired
}
