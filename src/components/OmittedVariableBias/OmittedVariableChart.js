import { dataObjectArrayType } from '../../lib/types.js';
import ScatterPlot from '../ScatterPlot.js';

export default function OmittedVariableChart({ dataPoints, naiveLine, correctedLine }) {

  const series = [
    {
      type: 'scatter',
      data: dataPoints,
      name: 'Test Score',
      color: '#33A5FF'
    },
    {
      type: 'line',
      data: naiveLine,
      name: 'Naive Regression',
      color: '#E30404',
      label: {
        enabled: false
      }
    },
    {
      type: 'line',
      data: correctedLine,
      name: 'Corrected Regression',
      color: '#2AC208',
      label: {
        enabled: false
      }
    }
  ]

  return (
    <ScatterPlot
      series={series}
      title="Study Hours vs. Test Scores"
      zoom
      xMin={0}
      xMax={10}
      yMin={20}
      yMax={100}
      xLabel="Study Hours"
      yLabel="Test Score"
    />
  );
}

OmittedVariableChart.propTypes = {
  dataPoints: dataObjectArrayType.isRequired,
  naiveLine: dataObjectArrayType,
  correctedLine: dataObjectArrayType
}
