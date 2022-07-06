import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Col, Row } from 'react-bootstrap';

interface SolowModelDynamicChartProps {
  KOverTime: { x: number, y: number }[];
  YOverTime: { x: number, y: number }[];
  IOverTime: { x: number, y: number }[];
  COverTime: { x: number, y: number }[];
  shockKOverTime: { x: number, y: number }[];
  positiveShock: boolean;
  shouldShowShock: boolean;
}

export default function SolowModelDynamicChart({ KOverTime, YOverTime, IOverTime, COverTime, shockKOverTime, positiveShock, shouldShowShock }: SolowModelDynamicChartProps) {

  const plotOptions = {
    spline: {
      marker: { enabled: false },
      showInLegend: false,
    },
  }

  const animation = { duration: 3000 };

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
    yAxis: { title: { text: 'K' }, min: 0, max: Math.max(5, Math.max(...KOverTime.map(o => o.y))) * 1.5},
    series: [{
      name: 'K',
      data: KOverTime,
      animation 
    }, {
      name: 'Shock',
      data: shockKOverTime,
      animation,
      color: positiveShock ? '#00aa00' : '#aa0000',
      visible: shouldShowShock,
    }],
  }

  const YChart = {
    chart: { type: 'spline' },
    title: { text: 'Y' },
    plotOptions,
    tooltip,
    xAxis: { title: { text: 'Time' } },
    yAxis: { title: { text: 'Y' }, min: 0, max: Math.max(5, Math.max(...YOverTime.map(o => o.y))) },
    series: [{ name: 'Y', data: YOverTime, animation }]
  }

  const IChart = {
    chart: { type: 'spline' },
    title: { text: 'I' },
    plotOptions,
    tooltip,
    xAxis: { title: { text: 'Time' } },
    yAxis: { title: { text: 'I' }, min: 0, max: Math.max(5, Math.max(...IOverTime.map(o => o.y))) },
    series: [{ name: 'I', data: IOverTime, animation }]
  }

  const CChart = {
    chart: { type: 'spline' },
    title: { text: 'C' },
    plotOptions,
    tooltip,
    xAxis: { title: { text: 'Time' } },
    yAxis: { title: { text: 'C' }, min: 0, max: Math.max(5, Math.max(...COverTime.map(o => o.y))) },
    series: [{ name: 'C', data: COverTime, animation }]
  }


  return (
    <div>
      <Row>
        <Col lg={{ span: 4, offset: 2 }}>
          <HighchartsReact highcharts={Highcharts} options={KChart} />
        </Col>
        <Col lg={{ span: 4, offset: 0 }}>
          <HighchartsReact highcharts={Highcharts} options={YChart} />
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 4, offset: 2 }}>
          <HighchartsReact highcharts={Highcharts} options={IChart} />
        </Col>
        <Col lg={{ span: 4, offset: 0 }}>
          <HighchartsReact highcharts={Highcharts} options={CChart} />
        </Col>
      </Row>
    </div>
  )
}