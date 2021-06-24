import PropTypes from "prop-types";

export const popShapeType = PropTypes.oneOf([
  "Normal",
  "Uniform",
  "Exponential",
  "Chi-Squared",
  "Mystery"
]);

export const distributionType = PropTypes.oneOf(["Z","T"]);

export const dataObjectArrayType = PropTypes.arrayOf(
  PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
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
    label: PropTypes.object
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
