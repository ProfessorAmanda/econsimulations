import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Home from '@/pages/index';

describe('top-level integration tests', () => {
  const clickIntoModule = (moduleName) => {
    fireEvent.click(screen.getByRole('button', { name: 'Start!' }));
    fireEvent.click(screen.getByTestId(`module-${moduleName}`));
  }

  beforeEach(async () => {
    jest.useFakeTimers();
    render(<Home/>);
    await act(async () => jest.runAllTimers());  // waits for the intro animation to complete before running each test
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('Displays StartHere text after intro animation', () => {
    expect(screen.getByText('This website is an interactive educational application developed to simulate and visualize various statistical concepts.')).toBeInTheDocument();
  });
});
