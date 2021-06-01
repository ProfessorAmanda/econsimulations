import math from "mathjs";

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

export const generateNormal = () => {
  const MEAN = 64;
  const STANDARD_DEV = 3;
  const ITERATES = 9;
  const range = Math.sqrt(12) * STANDARD_DEV * STANDARD_DEV;
  const popMin = MEAN - (range / 2);

  const popArray = [];

  const sampleSize = 2000;
  let dict = Array(sampleSize).fill(-1);

  // creates data points for population and stores it in popArray
  for (let i = 0; i < sampleSize; i++){
      let sum = 0;
      for (let j = 0; j < ITERATES; j++){
          sum += Math.random() * range + popMin;
      }

      if (dict[Math.round(sum / ITERATES * 10)] !== -1){
          dict[Math.round(sum / ITERATES * 10)] += 1;
      }
      // Adds first instance of a point
      else {
          dict[Math.round(sum / ITERATES * 10)] = 1;
      }
  }

  for (const point in dict) {
      if (point !== -1) {
          for (let count = 1; count < dict[point] + 1; count++) {
              popArray.push([point/10, count]);
          }
      }
  }
  popArray.sort(() => Math.random() - 0.5);
  popArray.sort((a,b) => b[1] - a[1]);

  return popArray;
}

export const sample = (size, popArray) => {
  const sampled = []

  while (sampled.length < size){
    // index to sample ?
    const r = Math.round(Math.random() * (popArray.length - 1))
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

  return { pop: sampled, mue: Math.round(math.mean(sampled.map(p => p[0])) * 100)/100 };
}
