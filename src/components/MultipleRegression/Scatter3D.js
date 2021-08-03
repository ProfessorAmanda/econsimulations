import { Fragment, useState } from 'react';
import Plot from 'react-plotly.js';
import _ from 'lodash';
import { column, inv, matrix, max, min, multiply, transpose } from 'mathjs';
import regression from 'regression';
import PropTypes from 'prop-types';
import { MULTIPLE_REGRESSION_VALUES } from '../../lib/constants';
import { Col, Form, Row } from 'react-bootstrap';

export default function Scatter3D({ x, y, z, dataSet }) {
  const [display, setDisplay] = useState('3D');
  const [showBestFit, setShowBestFit] = useState(false);

  const values = MULTIPLE_REGRESSION_VALUES[dataSet][display];

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
      hovertemplate: `${values.xAbbr}: %{x}<br>${values.yAbbr}: %{y}<br>${(display === '3D') ? `${values.zAbbr}: %{z}` : ''}<extra></extra>`
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

    // fill from 0 to min(y) with lists of undefined so the surface isn't displayed in this space
    const bestFitPlane = _.range(0, _.floor(min(y))).map(() => _.range(0, _.ceil(max(x))).map(() => undefined));

    for (let yi = _.floor(min(y)); yi <= _.ceil(max(y)); yi++) {
      // fill from 0 to min(x) with undefined so the surface isn't displayed in this space
      const temp = _.range(0, _.floor(min(x))).map(() => undefined)
      for (let xi = _.floor(min(x)); xi <= _.ceil(max(x)); xi++) {
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
              l: (display === '3D') ? 0 : 80,
              r: (display === '3D') ? 0 : 80,
              t: (display === '3D') ? 0 : 80,
              b: (display === '3D') ? 0 : 80
            },
            showlegend: false,
            xaxis: {
              title: values.xLabel,
              range: values.xRange,
              tickvals: values.xtickvals,
              ticktext: values.xticktext
            },
            yaxis: {
              title: values.yLabel,
              range: values.yRange,
              tickvals: values.ytickvals,
              ticktext: values.yticktext
            },
            scene: {
              xaxis: {
                title: {
                  text: values.xLabel
                },
                range: values.xRange,
                tickvals: values.xtickvals,
                ticktext: values.xticktext
              },
              yaxis: {
                title: {
                  text: values.yLabel
                },
                range: values.yRange,
                tickvals: values.ytickvals,
                ticktext: values.yticktext
              },
              zaxis: {
                title: {
                  text: values.zLabel
                },
                range: values.zRange
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
            <Fragment key={axes}>
              <Form.Check
                checked={display === axes}
                type="radio"
                label={MULTIPLE_REGRESSION_VALUES[dataSet][axes].buttonLabel}
                onChange={() => setDisplay(axes)}
              />
              <hr/>
            </Fragment>
          ))}
          <Form.Check
            checked={showBestFit}
            type="checkbox"
            label={`Toggle Best Fit ${(display === '3D') ? 'Plane' : 'Line'}`}
            onChange={() => setShowBestFit(!showBestFit)}
          />
        </Form>
      </Col>
    </Row>
  )
}

Scatter3D.propTypes = {
  x: PropTypes.arrayOf(PropTypes.number).isRequired,
  y: PropTypes.arrayOf(PropTypes.number).isRequired,
  z: PropTypes.arrayOf(PropTypes.number).isRequired,
  dataSet: PropTypes.string.isRequired
}
