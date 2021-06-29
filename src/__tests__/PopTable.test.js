import { render, screen } from "@testing-library/react";
import PopTable from "../components/PopTable.js";
import { VALUES } from "../lib/constants.js";
import { testPopulation, testSample } from "../lib/test-utils.js";

describe("PopTable tests", () => {
  const popShape = "Normal"
  const testSampleIDs = testSample.map(({ id }) => id);

  beforeEach(() => {
    render(<PopTable popArray={testPopulation} sampleIDs={testSampleIDs} popShape={popShape}/>);
  })

  test("table contains all objects in pop", () => {
    expect(screen.getAllByRole("row")).toHaveLength(testPopulation.length + 1);
  });

  test("samples highlighted", () => {
    const rows = screen.getAllByRole("row");
    rows.forEach((row) => {
      expect(row).toHaveStyle({backgroundColor: (testSampleIDs.includes(row.key) ? "#747EF2" : undefined)})
    })
  });

  test("correct header text displayed", () => {
    expect(screen.getByRole("columnheader", { name: VALUES[popShape].tableCol })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: VALUES[popShape].xLabel })).toBeInTheDocument();
  });
});
