import PropTypes from "prop-types";

export const popShapeType = PropTypes.oneOf([
  "Normal",
  "Uniform",
  "Exponential",
  "Chi-Squared",
  "Mystery"
]);

export const dataArrayType = PropTypes.arrayOf(
  PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    id: PropTypes.number
  })
);

export const highchartsSeriesType = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    data: dataArrayType.isRequired,
    type: PropTypes.string,
    color: PropTypes.string,
    enableMouseTracking: PropTypes.bool,
    showInLegend: PropTypes.bool,
    visible: PropTypes.bool,
    label: PropTypes.object
  })
);

export const confidenceIntervalsSampleType = PropTypes.shape({
  data: dataArrayType.isRequired,
  size: PropTypes.number.isRequired,
  mean: PropTypes.number.isRequired,
  lowerConf: PropTypes.number.isRequired,
  upperConf: PropTypes.number.isRequired,
  confidenceLevel: PropTypes.number.isRequired,
  distribution: PropTypes.oneOf(["Z","T"]).isRequired,
  label: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired
});

export const stringOrNumberType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
