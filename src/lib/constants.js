import { InlineMath } from 'react-katex';

export const SAMPLE_SIZE = 2000;

export const VALUES = {
  Normal: { xmaxval: 75, xminval: 50, ymaxval: 40, title: 'Milk Production', xLabel: 'Gallons', tableCol: 'Cow' },
  Uniform: { xmaxval: 10, xminval: -10, ymaxval: 25, title: 'Lottery Outcome', xLabel: 'Dollars', tableCol: 'Person' },
  Exponential: { xmaxval: 500, xminval: 0, ymaxval: 10, title: 'Duration of Telemarketer Call', xLabel: 'Duration (seconds)', tableCol: 'Call' },
  'Chi-Squared': { xmaxval: 30, xminval: 0, ymaxval: 40, title: 'Money Spent on Lunch', xLabel: 'Dollars', tableCol: 'Worker' },
  Mystery: { xmaxval: 80, xminval: 50, ymaxval: 60, title: 'Alien Female Height', xLabel: 'Height (in)', tableCol: 'Alien' }
}

export const VALUES_ALT = {
  Normal: { xmaxval: 75, xminval: 50, title: 'Milk Production', xLabel: 'Gallons' },
  Uniform: { xmaxval: 75, xminval: 55, title: 'Alien Female Height', xLabel: 'Height (in)' },
  Exponential: { xmaxval: 500, xminval: 0, title: 'Duration of Telemarketer Call', xLabel: 'Duration (seconds)' },
  'Chi-Squared': { xmaxval: 30, xminval: 0, title: 'Money Spent on Lunch', xLabel: 'Dollars' }
}

export const OLSE_VALUES = {
  Continuous: { xMin: 0, xMax: 15, yMin: 20, yMax: 100, xLabel: 'Study Hours', yLabel: 'Test Score', xCategories: null, slopeMin: -5, slopeMax: 5, interceptMin: 20, interceptMax: 100, yTickInterval: 20 },
  Binary: { xMin: 0, xMax: 1, yMin: 50, yMax: 350, yLabel: 'Weekly Earnings', xCategories: ['Control Group', 'Job Corps'], title: 'Sample', slopeMin: -10, slopeMax: 30, interceptMin: 175, interceptMax: 225, yTickInterval: 50 }
}

export const MULTIPLE_REGRESSION_VALUES = {
  'California Schools Data': {
    'XY': { xLabel: 'Student-Teacher Ratio', xAbbr: 'StudentTeacherRatio', xRange: [10, 30], yLabel: 'Percent English Learners', yAbbr: 'PercentEngLearners' , yRange: [0, 100], buttonLabel: <p>Percent English Learners<br/>vs<br/>Student-Teacher Ratio</p> },
    'XZ': { xLabel: 'Student-Teacher Ratio', xAbbr: 'StudentTeacherRatio', xRange: [10, 30], yLabel: 'Test Scores', yAbbr: 'TestScores', yRange: [600, 720], buttonLabel: <p>Test Scores<br/>vs<br/>Student-Teacher Ratio</p> },
    'YZ': { xLabel: 'Percent English Learners', xAbbr: 'PercentEngLearners', xRange: [0, 100], yLabel: 'Test Scores', yAbbr: 'TestScores', yRange: [600, 720], buttonLabel: <p>Test Scores<br/>vs<br/>Percent English Learners</p> },
    '3D': { xLabel: 'Student-Teacher Ratio', xAbbr: 'StudentTeacherRatio', xRange: [10, 30], yLabel: 'Percent English Learners', yAbbr: 'PercentEngLearners' , yRange: [0, 100], zLabel: 'Test Scores', zAbbr: 'TestScores', zRange: [600, 720], buttonLabel: <p>Test Scores<br/>vs<br/>Percent English Learners<br/>vs<br/>Student-Teacher Ratio</p> },
  },
  'CPS Earnings Data': {
    'XY': { xLabel: '', xAbbr: 'College', yLabel: '', yAbbr: 'Gender', buttonLabel: <p>Gender<br/>vs<br/>College</p>, xtickvals: [0, 1], xticktext: ['No College', 'College'], ytickvals: [0, 1], yticktext: ['Male', 'Female'] },
    'XZ': { xLabel: '', xAbbr: 'College', yLabel: 'Weekly Earnings', yAbbr: 'Earnings', buttonLabel: <p>Earnings<br/>vs<br/>College</p>, xtickvals: [0, 1], xticktext: ['No College', 'College'] },
    'YZ': { xLabel: '', xAbbr: 'Gender', yLabel: 'Weekly Earnings', yAbbr: 'Earnings', buttonLabel: <p>Earnings<br/>vs<br/>Gender</p>, xtickvals: [0, 1], xticktext: ['Male', 'Female'] },
    '3D': { xLabel: '', xAbbr: 'College', xRange: [-0.5, 1.5], yLabel: '', yAbbr: 'Gender', yRange: [-0.5, 1.5], zLabel: 'Weekly Earnings', zAbbr: 'Earnings', buttonLabel: <p>Earnings<br/>vs<br/>Gender<br/>vs<br/>College</p>, xtickvals: [0, 1], xticktext: ['No College', 'College'], ytickvals: [0, 1], yticktext: ['Male', 'Female'] },
  },
  'CPS Log Earnings Data': {
    'XY': { xLabel: 'Years of Education', xAbbr: 'YearsOfEd', yLabel: '', yAbbr: 'Gender', buttonLabel: <p>Gender<br/>vs<br/>Years of Education</p>, ytickvals: [0, 1], yticktext: ['Male', 'Female'] },
    'XZ': { xLabel: 'Years of Education', xAbbr: 'YearsOfEd', yLabel: 'Log Weekly Earnings', yAbbr: 'LnEarnings', buttonLabel: <p>Log Earnings<br/>vs<br/>Years of Education</p> },
    'YZ': { xLabel: '', xAbbr: 'Gender', yLabel: 'Log Weekly Earnings', yAbbr: 'LnEarnings', buttonLabel: <p>Log Earnings<br/>vs<br/>Gender</p>, xtickvals: [0, 1], xticktext: ['Male', 'Female'] },
    '3D': { xLabel: 'Years of Education', xAbbr: 'YearsOfEd', yLabel: '', yAbbr: 'Gender', yRange: [-0.5, 1.5], zLabel: 'Log Weekly Earnings', zAbbr: 'LnEarnings', buttonLabel: <p>Log Earnings<br/>vs<br/>Gender<br/>vs<br/>Years of Education</p>, ytickvals: [0, 1], yticktext: ['Male', 'Female'] },
  }
}

