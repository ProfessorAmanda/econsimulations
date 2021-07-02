import { useEffect, useState } from "react";
import Collapsable from "../Collapsable.js";
import ScatterPlot from "../ScatterPlot.js";
import SampleSizeInput from "../SampleSizeInput.js";
import MultivariateNormal from "multivariate-normal";
import regression from "regression";
import _ from "lodash";

export default function SDOLSESimulation() {
  const [data, setData] = useState([]);
  const [sample, setSample] = useState([]);
  const [bestFitLine, setBestFitLine] = useState([]);

  useEffect(() => {
    const covMatrix = [[6 ** 2, -9], [-9, 3 ** 2]];
    const distribution = MultivariateNormal([40, 40], covMatrix);
    const series = [];
    for (let i = 0; i < 500; i++) {
      const [x, y] = distribution.sample();
      series.push({x: _.round(x, 2), y: _.round(y, 2)});
    }
    setData(series);
  }, []);

  useEffect(() => {
    const { equation } = regression.linear(sample.map(({x, y}) => [x, y]), { precision: 2 });
    const linearPts = sample.map((point) => ({x: point.x, y: (point.x * equation[0]) + equation[1]}));
    setBestFitLine(linearPts);
  }, [sample]);

  const takeSample = (size) => {
    const newSample = _.sampleSize(data, size);
    setSample(newSample);
  }

  const mainSeries = [{name: "data", data: data}, {name: "sample", data: sample}];

  const sampleSeries = [
    {
      name: "best fit line",
      type: "line",
      data: bestFitLine,
      label: false,
      marker: false,
      color: "black"
    },
    {
      name: "sample",
      data: sample,
      color: "orange"
    }
  ];

  return (
    <Collapsable>
      <ScatterPlot series={mainSeries}/>
      <SampleSizeInput maxSize={1000} handleClick={takeSample}/>
      <ScatterPlot series={sampleSeries}/>
    </Collapsable>
  );
}
