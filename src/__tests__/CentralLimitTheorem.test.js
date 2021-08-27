import { render, screen, fireEvent } from '@testing-library/react';
import CentralLimitTheoremContainer from '../components/CentralLimitTheorem/CentralLimitTheoremContainer';

describe('CentralLimitTheorem integration tests', () => {
  beforeEach(() => {
    render(<CentralLimitTheoremContainer/>);
  });

  test('Module contents hidden initially', () => {
    expect(screen.queryByTestId('clt-sim')).not.toBeInTheDocument();
  });

  test('selecting population shape reveals module contents', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Normal' }));
    expect(screen.getByTestId('clt-sim')).toBeInTheDocument();
  });

  test('switching population shape resets module', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Normal' }));
    expect(screen.queryByRole('button', { name: 'Sample' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByRole('button', { name: 'Sample' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Uniform' }));
    expect(screen.queryByRole('button', { name: 'Sample' })).not.toBeInTheDocument();
  });
});
