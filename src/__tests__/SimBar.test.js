import { render, screen, fireEvent } from "@testing-library/react";
import SimBar from "../components/SimBar.js";
import { MODULES } from "../lib/constants.js";

describe("SimBar tests", () => {
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
    render(<SimBar setSection={handler}/>);
  });

  test("all modules displayed", () => {
    MODULES.forEach((module) => {
      expect(screen.getByText(module.name)).toBeInTheDocument();
    });
  });

  test("buttons call correct handlers", () => {
    MODULES.forEach((module) => {
      const moduleButton = screen.getByText(module.name);
      fireEvent.click(moduleButton);
      expect(handler).toHaveBeenCalledWith(module.name);
    });
  });
});
