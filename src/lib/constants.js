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
    path: 'california_schools_data.csv',
    citation: <>This data is California Standardized Testing and Reporting data for 420 elementary school districts in California for 1999. This dataset is used throughout Stock and Watson, Introduction to Econometrics and was originally obtained from the California Department of Education (<a href="https://www.cde.ca.gov/" target="_blank" rel="noopener noreferrer">www.cde.ca.gov</a>).</>
  },
  'CPS Earnings Data': {
    'XY': { xLabel: '', xAbbr: 'College', yLabel: '', yAbbr: 'Female', buttonLabel: <p>Gender (Female)<br/>vs<br/>College</p>, xtickvals: [0, 1], xticktext: ['No College', 'College'], ytickvals: [0, 1], yticktext: ['Male', 'Female'] },
    'XZ': { xLabel: '', xAbbr: 'College', yLabel: 'Weekly Earnings', yAbbr: 'Earnings', buttonLabel: <p>Earnings<br/>vs<br/>College</p>, xtickvals: [0, 1], xticktext: ['No College', 'College'] },
    'YZ': { xLabel: '', xAbbr: 'Female', yLabel: 'Weekly Earnings', yAbbr: 'Earnings', buttonLabel: <p>Earnings<br/>vs<br/>Gender (Female)</p>, xtickvals: [0, 1], xticktext: ['Male', 'Female'] },
    '3D': { xLabel: '', xAbbr: 'College', xRange: [-0.5, 1.5], yLabel: '', yAbbr: 'Female', yRange: [-0.5, 1.5], zLabel: 'Weekly Earnings', zAbbr: 'Earnings', buttonLabel: <p>Earnings<br/>vs<br/>Gender (Female)<br/>vs<br/>College</p>, xtickvals: [0, 1], xticktext: ['No College', 'College'], ytickvals: [0, 1], yticktext: ['Male', 'Female'] },
    path: 'CPS_earnings_data.csv',
    citation: <>The data is a random sample from the CPS Outgoing Rotation group earner study in March 2019.<br/><cite>(Sarah Flood, Miriam King, Renae Rodgers, Steven Ruggles and J. Robert Warren. Integrated Public Use Microdata Series, Current Population Survey: Version 8.0 [dataset]. Minneapolis, MN: IPUMS, 2020. <a href="https://doi.org/10.18128/D030.V8.0" target="_blank" rel="noopener noreferrer">https://doi.org/10.18128/D030.V8.0</a>)</cite></>
  },
  'CPS Log Earnings Data': {
    'XY': { yLabel: 'Years of Education', yAbbr: 'Years_of_Ed', xLabel: '', xAbbr: 'Female', buttonLabel: <p>Years of Education<br/>vs<br/>Gender (Female)</p>, xtickvals: [0, 1], xticktext: ['Male', 'Female'] },
    'YZ': { xLabel: 'Years of Education', xAbbr: 'Years_of_Ed', yLabel: 'Log Weekly Earnings', yAbbr: 'ln(Earnings)', buttonLabel: <p>Log Earnings<br/>vs<br/>Years of Education</p> },
    'XZ': { xLabel: '', xAbbr: 'Female', yLabel: 'Log Weekly Earnings', yAbbr: 'ln(Earnings)', buttonLabel: <p>Log Earnings<br/>vs<br/>Gender (Female)</p>, xtickvals: [0, 1], xticktext: ['Male', 'Female'] },
    '3D': { yLabel: 'Years of Education', yAbbr: 'Years_of_Ed', xLabel: '', xAbbr: 'Female', xRange: [-0.5, 1.5], zLabel: 'Log Weekly Earnings', zAbbr: 'ln(Earnings)', buttonLabel: <p>Log Earnings<br/>vs<br/>Gender (Female)<br/>vs<br/>Years of Education</p>, xtickvals: [0, 1], xticktext: ['Male', 'Female'] },
    path: 'CPS_log_earnings_data.csv',
    citation: <>The data is a random sample from the CPS Outgoing Rotation group earner study in March 2019.<br/><cite>(Sarah Flood, Miriam King, Renae Rodgers, Steven Ruggles and J. Robert Warren. Integrated Public Use Microdata Series, Current Population Survey: Version 8.0 [dataset]. Minneapolis, MN: IPUMS, 2020. <a href="https://doi.org/10.18128/D030.V8.0" target="_blank" rel="noopener noreferrer">https://doi.org/10.18128/D030.V8.0</a>)</cite></>
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
      nullH: <InlineMath math="H_0: \mu \leq "/>,
      alterH: <InlineMath math="H_a: \mu \gt "/>,
      sides: 1
    },
    {
      type: '<',
      hypoText: 'Option 2: These cows produce less than ',
      nullH: <InlineMath math="H_0: \mu \geq "/>,
      alterH: <InlineMath math="H_a: \mu \lt "/>,
      sides: 1
    },
    {
      type: '!=',
      hypoText: 'Option 3: These cows produce an amount not equal to ',
      nullH: <InlineMath math="H_0: \mu = "/>,
      alterH: <InlineMath math="H_a: \mu \neq "/>,
      sides: 2
    }
  ],
  twoSample: [
    {
      type: '<',
      hypoText: 'Option 1: These cows produce more than they did before.',
      nullH: <InlineMath math="H_0: \mu_1 - \mu_2 \geq 0"/>,
      alterH: <InlineMath math="H_a: \mu_1 - \mu_2 \lt 0"/>,
      sides: 1
    },
    {
      type: '>',
      hypoText: 'Option 2: These cows produce less than they did before',
      nullH: <InlineMath math="H_0: \mu_1 - \mu_2 \leq 0"/>,
      alterH: <InlineMath math="H_a: \mu_1 - \mu_2 \gt 0"/>,
      sides: 1
    },
    {
      type: '!=',
      hypoText: 'Option 3: These cows produce a different amount now compared to before.',
      nullH: <InlineMath math="H_0: \mu_1 - \mu_2 = 0"/>,
      alterH: <InlineMath math="H_a: \mu_1 - \mu_2 \neq 0"/>,
      sides: 2
    }
  ]
}

