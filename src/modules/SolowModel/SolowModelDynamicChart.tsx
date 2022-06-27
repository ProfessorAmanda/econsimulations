import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import _ from "lodash";
import { solowValsOverTime } from 'src/lib/ts-types';
import { Col, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function SolowModelDynamicChart({ valsOverTime, onDynamicClick }: { valsOverTime: solowValsOverTime, onDynamicClick: () => void }) {

  const [myCharts, setMyCharts] = useState<{ K: Object, Y: Object, I: Object, C: Object }>({ K: {}, Y: {}, I: {}, C: {} });

  const plotOptions = {
    spline: {
      marker: { enabled: false },
      showInLegend: false,
    },
  }

  const animation = { duration: 3000 };

  const tooltip = {
    headerFormat: '<b>{series.name}</b><br>',
    pointFormat: ''
  }

  useEffect(() => {
    const KChart = {
      chart: { type: "spline" },
      title: { text: "K" },
      plotOptions: plotOptions,
      tooltip: tooltip,
      xAxis: { title: { text: "Time" } },
      yAxis: { title: { text: "K" }, min: 0, max: Math.max(5, Math.max(...valsOverTime.K.map(o => o.y))) },
      series: [{ name: "K", data: valsOverTime.K, animation: animation }]
    }

    const YChart = {
      chart: { type: "spline" },
      title: { text: "Y" },
      plotOptions: plotOptions,
      tooltip: tooltip,
      xAxis: { title: { text: "Time" } },
      yAxis: { title: { text: "Y" }, min: 0, max: Math.max(5, Math.max(...valsOverTime.Y.map(o => o.y))) },
      series: [{ name: "Y", data: valsOverTime.Y, animation: animation }]
    }

    const IChart = {
      chart: { type: "spline" },
      title: { text: "I" },
      plotOptions: plotOptions,
      tooltip: tooltip,
      xAxis: { title: { text: "Time" } },
      yAxis: { title: { text: "I" }, min: 0, max: Math.max(5, Math.max(...valsOverTime.I.map(o => o.y))) },
      series: [{ name: "I", data: valsOverTime.I, animation: animation }]
    }

    const CChart = {
      chart: { type: "spline" },
      title: { text: "C" },
      plotOptions: plotOptions,
      tooltip: tooltip,
      xAxis: { title: { text: "Time" } },
      yAxis: { title: { text: "C" }, min: 0, max: Math.max(5, Math.max(...valsOverTime.C.map(o => o.y))) },
      series: [{ name: "C", data: valsOverTime.C, animation: animation }]
    }
    setMyCharts({ K: KChart, Y: YChart, I: IChart, C: CChart });
  }, [valsOverTime]);

  const onButtonClick = () => {
    setMyCharts({ K: {}, Y: {}, I: {}, C: {} });
    onDynamicClick();
  }


  return (
    <div>
      <Button
        style={{ marginTop: '1rem' }}
        variant='outline-primary'
        onClick={onButtonClick}
      > Dynamic </Button>
      <Row>
        <Col>
          <HighchartsReact highcharts={Highcharts} options={myCharts.K} />
        </Col>
        <Col>
          <HighchartsReact highcharts={Highcharts} options={myCharts.Y} />
        </Col>
      </Row>
      <Row>
        <Col>
          <HighchartsReact highcharts={Highcharts} options={myCharts.I} />
        </Col>
        <Col>
          <HighchartsReact highcharts={Highcharts} options={myCharts.C} />
        </Col>
      </Row>
      
    </div>
  )
}