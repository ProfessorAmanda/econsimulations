import { useEffect, useState } from 'react';
import SolowModelInput from './SolowModelInput';
import _ from 'lodash';
import SolowModelChart from './SolowModelChart';
import { Alert, Button, Table } from 'react-bootstrap';
import SolowModelDynamicChart from './SolowModelDynamicChart';
import SelectorButtonGroup from 'src/components/SelectorButtonGroup';

export default function SolowModel() {
  const [alpha, setAlpha] = useState(+(1 / 3).toFixed(2));
  const [beta, setBeta] = useState(+(2 / 3).toFixed(2));
  const [A, setA] = useState(1);
  const [delta, setDelta] = useState(0.1);
  const [L, setL] = useState(1);
  const [s, setS] = useState(0.25);

  const [alpha2, setAlpha2] = useState(+(1 / 3).toFixed(2));
  const [beta2, setBeta2] = useState(+(2 / 3).toFixed(2));
  const [A2, setA2] = useState(1);
  const [delta2, setDelta2] = useState(0.1);
  const [L2, setL2] = useState(1);
  const [s2, setS2] = useState(0.25);
  const [disableSecondCol, setDisableSecondCol] = useState(true);

  const K = _.range(0, 20, 0.1);
  const K2Y = (k: number) => A * Math.pow(k, alpha) * Math.pow(L, beta);
  const K2Y2 = (k: number) => A2 * Math.pow(k, alpha2) * Math.pow(L2, beta2);

  const Y: number[] = K.map((k) => K2Y(k));
  const Y2: number[] = K.map((k) => K2Y2(k));
  const I: number[] = Y.map((y) => y * s);
  const I2: number[] = Y2.map((y) => y * s2);
  const deltaTimesK: number[] = K.map((k) => k * delta);
  const deltaTimesK2: number[] = K.map((k) => k * delta2);

  const equalibriumK = Math.pow(s * A * Math.pow(L, beta) / delta, 1 / (1 - alpha));
  const equalibriumI = equalibriumK * delta;
  const equalibriumK2 = Math.pow(s2 * A2 * Math.pow(L2, beta2) / delta2, 1 / (1 - alpha2));
  const equalibriumI2 = equalibriumK2 * delta2;

  const [shouldShowModel, setShouldShowModel] = useState(false);
  const [shouldShowModel2, setShouldShowModel2] = useState(false);

  const [KOverTime, setKOverTime] = useState<{ x: number, y: number }[]>([]);
  const [YOverTime, setYOverTime] = useState<{ x: number, y: number }[]>([]);
  const [IOverTime, setIOverTime] = useState<{ x: number, y: number }[]>([]);
  const [COverTime, setCOverTime] = useState<{ x: number, y: number }[]>([]);

  // Shock
  const [shockDirection, setShockDirection] = useState('');
  const [shockSize, setShockSize] = useState('');

  const [shockK, setShockK] = useState(0);
  const [shockI, setShockI] = useState(0);
  const [shockY, setShockY] = useState(0);
  const [shouldShowShock, setShouldShowShock] = useState(false);

  const [shockKOverTime, setShockKOverTime] = useState<{ x: number, y: number }[]>([]);
  const [shockMessage, setShockMessage] = useState('');

  const time = { t0: 0, t1: 20, interval: 0.1 };
  const getValAtTime = (v0: number, v1: number, t: number) => {
    return (v1 === v0) ? v0 : v0 + (v1 - v0) * (t - time.t0) / (time.t1 - time.t0);
  }

  const onShockClick = () => {
    if (shockDirection !== '' && shockSize !== '') {
      setShockMessage('');
      // Reset the second model to the initial state and disable its display,
      // since it is not the point we try to make here.
      setAlpha2(alpha);
      setBeta2(beta);
      setA2(A);
      setDelta2(delta);
      setL2(L);
      setS2(s);
      setDisableSecondCol(true);
      setShouldShowModel2(false);

      // Calculate the shock value and set the state accordingly.
      const shockSizeInPercent = shockSize === 'Small' ? 0.25 : 0.5;
      const calculatedShockK = equalibriumK * (1 + shockSizeInPercent * (shockDirection === 'Positive' ? 1 : -1));

      const KArr: { x: number, y: number }[] = [];
      const shockTime = 5;
      _.range(time.t0, time.t1, time.interval).forEach((t) => {
        if (t < shockTime) {
          KArr.push({ x: t, y: equalibriumK });
        } else {
          const shockKInTime = (shockDirection === 'Positive' ? 1 : -1) * Math.pow(2, (-0.3 * (t - shockTime))) * Math.abs(calculatedShockK - equalibriumK) + equalibriumK;
          KArr.push({ x: t, y: shockKInTime });
        }
      });

      setShouldShowShock(true);
      setShockK(calculatedShockK);
      setShockI(K2Y(calculatedShockK) * s);
      setShockY(K2Y(calculatedShockK));
      setShockKOverTime(KArr);
    } else {
      setShockMessage('Please select a shock direction and size.');
    }
  }

  useEffect(() => {
    onDynamicClick();
  }, []);

  const onShowClick = () => {
    setDisableSecondCol(false);
    setShouldShowModel(!shouldShowModel);
  }

  const onShowClick2 = () => {
    setShouldShowModel2(!shouldShowModel2);
  }

  const equalibraiumVals = {
    K: equalibriumK,
    I: equalibriumI,
    Y: K2Y(equalibriumK),
    C: K2Y(equalibriumK) - equalibriumI,
    K2: equalibriumK2,
    I2: equalibriumI2,
    Y2: K2Y2(equalibriumK2),
    C2: K2Y2(equalibriumK2) - equalibriumI2,
  }



  const onDynamicClick = () => {
    const KArr: { x: number, y: number }[] = [];
    const IArr: { x: number, y: number }[] = [];
    const YArr: { x: number, y: number }[] = [];
    const CArr: { x: number, y: number }[] = [];

    _.range(time.t0, time.t1, time.interval).forEach((t) => {
      const curr_s = getValAtTime(s, s2, t);
      const curr_A = getValAtTime(A, A2, t);
      const curr_L = getValAtTime(L, L2, t);
      const curr_delta = getValAtTime(delta, delta2, t);
      const curr_alpha = getValAtTime(alpha, alpha2, t);
      const curr_beta = getValAtTime(beta, beta2, t);

      const K = Math.pow(curr_s * curr_A * Math.pow(curr_L, curr_beta) / curr_delta, 1 / (1 - curr_alpha));
      const I = K * curr_delta;
      const Y = curr_A * Math.pow(K, curr_alpha) * Math.pow(curr_L, curr_beta);
      const C = Y - I;
      KArr.push({ x: t, y: K });
      IArr.push({ x: t, y: I });
      YArr.push({ x: t, y: Y });
      CArr.push({ x: t, y: C });

    });
    setKOverTime(KArr);
    setIOverTime(IArr);
    setYOverTime(YArr);
    setCOverTime(CArr);

    if (shouldShowShock) {
      onShockClick();
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div>
            <SolowModelInput
              alpha={alpha} setAlpha={setAlpha}
              beta={beta} setBeta={setBeta}
              A={A} setA={setA}
              delta={delta} setDelta={setDelta}
              L={L} setL={setL}
              s={s} setS={setS}
              disabled={false}
            />
            <Button
              style={{ marginTop: '1rem' }}
              variant="outline-primary"
              onClick={onShowClick}
            > {shouldShowModel ? 'Hide' : 'Show'} First <br /> Solow Model </Button>
          </div>
          <div style={{ marginLeft: '1rem' }}>
            <SolowModelInput
              alpha={alpha2} setAlpha={setAlpha2}
              beta={beta2} setBeta={setBeta2}
              A={A2} setA={setA2}
              delta={delta2} setDelta={setDelta2}
              L={L2} setL={setL2}
              s={s2} setS={setS2}
              disabled={disableSecondCol}
            />
            <Button
              style={{ marginTop: '1rem', marginLeft: '1rem' }}
              variant="outline-primary"
              onClick={onShowClick2}
              disabled={disableSecondCol}
            > {shouldShowModel2 ? 'Hide' : 'Show'} Second <br /> Solow Model </Button>
          </div>
        </div>

        <div style={{
          marginTop: '3rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <SolowModelChart
            K={K}
            Y={Y}
            I={I}
            deltaTimesK={deltaTimesK}
            shouldShowModel={shouldShowModel}
            equalibrium={{ x: equalibriumK, y: equalibriumI }}
            Y2={Y2}
            I2={I2}
            deltaTimesK2={deltaTimesK2}
            shouldShowModel2={shouldShowModel2}
            equalibrium2={{ x: equalibriumK2, y: equalibriumI2 }}
            shockK={shockK}
            shockI={shockI}
            shockY={shockY}
            shouldShowShock={shouldShowShock}
          />
          <Table hover striped style={{
            marginLeft: '3rem',
            width: 200,
            height: 200,
            cursor: 'default'
          }}>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">First</th>
                <th scope="col">Second</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">K</th>
                <td>{equalibraiumVals.K.toFixed(2)}</td>
                <td>{shouldShowModel2 ? equalibraiumVals.K2.toFixed(2) : ''}</td>
              </tr>
              <tr>
                <th scope="row">Y</th>
                <td>{equalibraiumVals.Y.toFixed(2)}</td>
                <td>{shouldShowModel2 ? equalibraiumVals.Y2.toFixed(2) : ''}</td>
              </tr>
              <tr>
                <th scope="row">I</th>
                <td>{equalibraiumVals.I.toFixed(2)}</td>
                <td>{shouldShowModel2 ? equalibraiumVals.I2.toFixed(2) : ''}</td>
              </tr>
              <tr>
                <th scope="row">C</th>
                <td>{equalibraiumVals.C.toFixed(2)}</td>
                <td>{shouldShowModel2 ? equalibraiumVals.C2.toFixed(2) : ''}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div>
              <span style={{ marginRight: '1rem' }}> Shock direction: </span>
              <SelectorButtonGroup options={['Positive', 'Negative']} selected={shockDirection} select={setShockDirection} />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <span style={{ marginRight: '3rem' }}> Shock size: </span>
              <SelectorButtonGroup options={['Big', 'Small']} selected={shockSize} select={setShockSize} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '2rem', width: '10rem' }}>
            <Button variant="outline-primary" onClick={onShockClick}>Introduce shock!</Button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '2rem' }}>
          {shockMessage === '' ? <></> : <Alert variant="danger" style={{ width: '30rem' }}>{shockMessage}</Alert>}
        </div>
        <div style={{ marginTop: '5rem' }}>
          <Button variant="outline-primary" onClick={onDynamicClick}> Dynamic Chart </Button>
          <SolowModelDynamicChart KOverTime={KOverTime} IOverTime={IOverTime} YOverTime={YOverTime} COverTime={COverTime} shockKOverTime={shockKOverTime} positiveShock={shockK > equalibriumK} shouldShowShock={shouldShowShock} />
        </div>
      </div>
    </div>
  );
}
