import { render, screen, fireEvent } from "@testing-library/react";
import JDSimulation from "../components/JointDistributions/JDSimulation.js";

describe("Joint Distributions tests", () => {
  beforeEach(() => {
    render(<JDSimulation/>)
  });

  test("Plots hidden initially", () => {
    expect(screen.queryAllByLabelText("plot")).toHaveLength(0);
  });
});
