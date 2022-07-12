import { useEffect, useState } from 'react';
import SolowModelInput from './SolowModelInput';
import _ from 'lodash';
import SolowModelShiftChart from './SolowModelShiftChart';
import { Button, Table, } from 'react-bootstrap';
import SolowModelShiftDynamicChart from './SolowModelShiftDynamicChart';

export default function SolowModelShift() {
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

  // Dynamic
  const [KOverTime, setKOverTime] = useState<{ x: number, y: number }[]>([]);
  const [YOverTime, setYOverTime] = useState<{ x: number, y: number }[]>([]);
  const [IOverTime, setIOverTime] = useState<{ x: number, y: number }[]>([]);
  const [COverTime, setCOverTime] = useState<{ x: number, y: number }[]>([]);


  const time = { t0: 0, t1: 20, interval: 0.1 };
  const getValAtTime = (v0: number, v1: number, t: number) => {
    return (v1 === v0) ? v0 : v0 + (v1 - v0) * (t - time.t0) / (time.t1 - time.t0);
  }

  const equalibriumVals = {
    K: equalibriumK,
    I: equalibriumI,
    Y: K2Y(equalibriumK),
    C: K2Y(equalibriumK) - equalibriumI,
    K2: equalibriumK2,
    I2: equalibriumI2,
    Y2: K2Y2(equalibriumK2),
    C2: K2Y2(equalibriumK2) - equalibriumI2,
  }

  useEffect(() => {
    updateDynamicData();
    //updateShockData();
    refreshDynamic();
  }, []);

  useEffect(() => {
    updateDynamicData();
  }, [alpha, beta, A, delta, L, s, alpha2, beta2, A2, delta2, L2, s2]);

  const onShowClick = () => {
    setDisableSecondCol(false);
    setShouldShowModel(!shouldShowModel);
  }

  const onShowClick2 = () => {
    setShouldShowModel2(!shouldShowModel2);
  }

  const updateDynamicData = () => {
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
  }

  const dynamicChart = (<SolowModelShiftDynamicChart KOverTime={KOverTime} IOverTime={IOverTime} YOverTime={YOverTime} COverTime={COverTime} />);

  const [renderCharts, setRenderCharts] = useState<React.ReactElement>(dynamicChart);

  // This is a workaround for animation bug in Highcharts.
  // Without this 'force update', the animation does not display on each refresh.
  const refreshDynamic = () => {
    setRenderCharts(<div></div>);
    setTimeout(() => {
      setRenderCharts(dynamicChart);
    }, 1);
  }

  return (
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
        <SolowModelShiftChart
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
              <td>{equalibriumVals.K.toFixed(2)}</td>
              <td>{shouldShowModel2 ? equalibriumVals.K2.toFixed(2) : ''}</td>
            </tr>
            <tr>
              <th scope="row">Y</th>
              <td>{equalibriumVals.Y.toFixed(2)}</td>
              <td>{shouldShowModel2 ? equalibriumVals.Y2.toFixed(2) : ''}</td>
            </tr>
            <tr>
              <th scope="row">I</th>
              <td>{equalibriumVals.I.toFixed(2)}</td>
              <td>{shouldShowModel2 ? equalibriumVals.I2.toFixed(2) : ''}</td>
            </tr>
            <tr>
              <th scope="row">C</th>
              <td>{equalibriumVals.C.toFixed(2)}</td>
              <td>{shouldShowModel2 ? equalibriumVals.C2.toFixed(2) : ''}</td>
            </tr>
          </tbody>
        </Table>
      </div>


      <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div style={{ width: '50rem'}}>
          <Button variant="outline-primary" onClick={refreshDynamic}> Refresh dynamic charts </Button>
          <div style={{ height: '60rem' }}>
            {renderCharts}
          </div>
        </div>
      </div>

    </div>
  );
}