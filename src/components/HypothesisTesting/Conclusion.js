import PropTypes from 'prop-types';
import { hypothesisEqualityType } from '../../lib/types';

export default function Conclusion({ mu0, trueMean, equality, reject }) {

  let result;
  let relation;
  if (equality === '>') {
    result = trueMean > mu0;
    relation = trueMean > mu0 ? 'greater than' : 'less than';
  } else if (equality === '<') {
    result = trueMean < mu0;
    relation = trueMean < mu0 ? 'less than' : 'greater than';
  } else if (equality === '!=') {
    result = trueMean != mu0;
    relation = trueMean != mu0 ? 'not equal to' : 'equal to';
  }

  return (
    <p>
      The true mean is {relation} μ_0. Therefore we should {(result) ? 'reject' : 'fail to reject'} the null hypothesis and our conclusion above was therefore {(result === reject) ? 'correct' : 'incorrect'}.
    </p>
  )
}

Conclusion.propTypes = {
  mu0: PropTypes.number.isRequired,
  trueMean: PropTypes.number.isRequired,
  equality: hypothesisEqualityType.isRequired,
  reject: PropTypes.bool.isRequired
}
