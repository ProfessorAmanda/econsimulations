import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { hypothesisEqualityType, testTypeType } from '../../lib/types.js';

export default function ResultsDisplay({ testType, mean, mean2, standardDev, standardDev2, testStatistic, pValue, alpha, equality }) {
  return (
    <Alert variant="secondary" >
      <p>This sample yields the following data:</p>
      {(testType === 'oneSample') ? (
        <div>
          <p>Sample Mean: {_.round(mean, 2)}</p>
          <p>Sample Standard Deviation: {_.round(standardDev, 2)} </p>
        </div>
      ) : (
        <div>
          <p>First Sample Mean: {_.round(mean, 2)}</p>
          <p>Second Sample Mean: {_.round(mean2, 2)}</p>
          <p>First Sample Standard Deviation: {_.round(standardDev, 2)} </p>
          <p>Second Sample Standard Deviation: {_.round(standardDev2, 2)} </p>
        </div>
      )}
      <p>The test statistic is {_.round(testStatistic, 2)}</p>
      <p>
        This test statistic yields a p-value of P(Z {(equality === '!=') ? '>' : equality} {(equality === '!=') ? '|test stat|' : 'test stat'}) = {pValue.toPrecision(3)}.
      </p>
      <p>Therefore we {(pValue < alpha) ? 'reject' : 'fail to reject'} the null hypothesis. </p>
    </Alert>
  )
}

ResultsDisplay.propTypes = {
  testType: testTypeType.isRequired,
  mean: PropTypes.number.isRequired,
  mean2: PropTypes.number,
  standardDev: PropTypes.number.isRequired,
  standardDev2: PropTypes.number,
  testStatistic: PropTypes.number.isRequired,
  pValue: PropTypes.number.isRequired,
  alpha: PropTypes.number.isRequired,
  equality: hypothesisEqualityType.isRequired
}
