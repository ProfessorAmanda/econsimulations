import { useEffect, useState } from 'react';
import MeasurementErrorInput from './MeasurementErrorInput';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { linearRegression } from '../../lib/stats-utils';
import _ from 'lodash';

const generatePoints = ({ slope, intercept }) => _.range(0, 11).map((i) => _.round(intercept + i * slope, 2));

export default function MeasurementError() {
  const [origDataPoints, setOrigDataPoints] = useState([]);
  const [errorDataPoints, setErrorDataPoints] = useState([]);
  const [origRegression, setOrigRegression] = useState({});
  const [errorRegression, setErrorRegression] = useState({});

  const [shouldShowErrorInput, setShouldShowErrorInput] = useState(false);
  const [shouldShowError, setShouldShowError] = useState(false);

  const [sampleSize, setSampleSize] = useState(5);
  const [xErrorRange, setXErrorRange] = useState(0);
  const [yErrorRange, setYErrorRange] = useState(0);

  useEffect(() => {
    setOrigRegression(generatePoints(linearRegression(origDataPoints)));
    setErrorRegression(generatePoints(linearRegression(errorDataPoints)));
  }, [origDataPoints, errorDataPoints]);

  const confirmSampleSize = () => {
    const newDataPoints = [];
    for (let i = 0; i < sampleSize; i++) {
      const x = Math.random() * 10;
      const y = Math.random() * 10;
      newDataPoints.push({ x, y, id: i + 1 });
    }
    setShouldShowErrorInput(true);
    setShouldShowError(false);
    setOrigDataPoints(newDataPoints);
    setErrorDataPoints(newDataPoints);
    setErrorRegression([]);
  }

  const confirmErrorRange = () => {
    const newDataPoints = origDataPoints.map((point) => {
      const x = point.x + (Math.random() * xErrorRange) - (xErrorRange / 2);
      const y = point.y + (Math.random() * yErrorRange) - (yErrorRange / 2);
      return { x, y, id: point.id };
    });
    setShouldShowError(true);
    setErrorDataPoints(newDataPoints);
  }

  const myChart = {
    chart: {
      type: 'scatter',
      zoomtype: 'xy',
      width: 500,
      height: 500,
    },
    title: {
      text: 'Measurement Error',
    },
    xAxis: {
      min: 0,
      max: 10,
      title: {
        text: 'X-axis'
      }
    },
    yAxis: {
      min: 0,
      max: 10,
      title: {
        text: 'Y-axis'
      }
    },
    series: [
      {
        type: 'scatter',
        data: origDataPoints,
        name: 'original data',
        color: '#33A5FF'
      },
      {
        type: 'scatter',
        data: errorDataPoints,
        name: 'data with error',
        color: '#880000',
        visible: shouldShowError
      },
      {
        type: 'line',
        data: origRegression,
        name: 'original regression',
        color: '#2AC208',
        label: {
          enabled: false
        },
      },
      {
        type: 'line',
        data: errorRegression,
        name: 'regression with error',
        color: '#880000',
        label: {
          enabled: false
        },
        visible: shouldShowError
      }
    ]
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    }}>
      <HighchartsReact highcharts={Highcharts} options={myChart} />
      <div style={{ marginTop: 100, marginLeft: 100 }}>
        <MeasurementErrorInput
          sampleSize={sampleSize}
          setSampleSize={setSampleSize}
          confirmSampleSize={confirmSampleSize}
          xErrorRange={xErrorRange}
          setXErrorRange={setXErrorRange}
          yErrorRange={yErrorRange}
          setYErrorRange={setYErrorRange}
          confirmErrorRange={confirmErrorRange}
          shouldShowErrorInput={shouldShowErrorInput}
        />
      </div>
    </div>
  );
}
