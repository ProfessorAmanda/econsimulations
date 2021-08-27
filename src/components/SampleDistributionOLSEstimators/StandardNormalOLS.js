import { useState } from 'react';
import Highcharts from 'highcharts';
import { dataFromDistribution } from '../../lib/stats-utils';
import PropTypes from 'prop-types';
import { dataObjectArrayType } from '../../lib/types';
import { max } from 'mathjs';
import { Chart, HighchartsChart, HighchartsProvider, Title, Tooltip, XAxis, YAxis, Legend, BellCurveSeries, ScatterSeries } from 'react-jsx-highcharts';
require('highcharts/modules/histogram-bellcurve')(Highcharts);

export default function StandardNormalOLS({ seriesName, data }) {
  const [population] = useState(dataFromDistribution('Normal', 2000, { mean: 0, standardDev: 1 }));

  return (
    <HighchartsProvider Highcharts={Highcharts}>
      <HighchartsChart>
        <Chart animation={false}/>
        <Title>{`Distribution of Sample ${seriesName}`}</Title>
        <Tooltip headerFormat="" pointFormat={`${seriesName.slice(0, -1)}: <b>{point.x}</b><br/>`}/>
        <XAxis startOnTick endOnTick>
          <XAxis.Title>Standard Deviations</XAxis.Title>
        </XAxis>
        {/* Secondary yAxis for bell curve */}
        <YAxis visible={false}>
          <BellCurveSeries
            name="Normal Distribution"
            baseSeries={1}
            zIndex={-1}
            enableMouseTracking={false}
            label={false}
            showInLegend={false}
            yAxis={1}
          />
        </YAxis>
        {/* Primary yAxis */}
        <YAxis min={0} max={max(4, ...data.map(({ y }) => y))} startOnTick endOnTick allowDecimals={false}>
          <YAxis.Title>{`Observations of Sample ${seriesName}`}</YAxis.Title>
          {/*
            This is the series that the bell curve maps to.
            Must be the second series defined or else change BellCurveSeries.baseSeries
          */}
          <ScatterSeries name="Data" data={population.map(({ x }) => x)} visible={false} showInLegend={false}/>
          <ScatterSeries name={seriesName} data={data} showInLegend={false} color="red" marker={{symbol: 'circle'}}/>
        </YAxis>
        <Legend/>
      </HighchartsChart>
    </HighchartsProvider>
  )
}

StandardNormalOLS.propTypes = {
  seriesName: PropTypes.string.isRequired,
  data: dataObjectArrayType.isRequired
}
