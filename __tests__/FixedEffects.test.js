import { render, screen } from '@testing-library/react';
import FixedEffects from '@/modules/FixedEffects/FixedEffects';

describe('FixedEffects integration tests', () => {
  beforeEach(() => {
    render(<FixedEffects/>);
  });

  test('all checkboxes rendered', () => {
    expect(screen.getAllByRole('checkbox')).toHaveLength(14);
  });

  test('table rendered', () => {
    expect(screen.getAllByRole('cell')).toHaveLength(10);
  });
});
