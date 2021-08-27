import { useState } from 'react';
import Highcharts from 'highcharts';
import { distributionType, hypothesisTestingSampleArrayType, testTypeType } from '../../lib/types';
import _ from 'lodash';
import { dataFromDistribution } from '../../lib/stats-utils';
import { Chart, HighchartsChart, HighchartsProvider, Title, Tooltip, XAxis, YAxis, Legend, BellCurveSeries, ScatterSeries } from 'react-jsx-highcharts';
require('highcharts/modules/histogram-bellcurve')(Highcharts);

export default function StdNormalCurve({ means, distType, testType }) {
  // use a placeholder population to draw the bell curve in the plot
  const [population] = useState(
    dataFromDistribution('Normal', 2000, { mean: 0, standardDev: 1 })
  );

  const meanCounts = {};
  const rejects = [];
  const accepts = [];
  means.forEach(({ testStatistic, mean, reject }) => {
    meanCounts[mean] = _.defaultTo(meanCounts[mean] + 1, 1);
    const meanObject = {
      x: testStatistic,
      y: meanCounts[mean],
      testStatistic,
      mean,
      reject,
    }
    if (reject) {
      rejects.push(meanObject)
    } else {
      accepts.push(meanObject)
    }
  });

  return (
    <HighchartsProvider Highcharts={Highcharts}>
      <HighchartsChart>
        <Chart animation={false} zoomType="xy"/>
        <Title>Sample Means</Title>
        <Tooltip pointFormat={`test statistic: <b>{point.testStatistic}</b><br/>${(testType === 'oneSample') ? 'sample mean' : 'difference of means'}: <b>{point.mean}</b><br/>reject H_0: <b>{point.reject}</b></br>`}/>
        <XAxis startOnTick endOnTick>
          <XAxis.Title>Test Statistic</XAxis.Title>
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
            visible={!(distType === 'T')}
          />
        </YAxis>
        {/* Primary yAxis */}
        <YAxis min={0} allowDecimals={false}>
          <YAxis.Title>Observations of Sample Mean</YAxis.Title>
          {/*
            This is the series that the bell curve maps to.
            Must be the second series defined or else change BellCurveSeries.baseSeries
          */}
          <ScatterSeries name="Data" data={population.map(({ x }) => x)} visible={false} showInLegend={false}/>
          <ScatterSeries
            name="Fail to Reject H_0"
            data={accepts}
            color="#03fc0b"
            marker={{
              symbol: 'diamond',
              radius: 4,
              lineColor: 'green',
              lineWidth: 1
            }}
          />
          <ScatterSeries
            name="Reject H_0"
            data={rejects}
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

StdNormalCurve.propTypes = {
  means: hypothesisTestingSampleArrayType.isRequired,
  distType: distributionType.isRequired,
  testType: testTypeType.isRequired
}
