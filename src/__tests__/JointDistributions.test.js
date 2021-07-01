import { render, screen, fireEvent } from "@testing-library/react";
import JDSimulation from "../components/JointDistributions/JDSimulation.js";

describe("Joint Distributions tests", () => {
  beforeEach(() => {
    render(<JDSimulation/>)
  });

  test("Plots hidden initially", () => {
    expect(screen.queryAllByLabelText("plot")).toHaveLength(0);
  });

  test("clicking Generate button reveals plots", () => {
    fireEvent.click(screen.getByRole("button", { name: "Generate!" }));
    expect(screen.queryAllByLabelText("plot")).toHaveLength(3);
  });

  test("covariance calculated correctly", () => {
    fireEvent.change(screen.getByRole("slider"), { target: { value: 0.4 } });
    fireEvent.change(screen.getByLabelText("Parent-SD"), { target: { value: 4 } });
    fireEvent.change(screen.getByLabelText("Child-SD"), { target: { value: 6 } });
    expect(screen.getByLabelText("covariance")).toHaveTextContent((0.4 * 6 * 4).toFixed(2));
  })
});
