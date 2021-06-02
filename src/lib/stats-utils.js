import math from "mathjs";

export const populationMean = (popArray) => {
  return parseFloat(math.mean(popArray.map(p => p[0])).toFixed(2));
}

export const differenceOfMeans = (popMean, sampleMean) => {
  const diff = (
    Math.round((popMean - sampleMean) * 100) / 100) === 0 ? 0 :
    Math.round((popMean - sampleMean) * 100) / 100 || '';

  return diff;
}

export const sortNormal = (arr) => {
  const obj = {}
  arr.forEach(item=>{
      if(!obj[item[0]]){
          obj[item[0]] = [];
          obj[item[0]].push(item);
      }else{
          obj[item[0]].push(item);
      }
  })
  return obj;
}

export const sample = (size, popArray) => {
  const sampled = []

  while (sampled.length < size){
    // index to sample ?
    const r = Math.round(Math.random() * (popArray.length - 1));
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
