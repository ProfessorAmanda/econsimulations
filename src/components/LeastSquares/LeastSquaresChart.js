import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import { abs } from 'mathjs';
import PropTypes from 'prop-types';
import { dataObjectArrayType } from '../../lib/types.js'
import { Form } from 'react-bootstrap';
import { HighchartsProvider, HighchartsChart, Chart, XAxis, YAxis, ScatterSeries, Tooltip, Caption, Annotation, LineSeries } from 'react-jsx-highcharts';

export default function LeastSquaresChart({ points, addPoint, linePoints, setSquareAreas }) {
  const [enableClick, setEnableClick] = useState(false);
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    // generate pairs for the corresponding points to create squares
    const pairs = [];
    linePoints.forEach((p1) => {
      points.forEach((p2) => {
        if (p1.x === p2.x) {
          pairs.push({ p1, p2 })
        }
      });
    });

    const areas = pairs.map(({ p1, p2 }) => abs(p1.y - p2.y) ** 2);
    setSquareAreas(areas);

    // returns an array of points to create a square shape in highcharts
    const buildSquare = (p1, p2) => {
      const dist = abs(p1.y - p2.y);
      const lowestPt = p1.y < p2.y ? p1 : p2;
      return [{
        x: lowestPt.x,
        y: lowestPt.y,
        xAxis: 0,
        yAxis: 0
      }, {
        x: lowestPt.x + dist,
        y: lowestPt.y,
        xAxis: 0,
        yAxis: 0
      }, {
        x: lowestPt.x + dist,
        y: lowestPt.y + dist,
        xAxis: 0,
        yAxis: 0
      }, {
        x: lowestPt.x,
        y: lowestPt.y + dist,
        xAxis: 0,
        yAxis: 0
      }, {
        x: lowestPt.x,
        y: lowestPt.y,
        xAxis: 0,
        yAxis: 0
      }];
    }

    // create the actual square objects for highcharts
    const newSquares = pairs.map(({ p1, p2 }) => (
      {
        dashStyle: 'solid',
        fill: 'rgba(255, 255, 255, 0)',
        points: buildSquare(p1, p2),
        type: 'path'
      })
    );

    setSquares(newSquares);
  }, [linePoints, points, setSquareAreas]);

  const click = (e) => {  // click to add a point on the plot!
    if (enableClick) {
      const x = e.xAxis[0].value;
      const y = e.yAxis[0].value;
      addPoint({x, y});
    }
  }

  return (
    <>
      <HighchartsProvider Highcharts={Highcharts}>
        <HighchartsChart>
          <Chart
            width={600}
            height={600}
            margin={[100, 100, 100, 100]}
            plotBorderColor="#000000"
            plotBorderWidth={1}
            animation={false}
            onClick={click}
          />
          <Caption
            align="center"
            y={0}
            style={{fontSize: 15}}
            text={enableClick ? 'Click on the chart to add a data point. <br/> Notice how it affects the slope and intercept of the estimated line.' : ''}
            verticalAlign="bottom"
          />
          <Tooltip headerFormat="" pointFormat="x: {point.x:.2f}<br/>y: {point.y:.2f}"/>
          <XAxis max={20} min={0} tickInterval={2}/>
          <YAxis max={20} min={0} tickInterval={2}>
            <ScatterSeries data={points} marker={{radius: 5}}/>
            <LineSeries data={linePoints} marker={{color: 'orange', enabled: true}}/>
          </YAxis>
          <Annotation draggable="" shapes={squares}/>
        </HighchartsChart>
      </HighchartsProvider>
      <Form.Check
        checked={enableClick}
        inline
        className="form-switch"
        label="Enable Click for New Points"
        onChange={() => setEnableClick(!enableClick)}
      />
    </>
  );
}

LeastSquaresChart.propTypes = {
  points: dataObjectArrayType.isRequired,
  addPoint: PropTypes.func.isRequired,
  linePoints: dataObjectArrayType.isRequired,
  setSquareAreas: PropTypes.func.isRequired
}
