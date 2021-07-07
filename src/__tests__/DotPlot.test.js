import { render } from '@testing-library/react';
import DotPlot from '../components/DotPlot.js';
import { getAllCharts, testPopulation } from '../lib/test-utils.js';

const testSeries = [
  {
    name: 'test',
    data: testPopulation
  }
];

describe('DotPlot tests', () => {
  test('dot plot has correct series', () => {
    render(<DotPlot series={testSeries} title="testTitle"/>);
    expect(getAllCharts()).toHaveLength(testSeries.length);
    const chartData = getAllCharts()[0].series[0].data.map((point) => ({ x: point.x, y: point.y })).sort();
    const testData = testSeries[0].data.map((point) => ({ x: point.x, y: point.y })).sort();
    expect(chartData).toEqual(testData);
  })
});
