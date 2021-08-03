import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Button } from 'react-bootstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { dataObjectArrayType } from '../lib/types.js';

export default function SimulateSamples({ title, mathTitle, popArray, sampleSeriesName, popValSeriesName, yLabel, sampleFn }) {
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
        animation: {
          duration: 0
        },
        states: {
          hover: {
            enabled: false
          },
          select: {
            enabled: false
          },
          normal: {
            animation: false
          },
          inactive: {
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

    setChart(newChart);
  }, [sampled, meanLine, popValSeriesName, sampleSeriesName]);

  useEffect(() => {
    setSampled([]);
    setMeanLine([]);
    let timer;
    if (start) {
      let n = 0;
      timer = setInterval(() => {
        const newSamples = [];
        for (let i = 0; i < (n >= 600 ? 4 : (n >= 300 ? 2 : 1)); i++) {
          n += 1;
          if (n >= 1000) {
            clearInterval(timer)
            break;
          }
          const sample = _.sampleSize(popArray, n);
          newSamples.push({ y: sampleFn(sample) });
        }
        setSampled((currSampled) => [...currSampled, ...newSamples]);
        setMeanLine((currMeanLine) => [...currMeanLine, { x: n, y: sampleFn(popArray) }]);
      }, n);
    }

    return () => clearInterval(timer);
  }, [start, popArray, sampleFn]);

  return (
    <Card body>
      {mathTitle && mathTitle}
      <HighchartsReact highcharts={Highcharts} options={chart}/>
      <Button variant="success" onClick={() => setStart(true)}>Start Simulation</Button>
    </Card>
  );
}

SimulateSamples.propTypes = {
  title: PropTypes.string,
  mathTitle: PropTypes.string,
  popArray: dataObjectArrayType.isRequired,
  sampleSeriesName: PropTypes.string.isRequired,
  popValSeriesName: PropTypes.string.isRequired,
  yLabel: PropTypes.string.isRequired,
  sampleFn: PropTypes.func.isRequired
}
