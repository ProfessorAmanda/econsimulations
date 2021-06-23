import PropTypes from "prop-types";

export const popShapeType = PropTypes.oneOf([
  "Normal",
  "Uniform",
  "Exponential",
  "Chi-Squared",
  "Mystery"
]);

export const popArrayType = PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number));

export const sampleMeansType = PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number));

export const dotPlotSeriesType = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    data: popArrayType.isRequired,
    type: PropTypes.string,
    color: PropTypes.string,
    enableMouseTracking: PropTypes.bool,
    showInLegend: PropTypes.bool,
    visible: PropTypes.bool,
    label: PropTypes.object
  })
);

export const xyPointsType = PropTypes.arrayOf(
  PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  })
);

export const confidenceIntervalsSampleType = PropTypes.shape({
  data: popArrayType.isRequired,
  size: PropTypes.number.isRequired,
  mean: PropTypes.number.isRequired,
  lowerConf: PropTypes.number.isRequired,
  upperConf: PropTypes.number.isRequired,
  confidenceLevel: PropTypes.number.isRequired,
  distribution: PropTypes.oneOf(["Z","T"]).isRequired,
  label: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired
});
