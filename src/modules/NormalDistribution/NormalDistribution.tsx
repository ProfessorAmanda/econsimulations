import NormalDistributionChart from "./NormalDistributionChart";
import NormalDistributionInput from "./NormalDistributionInput";
import { useState } from "react";
import { dataObject } from "src/lib/ts-types";
import _ from "lodash";

export default function NormalDistribution() {
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);

  const bellCurvePoints : dataObject[] = [];
  _.range(-10, 11, 0.1).forEach((x, i) => {
    const y = 1 / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp(-((x - mu) ** 2 / (2 * sigma ** 2)));
    bellCurvePoints.push({x: x, y: y, id: i});
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <div>
        <NormalDistributionChart bellCurvePoints={bellCurvePoints} />
      </div>
      <div style={{ marginLeft: '5rem', marginTop: '5rem' }}>
        <NormalDistributionInput mu={mu} sigma={sigma} onMuChange={setMu} onSigmaChange={setSigma} />
      </div>
      
    </div>
  );
}
