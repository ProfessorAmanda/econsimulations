import { Table } from 'react-bootstrap';
import _ from 'lodash';
import { BlockMath } from 'react-katex';
import { mean, std, sum } from 'mathjs';
import { jStat } from 'jstat';
import PropTypes from 'prop-types';
import { anovaPopulationObjectType } from '../../lib/types';

export default function FTest({ populations, samples }) {
  // calculate F-statistic and p-value
  const overallSampleMean = (_.flatten(samples).length > 0) ? mean(_.flatten(samples)) : undefined;
  const SSTR = sum(samples.map((sample) => sample.length * (((sample.length > 0) ? mean(sample) : 0) - overallSampleMean) ** 2));
  const MSTR = SSTR / (populations.length - 1);
  const SSE = sum(samples.map((sample) => (sample.length - 1) * ((sample.length > 0) ? std(sample) : 0) ** 2));
  const MSE = SSE / (sum(samples.map((sample) => sample.length)) - populations.length);
  const F = MSTR / MSE;
  const pValue = jStat.anovaftest(...samples);

  return (
    <Table borderless style={{marginTop: 20}}>
      <thead>
        <tr>
          <th/>
          <th><BlockMath math={`\\bar{\\bar{x}} = ${_.round(overallSampleMean, 2)}`}/></th>
          <th/>
          <th/>
        </tr>
        <tr>
          <th/>
          <th>Sum of Squares</th>
          <th>df</th>
          <th>Mean Sum of Squares</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Due to Treatment</td>
          <td>{_.round(SSTR, 2)}</td>
          <td>{populations.length - 1}</td>
          <td>{_.round(MSTR, 2)}</td>
        </tr>
        <tr>
          <td>Due to Error</td>
          <td>{_.round(SSE, 2)}</td>
          <td>{_.flatten(samples).length - populations.length}</td>
          <td>{_.round(MSE, 2)}</td>
        </tr>
        <tr>
          <td/>
          <td/>
          <td><BlockMath math={`F = ${F.toPrecision(3)}`}/></td>
          <td><BlockMath math={`p-value \\approx ${pValue.toPrecision(3)}`}/></td>
        </tr>
      </tbody>
    </Table>
  )
}

FTest.propTypes = {
  populations: PropTypes.arrayOf(anovaPopulationObjectType).isRequired,
  samples: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
}
