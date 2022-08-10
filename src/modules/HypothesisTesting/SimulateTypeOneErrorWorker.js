import _ from 'lodash';
import {
  calculateOneSampleTestStatistic,
  calculatePValue,
  calculateTwoSampleTestStatistic,
  populationMean,
  populationStandardDev
} from '@/lib/stats-utils';

const runSim = ({size, replications, clear, population, population2, testType, distType, mu0, equality, sides, sampleMeans, alpha}) => {
  const means = [];
  let percentComplete = 0;
  for (let i = 0; i < replications; i++) {
    const sample = _.sampleSize(population, size);
    const sampleMean = populationMean(sample);

    // these are only used in the two-sample case
    const sample2 = (testType === 'twoSample') ? _.sampleSize(population2, size) : [];
    const sampleMean2 = populationMean(sample2);

    const testStatistic = (testType === 'oneSample')
      ? calculateOneSampleTestStatistic(
        distType,
        sampleMean,
        mu0,
        populationStandardDev((distType === 'Z') ? population : sample),
        size
      )
      : calculateTwoSampleTestStatistic(
        sampleMean,
        sampleMean2,
        populationStandardDev((distType === 'Z') ? population : sample),
        populationStandardDev((distType === 'Z') ? population2 : sample2),
        size,
        size
      );

    const pValue = calculatePValue(distType, testStatistic, equality, size, sides);

    const sampleObject = {
      testStatistic: _.round(testStatistic, 2),
      mean: (testType === 'oneSample') ? _.round(sampleMean, 2) : _.round(sampleMean - sampleMean2, 2),
      reject: !(((equality === '<') && (testStatistic > 0)) || ((equality === '>') && (testStatistic < 0))) && pValue <= alpha
    };

    means.push(sampleObject);

    const newPercentComplete = Math.floor((i / replications) * 100);
    if (newPercentComplete > percentComplete) {
      percentComplete = newPercentComplete;
      postMessage({ type: 'progress', percentComplete });
    }
  }
  const newSampleMeans = clear ? means : [...sampleMeans, ...means];
  return {newSampleMeans, sampleSize: size};
}


addEventListener('message', (event) => {
  const {newSampleMeans, sampleSize} = runSim(event.data);
  postMessage({ type: 'done', newSampleMeans, sampleSize });
})
