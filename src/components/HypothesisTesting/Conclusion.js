import PropTypes from 'prop-types';
import { hypothesisEqualityType, testTypeType } from '../../lib/types';

export default function Conclusion({ firstMean, secondMean, equality, reject, testType }) {

  let result;
  let relation;
  if ((testType === 'oneSample' && equality === '>') || (testType === 'twoSample' && equality === '<')) {
    result = firstMean > secondMean;
    relation = firstMean > secondMean ? 'greater than' : 'less than';
  } else if ((testType === 'oneSample' && equality === '<') || (testType === 'twoSample' && equality === '>')) {
    result = firstMean < secondMean;
    relation = firstMean < secondMean ? 'less than' : 'greater than';
  } else if (equality === '!=') {
    result = firstMean !== secondMean;
    relation = firstMean !== secondMean ? 'not equal to' : 'equal to';
  }

  return (
    <p>
      {(testType === 'oneSample') ? `The true mean is ${relation} μ_0.` : `The second population mean is ${relation} the first population mean.`} Therefore we should {(result) ? 'reject' : 'fail to reject'} the null hypothesis. Our conclusion above was {(result === reject) ? 'correct' : 'incorrect'}.
    </p>
  )
}

Conclusion.propTypes = {
  firstMean: PropTypes.number.isRequired,
  secondMean: PropTypes.number.isRequired,
  equality: hypothesisEqualityType.isRequired,
  reject: PropTypes.bool.isRequired,
  testType: testTypeType.isRequired
}
