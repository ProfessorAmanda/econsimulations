import { useEffect, useState } from "react";
import Collapsable from "../Collapsable.js";
import MultivariateNormal from "multivariate-normal";
import _ from "lodash";
import PD from "probability-distributions";
import { Button, Container } from "reactstrap";
import PopulationAndSampleCharts from "./PopulationAndSampleCharts.js";
import Beta1HatDistribution from "./Beta1HatDistribution.js";
import regression from "regression";

export default function SDOLSESimulation() {
  const [data, setData] = useState([]);
  const [samples, setSamples] = useState([]);
  const [revealSimulation, setRevealSimulation] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    const stdX = 3;
    const stdY = 6;
    const covarianceMatrix = [
      [stdX * stdX, -0.5 * stdX * stdY],
      [-0.5 * stdX * stdY, stdY * stdY]
    ];
    const distribution = MultivariateNormal([8, 2], covarianceMatrix);
    const epsilon = PD.rnorm(1000, 0, 5);
    const series = [];
    for (let i = 0; i < 1000; i++) {
      const [x, y] = distribution.sample();
      const scorePoint = 40 + 3 * x + 2.5 * y + epsilon[i];
      series.push({x: _.round(x, 2), y: _.round(scorePoint, 2)});
    }
    setData(series.filter(({x, y}) => (0 <= x) && (x <= 15) && (20 <= y) && (y <= 100)));
  }, []);

  const addSamples = (size, replications=1) => {
    if (!size) {  // calling generateSamples with no arguments clears the data
      setSamples([]);
    } else {
      const newSamples = [];
      for (let i = 0; i < replications; i++) {
        const sample = _.sampleSize(data, size);
        const { equation } = regression.linear(sample.map(({x, y}) => [x, y]), { precision: 2 });
        const sampleObject = {
          data: sample,
          size: size,
          slope: equation[0],
          intercept: equation[1],
        }
        newSamples.push(sampleObject);
      }
      const indexedSamples = [...samples, ...newSamples].map((obj, index) => ({...obj, id: index}));
      setSelected(indexedSamples[indexedSamples.length - 1]);
      setSamples(indexedSamples);
    }
  }

  return (
    <Collapsable>
      <Container>
        <PopulationAndSampleCharts
          data={data}
          addSamples={addSamples}
          selected={selected}
          samples={samples}
          selectSample={setSelected}
        />
        <br/>
        {!revealSimulation ? (
          <Button color="primary" onClick={() => setRevealSimulation(true)}>Continue</Button>
        ) : (
          <Beta1HatDistribution
            data={data}
            samples={samples}
            addSamples={addSamples}
          />
        )}
      </Container>
    </Collapsable>
  );
}
