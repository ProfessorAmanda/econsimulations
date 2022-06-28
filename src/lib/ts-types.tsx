export type popShape = 'Normal' | 'Uniform' | 'Exponential' | 'Chi-Squared' | 'Mystery';

export type distribution = 'Z' | 'T';

export type dataObject = {
  x: number,
  y: number,
  id: number
};

export type sampleMean = {
  size: number,
  mean: number,
  id: number
}
export type sampleMeanArray = sampleMean[];

type highchartsSerie = {
  name: string,
  data: dataObject[],
  type?: string,
  color?: string,
  enableMouseTracking?: boolean,
  showInLegend?: boolean,
  visible?: boolean,
  label?: Object | boolean,
  marker?: Object | boolean,
  animation?: Object | boolean
}
export type highchartsSeries = highchartsSerie[];

export type confidenceIntervalsSample = {
  data: dataObject[],
  size: number,
  mean: number,
  lowerConf: number,
  upperConf: number,
  confidenceLevel: number,
  distribution: distribution,
  label: boolean,
  id: number
}

export type hypothesisTestingSample = {
  mean: number,
  reject: boolean,
}
export type hypothesisTestingSampleArray = hypothesisTestingSample[];

export type testType = 'oneSample' | 'twoSample';

export type olsSample = {
  data: dataObject[],
  slope: number,
  intercept: number,
  id: number
}

export type hypothesisEquality = '<' | '>' | '!=';

//export type optionalLaTeX = React.ReactElement | string;

export type anovaPopulationObject = {
  id: number,
  mean?: number,
  sampleSize: number,
  data: dataObject[],
  sample?: dataObject[]
}

export type oldAssumption = 'OLS Assumptions Hold' | 'Non-Random Sample' | 'Large Outliers' | 'E(u|x) != 0';

export type fixedEffectsData = {
  1: {
    x: number[],
    y: number[]
  },
  2: {
    x: number[],
    y: number[]
  }
}

export type fixedEffectsToggle = {
  periods: number[],
  entities: number[]
}

export type Section = {
  name: string,
  description: string | React.ReactElement
}