import { useEffect, useState } from "react";
import Collapsable from "../Collapsable.js";
import ScatterPlot from "../ScatterPlot.js";
import SampleSizeInput from "../SampleSizeInput.js";
import MultivariateNormal from "multivariate-normal";
import regression from "regression";
import _ from "lodash";
import PD from "probability-distributions";
import { Button } from "reactstrap";

export default function SDOLSESimulation() {
  const [data, setData] = useState([]);
  const [sample, setSample] = useState([]);
  const [bestFitLine, setBestFitLine] = useState([]);
  const [bool, setBool] = useState(true)

  useEffect(() => {
    const covarianceMatrix = [
      [3 * 3, -0.5 * 3 * 6],
      [-0.5 * 3 * 6, 6 * 6]
    ];
    const distribution = MultivariateNormal([5, 2], covarianceMatrix);
    const epsilon = PD.rnorm(1000, 0, 5);
    const series = [];
    for (let i = 0; i < 1000; i++) {
      const [x, y] = distribution.sample();
      const scorePoint = 40 + 3 * x + 2.5 * y + epsilon[i];
      series.push({x: _.round(x, 2), y: _.round(scorePoint, 2)});
    }
    setData(series)
  }, [bool]);

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
      <Button onClick={() => setBool(!bool)}>Generate</Button>
      <ScatterPlot series={mainSeries}/>
      <SampleSizeInput maxSize={1000} handleClick={takeSample}/>
      <ScatterPlot series={sampleSeries}/>
    </Collapsable>
  );
}
