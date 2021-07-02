import { useEffect, useState } from "react";
import Collapsable from "../Collapsable.js";
import MultivariateNormal from "multivariate-normal";
import _ from "lodash";
import PD from "probability-distributions";
import { Button, Container } from "reactstrap";
import PopulationAndSampleCharts from "./PopulationAndSampleCharts.js";
import Beta1HatDistribution from "./Beta1HatDistribution.js";

export default function SDOLSESimulation() {
  const [data, setData] = useState([]);
  const [revealSimulation, setRevealSimulation] = useState(false)

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

  return (
    <Collapsable>
      <Container>
        <PopulationAndSampleCharts data={data}/>
        {!revealSimulation ? (
          <Button color="primary" onClick={() => setRevealSimulation(true)}>Continue</Button>
        ) : (
          <Beta1HatDistribution data={data}/>
        )}
      </Container>
    </Collapsable>
  );
}
