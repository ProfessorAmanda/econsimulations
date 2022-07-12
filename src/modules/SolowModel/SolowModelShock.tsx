import { useEffect, useState } from 'react';
import SolowModelInput from './SolowModelInput';
import _ from 'lodash';
import SolowModelShockChart from './SolowModelShockChart';
import { Button, Form, Table, } from 'react-bootstrap';
import SolowModelShockDynamicChart from './SolowModelShockDynamicChart';
import SelectorButtonGroup from 'src/components/SelectorButtonGroup';

export default function SolowModelShock() {
  const [alpha, setAlpha] = useState(+(1 / 3).toFixed(2));
  const [beta, setBeta] = useState(+(2 / 3).toFixed(2));
  const [A, setA] = useState(1);
  const [delta, setDelta] = useState(0.1);
  const [L, setL] = useState(1);
  const [s, setS] = useState(0.25);

  const K = _.range(0, 20, 0.1);
  const K2Y = (k: number) => A * Math.pow(k, alpha) * Math.pow(L, beta);

  const Y: number[] = K.map((k) => K2Y(k));
  const I: number[] = Y.map((y) => y * s);
  const deltaTimesK: number[] = K.map((k) => k * delta);

  const equalibriumK = Math.pow(s * A * Math.pow(L, beta) / delta, 1 / (1 - alpha));
  const equalibriumI = equalibriumK * delta;

  const [shouldShowModel, setShouldShowModel] = useState(false);

  // Dynamic
  const [KOverTime, setKOverTime] = useState<{ x: number, y: number }[]>([]);
  const [YOverTime, setYOverTime] = useState<{ x: number, y: number }[]>([]);
  const [IOverTime, setIOverTime] = useState<{ x: number, y: number }[]>([]);
  const [COverTime, setCOverTime] = useState<{ x: number, y: number }[]>([]);

  // Shock
  const [shockDirection, setShockDirection] = useState('Positive');
  const [shockSize, setShockSize] = useState('Small');

  const [shockK, setShockK] = useState(0);
  const [shockI, setShockI] = useState(0);
  const [shockY, setShockY] = useState(0);
  const [shouldShowShock, setShouldShowShock] = useState(false);

  const [shockKOverTime, setShockKOverTime] = useState<{ x: number, y: number }[]>([]);
  const [shockYOverTime, setShockYOverTime] = useState<{ x: number, y: number }[]>([]);
  const [shockIOverTime, setShockIOverTime] = useState<{ x: number, y: number }[]>([]);

  const [hoverKVal, setHoverKVal] = useState(shockK);

  useEffect(() => {
    setShockI(K2Y(hoverKVal) * s);
    setShockY(K2Y(hoverKVal));
    console.log("new hoverKVal: ", hoverKVal);
  }, [hoverKVal]);



  const time = { t0: 0, t1: 20, interval: 0.1 };
  const getValAtTime = (v0: number, v1: number, t: number) => {
    return (v1 === v0) ? v0 : v0 + (v1 - v0) * (t - time.t0) / (time.t1 - time.t0);
  }

  const equalibriumVals = {
    K: equalibriumK,
    I: equalibriumI,
    Y: K2Y(equalibriumK),
    C: K2Y(equalibriumK) - equalibriumI
  }

  useEffect(() => {
    updateShockData();
    refreshDynamic();
  }, []);

  useEffect(() => {
    updateDynamicData();
  }, [alpha, beta, A, delta, L, s]);

  useEffect(() => {
    updateShockData();
  }, [shockDirection, shockSize]);

  useEffect(() => {
    setHoverKVal(shockK);
  }, [shockK]);

  useEffect(() => {
    refreshDynamic();
  }, [shouldShowShock]);

  const onShowClick = () => {
    setShouldShowModel(!shouldShowModel);
  }

  const updateShockData = () => {
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

    const YArr = KArr.map((k) => ({ x: k.x, y: K2Y(k.y) }));
    const IArr = YArr.map((y) => ({ x: y.x, y: y.y * s }));

    setShockK(calculatedShockK);
    setShockI(K2Y(calculatedShockK) * s);
    setShockY(K2Y(calculatedShockK));
    setShockKOverTime(KArr);
    setShockYOverTime(YArr);
    setShockIOverTime(IArr);
  }

  const updateDynamicData = () => {
    
    const K = Math.pow(s * A * Math.pow(L, beta) / delta, 1 / (1 - alpha));
    const I = K * delta;
    const Y = A * Math.pow(K, alpha) * Math.pow(L, beta);
    const C = Y - I;

    const KArr = [{ x: time.t0, y: K }, { x: time.t1, y: K }];
    const YArr = [{ x: time.t0, y: Y }, { x: time.t1, y: Y }];
    const IArr = [{ x: time.t0, y: I }, { x: time.t1, y: I }];
    const CArr = [{ x: time.t0, y: C }, { x: time.t1, y: C }];

    setKOverTime(KArr);
    setIOverTime(IArr);
    setYOverTime(YArr);
    setCOverTime(CArr);
  }

  const dynamicChart = (<SolowModelShockDynamicChart KOverTime={KOverTime} IOverTime={IOverTime} YOverTime={YOverTime} COverTime={COverTime} shockKOverTime={shockKOverTime} shockYOverTime={shockYOverTime} shockIOverTime={shockIOverTime} positiveShock={shockK > equalibriumK} shouldShowShock={shouldShowShock} updateHoverKValue={setHoverKVal} shockKVal={shockK} />);

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
          > {shouldShowModel ? 'Hide' : 'Show'} Solow Model </Button>
        </div>
      </div>

      <div style={{
        marginTop: '3rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }}>
        <SolowModelShockChart
          K={K}
          Y={Y}
          I={I}
          deltaTimesK={deltaTimesK}
          shouldShowModel={shouldShowModel}
          equalibrium={{ x: equalibriumK, y: equalibriumI }}
          shockK={hoverKVal}
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
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">K</th>
              <td>{equalibriumVals.K.toFixed(2)}</td>
            </tr>
            <tr>
              <th scope="row">Y</th>
              <td>{equalibriumVals.Y.toFixed(2)}</td>
            </tr>
            <tr>
              <th scope="row">I</th>
              <td>{equalibriumVals.I.toFixed(2)}</td>
            </tr>
            <tr>
              <th scope="row">C</th>
              <td>{equalibriumVals.C.toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
      </div>


      <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div style={{ width: '50rem' }}>
          <Button variant="outline-primary" onClick={refreshDynamic}> Refresh dynamic charts </Button>
          <div style={{ height: '60rem' }}>
            {renderCharts}
          </div>
        </div>
        <div style={{ marginTop: '3rem', marginLeft: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div>
              <span style={{ marginRight: '1rem' }}> Shock direction: </span>
              <SelectorButtonGroup options={['Positive', 'Negative']} selected={shockDirection} select={setShockDirection} />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <span style={{ marginRight: '3rem' }}> Shock size: </span>
              <SelectorButtonGroup options={['Big', 'Small']} selected={shockSize} select={setShockSize} />
            </div>
            <div style={{ marginTop: '1rem', width: '100%' }}>
              <Button variant="outline-primary" onClick={() => {
                setShouldShowShock(!shouldShowShock);
                refreshDynamic();
              }}>
                {shouldShowShock ? 'Remove' : 'Apply'} shock
              </Button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}