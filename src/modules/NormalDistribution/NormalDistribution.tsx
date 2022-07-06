import NormalDistributionChart from './NormalDistributionChart';
import NormalDistributionInput from './NormalDistributionInput';
import { useEffect, useState } from 'react';
import { dataObject } from 'src/lib/ts-types';
import _ from 'lodash';
import ND from 'normal-distribution';

export default function NormalDistribution() {
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);

  const [largerThan, setLargerThan] = useState(true);
  const [val, setVal] = useState(mu);

  const [area, setArea] = useState(0);
  useEffect(() => {
    const nd = new ND(mu, sigma);
    setArea(largerThan ? 1-nd.cdf(val) : nd.cdf(val));
  }, [mu, sigma, largerThan, val]);
  
  const range = { start: -10, end: 10, step: 0.1 };

  const normDist = new ND(mu, sigma);
  const bellCurvePoints: dataObject[] = [];
  _.range(range.start, range.end, range.step).forEach((x, i) => {
    //const y = 1 / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp(-((x - mu) ** 2 / (2 * sigma ** 2)));
    const y = normDist.pdf(x);
    bellCurvePoints.push({ x, y, id: i });
  });


  const bellCurvePointsShading: {x: number, high: number, low: number}[] = [];
  _.range(range.start, val-range.step, range.step).forEach((x) => {
    const y = largerThan ? 0 : 1 / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp(-((x - mu) ** 2 / (2 * sigma ** 2)));
    bellCurvePointsShading.push({ x, high: y, low: 0 });
  });

  // More refined steps around val to ensure a perpendicular line
  _.range(val-0.05, val+0.05, 0.01).forEach((x) => {
    if ((largerThan && x > val) || (!largerThan && x <= val)) {
      const y = 1 / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp(-((x - mu) ** 2 / (2 * sigma ** 2)));
      bellCurvePointsShading.push({ x, high: y, low: 0 });
    } else {
      bellCurvePointsShading.push({ x, high: 0, low: 0 });
    }
  });

  _.range(val+range.step, range.end, range.step).forEach((x) => {
    const y = largerThan ? 1 / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp(-((x - mu) ** 2 / (2 * sigma ** 2))) : 0;
    bellCurvePointsShading.push({ x, high: y, low: 0 });
  });


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div>
          <NormalDistributionChart bellCurvePoints={bellCurvePoints} bellCurvePointsShading={bellCurvePointsShading}/>
        </div>
        <div style={{ marginLeft: '5rem', marginTop: '5rem' }}>
          <NormalDistributionInput mu={mu} sigma={sigma} onMuChange={setMu} onSigmaChange={setSigma} largerThan={largerThan} val={val} onLargerThanChange={setLargerThan} onValChange={setVal}/>
          <div style={{ marginTop: '2rem'}}>{`Area under the curve: ${(area).toFixed(3)}`}</div>
        </div>
        
      </div>
    </div>

  );
}
