import { render, screen, fireEvent } from '@testing-library/react';
import ConfidenceIntervalsContainer from '../components/ConfidenceIntervals/ConfidenceIntervalsContainer';

describe('ConfidenceIntervals integration tests', () => {
  beforeEach(() => {
    render(<ConfidenceIntervalsContainer/>);
  });

  test('Module contents hidden initially', () => {
    expect(screen.queryByRole('slider')).not.toBeInTheDocument();
  });

  test('selecting population shape reveals module contents', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Normal' }));
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });
});
