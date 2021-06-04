import { mean, round, random } from "mathjs";

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
  const sampled = []

  while (sampled.length < size){
    // index to sample ?
    const r = round(random() * (popArray.length - 1));
    let shouldSample = true;
    for (let i = 0; i < sampled.length; i++){
      if (sampled[i][0] === r) {
        shouldSample = false;
      }
    }
    if (shouldSample) {
      // only pushes if shouldSample is true
      sampled.push(popArray[r]);
    }
  }

  return { pop: sampled, mue: populationMean(sampled) };
}
