import { render, screen } from '@testing-library/react';
import SimulationContainer from '../components/SimulationContainer.js';
import { MODULES } from '../lib/constants.js';

describe('SimulationContainer tests', () => {
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
  });

  test('menu button is displayed', () => {
    render(<SimulationContainer mode="test" setMode={handler}/>);
    expect(screen.getByRole('button', {name: 'MENU'})).toBeInTheDocument();
  });

  MODULES.forEach(({ name }) => {
    test(`${name} module is displayed`, () => {
      render(<SimulationContainer mode={name} setMode={handler}/>);
      expect(screen.getByTestId(`${name}-intro`)).toBeInTheDocument();
    });
  });
});
