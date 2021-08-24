import Plot from 'react-plotly.js';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { mean } from 'mathjs';
import { linearRegression } from '../../lib/stats-utils';
import { fixedEffectsDataType } from '../../lib/types';

export default function FixedEffectsPlot({ data, effects, showBestFit }) {

  const demean = (val, id, dim, index) => {
    let newVal = val;
    if (effects.includes('unit')) {
      newVal -= mean(data[id][dim]);
    }
    if (effects.includes('time')) {
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

  const zippedPoints = _.zip([...newData[1].x, ...newData[2].x], [...newData[1].y, ...newData[2].y]);
  const { slope, intercept } = linearRegression(zippedPoints);
  const [lineX, lineY] = _.unzip([[-12], [12], ...zippedPoints].map((point) => ([point[0], (point[0] * slope) + intercept ])));

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
          visible: showBestFit,
          showlegend: false
        }
      ]}
      layout={{
        width: 800,
        height: 800,
        xaxis: {
          range: [-12, 12]
        },
        yaxis: {
          range: [-12, 12]
        },
        legend: {
          itemclick: false,
          itemdoubleclick: false
        },
        transition: {
          duration: 500,
          easing: 'sin'
        },
        // annotations: _.flatten([1, 2].map((id) => [0, 1, 2].map((i) => (
        //   {
        //     x: newData[id].x[i],
        //     y: newData[id].y[i],
        //     xref: 'x',
        //     yref: 'y',
        //     text: '',
        //     showarrow: true,
        //     arrowhead: 2,
        //     arrowsize: 1.5,
        //     arrowwidth: 1,
        //     ax: data[id].x[i],
        //     ay: data[id].y[i],
        //     axref: 'x',
        //     ayref: 'y'
        //   }
        // ))))
      }}
      config={{ displayModeBar: false }}
    />
  )
}

FixedEffectsPlot.propTypes = {
  data: fixedEffectsDataType.isRequired,
  effects: PropTypes.arrayOf(PropTypes.string).isRequired,
  showBestFit: PropTypes.bool.isRequired
}
