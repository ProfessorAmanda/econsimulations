import _ from 'lodash';
import { mean, std, sum } from 'mathjs';
import { jStat } from 'jstat';

const runSim = (populations, alpha, numSamples) => {
  const fStats = [];
  let percentComplete = 0;
  for (let i = 0; i < numSamples; i++) {
    // calculate F-statistic and p-value
    const sampleObjects = populations.map(({ data, sampleSize }) => _.sampleSize(data, sampleSize));
    const samples = sampleObjects.map((sample) => sample.map(({ x }) => x));
    const overallSampleMean = (_.flatten(samples).length > 0) ? mean(_.flatten(samples)) : undefined;
    const SSTR = sum(samples.map((sample) => sample.length * (mean(sample) - overallSampleMean) ** 2));
    const MSTR = SSTR / (populations.length - 1);
    const SSE = sum(samples.map((sample) => (sample.length - 1) * std(sample) ** 2));
    const MSE = SSE / (sum(samples.map((sample) => sample.length)) - populations.length);
    const F = MSTR / MSE;
    const pValue = jStat.anovaftest(...samples);
    // round slightly differently below 1 so there are no f-stats = 0
    fStats.push({ F: (F < 1) ? +F.toPrecision(2) : _.round(F, 2), pValue, reject: pValue < +alpha });
    const newPercentComplete = Math.floor((i / numSamples) * 100);
    if (newPercentComplete > percentComplete) {
      percentComplete = newPercentComplete;
      postMessage({ type: 'progress', percentComplete });
    }
  }
  const fCounts = {};
  const newRejects = [];
  const newAccepts = [];
  // separate F-stats into two arrays for rejecting/failing to reject
  fStats.forEach(({ F, pValue, reject }) => {
    fCounts[F] = _.defaultTo(fCounts[F] + 1, 1);
    const fObject = {
      x: +F,
      y: fCounts[F],
      F,
      pValue: pValue.toPrecision(3),
      reject,
    }
    if (reject) {
      newRejects.push(fObject)
    } else {
      newAccepts.push(fObject)
    }
  });

  return { newAccepts, newRejects };
}

addEventListener('message', (event) => {
  const { populations, alpha, numSamples } = event.data;
  const { newAccepts, newRejects } = runSim(populations, alpha, numSamples);
  postMessage({ type: 'done', newAccepts, newRejects });
})
