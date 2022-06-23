import _ from 'lodash';
import PropTypes from 'prop-types';
import { OLS_ASSUMPTIONS_OPTIONS } from './constants';

export const popShapeType = PropTypes.oneOf([
  'Normal',
  'Uniform',
  'Exponential',
  'Chi-Squared',
  'Mystery'
]);

export const distributionType = PropTypes.oneOf(['Z', 'T']);

export const dataObjectArrayType = PropTypes.arrayOf(
  PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    id: PropTypes.number
  })
);

export const sampleMeanArrayType = PropTypes.arrayOf(
  PropTypes.shape({
    size: PropTypes.number,
    mean: PropTypes.number,
    id: PropTypes.number
  })
);

export const highchartsSeriesType = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    data: dataObjectArrayType.isRequired,
    type: PropTypes.string,
    color: PropTypes.string,
    enableMouseTracking: PropTypes.bool,
    showInLegend: PropTypes.bool,
    visible: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    marker: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    animation: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
  })
);

export const confidenceIntervalsSampleType = PropTypes.shape({
  data: dataObjectArrayType.isRequired,
  size: PropTypes.number.isRequired,
  mean: PropTypes.number.isRequired,
  lowerConf: PropTypes.number.isRequired,
  upperConf: PropTypes.number.isRequired,
  confidenceLevel: PropTypes.number.isRequired,
  distribution: distributionType.isRequired,
  label: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired
});

export const stringOrNumberType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

export const hypothesisTestingSampleArrayType = PropTypes.arrayOf(
  PropTypes.shape({
    mean: PropTypes.number.isRequired,
    reject: PropTypes.bool.isRequired
  })
);

export const testTypeType = PropTypes.oneOf(['oneSample', 'twoSample']);

export const olsSampleType = PropTypes.shape({
  data: dataObjectArrayType.isRequired,
  slope: PropTypes.number.isRequired,
  intercept: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
});

export const hypothesisEqualityType = PropTypes.oneOf(['<', '>', '!=']);

export const optionalLaTeXType = PropTypes.oneOfType([PropTypes.element, PropTypes.string]);

export const anovaPopulationObjectType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  mean: PropTypes.number,
  sampleSize: stringOrNumberType.isRequired,
  data: dataObjectArrayType.isRequired,
  sample: dataObjectArrayType
});

export const olsAssumptionType = PropTypes.oneOf(_.keys(OLS_ASSUMPTIONS_OPTIONS));

export const fixedEffectsDataType = PropTypes.shape({
  1: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number).isRequired,
    y: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired,
  2: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number).isRequired,
    y: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired
});

export const fixedEffectsToggleType = PropTypes.shape({
  periods: PropTypes.arrayOf(PropTypes.number).isRequired,
  entities: PropTypes.arrayOf(PropTypes.number).isRequired
})
