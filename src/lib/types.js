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
