import { mean, round } from "mathjs";
import _ from "lodash";

// returns the mean of popArray
export const populationMean = (popArray) => {
  return parseFloat(mean(popArray.map(p => p[0])).toFixed(2));
}


// returns the difference of means of popMean and sampleMean
export const differenceOfMeans = (popMean, sampleMean) => {
  const diff = (
    round((popMean - sampleMean) * 100) / 100) === 0 ? 0 :
    round((popMean - sampleMean) * 100) / 100 || '';

  return diff;
}


// returns an object with {pop: sample of size 'size', mue: mean of pop} from popArray
export const sample = (size, popArray) => {
  const sampled = _.sampleSize(popArray, size);
  return { pop: sampled, mue: populationMean(sampled) };
}
