import _ from 'lodash';
import { populationMean, populationStandardDev } from 'src/lib/stats-utils';
import { jStat } from 'jstat';

const runSim = (size, replications, popArray, distType, confLevel) => {
  const sampleObjects = [];
  for (let i = 0; i < replications; i++) {
    const sample = _.sampleSize(popArray, size);
    const mean = _.round(populationMean(sample), 2);
    const popMean = _.round(populationMean(popArray), 2);
    const standardDev = populationStandardDev((distType === 'Z') ? popArray : sample);
    const ciFunction = (distType === 'Z') ? jStat.normalci : jStat.tci;
    const [lowerConf, upperConf] = ciFunction(mean, 1 - (confLevel / 100), standardDev, size);

    const sampleObject = {
      data: sample,
      size: +size,
      mean,
      lowerConf: _.round(lowerConf, 2),
      upperConf: _.round(upperConf, 2),
      confidenceLevel: +confLevel,
      distribution: distType,
      label: (popMean >= _.round(lowerConf, 2)) && (popMean <= _.round(upperConf, 2)),
    }
    sampleObjects.push(sampleObject);
  }
  return sampleObjects;
}

addEventListener('message', (event) => {
  const { size, replications, popArray, distType, confLevel } = event.data;
  const samples = runSim(size, replications, popArray, distType, confLevel);
  postMessage({ type: 'done', samples });
})