export const TEXTS = {
  Normal: ['monthly Milk Production', 'cows', 'produced', ' gallons a month.'],
  // Uniform: ["the wait time", "people at the DMV in VT", "reported a total time of", " minutes."],
  Exponential: ['duration', 'Telemarketer Calls', 'reported a duration of', ' seconds on a call.'],
  'Chi-Squared': ['expenditure', 'workers on lunch', 'reported an expenditure of', ' dollars on lunch.'],
  Mystery: ['the height', 'Alien Females from planet Stata', 'reported a height of', ' inches.'],
}

export const TEXTS_ALT = {
  Normal: ['monthly Milk Production', 'cows'],
  Uniform: ['the height', 'Alien Females from planet Stata'],
  Exponential: ['duration', 'Telemarketer Calls'],
  'Chi-Squared': ['expenditure', 'workers on lunch']
}

export const HYPOTHESIS_OPTIONS = {
  oneSample: [
    {
      type: '>',
      hypoText: 'Option 1: These cows produce more than ',
      nullH: 'H_0: μ ≤  ',
      alterH: 'H_a: μ >  ',
      sides: 1
    },
    {
      type: '<',
      hypoText: 'Option 2: These cows produce less than ',
      nullH: 'H_0: μ ≥  ',
      alterH: 'H_a: μ <  ',
      sides: 1
    },
    {
      type: '!=',
      hypoText: 'Option 3: These cows produce an amount not equal to ',
      nullH: 'H_0: μ =  ',
      alterH: 'H_a: μ ≠  ',
      sides: 2
    }
  ],
  twoSample: [
    {
      type: '<',
      hypoText: 'Option 1: These cows produce more than they did before.',
      nullH: 'H_0: μ_1 - μ_2 ≥ 0',
      alterH: 'H_a: μ_1 - μ_2 < 0',
      sides: 1
    },
    {
      type: '>',
      hypoText: 'Option 2: These cows produce less than they did before',
      nullH: 'H_0: μ_1 - μ_2 ≤ 0',
      alterH: 'H_a: μ_1 - μ_2 > 0',
      sides: 1
    },
    {
      type: '!=',
      hypoText: 'Option 3: These cows produce a different amount now compared to before.',
      nullH: 'H_0: μ_1 - μ_2 = 0',
      alterH: 'H_a: μ_1 - μ_2 ≠ 0',
      sides: 2
    }
  ]
}

export const OLS_ASSUMPTIONS_OPTIONS = [
  'OLS Assumptions Hold',
  'Non-Random Sample',
  'Large Outliers',
  <InlineMath key="E(u|x)=0" math="E(u|x)=0"/>
];

export const OLS_ASSUMPTIONS_TEXTS = {
  'OLS Assumptions Hold': '',
  'Non-Random Sample': '',
  'Large Outliers': '',
  'E(u|x)=0': ''
}

export const MODULES = [
  {
    name: 'Law of Large Numbers',
    description: 'The Law of Large Numbers tells us that that the sample mean approaches the mean of the population as we increase the sample size. This simulation investigates the behavior of the sample mean as we change the sample size.',
  },
  {
    name: 'Central Limit Theorem',
    description: 'The Central Limit Theorem states that, for sufficiently large samples, the sample mean is approximately normally distributed, even if the underlying population is not normally distributed (or if we have no idea what the underlying population looks like). This simulation investigates how the distribution of the sample mean is affected by the sample size and the shape of the population distribution.',
  },
  {
    name: 'Confidence Intervals',
    description: 'A confidence interval provides a range of values for the likely location of the true population mean, based on information gathered from a sample.',
  },
  {
    name: 'Hypothesis Testing',
    description: 'Hypothesis testing is a procedure that allows us to form conclusions based on information derived from a sample.',
  },
  {
    name: 'Joint Distributions',
    description: 'A joint probability distribution describes the simultaneous behavior of two random variables.',
  },
  {
    name: 'Least Squares',
    description: 'Ordinary least squares regression estimates the slope(s) and intercept of a line to best fit data for two (or more) variables by minimizing the sum of the squared distances from the data points to the line.',
  },
  {
    name: 'Sample Distribution of OLS Estimators',
    description: <>The sampling distributions of the OLS estimators <InlineMath math="\hat{\beta}_0"/> and <InlineMath math="\hat{\beta}_1"/> are approximately normal.</>
  },
  {
    name: 'The OLS Estimators are Consistent',
    description: 'In Progress'
  },
  {
    name: 'Omitted Variable Bias',
    description: 'Omitted variable bias (OVB) arises when a variable that is i) correlated with the outcome and ii) correlated with one of the included regressors is omitted from the regression model.',
  },
  {
    name: 'Multiple Regression',
    description: 'In Progress'
  }
];
