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

  test('switching population shape resets module', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Normal' }));
    expect(screen.getByRole('slider')).toHaveValue("95");
    fireEvent.change(screen.getByRole('slider'), { target: { value: "50" } });
    fireEvent.click(screen.getByRole('button', { name: 'Uniform' }));
    expect(screen.getByRole('slider')).toHaveValue("95");
  });
});
