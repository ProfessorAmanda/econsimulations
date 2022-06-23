import { render, screen, fireEvent } from '@testing-library/react';
import HypothesisTesting from '@/modules/HypothesisTesting/HypothesisTesting';

describe('HypothesisTesting integration tests', () => {
  beforeEach(() => {
    render(<HypothesisTesting/>)
  });

  test('buttons rendered', () => {
    expect(screen.getAllByRole('button')).toHaveLength(8);
  });

  test('clicking buttons reveals module contents', () => {
    expect(screen.queryByRole('button', { name: 'Continue' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Normal' }));
    fireEvent.click(screen.getByRole('button', { name: 'oneSample' }));
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
  });
});
