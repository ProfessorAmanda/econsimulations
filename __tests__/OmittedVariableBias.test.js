import { render, screen, fireEvent } from '@testing-library/react';
import OmittedVariableBias from '../src/pages/modules/OmittedVariableBias/OmittedVariableBias';
import { getAllCharts } from '../src/lib/test-utils';

describe('Omitted Variable Bias tests', () => {
  beforeEach(() => {
    render(<OmittedVariableBias/>)
  });

  test('Plot hidden initally', () => {
    expect(getAllCharts()).toHaveLength(0);
  });

  test('Plot shown when Generate button clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Generate!' }));
    expect(getAllCharts()).toHaveLength(1);
  });

  test('covariance displayed correctly', () => {
    expect(screen.getByLabelText('covariance')).toHaveTextContent(0.00);
    fireEvent.change(screen.getByRole('slider'), { target: { value: 0.1 } });
    expect(screen.getByLabelText('covariance')).toHaveTextContent((3 * 6 * 0.1).toFixed(2));
  });
});
