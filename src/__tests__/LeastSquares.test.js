import { render, screen, fireEvent } from '@testing-library/react';
import LeastSquaresSimulation from '../components/LeastSquares/LeastSquaresSimulation.js';
import { getAllCharts } from '../lib/test-utils.js';

describe('LeastSquares tests', () => {
  beforeEach(() => {
    render(<LeastSquaresSimulation/>);
  });

  test('only New Points button rendered initially', () => {
    expect(screen.getByRole('button', { name: 'New Points' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Plot Your Guess' })).not.toBeInTheDocument();
  });

  test('clicking New Points button reveals additional inputs', () => {
    fireEvent.click(screen.getByRole('button', { name: 'New Points' }));
    expect(screen.getByRole('button', { name: 'New Points' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Plot Your Guess' })).toBeInTheDocument();
    expect(screen.getAllByRole('slider')).toHaveLength(3);
  });

  test('clicking Plot Your Guess button reveals sum of squares', () => {
    fireEvent.click(screen.getByRole('button', { name: 'New Points' }));
    fireEvent.click(screen.getByRole('button', { name: 'Plot Your Guess' }));
    expect(screen.getByRole('button', { name: 'New Points' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reveal the Least Squares Line' })).toBeInTheDocument();
    expect(screen.getByText('Sum Squares:', { exact: false })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Plot Your Guess' })).not.toBeInTheDocument();
  });

  test('generating points plots on graph', () => {
    fireEvent.change(screen.getByRole('slider', { target: { value: 5 } }));
    fireEvent.click(screen.getByRole('button', { name: 'New Points' }));
    expect(getAllCharts()[0].series[0].data).toHaveLength(5);
  });

  test('new points replace points on graph', () => {
    fireEvent.change(screen.getByTestId('new-points-slider'), { target: { value: 5 } });
    fireEvent.click(screen.getByRole('button', { name: 'New Points' }));
    expect(getAllCharts()[0].series[0].data).toHaveLength(5);
    fireEvent.change(screen.getByTestId('new-points-slider'), { target: { value: 7 } });
    fireEvent.click(screen.getByRole('button', { name: 'New Points' }));
    expect(getAllCharts()[0].series[0].data).toHaveLength(7);
  });

  test('plotting line adds points to graph', () => {
    fireEvent.change(screen.getByTestId('new-points-slider'), { target: { value: 5 } });
    fireEvent.click(screen.getByRole('button', { name: 'New Points' }));
    expect(getAllCharts()[0].series[0].data).toHaveLength(5);
    expect(getAllCharts()[0].series[1].data).toHaveLength(0);
    fireEvent.click(screen.getByRole('button', { name: 'Plot Your Guess' }));
    expect(getAllCharts()[0].series[0].data).toHaveLength(5);
    expect(getAllCharts()[0].series[1].data).toHaveLength(6);
  });

  test('clicking New Points button removes line points', () => {
    fireEvent.change(screen.getByTestId('new-points-slider'), { target: { value: 5 } });
    fireEvent.click(screen.getByRole('button', { name: 'New Points' }));
    expect(getAllCharts()[0].series[0].data).toHaveLength(5);
    expect(getAllCharts()[0].series[1].data).toHaveLength(0);
    fireEvent.click(screen.getByRole('button', { name: 'Plot Your Guess' }));
    expect(getAllCharts()[0].series[0].data).toHaveLength(5);
    expect(getAllCharts()[0].series[1].data).toHaveLength(6);
    fireEvent.click(screen.getByRole('button', { name: 'New Points' }));
    expect(getAllCharts()[0].series[0].data).toHaveLength(5);
    expect(getAllCharts()[0].series[1].data).toHaveLength(0);
  });
});
