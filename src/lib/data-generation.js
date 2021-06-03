import chi from 'chi-squared';

// generates a dataset with normal distribution
export const generateNormal = (sampleSize, _xvalue) => {
  const MEAN = 64;
  const STANDARD_DEV = 3;
  const ITERATES = 9;
  const range = Math.sqrt(12) * STANDARD_DEV * STANDARD_DEV;
  const popMin = MEAN - (range / 2);

  const popArray = [];
  const xvalue = _xvalue || [];

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
              xvalue.push(point/10);
          }
      }
  }
  popArray.sort(() => Math.random() - 0.5);
  popArray.sort((a,b) => b[1] - a[1]);

  return popArray;
}

// generates a dataset with uniform distribution
export const generateUniform = (mainSampleSize, _xvalue) => {
  const HI = 10;
  const LOW = -10;
  const range = HI - LOW;

  const popArr = []
  const xvalue = _xvalue || [];

  const sampleSize = mainSampleSize - 100;
  let dict = Array(sampleSize).fill(-1);

  for (let i = 0; i < sampleSize; i++){
      const val = Math.random() * range + LOW;

      if (dict[Math.round(val * 10)]){
          dict[Math.round(val * 10)] += 1;
      } else {
          dict[Math.round(val * 10)] = 1;
      }
  }

  for (const point in dict) {
      if (point !== -1) {
          for (let count = 1; count < dict[point] + 2; count++) {
              popArr.push([point/10, count]);
          }
      }
  }

  popArr.sort(() => Math.random() - 0.3);
  popArr.sort((a,b) => b[1] - a[1]);

  return popArr;
}

// generates a dataset with exponential distribution
export const generateExponential = (sampleSize, _xvalue) => {
  const LAMBDA = 1/64;

  const popArray =  [];
  const xvalue = _xvalue || [];

  let dict = Array(sampleSize).fill(-1);

  for (let i = 0; i < sampleSize; i++){
      const val = -Math.log(Math.random()) / LAMBDA

      if (dict[Math.round(val * 10)]){
          dict[Math.round(val * 10)] += 1;
      } else {
          dict[Math.round(val * 10)] = 1;
      }
  }

  for (const point in dict) {
      if (point !== -1) {
          for (let count = 1; count < dict[point] + 2; count++) {
              popArray.push([point/10, count]);
          }
      }
  }
  popArray.sort(() => Math.random() - 0.5);
  popArray.sort((a,b) => b[1] - a[1]);
  return popArray;
}

// generates a dataset with chi-squared distribution
export const generateChiSquared = (sampleSize, _xvalue) => {
  const DEGREES_OF_FREEDOM = 8;
  const chiArray = [];
  const chiMin = chi.pdf(20, DEGREES_OF_FREEDOM);
  for (let i = 0; i < 20; i+=.1){
      const tmp = chi.pdf(i, DEGREES_OF_FREEDOM)
      for (let j = 0; j < tmp / chiMin; j++){
          chiArray.push(i)
      }
  }

  const popArray = [];
  const xvalue = _xvalue || [];

  let dict = Array(sampleSize).fill(-1);

  for (let i = 0; i < sampleSize; i++){
      const val = chiArray[Math.round(Math.random() * chiArray.length)];

      if (dict[Math.round(val * 10)]){
          dict[Math.round(val * 10)] += 1;
      } else {
          dict[Math.round(val * 10)] = 1;
      }
  }

  for (const point in dict) {
      if (point !== -1) {
          for (let count = 1; count < dict[point] + 2; count++) {
              popArray.push([point/10, count]);
          }
      }
  }

  popArray.sort(() => Math.random() - 0.5);
  popArray.sort((a,b) => b[1] - a[1]);

  return popArray;
}

// generates a dataset with 'mystery' distribution
export const generateMystery = (sampleSize, _xvalue) => {

  const popArray = [];
  const xvalue = _xvalue || [];

  const firstMEAN = 75.5;
  const firstSTANDARD_DEV = 3;
  const firstITERATES = 9;
  const firstrange = Math.sqrt(12) * firstSTANDARD_DEV * firstSTANDARD_DEV;
  const firstpopMin = firstMEAN - (firstrange / 2);
  const secondMEAN = 60.5;
  const secondSTANDARD_DEV = 2;
  const secondITERATES = 9;
  const secondrange = Math.sqrt(12) * secondSTANDARD_DEV * secondSTANDARD_DEV;
  const secondpopMin = secondMEAN - (secondrange / 2);

  const clearedArray = [];
  const popDict = [];
  const newCleared = clearedArray;
  const stateCopy = popDict;


  for (let i = 0; i < sampleSize/2; i++){
    let sum = 0;
    if(clearedArray.length === 0){
        for (let j = 0; j < firstITERATES; j++){
            sum += Math.random() * firstrange + firstpopMin;
        }
    }
    else{
        sum = newCleared.pop() * firstITERATES;
    }
    if (popDict[Math.round(sum / firstITERATES * 10)]){
        stateCopy[Math.round(sum / firstITERATES * 10)] += 1
    }
    else {
        stateCopy[Math.round(sum / firstITERATES * 10)] = 1
    }
    popArray.push(Math.round((sum / firstITERATES)*100)/100)
  }

  for (let i = 0; i < sampleSize/2; i++){
      let sum = 0;
      if(clearedArray.length === 0){
          for (let j = 0; j < secondITERATES; j++){
              sum += Math.random() * secondrange + secondpopMin;
          }
      }
      else{
          sum = newCleared.pop() * secondITERATES;
      }
      if (popDict[Math.round(sum / secondITERATES * 10)]){
          stateCopy[Math.round(sum / secondITERATES * 10)] += 1
      }
      else {
          stateCopy[Math.round(sum / secondITERATES * 10)] = 1
      }
      popArray.push(Math.round((sum / secondITERATES)*100)/100)
  }
  if(clearedArray.length > 0){
    var tempCleared = clearedArray;
    tempCleared = newCleared;
    this.setState({clearedArray : tempCleared});
  }

  const finalPopArray = [];

  let count = Array(sampleSize).fill(-1);
  for (let i = 0; i < sampleSize; i++){

      let val = popArray[i];

      if (count[Math.round(val * 10)] !== -1){
          count[Math.round(val * 10)] += 1;
      }
      else {
          count[Math.round(val * 10)] = 1;
      }

      finalPopArray.push([(Math.round(val * 10)/10), count[Math.round(val * 10)] ])
      xvalue.push((Math.round(val * 10)/10))
  }

  finalPopArray.sort(() => Math.random() - 0.5);
  finalPopArray.sort((a,b) => b[1] - a[1]);

  return finalPopArray
}



// returns the data set from the function corresponding with distType
export const dataFromDistribution = (distType, sampleSize, xvalue) => {
  const getDistributionFunction = {
    "Normal": () => generateNormal(sampleSize, xvalue),
    "Uniform": () => generateUniform(sampleSize, xvalue),
    "Exponential": () => generateExponential(sampleSize, xvalue),
    "Chi-Squared": () => generateChiSquared(sampleSize, xvalue),
    "Mystery": () => generateMystery(sampleSize, xvalue)
  }

  return getDistributionFunction[distType]();
}
