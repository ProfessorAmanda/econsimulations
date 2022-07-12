import _ from 'lodash';
import { populationMean } from 'src/lib/stats-utils';

const runSim = (numberResamples , population, resampleSize) => {
  const newSamples = [];
  for (let i = 0; i < numberResamples; i++) {
    //if (i % 10000 === 0) console.log('resampling', i);
    const samplePop = _.sampleSize(population, resampleSize);
    const sampleMean = populationMean(samplePop);
    newSamples.push({ size: +resampleSize, mean: sampleMean })
  }

  const sampleMeans = newSamples.map((mean, index) => {
    //if (index % 10000 === 0) console.log('converting', index);
    return { ...mean, id: index + 1 }
  });
  return sampleMeans;
}


addEventListener('message', (event) => {
  //console.log('worker received message', event.data);
  postMessage(runSim(event.data.numberResamples, event.data.population, event.data.resampleSize));
})
