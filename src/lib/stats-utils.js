import { mean, std, sqrt } from 'mathjs';
import PD from 'probability-distributions';
import _ from 'lodash';
import { jStat } from 'jstat';

export const getCounts = (data) => {
  const counts = [];
  _.entries(_.countBy(data)).forEach(([amt, count]) => {
    for (let i = 1; i <= count; i++) {
      counts.push({ x: +amt, y: i })
    }
  });
  return counts
}

// returns an array of values with a normal distribution
export const generateNormal = (sampleSize, mean, standardDev, precision = 5) => {
  return PD.rnorm(sampleSize, mean, standardDev).map((num) => _.round(num, precision))
}

// returns an array of values with a uniform distribution
export const generateUniform = (sampleSize, low, hi, precision = 5) => {
  PD.runif(sampleSize, low, hi).map((num) => _.round(num, precision))
}

// returns an array of values with an exponential distribution
export const generateExponential = (sampleSize, lambda, precision = 5) => {
  PD.rexp(sampleSize, lambda).map((num) => _.round(num, precision))
}

// returns an array of values with a chi-squared distribution
export const generateChiSquared = (sampleSize, degreesOfFreedom, precision = 5) => {
  PD.rchisq(sampleSize, degreesOfFreedom).map((num) => _.round(num, precision))
}

// returns an array of values with a 'mystery' distribution (really points sampled randomly from two normal distributions)
export const generateMystery = (sampleSize, mysteryMean1, mysteryMean2, mysterySD1, mysterySD2, precision = 5) => {
  const normal1 = PD.rnorm(sampleSize, mysteryMean1, mysterySD1).map((num) => _.round(num, precision));
  const normal2 = PD.rnorm(sampleSize, mysteryMean2, mysterySD2).map((num) => _.round(num, precision));
  return _.sampleSize([...normal1, ...normal2], 2000);
}

// returns the data set from the function corresponding with distType
// objects in array are of shape {x, y, id}
export const dataFromDistribution = (
  distType,
  sampleSize,
  {
    mean = 64,
    standardDev = 3,
    low = -10,
    hi = 10,
    lambda = 1 / 64,
    degreesOfFreedom = 8,
    mysteryMean1 = 58,
    mysteryMean2 = 70,
    mysterySD1 = 1,
    mysterySD2 = 3,
    precision = 1
  } = {}
) => {
  const getDistributionFunction = {
    Normal: () => generateNormal(sampleSize, mean, standardDev, precision),
    Uniform: () => generateUniform(sampleSize, low, hi, precision),
    Exponential: () => generateExponential(sampleSize, lambda, precision),
    'Chi-Squared': () => generateChiSquared(sampleSize, degreesOfFreedom, precision),
    Mystery: () => generateMystery(sampleSize, mysteryMean1, mysteryMean2, mysterySD1, mysterySD2, precision)
  }

  const population = getDistributionFunction[distType]();

  return _.shuffle(getCounts(population)).map((obj, index) => ({ ...obj, id: index }));
}

// returns the mean of popArray
export const populationMean = (popArray) => ((popArray.length > 0) ? mean(popArray.map((p) => p.x)) : undefined)

// returns the std of popArray
export const populationStandardDev = (popArray) => ((popArray.length > 0) ? std(popArray.map((p) => p.x)) : undefined)

export const arraySTD = (anyArray) => ((anyArray.length > 0) ? std(anyArray.map((beta) => beta)) : undefined)
// transforms array into standard normal distribution
export const convertToStandardNormal = (values) => {
  if (values.length === 0) {
    return []
  }
  const valuesMean = mean(values);
  const valuesSD = std(values);
  return values.map((val) => ((val - valuesMean) / valuesSD));
}

export const calculateOneSampleTestStatistic = (distType, sampleMean, mu0, standardDev, sampleSize) => ((distType === 'Z')
  ? jStat.zscore(sampleMean, mu0, standardDev / sqrt(sampleSize))
  : jStat.tscore(sampleMean, mu0, standardDev, sampleSize))

export const calculateTwoSampleTestStatistic = (
  sampleMean1,
  sampleMean2,
  standardDev1,
  standardDev2,
  sampleSize1,
  sampleSize2
) => (sampleMean1 - sampleMean2) / sqrt(standardDev1 ** 2 / sampleSize1 + standardDev2 ** 2 / sampleSize2)

export const calculatePValue = (distType, testStat, sampleSize, sides) => ((distType === 'Z') ? jStat.ztest(testStat, sides) : jStat.ttest(testStat, sampleSize - 1, sides))
