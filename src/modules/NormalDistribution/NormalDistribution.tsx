import NormalDistributionChart from './NormalDistributionChart';
import NormalDistributionInput from './NormalDistributionInput';
import { useEffect, useState } from 'react';
import { dataObject } from 'src/lib/ts-types';
import _ from 'lodash';
import ND from 'normal-distribution';
import { Button, Alert, InputGroup, Form } from 'react-bootstrap';
import { dataFromDistribution } from 'src/lib/stats-utils';
import DataTable from 'src/components/DataTable';
import TestingForNormality from './TestingForNormality';

export default function NormalDistribution() {
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);

  const [largerThan, setLargerThan] = useState(true);
  const [val, setVal] = useState(mu);

  const [area, setArea] = useState(0);

  const [sampleSizeInput, setSampleSizeInput] = useState('');
  const [sampleSize, setSampleSize] = useState(30);
  const [samplePoints, setSamplePoints] = useState<dataObject[]>([]);

  const sampleSizeRange = { min: 1, max: 50 };
  const validSampleInput = sampleSizeInput && +sampleSizeInput >= sampleSizeRange.min && +sampleSizeInput <= sampleSizeRange.max;

  // This value is used to scale the bell curve to a proper size that fits well with the sample points
  const scale = 22;

  useEffect(() => {
    if (sampleSizeInput !== '') {
      setSampleSize(parseInt(sampleSizeInput));
    }
  }, [sampleSizeInput]);

  useEffect(() => {
    const nd = new ND(mu, sigma);
    const newArea = largerThan ? 1 - nd.cdf(val) : nd.cdf(val);
    if (newArea < 0.001) { setArea(0.001); }
    else if (newArea > 0.999) { setArea(0.999); }
    else { setArea(newArea); }
  }, [mu, sigma, largerThan, val]);

  const range = { start: -10, end: 10, step: 0.1 };

  const normDist = new ND(mu, sigma);
  const bellCurvePoints: dataObject[] = [];
  _.range(range.start, range.end, range.step).forEach((x, i) => {
    const y = normDist.pdf(x);
    bellCurvePoints.push({ x, y: y * scale, id: i });
  });


  const bellCurvePointsShading: { x: number, high: number, low: number }[] = [];
  _.range(range.start, val - range.step, range.step).forEach((x) => {
    const y = largerThan ? 0 : normDist.pdf(x);
    bellCurvePointsShading.push({ x, high: y * scale, low: 0 });
  });

  // More refined steps around val to ensure a perpendicular line
  _.range(val - 0.05, val + 0.05, 0.01).forEach((x) => {
    if ((largerThan && x > val) || (!largerThan && x <= val)) {
      const y = normDist.pdf(x);
      bellCurvePointsShading.push({ x, high: y * scale, low: 0 });
    } else {
      bellCurvePointsShading.push({ x, high: 0, low: 0 });
    }
  });

  _.range(val + range.step, range.end, range.step).forEach((x) => {
    const y = largerThan ? 1 / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp(-((x - mu) ** 2 / (2 * sigma ** 2))) : 0;
    bellCurvePointsShading.push({ x, high: y * scale, low: 0 });
  });

  const onDrawClick = () => {
    const samples = dataFromDistribution('Normal', sampleSize, {
      mean: mu,
      standardDev: sigma,
      low: range.start,
      hi: range.end,
      precision: 1
    });
    setSamplePoints(samples);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <NormalDistributionChart bellCurvePoints={bellCurvePoints} bellCurvePointsShading={bellCurvePointsShading} samplePoints={samplePoints.map((sample) => { return { x: sample.x, y: sample.y }; })} />
        <div style={{ marginLeft: '5rem', marginTop: '5rem' }}>
          <NormalDistributionInput mu={mu} sigma={sigma} onMuChange={setMu} onSigmaChange={setSigma} largerThan={largerThan} val={val} onLargerThanChange={setLargerThan} onValChange={setVal} />
          <div style={{ marginTop: '2rem' }}>{`Area under the curve: ${(area).toFixed(3)}`}</div>
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Alert variant="primary" style={{ width: '30rem', marginTop: '3rem' }}>
          Experiment with Drawing Samples from This Distribution
          <InputGroup style={{ width: '80%', margin: 'auto', marginBottom: '1rem', marginTop: '1rem' }}>
            <Form.Control
              // @ts-ignore
              align="right"
              type="number"
              placeholder="Sample Size: 1-50"
              min={sampleSizeRange.min}
              value={sampleSizeInput}
              max={sampleSizeRange.max}
              onChange={(evt: any) => setSampleSizeInput(evt.target.value)}
            />
            <Button variant={validSampleInput ? 'primary' : 'secondary'} disabled={!validSampleInput} onClick={() => onDrawClick()}>
              Draw a Sample
            </Button>
          </InputGroup>
        </Alert>

      </div>
      {
        samplePoints.length > 0 && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '20rem' }}>
            <DataTable
              data={samplePoints}
              headers={{
                'id': 'id',
                'x': 'x'
              }}
              height={200}
              setRowColor={(object: { id: number }) => {
                const x = samplePoints.find((obj) => obj.id === object.id)?.x ?? 0;
                const inRange = largerThan && x >= val || !largerThan && x <= val;
                return inRange ? '#00aa00' : undefined;
              }}
            />
          </div>
          <div style={{ width: '100%', marginTop: '5rem' }}>
            <TestingForNormality />
          </div>
        </div>
      }
    </div>
  );
}
