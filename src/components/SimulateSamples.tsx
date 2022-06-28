import { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { dataObjectArrayType, optionalLaTeXType } from 'src/lib/types';
import { dataObject } from 'src/lib/ts-types';

interface SimulateSamplesProps {
  title?: string,
  mathTitle?: string,
  popArray: dataObject[];
  sampleSeriesName: string;
  popValSeriesName: string;
  yLabel: string;
  sampleFn: Function;
  yFn: Function;
}

export default function SimulateSamples({ title, mathTitle, popArray, sampleSeriesName, popValSeriesName, yLabel, sampleFn, yFn } : SimulateSamplesProps) {
  const [sampled, setSampled] = useState([]);
  const [meanLine, setMeanLine] = useState([]);
  const [start, setStart] = useState(false);
  const [chart, setChart] = useState({
    chart: {
      type: 'line',
      animation: false
    },
    plotOptions: {
      series: {
        states: {
          hover: {
            enabled: false
          }
        }
      }
    },
    title: {
      text: title || ''
    },
    xAxis: {
      title: {
        text: 'Sample Size'
      },
      min: 0
    },
    yAxis: {
      title: {
        text: yLabel
      }
    },
    tooltip: {
      enabled: false
    }
  });

  const timer = useRef();

  useEffect(() => {
    setSampled([]);
    setMeanLine([]);
    setStart(false);
    clearInterval(timer.current);
  }, [mathTitle]);

  useEffect(() => {
    const newChart = {
      series: [
        {
          name: popValSeriesName,
          data: meanLine,
          label: {
            enabled: false
          },
          marker: {
            enabled: false
          },
          color: 'red'
        },
        {
          name: sampleSeriesName,
          data: sampled,
          label: {
            enabled: false
          },
          marker: {
            enabled: false
          },
          color: 'black'
        }
      ]
    }
    // @ts-ignore
    setChart(newChart);
  }, [sampled, meanLine, popValSeriesName, sampleSeriesName]);

  useEffect(() => {
    return () => clearInterval(timer.current);
  }, []);

  const startSim = () => {
    setSampled([]);
    setMeanLine([]);
    const simSpeeds = (iteration : number) => {
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
    // @ts-ignore
    timer.current = setInterval(() => {
      const newSamples: { x: number; y: number; }[] = [];
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
      // @ts-ignore
      setSampled((currSampled) => [...currSampled, ...newSamples]);
      // @ts-ignore
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
      <HighchartsReact highcharts={Highcharts} options={chart}/>
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
