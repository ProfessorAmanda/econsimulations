import Plot from 'react-plotly.js';
import _ from 'lodash';
import { mean } from 'mathjs';
import { linearRegression } from '../../lib/stats-utils';
import { fixedEffectsDataType, fixedEffectsToggleType } from '../../lib/types';
import PropTypes from 'prop-types';

const PLOT_MAX = 12;
const PLOT_MIN = -12;

export default function FixedEffectsPlot({ data, effects, means, olsLines }) {

  // returns a de-meaned value based on settings that the user selects
  const demean = (val, id, dim, index) => {
    let newVal = val;
    if (effects.entities.includes(id)) {
      newVal -= mean(data[id][dim]);
    }
    if (effects.periods.includes(index)) {
      newVal -= mean(data[1][dim][index], data[2][dim][index])
    }
    return newVal;
  }

  // construct a new data set with the de-meaned points
  const newData = {
    1: {
      x: data[1].x.map((xi, i) => demean(xi, 1, 'x', i)),
      y: data[1].y.map((yi, i) => demean(yi, 1, 'y', i))
    },
    2: {
      x: data[2].x.map((xi, i) => demean(xi, 2, 'x', i)),
      y: data[2].y.map((yi, i) => demean(yi, 2, 'y', i))
    }
  }

  const periodColorMap = {
    0: 'green',
    1: 'purple',
    2: 'orange'
  }

  const xMeans = [];
  const yMeans = [];
  means.periods.forEach((p) => {
    xMeans.push({
      label: `X̄<sub>i${p+1}</sub>`,
      value: mean(data[1].x[p], data[2].x[p]),
      color: periodColorMap[p]
    });
    yMeans.push({
      label: `Ȳ<sub>i${p+1}</sub>`,
      value: mean(data[1].y[p], data[2].y[p]),
      color: periodColorMap[p]
    });
  });
  means.entities.forEach((e) => {
    xMeans.push({
      label: `X̄<sub>${e}t</sub>`,
      value: mean(data[e].x),
      color: 'red'
    });
    yMeans.push({
      label: `Ȳ<sub>${e}t</sub>`,
      value: mean(data[e].y),
      color: 'blue'
    });
  });

  // separate de-meaning function for the ols lines
  const demeanForOLS = (val, id, dim, index, type) => {
    let newVal = val;
    if ((type === 'With Entity Fixed Effect') || (type === 'With Both Fixed Effects')) {
      newVal -= mean(data[id][dim]);
    }
    if ((type === 'With Period Fixed Effect') || (type === 'With Both Fixed Effects')) {
      newVal -= mean(data[1][dim][index], data[2][dim][index])
    }
    return newVal;
  }

  const bestFitLines = [];
  olsLines.forEach((type) => {
    const zippedPoints = _.zip(
      [
        ...data[1].x.map((xi, i) => demeanForOLS(xi, 1, 'x', i, type)),
        ...data[2].x.map((xi, i) => demeanForOLS(xi, 2, 'x', i, type))
      ],
      [
        ...data[1].y.map((yi, i) => demeanForOLS(yi, 1, 'y', i, type)),
        ...data[2].y.map((yi, i) => demeanForOLS(yi, 2, 'y', i, type))
      ]
    );
    const { slope, intercept } = linearRegression(zippedPoints);

    // plotly annotations can go outside the plot
    // so this finds the closest point where both ends of the line will be within the plot
    let lineMin = PLOT_MIN;
    while (lineMin * slope + intercept < PLOT_MIN) {
      lineMin += 0.1
    }
    let lineMax = PLOT_MAX;
    while (lineMax * slope + intercept > PLOT_MAX) {
      lineMax -= 0.1
    }

    bestFitLines.push({ slope, intercept, label: type, lineMin, lineMax })
  });

  return (
    <Plot
      data={[
        {
          x: newData[1].x,
          y: newData[1].y,
          name: 'Entity 1',
          type: 'scatter',
          text: _.range(1, 4).map((i) => `(X<sub>1${i}</sub>, Y<sub>1${i}</sub>)`),
          textposition: 'bottom right',
          mode: 'markers+text',
          marker: {
            color: 'red',
            size: 10
          },
          hoverinfo: 'x+y'
        },
        {
          x: data[1].x,
          y: data[1].y,
          name: 'Entity 1',
          type: 'scatter',
          text: _.range(1, 4).map((i) => `(X<sub>1${i}</sub>, Y<sub>1${i}</sub>)`),
          textposition: 'bottom right',
          mode: 'markers+text',
          marker: {
            color: 'red',
            size: 10,
            opacity: 0.25
          },
          hoverinfo: 'x+y',
          showlegend: false
        },
        {
          x: newData[2].x,
          y: newData[2].y,
          name: 'Entity 2',
          type: 'scatter',
          text: _.range(1, 4).map((i) => `(X<sub>2${i}</sub>, Y<sub>2${i}</sub>)`),
          textposition: 'bottom right',
          mode: 'markers+text',
          marker: {
            color: 'blue',
            size: 10
          },
          hoverinfo: 'x+y'
        },
        {
          x: data[2].x,
          y: data[2].y,
          name: 'Entity 2',
          type: 'scatter',
          text: _.range(1, 4).map((i) => `(X<sub>2${i}</sub>, Y<sub>2${i}</sub>)`),
          textposition: 'bottom right',
          mode: 'markers+text',
          marker: {
            color: 'blue',
            size: 10,
            opacity: 0.25
          },
          hoverinfo: 'x+y',
          showlegend: false
        }
      ]}
      layout={{
        width: 780,
        height: 780,
        xaxis: {
          range: [PLOT_MIN, PLOT_MAX]
        },
        yaxis: {
          range: [PLOT_MIN, PLOT_MAX]
        },
        legend: {
          itemclick: false,
          itemdoubleclick: false
        },
        transition: {
          duration: 500,
          easing: 'sin'
        },
        annotations: [
          ...xMeans.map(({ label, value, color }) => ({
            x: value,
            y: PLOT_MIN,
            xref: 'x',
            yref: 'y',
            text: label,
            showarrow: true,
            arrowside: 'none',
            arrowcolor: color,
            arrowwidth: 1,
            ax: value,
            ay: PLOT_MAX,
            axref: 'x',
            ayref: 'y'
          })),
          ...yMeans.map(({ label, value, color }) => ({
            y: value,
            x: PLOT_MAX,
            xref: 'x',
            yref: 'y',
            text: label,
            showarrow: true,
            arrowside: 'none',
            arrowcolor: color,
            arrowwidth: 1,
            ay: value,
            ax: PLOT_MIN,
            axref: 'x',
            ayref: 'y'
          })),
          ...bestFitLines.map(({ label, slope, intercept, lineMin, lineMax }) => ({
            y: lineMax * slope + intercept,
            x: lineMax,
            xref: 'x',
            yref: 'y',
            text: label,
            showarrow: true,
            arrowside: 'none',
            arrowwidth: 1,
            ay: lineMin * slope + intercept,
            ax: lineMin,
            axref: 'x',
            ayref: 'y'
          }))
        ]
      }}
      config={{ displayModeBar: false }}
    />
  )
}

FixedEffectsPlot.propTypes = {
  data: fixedEffectsDataType.isRequired,
  effects: fixedEffectsToggleType.isRequired,
  means: fixedEffectsToggleType.isRequired,
  olsLines: PropTypes.arrayOf(PropTypes.string).isRequired
}
