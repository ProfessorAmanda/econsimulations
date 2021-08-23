import _ from 'lodash';
import { mean } from 'mathjs';
import { useState } from 'react';
import { Alert, Col, Form, Row } from 'react-bootstrap';
import Plot from 'react-plotly.js';

export default function FixedEffects() {
  const [effects, setEffects] = useState([]);

  const toggleEffect = (effect) => {
    if (effects.includes(effect)) {
      setEffects(effects.filter((e) => e !== effect))
    } else {
      setEffects([...effects, effect])
    }
  }

  const data = {
    1: {
      x: [-6, 1, 8],
      y: [-5, -4, 7]
    },
    2: {
      x: [-2, 2, 5],
      y: [1, 3, 4]
    }
  }

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

  return (
    <Row>
      <Col>
        <Plot
          data={[
            {
              x: data[1].x.map((xi, i) => demean(xi, 1, 'x', i)),
              y: data[1].y.map((yi, i) => demean(yi, 1, 'y', i)),
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
              x: data[2].x.map((xi, i) => demean(xi, 2, 'x', i)),
              y: data[2].y.map((yi, i) => demean(yi, 2, 'y', i)),
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
      </Col>
      <Col style={{margin: 'auto'}}>
        <Alert variant="success" style={{width: 'fit-content'}}>
          <Form.Label>Fix By:</Form.Label>
          <Form.Check
            checked={effects.includes('unit')}
            type="checkbox"
            label="unit"
            onChange={() => toggleEffect('unit')}
          />
          <Form.Check
            checked={effects.includes('time')}
            type="checkbox"
            label="time"
            onChange={() => toggleEffect('time')}
          />
        </Alert>
      </Col>
    </Row>
  )
}
