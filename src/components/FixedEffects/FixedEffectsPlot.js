import Plot from 'react-plotly.js';
import _ from 'lodash';
import { mean } from 'mathjs';
import { linearRegression } from '../../lib/stats-utils';
import { fixedEffectsDataType, fixedEffectsToggleType } from '../../lib/types';

const PLOT_MAX = 12;
const PLOT_MIN = -12;

export default function FixedEffectsPlot({ data, effects, means }) {

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

  const zippedPoints = _.zip([...newData[1].x, ...newData[2].x], [...newData[1].y, ...newData[2].y]);
  const { slope, intercept } = linearRegression(zippedPoints);
  const [lineX, lineY] = _.unzip([[PLOT_MIN], [PLOT_MAX], ...zippedPoints].map((point) => ([point[0], (point[0] * slope) + intercept ])));

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
        },
        {
          x: lineX,
          y: lineY,
          name: 'Best Fit Line',
          mode: 'lines',
          marker: { color: 'black' },
          hovertemplate: '(%{x}, %{y})<extra></extra>',
          visible: false,
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
  means: fixedEffectsToggleType.isRequired
}
