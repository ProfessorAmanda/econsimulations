import { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { dataObjectArrayType, optionalLaTeXType } from '../lib/types.js';
import { Chart, HighchartsChart, HighchartsProvider, Legend, LineSeries, Title, XAxis, YAxis } from 'react-jsx-highcharts';

export default function SimulateSamples({ title, mathTitle, popArray, sampleSeriesName, popValSeriesName, yLabel, sampleFn, yFn }) {
  const [sampled, setSampled] = useState([]);
  const [meanLine, setMeanLine] = useState([]);
  const [start, setStart] = useState(false);

  const timer = useRef();

  useEffect(() => {
    setSampled([]);
    setMeanLine([]);
    setStart(false);
    clearInterval(timer.current);
  }, [mathTitle]);

  useEffect(() => {
    return () => clearInterval(timer.current);
  }, []);

  const startSim = () => {
    setSampled([]);
    setMeanLine([]);
    const simSpeeds = (iteration) => {
      if (iteration < 200) {
        return 1
      } else if (iteration < 500) {
        return 2
      } else if (iteration < 1000) {
        return 4
      } else {
        return 8
      }
    }
    let n = 0;
    timer.current = setInterval(() => {
      const newSamples = [];
      for (let i = 0; i < simSpeeds(n); i++) {
        n += 1;
        if (n >= 2000) {
          clearInterval(timer.current);
          setStart(false);
          break;
        }
        const sample = sampleFn(popArray, n);
        newSamples.push({ x: n, y: yFn(sample) });
      }
      setSampled((currSampled) => [...currSampled, ...newSamples]);
      setMeanLine((currMeanLine) => [...currMeanLine, { x: n, y: yFn(popArray) }]);
    }, n);
  }

  const toggleSim = () => {
    if (!start) {
      startSim()
    } else {
      clearInterval(timer.current)
    }
    setStart(!start)
  }

  return (
    <Card body>
      {mathTitle && mathTitle}
      <HighchartsProvider Highcharts={Highcharts}>
        <HighchartsChart>
          <Chart animation={false}/>
          <Title>{title || ''}</Title>
          <XAxis min={0}>
            <XAxis.Title>Sample Size</XAxis.Title>
          </XAxis>
          <YAxis>
            <YAxis.Title>{yLabel}</YAxis.Title>
            <LineSeries
              name={popValSeriesName}
              data={meanLine}
              label={false}
              color="red"
              marker={false}
              states={{hover: false}}
            />
            <LineSeries
              name={sampleSeriesName}
              data={sampled}
              label={false}
              marker={false}
              color="black"
              states={{hover: false}}
            />
          </YAxis>
          <Legend/>
        </HighchartsChart>
      </HighchartsProvider>
      <Button
        variant={`outline-${start ? 'danger' : 'success'}`}
        onClick={() => toggleSim()}
      >
        {start ? 'Stop' : 'Start'} Simulation
      </Button>
    </Card>
  );
}

SimulateSamples.propTypes = {
  title: PropTypes.string,
  mathTitle: optionalLaTeXType,
  popArray: dataObjectArrayType.isRequired,
  sampleSeriesName: PropTypes.string.isRequired,
  popValSeriesName: PropTypes.string.isRequired,
  yLabel: PropTypes.string.isRequired,
  sampleFn: PropTypes.func.isRequired,
  yFn: PropTypes.func.isRequired
}
