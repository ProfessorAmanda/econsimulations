import NormalDistributionChart from "./NormalDistributionChart";
import NormalDistributionChartShade from "./NormalDistributionChartShade";
import NormalDistributionInput from "./NormalDistributionInput";
import NormalDistributionInputShade from "./NormalDistributionInputShade";
import { useState } from "react";
import { dataObject } from "src/lib/ts-types";
import _ from "lodash";

export default function NormalDistribution() {
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);

  const [largerThan, setLargerThan] = useState(true);
  const [val, setVal] = useState(mu);

  const range = { start: -10, end: 10, step: 0.1 };

  const bellCurvePoints: dataObject[] = [];
  _.range(range.start, range.end, range.step).forEach((x, i) => {
    const y = 1 / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp(-((x - mu) ** 2 / (2 * sigma ** 2)));
    bellCurvePoints.push({ x: x, y: y, id: i });
  });


  const bellCurvePointsShading: {x: number, high: number, low: number}[] = [];
  _.range(range.start, val-range.step, range.step).forEach((x) => {
    const y = largerThan ? 0 : 1 / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp(-((x - mu) ** 2 / (2 * sigma ** 2)));
    bellCurvePointsShading.push({ x: x, high: y, low: 0 });
  });

  // More refined steps around val to ensure a perpendicular line
  _.range(val-0.05, val+0.05, 0.01).forEach((x, i) => {
    if ((largerThan && x > val) || (!largerThan && x <= val)) {
      const y = 1 / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp(-((x - mu) ** 2 / (2 * sigma ** 2)));
      bellCurvePointsShading.push({ x: x, high: y, low: 0 });
    } else {
      bellCurvePointsShading.push({ x: x, high: 0, low: 0 });
    }
  });

  _.range(val+range.step, range.end, range.step).forEach((x) => {
    const y = largerThan ? 1 / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp(-((x - mu) ** 2 / (2 * sigma ** 2))) : 0;
    bellCurvePointsShading.push({ x: x, high: y, low: 0 });
  });


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div>
          <NormalDistributionChart bellCurvePoints={bellCurvePoints} />
        </div>
        <div style={{ marginLeft: '5rem', marginTop: '5rem' }}>
          <NormalDistributionInput mu={mu} sigma={sigma} onMuChange={setMu} onSigmaChange={setSigma} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '3rem' }}>
        <div>
          <NormalDistributionChartShade bellCurvePoints={bellCurvePoints} bellCurvePointsShading={bellCurvePointsShading} />
        </div>
        <div style={{ marginLeft: '5rem', marginTop: '5rem' }}>
          <NormalDistributionInputShade largerThan={largerThan} val={val} onLargerThanChange={setLargerThan} onValChange={setVal} />
        </div>
      </div>
    </div>

  );
}
