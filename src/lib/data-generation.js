import chi from 'chi-squared';
import PD from "probability-distributions";
import _ from "lodash";

// generates a dataset with normal distribution
// returns an array of [value, count] pairs
export const generateNormal = (sampleSize) => {
  const MEAN = 64;
  const STANDARD_DEV = 3;
  const population = PD.rnorm(sampleSize, MEAN, STANDARD_DEV).map((num) => num.toFixed(1));
  const counts = _.countBy(population);
  const popArray = [];
  _.entries(counts).forEach(([amt, count]) => {
    for (let i = 1; i <= count; i++) {
      popArray.push([+amt, i])
    }
  });
  return _.shuffle(popArray);
}

// generates a dataset with uniform distribution
// returns an array of [value, count] pairs
export const generateUniform = (sampleSize) => {
  const HI = 10;
  const LOW = -10;
  const population = PD.runif(sampleSize, LOW, HI).map((num) => num.toFixed(1));
  const counts = _.countBy(population);
  const popArray = [];
  _.entries(counts).forEach(([amt, count]) => {
    for (let i = 1; i <= count; i++) {
      popArray.push([+amt, i])
    }
  });
  return _.shuffle(popArray);
}

// generates a dataset with exponential distribution
// returns an array of [value, count] pairs
export const generateExponential = (sampleSize) => {
  const LAMBDA = 1/64;
  const population = PD.rexp(sampleSize, LAMBDA).map((num) => num.toFixed(1));
  const counts = _.countBy(population);
  const popArray = [];
  _.entries(counts).forEach(([amt, count]) => {
    for (let i = 1; i <= count; i++) {
      popArray.push([+amt, i])
    }
  });
  return _.shuffle(popArray);
}

// generates a dataset with chi-squared distribution
// returns an array of [value, count] pairs
export const generateChiSquared = (sampleSize) => {
  const DEGREES_OF_FREEDOM = 8;
  const population = PD.rchisq(sampleSize, DEGREES_OF_FREEDOM).map((num) => num.toFixed(1));
  const counts = _.countBy(population);
  const popArray = [];
  _.entries(counts).forEach(([amt, count]) => {
    for (let i = 1; i <= count; i++) {
      popArray.push([+amt, i])
    }
  });
  return _.shuffle(popArray);
}

// generates a dataset with 'mystery' distribution
// returns an array of [value, count] pairs
export const generateMystery = (sampleSize) => {

  const popArray = [];

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
  }

  finalPopArray.sort(() => Math.random() - 0.5);
  finalPopArray.sort((a,b) => b[1] - a[1]);

  return finalPopArray
}



// returns the data set from the function corresponding with distType
export const dataFromDistribution = (distType, sampleSize) => {
  const getDistributionFunction = {
    "Normal": () => generateNormal(sampleSize),
    "Uniform": () => generateUniform(sampleSize),
    "Exponential": () => generateExponential(sampleSize),
    "Chi-Squared": () => generateChiSquared(sampleSize),
    "Mystery": () => generateMystery(sampleSize)
  }

  return getDistributionFunction[distType]();
}
