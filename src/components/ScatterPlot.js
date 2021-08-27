import Highcharts from 'highcharts';
import PropTypes from 'prop-types';
import { highchartsSeriesType, stringOrNumberType } from '../lib/types';
import { Chart, HighchartsChart, HighchartsProvider, Series, Title, Tooltip, XAxis, YAxis } from 'react-jsx-highcharts';
require('highcharts/modules/series-label')(Highcharts);

export default function ScatterPlot({
  series,
  title,
  xMin,
  xMax,
  yMin,
  yMax,
  xLabel,
  yLabel,
  animation,
  zoom,
  height,
  xCategories,
  yTickInterval,
  allowDecimalsY,
  tooltipFormat,
}) {

  return (
    <HighchartsProvider Highcharts={Highcharts}>
      <HighchartsChart>
        <Chart
          animation={!!animation}
          height={height}
          zoomType={zoom ? 'xy' : ''}
        />
        <Title>{title}</Title>
        <Tooltip pointFormat={tooltipFormat || 'x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>'}/>
        <XAxis
          min={xMin}
          max={xMax}
          startOnTick
          endOnTick
          categories={xCategories}
        >
          <XAxis.Title>{xLabel}</XAxis.Title>
        </XAxis>
        <YAxis
          min={yMin}
          max={yMax}
          startOnTick
          endOnTick
          tickInterval={yTickInterval}
          allowDecimals={allowDecimalsY}
        >
          <YAxis.Title>{yLabel}</YAxis.Title>
          {series.map((seriesObject) => (
            <Series
              key={seriesObject.name}
              showInLegend={seriesObject.data.length > 0}
              turboThreshold={0}
              type={seriesObject.type || 'scatter'}
              {...seriesObject}
              data={seriesObject.data.map(({ x, y }) => ({ x, y }))}
            />
          ))}
        </YAxis>
      </HighchartsChart>
    </HighchartsProvider>
  )
}

ScatterPlot.propTypes = {
  series: highchartsSeriesType.isRequired,
  title: PropTypes.string,
  xMin: PropTypes.number,
  xMax: PropTypes.number,
  yMin: PropTypes.number,
  yMax: PropTypes.number,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  animation: PropTypes.bool,
  zoom: PropTypes.bool,
  height: stringOrNumberType,
  xCategories: PropTypes.arrayOf(PropTypes.string),
  yTickInterval: PropTypes.number,
  allowDecimalsY: PropTypes.bool,
  tooltipFormat: PropTypes.string
}
