import _ from 'lodash';
import { populationMean } from 'src/lib/stats-utils';

const runSim = (numberResamples , population, resampleSize) => {
  const newSamples = [];
  let percentComplete = 0;
  for (let i = 0; i < numberResamples; i++) {
    
    const samplePop = _.sampleSize(population, resampleSize);
    const sampleMean = populationMean(samplePop);
    newSamples.push({ size: +resampleSize, mean: sampleMean });
    const newPercentComplete = Math.floor((i / numberResamples) * 100);
    if (newPercentComplete > percentComplete) {
      percentComplete = newPercentComplete;
      postMessage({ type: 'progress', percentComplete });
    }
  }

  const sampleMeans = newSamples.map((mean, index) => {
    return { ...mean, id: index + 1 }
  });
  return sampleMeans;
}

addEventListener('message', (event) => {
  const { numberResamples, population, resampleSize } = event.data;
  const sampleMeans = runSim(numberResamples, population, resampleSize);
  postMessage({ type: 'done', sampleMeans });
})
