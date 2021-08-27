import { render } from '@testing-library/react';
import _ from 'lodash';
import DotPlot from '../components/DotPlot.js';
import { getAllCharts, testPopulation } from '../lib/test-utils.js';

const testSeries = [
  {
    name: 'test',
    data: testPopulation
  }
];

describe('DotPlot tests', () => {
  test('dot plot has correct series', async () => {
    render(<DotPlot series={testSeries} title="testTitle"/>);
    expect(getAllCharts()).toHaveLength(testSeries.length);
    const chart = getAllCharts()[0].series[0];
    const chartData = _.zip(chart.xData, chart.yData).map(([x, y]) => ({ x, y })).sort();
    const testData = testSeries[0].data.map((point) => ({ x: point.x, y: point.y })).sort();
    expect(chartData).toEqual(testData);
  })
});
