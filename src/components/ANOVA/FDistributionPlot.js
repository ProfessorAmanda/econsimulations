import Highcharts from 'highcharts';
import PropTypes from 'prop-types';
import { Chart, HighchartsChart, HighchartsProvider, Legend, ScatterSeries, Tooltip, XAxis, YAxis } from 'react-jsx-highcharts';
import { fStatisticObjectType } from '../../lib/types';

export default function FDistributionPlot({ accepts, rejects }) {
  return (
    <HighchartsProvider Highcharts={Highcharts}>
      <HighchartsChart>
        <Chart zoomType="xy" animation={false}/>
        <Tooltip pointFormat="F-Statistic: <b>{point.F}</b><br/>p-value: <b>{point.pValue}</b><br/>reject H_0: <b>{point.reject}</b></br>"/>
        <XAxis min={0} startOnTick endOnTick>
          <XAxis.Title>F-Statistic</XAxis.Title>
        </XAxis>
        <YAxis startOnTick endOnTick>
          <YAxis.Title>Observations of F-Statistic</YAxis.Title>
          {/*
            fail to reject and reject are in two different series so they can be colored differently
            I can't figure out how to color points within one series differently so this is the best option
          */}
          <ScatterSeries
            data={accepts}
            name="Fail to Reject H_0"
            color="#03fc0b"
            marker={{
              symbol: 'diamond',
              radius: 4,
              lineColor: 'green',
              lineWidth: 1
            }}
          />
          <ScatterSeries
            data={rejects}
            name="Reject H_0"
            color="red"
            marker={{
              symbol: 'diamond',
              radius: 4,
              lineColor: '#800000',
              lineWidth: 1
            }}
          />
        </YAxis>
        <Legend/>
      </HighchartsChart>
    </HighchartsProvider>
  )
}

FDistributionPlot.propTypes = {
  accepts: PropTypes.arrayOf(fStatisticObjectType).isRequired,
  rejects: PropTypes.arrayOf(fStatisticObjectType).isRequired
}
