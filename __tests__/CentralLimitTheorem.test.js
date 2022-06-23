import { render, screen, fireEvent } from '@testing-library/react';
import CentralLimitTheoremContainer from '../src/pages/modules/CentralLimitTheorem/CentralLimitTheoremContainer';

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
});
