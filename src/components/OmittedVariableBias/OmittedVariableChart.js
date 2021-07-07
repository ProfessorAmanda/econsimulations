import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official"
import PropTypes from "prop-types";
import { dataObjectArrayType } from "../../lib/types.js";

export default function OmittedVariableChart({ dataPoints, naiveLine, correctedLine }) {
  const [myChart, setMyChart] = useState({});

  useEffect(() => {
    const newChart = {
      chart: {
        type: "scatter",
        zoomtype: "xy"
      },
      title: {
        text: "Study Hours vs. Test Score"
      },
      xAxis: {
        min: 0,
        max: 10,
        title : {
          text: "Study Hours"
        }
      },
      yAxis: {
        min: 20,
        max: 100,
        title: {
          text: "Test Score"
        }
      },
      series: [
        {
          type: "scatter",
          data: dataPoints,
          name: "Test Score",
          color: "#33A5FF"
        },
        {
          type: "line",
          data: naiveLine,
          name: "Naive Regression",
          color: "#E30404",
          label: {
            enabled: false
          }
        },
        {
          type: "line",
          data: correctedLine,
          name: "Corrected Regression",
          color: "#2AC208",
          label: {
            enabled: false
          }
        }
      ]
    }

    setMyChart(newChart);
  }, [dataPoints, naiveLine, correctedLine]);

  return (
    <HighchartsReact highcharts={Highcharts} options={myChart}/>
  );
}

OmittedVariableChart.propTypes = {
  dataPoints: dataObjectArrayType.isRequired,
  naiveLine: PropTypes.arrayOf(PropTypes.number),
  correctedLine: PropTypes.arrayOf(PropTypes.number)
}
