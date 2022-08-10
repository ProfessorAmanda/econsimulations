import _ from 'lodash';
import { linearRegression } from '@/lib/stats-utils';

const runSim = ({ size, replications, clear, data, regressorType, samples }) => {
  const newSamples = [];
  let percentComplete = 0;
  for (let i = 0; i < replications; i++) {
    const sample = _.sampleSize(data, size);

    // ensure that the sample data is spread between both x-categories
    if ((regressorType === 'Binary') && (_.uniq(sample.map(({ x }) => x)).length === 1)) {
      i -= 1;
      continue;
    }

    const { slope, intercept } = linearRegression(sample, 1);
    const sampleObject = {
      data: sample,
      size,
      slope,
      intercept,
    }
    newSamples.push(sampleObject);
    const newPercentComplete = Math.floor((i / replications) * 100);
    if (newPercentComplete > percentComplete) {
      percentComplete = newPercentComplete;
      postMessage({ type: 'progress', percentComplete });
    }
  }
  const indexedSamples = (clear ? newSamples : [...samples, ...newSamples]).map((obj, index) => ({ ...obj, id: index + 1 }));
  return { selected: indexedSamples[indexedSamples.length - 1], samples: indexedSamples };
}


addEventListener('message', (event) => {
  const { selected, samples } = runSim(event.data);
  postMessage({ type: 'done', selected, samples });
})
