import { render, screen, fireEvent } from '@testing-library/react';
import { MODULES } from '../src/lib/constants';
import Menu from '../src/pages/menu';

describe('SimBar tests', () => {
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
    render(<Menu setSection={handler}/>);
  });

  MODULES.forEach(({ name }) => {
    test(`${name} module displayed`, () => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  // This test was for non-Next.js version single-page app. 
  // Commenting out for now before rewriting for Next.js
  /*
  MODULES.forEach(({ name }) => {
    test(`${name} module calls correct handler`, () => {
      fireEvent.click(screen.getByText(name));
      expect(handler).toHaveBeenCalledWith(name);
    });
  });
  */
});
