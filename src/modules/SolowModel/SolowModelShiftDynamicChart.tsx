import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';

interface SolowModelShiftDynamicChartProps {
  KOverTime: { x: number, y: number }[];
  YOverTime: { x: number, y: number }[];
  IOverTime: { x: number, y: number }[];
  COverTime: { x: number, y: number }[];
}

export default function SolowModelShiftDynamicChart({ KOverTime, YOverTime, IOverTime, COverTime }: SolowModelShiftDynamicChartProps) {

  const [shouldAnimate, setShouldAnimate] = useState(true);

  const plotOptions = {
    spline: {
      marker: { enabled: false },
      showInLegend: false,
    },
  }

  const animation = { duration: 2000, complete: () => {
    setShouldAnimate(false);
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
    series: [{ name: 'K', data: KOverTime, animation: shouldAnimate ? animation : false }]
  }

  const YChart = {
    chart: { type: 'spline' },
    title: { text: 'Y' },
    plotOptions,
    tooltip,
    xAxis: { title: { text: 'Time' } },
    yAxis: { title: { text: 'Y' }, min: 0, max: Math.max(5, Math.max(...YOverTime.map(o => o.y))) },
    series: [{ name: 'Y', data: YOverTime, animation: shouldAnimate ? animation : false }]
  }

  const IChart = {
    chart: { type: 'spline' },
    title: { text: 'I' },
    plotOptions,
    tooltip,
    xAxis: { title: { text: 'Time' } },
    yAxis: { title: { text: 'I' }, min: 0, max: Math.max(5, Math.max(...IOverTime.map(o => o.y))) },
    series: [{ name: 'I', data: IOverTime, animation: shouldAnimate ? animation : false }]
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