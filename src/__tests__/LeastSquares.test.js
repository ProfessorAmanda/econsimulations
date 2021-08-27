import { render, screen, fireEvent } from '@testing-library/react';
import LeastSquares from '../components/LeastSquares/LeastSquares.js';

describe('LeastSquares tests', () => {
  beforeEach(() => {
    render(<LeastSquares/>);
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
});
