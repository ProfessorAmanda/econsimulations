import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card } from 'react-bootstrap';
import '../../styles/dark-unica.css';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { dataObjectArrayType, popShapeType } from '../../lib/types.js';
import { populationMean } from '../../lib/stats-utils';

export default function SimulateSamples({ type, popArray, popMean }) {
  const [sampled, setSampled] = useState([]);
  const [meanLine, setMeanLine] = useState([]);
  const [chart, setChart] = useState({});
  const [timer, setTimer] = useState();

  useEffect(() => {
    const newChart = {
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
        text: `Population vs Sample Means <br /> (${type})`,
      },
      xAxis: {
        title: {
          text: 'Sample Size'
        },
        min: 0
      },
      yAxis: {
        title: {
          text: 'Mean'
        }
      },
      tooltip: {
        enabled: false
      },
      series: [
        {
          name: `Population Mean (${popMean.toFixed(2)})`,
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
          name: 'Sampled Means',
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
  }, [sampled, meanLine, type, popArray, popMean]);

  useEffect(() => {
    setSampled([]);
    setMeanLine([])
    let n = 0;
    setTimer(setInterval(() => {
      n += 1;
      // if (n >= 1000) {
      //   clearInterval(timer)
      // }
      const sample = _.sampleSize(popArray, n);
      const avg = _.round(populationMean(sample), 2);
      setSampled((currSampled) => [...currSampled, { y: avg }]);
      setMeanLine((currMeanLine) => [...currMeanLine, { y: popMean }]);
    }, n));

    return () => clearInterval(timer);
  }, []);  // eslint-disable-line

  return (
    <Card>
      <Card.Body>
        <HighchartsReact highcharts={Highcharts} options={chart}/>
      </Card.Body>
    </Card>
  );
}

SimulateSamples.propTypes = {
  type: popShapeType.isRequired,
  popArray: dataObjectArrayType.isRequired,
  popMean: PropTypes.number.isRequired,
}
