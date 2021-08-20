import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import PropTypes from 'prop-types';
import { dataObjectArrayType } from '../../lib/types.js';

export default function JointChart({ jointData, sharedOptions, nodeId }) {
  return (
    <div style={{ height: 368, width: 366, position: 'inline-block', float: 'right', marginLeft: '0px', }} aria-label="plot">
      <ResponsiveScatterPlot
        {...sharedOptions}
        colors={(node) => ((nodeId && (node.id === nodeId)) ? '#0053a1' : '#00b3ff')}
        data={[{ id: 'data', data: jointData }]}
        yScale={{ type: 'linear', min: 40, max: 100 }}
        yFormat={(e) => `${e} in.`}
        tooltip={({ node }) => (
          <div>
            Parent Height: <strong>{node.data.formattedX}</strong>
            <br/>
            Child Height: <strong>{node.data.formattedY}</strong>
          </div>
        )}
        axisBottom={{
          tickSize: 10,
          legendPosition: 'middle',
          legendOffset: 46,
          legend: 'Parent Height (inches)'
        }}
        axisLeft={{
          tickSize: 10,
          legendPosition: 'middle',
          legendOffset: -38,
          legend: 'Child Height (inches)'
        }}
      />
    </div>
  );
}

JointChart.propTypes = {
  jointData: dataObjectArrayType.isRequired,
  sharedOptions: PropTypes.objectOf(PropTypes.any).isRequired,
  nodeId: PropTypes.string,
}
