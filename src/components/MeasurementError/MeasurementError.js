import { useEffect, useState } from 'react';
import MeasurementErrorInput from './MeasurementErrorInput';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { linearRegression } from '../../lib/stats-utils';
import _ from 'lodash';



export default function MeasurementError() {
  const [sampleSize, setSampleSize] = useState(5);
  const [shouldShowOrigRegression, setShouldShowOrigRegression] = useState(false);
  const [shouldShowErrorRegression, setShouldShowErrorRegression] = useState(false);
  const [shouldShowErrorInput, setShouldShowErrorInput] = useState(false);

  const [errorDirection, setErrorDirection] = useState('');
  const [errorAmplitude, setErrorAmplitude] = useState('');

  const [origDataPoints, setOrigDataPoints] = useState([]);
  const [errorDataPoints, setErrorDataPoints] = useState([]);
  const [origRegression, setOrigRegression] = useState({});
  const [errorRegression, setErrorRegression] = useState({});

  const [shouldShowError, setShouldShowError] = useState(false);

  const regressionToPoints = ({ slope, intercept }) => _.range(0, 51, 50).map((i) => [i, _.round(intercept + i * slope, 2)]);
  const amplitudeToErrorRange = (amplitude) => {
    let [min, max] = [0, 0];
    switch (amplitude) {
      case 'Low': [min, max] = [0, 2]; break;
      case 'Medium': [min, max] = [2, 6]; break;
      case 'High': [min, max] = [6, 10]; break;
      default: [min, max] = [0, 0];
    }
    return [min, max];
  }

  const generatePointsWithError = (origPoints) => {
    const [xMin, xMax] = errorDirection === 'X' ? amplitudeToErrorRange(errorAmplitude) : [0, 0];
    const [yMin, yMax] = errorDirection === 'Y' ? amplitudeToErrorRange(errorAmplitude) : [0, 0];
    const newDataPoints = origPoints.map((point) => {
      const x = point.x + (Math.random() * (xMax - xMin) + xMin) * (Math.random() > 0.5 ? 1 : -1);
      const y = point.y + (Math.random() * (yMax - yMin) + yMin) * (Math.random() > 0.5 ? 1 : -1);
      return { x, y, id: point.id };
    });
    return newDataPoints;
  }

  useEffect(() => {
    if (errorAmplitude !== '' && errorDirection !== '') {
      const newDataPoints = generatePointsWithError(origDataPoints);
      setErrorDataPoints(newDataPoints);
      setErrorRegression(regressionToPoints(linearRegression(newDataPoints)));
    }
    setOrigRegression(regressionToPoints(linearRegression(origDataPoints)));
    setShouldShowError(false);
    setShouldShowErrorRegression(false);
  }, [origDataPoints]); // eslint-disable-line

  useEffect(() => {
    if (errorAmplitude !== '') {
      const newDataPoints = generatePointsWithError(origDataPoints);
      setShouldShowError(true);
      setErrorDataPoints(newDataPoints);
      setErrorRegression(regressionToPoints(linearRegression(newDataPoints)));
    }
  }, [errorDirection, errorAmplitude]); // eslint-disable-line

  const generatePoints = () => {
    const newDataPoints = [];
    for (let i = 0; i < sampleSize; i++) {
      const x = 10 + Math.random() * 30; // range: 10 to 40
      const y = 10 + Math.random() * 30; // range: 10 to 40
      newDataPoints.push({ x, y, id: i + 1 });
    }
    setOrigDataPoints(newDataPoints);
    setErrorDataPoints(newDataPoints);
    setShouldShowErrorInput(true);
  }

  const onErrorAmplitudeClick = (amplitude) => {
    if (amplitude === errorAmplitude && errorAmplitude !== '') {
      const newDataPoints = generatePointsWithError(origDataPoints);
      setShouldShowError(true);
      setErrorDataPoints(newDataPoints);
      setErrorRegression(regressionToPoints(linearRegression(newDataPoints)));
    } else {
      setErrorAmplitude(amplitude);
    }
  }

  const myChart = {
    chart: {
      type: 'scatter',
      zoomtype: 'xy',
      width: 500,
      height: 500,
    },
    title: { text: 'Measurement Error' },
    xAxis: { min: 0, max: 50, title: { text: 'X-axis' } },
    yAxis: { min: 0, max: 50, title: { text: 'Y-axis' } },
    series: [
      {
        type: 'scatter',
        data: origDataPoints,
        name: 'original data',
        color: '#33A5FF'
      },
      {
        type: 'scatter',
        data: setShouldShowError ? errorDataPoints : [],
        name: 'data with error',
        color: '#880000',
        visible: shouldShowError
      },
      {
        type: 'line',
        data: shouldShowOrigRegression ? origRegression : [],
        name: 'original regression',
        color: '#2AC208',
        label: {
          enabled: false
        },
      },
      {
        type: 'line',
        data: shouldShowErrorRegression ? errorRegression : [],
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
          generatePoints={generatePoints}
          shouldShowOrigRegression={shouldShowOrigRegression}
          setShouldShowOrigRegression={setShouldShowOrigRegression}
          errorDirection={errorDirection}
          setErrorDirection={setErrorDirection}
          errorAmplitude={errorAmplitude}
          setErrorAmplitude={onErrorAmplitudeClick}
          shouldShowErrorRegression={shouldShowErrorRegression}
          setShouldShowErrorRegression={setShouldShowErrorRegression}
          shouldShowErrorInput={shouldShowErrorInput}
          shouldShowErrorPoints={shouldShowError}
          setShouldShowErrorPoints={setShouldShowError}
        />
      </div>
    </div>
  );
}
