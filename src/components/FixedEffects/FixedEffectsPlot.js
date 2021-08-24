import Plot from 'react-plotly.js';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { mean } from 'mathjs';
import { linearRegression } from '../../lib/stats-utils';

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
  const [lineX, lineY] = _.unzip([[-10], [10], ...zippedPoints].map((point) => ([point[0], (point[0] * slope) + intercept ])));

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
          x: lineX,
          y: lineY,
          name: 'Best Fit Line',
          mode: 'lines',
          marker: {color: 'black'},
          hovertemplate: '(%{x}, %{y})<extra></extra>',
          visible: showBestFit
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
        }
      }}
      config={{
        displayModeBar: false
      }}
    />
  )
}

FixedEffectsPlot.propTypes = {
  data: PropTypes.shape({
    1: PropTypes.shape({
      x: PropTypes.arrayOf(PropTypes.number).isRequired,
      y: PropTypes.arrayOf(PropTypes.number).isRequired
    }).isRequired,
    2: PropTypes.shape({
      x: PropTypes.arrayOf(PropTypes.number).isRequired,
      y: PropTypes.arrayOf(PropTypes.number).isRequired
    }).isRequired
  }).isRequired,
  effects: PropTypes.arrayOf(PropTypes.string).isRequired,
  showBestFit: PropTypes.bool.isRequired
}
