import { render, screen, fireEvent } from "@testing-library/react";
import LawOfLargeNumbers from "../components/LawOfLargeNumbers/LawOfLargeNumbers.js";
import { dataFromDistribution } from "../lib/stats-utils.js";

describe("LawOfLargeNumbers integration tests", () => {
  beforeEach(() => {
    render(<LawOfLargeNumbers/>);
  });

  test("Module contents hidden initially", () => {
    expect(screen.queryByTestId("lln-sim")).not.toBeInTheDocument();
  });

  test("selecting population shape reveals module contents", () => {
    fireEvent.click(screen.getByRole("button", { name: "Normal" }));
    expect(screen.getByTestId("lln-sim")).toBeInTheDocument();
  });
});

// describe("LLNSimulation tests", () => {
//   beforeEach(() => {
//     dataFromDistribution.mockReturnValue()
//   });
// });
