import { render, screen, fireEvent } from '@testing-library/react';
import SampleDistributionOLSEstimatorsContainer from '../components/SampleDistributionOLSEstimators/SampleDistributionOLSEstimatorsContainer';

describe('SampleDistributionOLSEstimators integration tests', () => {
  beforeEach(() => {
    render(<SampleDistributionOLSEstimatorsContainer/>);
  });

  test('Module contents hidden initially', () => {
    expect(screen.queryByRole('button', { name: 'Sample' })).not.toBeInTheDocument();
  });

  test('selecting population shape reveals module contents', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Continuous' }));
    expect(screen.getByRole('button', { name: 'Sample' })).toBeInTheDocument();
  });

  test('choosing binary reveals popup button', () => {
    expect(screen.queryByRole('button', { name: 'More about this dataset' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Binary' }));
    expect(screen.getByRole('button', { name: 'More about this dataset' })).toBeInTheDocument();
  });
});
