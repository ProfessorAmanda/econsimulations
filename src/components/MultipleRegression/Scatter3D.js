import { useState } from 'react';
import Plot from 'react-plotly.js';
import _ from 'lodash';
import { column, inv, matrix, max, min, multiply, transpose } from 'mathjs';
import regression from 'regression';
import PropTypes from 'prop-types';
import { MULTIPLE_REGRESSION_VALUES } from '../../lib/constants';
import { Col, Form, Row } from 'react-bootstrap';

export default function Scatter3D({ x, y, z }) {
  const [display, setDisplay] = useState('3D');
  const [showBestFit, setShowBestFit] = useState(false);

  // x = str, y = pct_el, z = test_score

  const plotData = [
    {
      x: (display === 'YZ') ? y : x,
      y: ((display === 'XY') || (display === '3D')) ? y : z,
      z,
      type: (display === '3D') ? 'scatter3d' : 'scatter',
      mode: 'markers',
      marker: {
        size: (display === '3D') ? 8 : 12,
        color: 'red',
        line: {
          color: 'black',
          width: (display === '3D') ? 1 : 0.5
        }
      },
      hovertemplate: `${MULTIPLE_REGRESSION_VALUES[display].xAbbr}: %{x}<br>${MULTIPLE_REGRESSION_VALUES[display].yAbbr}: %{y}<br>${(display === '3D') ? 'Score: %{z}' : ''}<extra></extra>`
    }
  ];

  if (display === '3D' && showBestFit) {
    const A = matrix(_.zip(_.range(0, x.length).map(() => 1), x, y));

    const theta = multiply(inv(multiply(transpose(A), A)), multiply(transpose(A), matrix(z)));

    const equation = (x, y) => {
      return column([theta], 0) + column([theta], 1) * x + column([theta], 2) * y
    }

    /*
      surface plot must be of the form:
      [
        [z, z, z, z, z, ...],  <-- x
        [z, z, z, z, z, ...],
        ...
      ]
          ^y
    */

    const bestFitPlane = [];

    for (let yi = _.round(min(y)); yi <= _.round(max(y) + 1); yi++) {
      // fill from 0 to min(x) with undefined so the surface isn't displayed in this space
      const temp = _.range(0, _.round(min(x)) - 1).map(() => undefined)
      for (let xi = _.round(min(x)); xi <= _.round(max(x) + 1); xi++) {
        temp.push(equation(xi, yi));
      }
      bestFitPlane.push(temp)
    }

    plotData.push({
      z: bestFitPlane,
      type: 'surface',
      showscale: false,
      opacity: 0.5,
      hoverinfo: 'x+y+z',
      colorscale: [[0, 'rgb(0,0,0)'], [1, 'rgb(0,0,0)']],
      visible: (display === '3D')
    });

  } else if (showBestFit) {
    const displayPointsMap = {
      'XY': _.zip(x, y),
      'YZ': _.zip(y, z),
      'XZ': _.zip(x, z)
    }

    const { equation: [slope, intercept] } = regression.linear(displayPointsMap[display]);
    const [lineX, lineY] = _.unzip(displayPointsMap[display].map((point) => ([point[0], (point[0] * slope) + intercept ])));

    plotData.push({
      x: lineX,
      y: lineY,
      mode: 'lines',
      marker: {color: 'black'},
    });
  }

  return (
    <Row>
      <Col style={{border: '1px solid black', height: 702, width: 802, padding: 0}}>
        <Plot
          data={plotData}
          layout={{
            width: 800,
            height: 700,
            margin: {
              l: MULTIPLE_REGRESSION_VALUES[display].margin,
              r: MULTIPLE_REGRESSION_VALUES[display].margin,
              t: MULTIPLE_REGRESSION_VALUES[display].margin,
              b: MULTIPLE_REGRESSION_VALUES[display].margin
            },
            showlegend: false,
            xaxis: {
              title: MULTIPLE_REGRESSION_VALUES[display].xLabel,
              range: MULTIPLE_REGRESSION_VALUES[display].xRange
            },
            yaxis: {
              title: MULTIPLE_REGRESSION_VALUES[display].yLabel,
              range: MULTIPLE_REGRESSION_VALUES[display].yRange
            },
            scene: {
              xaxis: {
                title: {
                  text: MULTIPLE_REGRESSION_VALUES['3D'].xLabel
                },
                range: MULTIPLE_REGRESSION_VALUES['3D'].xRange
              },
              yaxis: {
                title: {
                  text: MULTIPLE_REGRESSION_VALUES['3D'].yLabel
                },
                range: MULTIPLE_REGRESSION_VALUES['3D'].yRange
              },
              zaxis: {
                title: {
                  text: MULTIPLE_REGRESSION_VALUES['3D'].zLabel
                },
                range: MULTIPLE_REGRESSION_VALUES['3D'].zRange
              },
              camera: {
                eye: {
                  x: 1.6,
                  y: 1.6,
                  z: 1.6
                }
              }
            }
          }}
          config={{
            scrollZoom: true,
            displayModeBar: true,
            modeBarButtonsToRemove: ['toImage', 'resetCameraLastSave3d', 'select2d', 'lasso2d', 'autoScale2d'],
          }}
        />
      </Col>
      <Col style={{margin: 'auto', paddingLeft: 50}}>
        <Form>
          {['3D', 'XY', 'YZ', 'XZ'].map((axes) => (
            <>
              <Form.Check
                checked={display === axes}
                type="radio"
                key={axes}
                label={MULTIPLE_REGRESSION_VALUES[axes].buttonLabel}
                onClick={() => setDisplay(axes)}
              />
              <hr/>
            </>
          ))}
          <Form.Check
            checked={showBestFit}
            type="checkbox"
            label={`Toggle Best Fit ${(display === '3D') ? 'Plane' : 'Line'}`}
            onClick={() => setShowBestFit(!showBestFit)}
          />
        </Form>
      </Col>
    </Row>
  )
}

Scatter3D.propTypes = {
  x: PropTypes.arrayOf(PropTypes.number).isRequired,
  y: PropTypes.arrayOf(PropTypes.number).isRequired,
  z: PropTypes.arrayOf(PropTypes.number).isRequired
}
