import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';

interface SolowModelDynamicChartProps {
  KOverTime: { x: number, y: number }[];
  YOverTime: { x: number, y: number }[];
  IOverTime: { x: number, y: number }[];
  COverTime: { x: number, y: number }[];
  shockKOverTime: { x: number, y: number }[];
  shockYOverTime: { x: number, y: number }[];
  shockIOverTime: { x: number, y: number }[];
  positiveShock: boolean;
  shouldShowShock: boolean;
  updateHoverKValue: (v: number) => void;
  shockKVal: number;
}

export default function SolowModelDynamicChart({ KOverTime, YOverTime, IOverTime, COverTime, shockKOverTime, shockYOverTime, shockIOverTime, positiveShock, shouldShowShock, updateHoverKValue, shockKVal }: SolowModelDynamicChartProps) {

  const [hoverKVal, setHoverKVal] = useState(shockKVal);
  const [hoverTimeVal, setHoverTimeVal] = useState(5);

  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    updateHoverKValue(hoverKVal);
  }, [hoverKVal, hoverTimeVal]);

  const plotOptions = {
    spline: {
      marker: { enabled: false },
      showInLegend: false,
    },
  }

  const animation = { duration: 2000, complete: () => {
    setShouldAnimate(false);
    console.log('animation complete'); 
  }};

  const tooltip = {
    headerFormat: '<b>{series.name}</b><br>',
    pointFormat: '{point.y:.2f}',
  }
  const KChart = {
    chart: { type: 'spline' },
    title: { text: 'K' },
    plotOptions,
    tooltip,
    xAxis: { title: { text: 'Time' } },
    yAxis: { title: { text: 'K' }, min: 0, max: Math.max(5, Math.max(...KOverTime.map(o => o.y))) * 1.5 },
    series: [{
      name: 'K',
      data: KOverTime,
      animation: shouldAnimate ? animation : false
    }, {
      name: 'Shock',
      data: shockKOverTime,
      animation: shouldAnimate ? animation : false,
      color: positiveShock ? '#00aa00' : '#aa0000',
      visible: shouldShowShock,
      point: {
        events: {
          mouseOver: (event: any) => {
            if (!shouldAnimate) {
              setHoverKVal(event.target.y);
              setHoverTimeVal(event.target.x);
            }
          }
        }
      }
    }],
  }

  const YChart = {
    chart: { type: 'spline' },
    title: { text: 'Y' },
    plotOptions,
    tooltip,
    xAxis: { title: { text: 'Time' } },
    yAxis: { title: { text: 'Y' }, min: 0, max: Math.max(5, Math.max(...YOverTime.map(o => o.y))) },
    series: [{
      name: 'Y',
      data: YOverTime,
      animation: shouldAnimate ? animation : false,
    }, {
      name: 'Shock',
      data: shockYOverTime.map(o => (o.x === hoverTimeVal ? {
        x: o.x,
        y: o.y,
        marker: { enabled: true, radius: 5, fillColor: '#ffff00' }
      } : {
        x: o.x,
        y: o.y,
        marker: { enabled: false }
      })),
      animation: shouldAnimate ? animation : false,
      color: positiveShock ? '#00aa00' : '#aa0000',
      visible: shouldShowShock,
    }]
  }

  const IChart = {
    chart: { type: 'spline' },
    title: { text: 'I' },
    plotOptions,
    tooltip,
    xAxis: { title: { text: 'Time' } },
    yAxis: { title: { text: 'I' }, min: 0, max: Math.max(5, Math.max(...IOverTime.map(o => o.y))) },
    series: [{
      name: 'I',
      data: IOverTime,
      animation: shouldAnimate ? animation : false
    }, {
      name: 'Shock',
      data: shockIOverTime,
      animation: shouldAnimate ? animation : false,
      color: positiveShock ? '#00aa00' : '#aa0000',
      visible: shouldShowShock,
    }]
  }

  const CChart = {
    chart: { type: 'spline' },
    title: { text: 'C' },
    plotOptions,
    tooltip,
    xAxis: { title: { text: 'Time' } },
    yAxis: { title: { text: 'C' }, min: 0, max: Math.max(5, Math.max(...COverTime.map(o => o.y))) },
    series: [{ name: 'C', data: COverTime, animation: shouldAnimate ? animation : false }]
  }


  return (
    <div>
      <Row>
        <Col>
          <HighchartsReact highcharts={Highcharts} options={KChart} />
        </Col>
        <Col>
          <HighchartsReact highcharts={Highcharts} options={YChart} />
        </Col>
      </Row>
      <Row>
        <Col>
          <HighchartsReact highcharts={Highcharts} options={IChart} />
        </Col>
        <Col>
          <HighchartsReact highcharts={Highcharts} options={CChart} />
        </Col>
      </Row>
    </div>
  )
}