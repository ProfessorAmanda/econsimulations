import { render, screen, fireEvent } from '@testing-library/react';
import ANOVA from '../src/pages/modules/ANOVA/ANOVA';

describe('ANOVA integration tests', () => {
  beforeEach(() => {
    render(<ANOVA/>);
  });

  test('buttons rendered', () => {
    expect(screen.getByRole('button', { name: 'Generate Populations' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: 'Take Samples' })).toBeDisabled();
  });

  test('samples button becomes enabled', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Generate Populations' }));
    expect(screen.getByRole('button', { name: 'Take Samples' })).not.toBeDisabled();
  });
});
