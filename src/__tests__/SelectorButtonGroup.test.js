import { fireEvent, render, screen } from '@testing-library/react';
import SelectorButtonGroup from '../components/SelectorButtonGroup.js';

describe('SelectorButtonGroup tests', () => {
  const options = ['Normal', 'Uniform', 'Exponential'];
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
    render(<SelectorButtonGroup options={options} select={handler}/>);
  });

  options.forEach((option) => {
    test(`${option} button rendered`, () => {
      expect(screen.getByRole('button', { name: option })).toBeInTheDocument();
    });
  });
});
