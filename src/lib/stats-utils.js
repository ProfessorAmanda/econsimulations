// When transitioning to tsx, found that jStat is not typed.
// According to its maintainer, it's not like to be updated in the near future.
// TODO: transition to using "@stdlib/stats", which is a typed stats lib.
// Need to understand the stats functionalities (takes time) before the transition, so keeping this file as .js for now.

import { mean, std, sqrt } from 'mathjs';
import PD from 'probability-distributions';
import _ from 'lodash';
import { jStat } from 'jstat';
import MultivariateNormal from 'multivariate-normal';
import regression from 'regression';

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
  return PD.runif(sampleSize, low, hi).map((num) => _.round(num, precision))
}

// returns an array of values with an exponential distribution
export const generateExponential = (sampleSize, lambda, precision = 5) => {
  return PD.rexp(sampleSize, lambda).map((num) => _.round(num, precision))
}

// returns an array of values with a chi-squared distribution
export const generateChiSquared = (sampleSize, degreesOfFreedom, precision = 5) => {
  return PD.rchisq(sampleSize, degreesOfFreedom).map((num) => _.round(num, precision))
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

  return _.shuffle(getCounts(population)).map((obj, index) => ({ ...obj, id: index + 1 }));
}

// returns the mean of popArray
export const populationMean = (popArray, attr = 'x') => {
  return (popArray.length > 0) ? mean(popArray.map((p) => p[attr])) : undefined
}

// returns the std of popArray
export const populationStandardDev = (popArray, attr = 'x') => {
  return (popArray.length > 0) ? std(popArray.map((p) => p[attr])) : undefined
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
) => (sampleMean1 - sampleMean2) / sqrt(standardDev1 ** 2 / sampleSize1 + standardDev2 ** 2 / sampleSize2);

export const calculatePValue = (distType, testStat, equality, sampleSize, sides) => {
  const pval = (distType === 'Z') ? jStat.ztest(testStat, sides) : jStat.ttest(testStat, sampleSize - 1, sides)
  if (((equality === '>') && (testStat < 0)) || ((equality === '<') && (testStat >= 0))) {
    return 1 - pval
  } else {
    return pval
  }
}

export const generateScatter = (size, meanX, meanY, stdX, stdY, corr) => {
  const covarianceMatrix = [
    [stdX * stdX, corr * stdX * stdY],
    [corr * stdX * stdY, stdY * stdY]
  ];
  const distribution = MultivariateNormal([meanX, meanY], covarianceMatrix);
  return PD.rnorm(size, 0, 5).map((epsilon) => {
    const [x, y] = distribution.sample();
    const scorePoint = 40 + 3 * x + 2.5 * y + epsilon;
    return ({
      x: _.clamp(_.round(x, 2), 0, 15),
      y: _.clamp(_.round(scorePoint, 2), 0, 100)
    });
  });
}

export const generateBinary = (size, mean1, mean2, std1, std2, precision = 2) => {
  const control = generateNormal(size, mean1, std1, precision).map((num) => ({ x: 0, y: num, category: 'Control' }));
  const jobCorps = generateNormal(size, mean2, std2, precision).map((num) => ({ x: 1, y: num, category: 'Job Corps' }));
  return [...control, ...jobCorps].map((obj, id) => ({ ...obj, id }));
}

export const convertToStandardNormal = (array, popMean, popSD, attr) => {
  return array.map((p) => ({...p, [attr]: (p[attr] - popMean) / (popSD || 1)}));
}

// can take either an array of arrays or an array of objects
// objects must be of shape { x, y }
export const linearRegression = (data, precision = 2) => {
  let parsedData;
  if (data.every((elem) => _.isArray(elem))) {
    parsedData = data;
  } else if (data.every((elem) => _.isObject(elem))) {
    parsedData = data.map(({ x, y }) => [x, y]);
  } else {
    throw new Error();
  }
  const { equation } = regression.linear(parsedData, { precision });
  return { slope: equation[0], intercept: equation[1] }
}
