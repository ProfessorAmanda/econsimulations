import { render, screen, fireEvent } from "@testing-library/react";
import LawOfLargeNumbers from "../components/LawOfLargeNumbers/LawOfLargeNumbers.js";
import LLNSimulation from "../components/LawOfLargeNumbers/LLNSimulation.js";
import { dataFromDistribution, populationMean } from "../lib/stats-utils.js";
import { testPopulation } from "../lib/test-utils.js";

jest.mock("../lib/stats-utils.js", () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual("../lib/stats-utils.js");

  return {
    ...originalModule,
    // only mock dataFromDistribution function
    dataFromDistribution: jest.fn(),
  };
});

describe("LawOfLargeNumbers integration tests", () => {
  beforeEach(() => {
    dataFromDistribution.mockReturnValue(testPopulation);
    render(<LawOfLargeNumbers/>);
  });

  test("Module contents hidden initially", () => {
    expect(screen.queryByTestId("lln-sim")).not.toBeInTheDocument();
  });

  test("selecting population shape reveals module contents", () => {
    fireEvent.click(screen.getByRole("button", { name: "Normal" }));
    expect(screen.getByTestId("lln-sim")).toBeInTheDocument();
  });

  test("switching population shape resets module", () => {
    fireEvent.click(screen.getByRole("button", { name: "Normal" }));
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: 10 }});
    fireEvent.click(screen.getByRole("button", { name: "Sample" }));
    expect(screen.getByText("Difference of Means:", { exact: false })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Uniform" }));
    expect(screen.queryByText("Difference of Means:", { exact: false })).not.toBeInTheDocument();
  });
});

describe("LLNSimulation tests", () => {

  beforeEach(() => {
    dataFromDistribution.mockReturnValue(testPopulation);
    render(<LLNSimulation popShape={"Normal"} sampleSize={100}/>);
  });

  test("correct population mean is displayed", () => {
    expect(screen.queryByText(`POPULATION MEAN: ${populationMean(testPopulation)}`, { exact: false })).toBeInTheDocument();
  });

  test("selecting sample shows sample mean alert and simulation", () => {
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: 10 }});
    fireEvent.click(screen.getByRole("button", { name: "Sample" }));
    expect(screen.getByText("Difference of Means:", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("POPULATION VS SAMPLE MEANS", { exact: false })).toBeInTheDocument();
  });
});
