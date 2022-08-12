import { useEffect, useState } from 'react';
import MeasurementErrorInput from './MeasurementErrorInput';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { linearRegression } from 'src/lib/stats-utils';
import _ from 'lodash';
import TeX from '@matejmazur/react-katex';
import { dataObject } from 'src/lib/ts-types';



export default function MeasurementError() {
  const [sampleSize, setSampleSize] = useState(5);
  const [shouldShowOrigRegression, setShouldShowOrigRegression] = useState(false);
  const [shouldShowErrorRegression, setShouldShowErrorRegression] = useState(false);
  const [shouldShowErrorInput, setShouldShowErrorInput] = useState(false);

  const [errorDirection, setErrorDirection] = useState('');
  const [errorAmplitude, setErrorAmplitude] = useState('');

  const [origDataPoints, setOrigDataPoints] = useState<dataObject[]>([]);
  const [errorDataPoints, setErrorDataPoints] = useState<dataObject[]>([]);
  const [origRegressionPoints, setOrigRegressionPoints] = useState<dataObject[]>([]);
  const [errorRegressionPoints, setErrorRegressionPoints] = useState<dataObject[]>([]);
  const [origRegression, setOrigRegression] = useState<{ slope: number, intercept: number }>({ slope: 0, intercept: 0 });
  const [errorRegression, setErrorRegression] = useState<{ slope: number, intercept: number }>({ slope: 0, intercept: 0 });

  const [shouldShowError, setShouldShowError] = useState(false);

  const regressionToPoints = ({ slope, intercept }: { slope: number, intercept: number }) => {
    return _.range(0, 51, 50).map((i) => {
      return { x: i, y: _.round(intercept + i * slope, 2), id: i }
    });
  };
  const amplitudeToErrorRange = (amplitude: string) => {
    let [min, max] = [0, 0];
    switch (amplitude) {
      case 'Low': [min, max] = [0, 2]; break;
      case 'Medium': [min, max] = [2, 6]; break;
      case 'High': [min, max] = [6, 10]; break;
      default: [min, max] = [0, 0];
    }
    return [min, max];
  }

  const generatePointsWithError = (origPoints: dataObject[]) => {
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
      const newRegression = linearRegression(newDataPoints);
      setErrorRegression(newRegression);
      setErrorRegressionPoints(regressionToPoints(newRegression));
    }
    const newRegression = linearRegression(origDataPoints);
    setOrigRegression(newRegression);
    setOrigRegressionPoints(regressionToPoints(newRegression));
    setShouldShowError(false);
    setShouldShowErrorRegression(false);
  }, [origDataPoints]); // eslint-disable-line

  useEffect(() => {
    if (errorAmplitude !== '') {
      const newDataPoints = generatePointsWithError(origDataPoints);
      setShouldShowError(true);
      setErrorDataPoints(newDataPoints);
      const newRegression = linearRegression(newDataPoints);
      setErrorRegression(newRegression);
      setErrorRegressionPoints(regressionToPoints(newRegression));
    }
  }, [errorDirection, errorAmplitude]); // eslint-disable-line

  const generatePoints = () => {
    // Generate error points with some randomness:
    // First plot points along f(x)=x or f(x)=-x+50
    // Then add randomeness to both x and y directions
    // Generate error points with some randomness:
    // First plot points along f(x)=x or f(x)=-x+50
    // Then add randomeness to both x and y directions
    const newDataPoints: dataObject[] = [];
    const origSlope = Math.random() > 0.5 ? 1 : -1;
    _.range(0, sampleSize).forEach((i) => {
      const x = 15 + (i / sampleSize) * 20 + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 5; // range: 10 to 40
      const y = origSlope * (15 + (i / sampleSize) * 20) + (origSlope === 1 ? 0 : 50) + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 5; // range: 10 to 40
      newDataPoints.push({ x, y, id: i + 1 });
    });

    setOrigDataPoints(newDataPoints);
    setErrorDataPoints(newDataPoints);
    setShouldShowErrorInput(true);
  }

  const onErrorAmplitudeClick = (amplitude : string) => {
    if (amplitude === errorAmplitude && errorAmplitude !== '') {
      const newDataPoints = generatePointsWithError(origDataPoints);
      setShouldShowError(true);
      setErrorDataPoints(newDataPoints);
      const newRegression = linearRegression(newDataPoints);
      setErrorRegression(newRegression);
      setErrorRegressionPoints(regressionToPoints(newRegression));
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
        data: errorDataPoints,
        name: 'data with error',
        color: '#880000',
        visible: shouldShowError
      },
      {
        type: 'line',
        data: shouldShowOrigRegression ? origRegressionPoints : [],
        name: 'original regression',
        color: '#2AC208',
        enableMouseTracking: false,
        marker: false,
        label: false
      },
      {
        type: 'line',
        data: shouldShowErrorRegression ? errorRegressionPoints : [],
        name: 'regression with error',
        color: '#880000',
        enableMouseTracking: false,
        marker: false,
        label: false,
        visible: shouldShowError
      }
    ]
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
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
      <div style={{
        marginTop: 30,
        marginBottom: 30,
      }}>
        <TeX>
          {shouldShowOrigRegression && origDataPoints.length !== 0 ? `\\text{Original Regression: }f(x) = ${origRegression.slope} * x + ${origRegression.intercept}` : ''}
        </TeX>
        <br />
        <TeX>
          {shouldShowErrorRegression && errorRegressionPoints.length !== 0 ? `\\text{Regression with error: }f(x) = ${errorRegression.slope} * x + ${errorRegression.intercept}` : ''}
        </TeX>
      </div>
    </div>
  );
}
