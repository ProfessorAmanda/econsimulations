import { useState, useCallback, useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import JointChart from './JointChart';
import { ResponsiveScatterPlotCanvas } from '@nivo/scatterplot';
import { dataObjectArrayType } from '@/lib/types';

export default function JDCharts({ parentData, childData, jointData }) {
  // these functions synchronize the plots - all three corresponding data points increase in size on mouse over
  const [nodeId, setNodeId] = useState();
  const handleMouseMove = useCallback((node) => setNodeId(node.id), [setNodeId]);
  const handleMouseLeave = useCallback(() => setNodeId(), [setNodeId]);
  const getNodeSize = useMemo(() => (node) => ((nodeId && (nodeId === node.id)) ? 15 : 5), [nodeId]);

  // options common to all three plots
  const sharedOptions = {
    animate: false,
    margin: { top: 60, right: 10, bottom: 70, left: 70 },
    xScale: { type: 'linear', min: 40, max: 100 },
    blendMode: 'darken',
    xFormat: (e) => `${e} in.`,
    nodeSize: getNodeSize,
    enableGridX: false,
    enableGridY: false,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    axisBottom: {
      tickSize: 10,
      legendPosition: 'middle',
      legendOffset: 46
    },
    axisLeft: {
      tickSize: 10,
      legendPosition: 'middle',
      legendOffset: -30
    }
  }

  return (
    <Row>
      <Col style={{ padding: '5px 0px 5px 0px', marginRight: '0px', marginLeft: '-60px' }}>
        <div style={{ height: 368, width: 366, float: 'left', position: 'inline-block', }} aria-label="plot">
          <ResponsiveScatterPlotCanvas
            data={[{ id: 'data', data: parentData }]}
            tooltip={({ node }) => <div><strong>{node.data.formattedX}</strong></div>}
            colors={(node) => ((node.id === nodeId) ? '#910000' : '#ff0000')}
            {...sharedOptions}
            yScale={{ type: 'linear', min: 0, max: 8 }}
            axisBottom={{ ...sharedOptions.axisBottom, legend: 'Parent Height (inches)' }}
            axisLeft={{ ...sharedOptions.axisLeft, legend: 'Count' }}
          />
        </div>
      </Col>
      <Col style={{ padding: '5px 0px 5px 0px', marginLeft: '-55px', marginRight: '0px', width: 'fit-content' }}>
        <div style={{ height: 368, width: 366, float: 'left', position: 'inline-block', marginLeft: '0px', }} aria-label="plot">
          <ResponsiveScatterPlotCanvas
            data={[{ id: 'data', data: childData }]}
            tooltip={({ node }) => <div><strong>{node.data.formattedX}</strong></div>}
            colors={(node) => ((node.id === nodeId) ? '#006607' : '#00ba0c')}
            {...sharedOptions}
            yScale={{ type: 'linear', min: 0, max: 8 }}
            axisBottom={{ ...sharedOptions.axisBottom, legend: 'Child Height (inches)' }}
            axisLeft={{ ...sharedOptions.axisLeft, legend: 'Count' }}
          />
        </div>
      </Col>
      <Col style={{ padding: '5px 0px 5px 0px', marginLeft: '-50px', marginRight: '0px', width: 'fit-content' }}>
        <JointChart
          jointData={jointData}
          sharedOptions={sharedOptions}
          nodeId={nodeId}
        />
      </Col>
    </Row>
  )
}

JDCharts.propTypes = {
  parentData: dataObjectArrayType.isRequired,
  childData: dataObjectArrayType.isRequired,
  jointData: dataObjectArrayType.isRequired,
}
