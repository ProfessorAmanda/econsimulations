import Highcharts from 'highcharts';
import { Alert } from 'react-bootstrap';
import _ from 'lodash';
import { max } from 'mathjs';
import PropTypes from 'prop-types';
import { confidenceIntervalsSampleType, popShapeType } from '../../lib/types.js';
import { VALUES_ALT } from '../../lib/constants.js';
import { Chart, HighchartsChart, HighchartsProvider, Title, Tooltip, XAxis, YAxis, Legend, ColumnRangeSeries, ScatterSeries, LineSeries } from 'react-jsx-highcharts';
require('highcharts/highcharts-more')(Highcharts);

export default function ConfidenceIntervalsChart({ confidenceLevel, samples, popShape, popMean, selected, setSelected }) {
  const { xmaxval, xminval, title, xLabel } = VALUES_ALT[popShape];

  const sampleMeans = [];
  const containsMean = [];
  const doesntContainMean = [];

  // put objects into separate lists depending on whether or not they contain the mean
  // can't seem to color individual points in a highcharts series, so this is the next best option imo
  samples.forEach((sampleObject) => {
    sampleMeans.push({
      ...sampleObject,
      x: sampleObject.id,
      y: sampleObject.mean
    });
    if (sampleObject.label) {
      containsMean.push({
        ...sampleObject,
        low: sampleObject.lowerConf,
        high: sampleObject.upperConf,
        x: sampleObject.id
      })
    } else {
      doesntContainMean.push({
        ...sampleObject,
        low: sampleObject.lowerConf,
        high: sampleObject.upperConf,
        x: sampleObject.id
      })
    }
  });

  // hack to allow zoom - this unselects all points in the plot
  const selection = (event) => {
    event.target.series.forEach((series) => {
      series.data.forEach((point) => {
        point.select(false, false)
      })
    })
  }

  const plotOptions = {
    series: {
      point: {
        events: {
          click() {
            setSelected(this);
          }
        }
      },
      cursor: 'pointer'
    }
  }


  return (
    <div>
      {selected ? (
        <Alert variant={selected.label ? 'success' : 'danger'}>
          Sample number {selected.id} has a mean of {selected.mean.toFixed(2)}, with {confidenceLevel}% CI ({_.round(selected.lowerConf, 2)}, {_.round(selected.upperConf, 2)}). CI contains the population mean? {selected.label.toString()}
        </Alert>
      ) : (
        <div style={{ height: 80 }}/>
      )}
      <HighchartsProvider Highcharts={Highcharts}>
        <HighchartsChart plotOptions={plotOptions}>
          <Chart animation={false} inverted zoomType="xy" onSelection={selection}/>
          <Title>{title}</Title>
          <Tooltip
            headerFormat=""
            pointFormat="Sample Size: <b>{point.size}</b><br/>Sample Mean: <b>{point.mean}</b><br/>Lower Bound of CI: <b>{point.lowerConf}</b><br/>Upper Bound of CI: <b>{point.upperConf}</b><br/>Confidence Level: <b>{point.confidenceLevel}%</b><br/>Distribution: <b>{point.distribution}</b><br/>"
            outside
            borderColor="gray"
          />
          <XAxis
            reversed={false}
            min={1}
            max={max(samples.length, 10)}
            startOnTick
            tickPixelInterval={1}
            tickInterval={1}
            tickWidth={0}
            lineWidth={0}
          >
            <XAxis.Title>Sample Number</XAxis.Title>
          </XAxis>
          <YAxis min={xminval} max={xmaxval} startOnTick endOnTick>
            <YAxis.Title>{xLabel}</YAxis.Title>
            <ColumnRangeSeries
              name="Confidence Interval"
              data={containsMean}
              color="rgba(0, 170, 0, 0.5)"
              centerInCategory
              showInLegend={false}
              allowPointSelect
              states={{
                hover: {
                  color: 'rgba(0, 170, 0, 1)'
                },
                inactive: {
                  color: 'rgba(0, 170, 0, 0.5)'
                },
                select: {
                  enabled: false,
                  color: 'rgba(0, 170, 0, 0.5)'
                }
              }}
            />
            <ColumnRangeSeries
              name="Confidence Interval"
              data={doesntContainMean}
              color="rgba(255, 0, 0, 0.5)"
              centerInCategory
              showInLegend={false}
              allowPointSelect
              states={{
                hover: {
                  color: 'rgba(255, 0, 0, 1)'
                },
                inactive: {
                  color: 'rgba(255, 0, 0, 0.5)'
                },
                select: {
                  enabled: false,
                  color: 'rgba(255, 0, 0, 0.5)'
                }
              }}
            />
            <ScatterSeries
              name="Sample Means"
              data={sampleMeans}
              color="#616161"
              marker={{
                enabled: true,
                symbol: 'diamond',
                radius: 1
              }}
              allowPointSelect
              states={{
                hover: {
                  enabled: false
                },
                select: {
                  enabled: false,
                }
              }}
            />
            <LineSeries
              name="Population Mean"
              data={[[0, popMean], [samples.length, popMean]]}
              color="gray"
              enableMouseTracking={false}
              showInLegend={false}
              label={false}
              marker={false}
              zIndex={-5}
            />
          </YAxis>
          <Legend/>
        </HighchartsChart>
      </HighchartsProvider>
    </div>
  );
}

ConfidenceIntervalsChart.propTypes = {
  confidenceLevel: PropTypes.number.isRequired,
  samples: PropTypes.arrayOf(confidenceIntervalsSampleType).isRequired,
  popShape: popShapeType.isRequired,
  popMean: PropTypes.number.isRequired,
  selected: confidenceIntervalsSampleType,
  setSelected: PropTypes.func.isRequired,
}