export const OLS_ASSUMPTIONS_OPTIONS = {
  'OLS Assumptions Hold': 'OLS Assumptions Hold',
  'Non-Random Sample': 'Non-Random Sample',
  'Large Outliers': 'Large Outliers',
  'E(u|x) != 0': <InlineMath key="E(u|x)\neq 0" math="E(u|x)\neq 0"/>
};

export const OLS_ASSUMPTIONS_TEXTS = {
  'OLS Assumptions Hold': '',
  'Non-Random Sample': 'Researchers collect their sample by randomly calling people from list of people in the study population. BUT, people who are not working are much more likely to answer the phone to respond to the survey. This means that the sample is not actually random and draws people from the bottom half of the earnings distribution (those working fewer hours or without steady jobs).',
  'Large Outliers': 'The technician hired to enter earnings from the sample respondents makes data entry errors when recording a batch of earnings data from the treatment group, accidently inflating the values.',
  'E(u|x) != 0': 'Some people who were randomized into the control group are very ambitious and well-connected and find a way to get into the Job Corps program. This is an example of “failure to follow treatment protocol.” In this scenario, the regressor (X=indicator for being in Job Corps) in no longer uncorrelated with other characteristics (eg. motivation, connections) of the individual.'
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
    name: 'ANOVA',
    description: 'The module presents a simple version of ANOVA (Analysis of Variance), in which we test the null hypothesis that the means of two or more populations are equal.',
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
    description: <> If the least squares assumptions hold, the OLS estimators, <InlineMath math="\hat{\beta}_0"/> and <InlineMath math="\hat{\beta}_1"/>, converge to the population intercept and slope when the sample is large.</>
  },
  {
    name: 'Omitted Variable Bias',
    description: 'Omitted variable bias (OVB) arises when a variable that is i) correlated with the outcome and ii) correlated with one of the included regressors is omitted from the regression model.',
  },
  {
    name: 'Multiple Regression',
    description: <>OLS regression with multiple regressors (<InlineMath math="k"/>) estimates the <InlineMath math="k+1"/> dimensional plane that best fits the data.</>
  },
  {
    name: 'Fixed Effects',
    description: 'In Progress',
  }
];
