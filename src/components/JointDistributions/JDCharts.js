/*

  A container component to hold the three charts for the Joint Distribution simulation
  Note that I have used Nivo for these plots instead of HighCharts - was easier to synchronize

  props:
    parentData, childData, jointData - array[Object{x, y}]

*/
import React, { useState, useCallback, useMemo } from "react";
import { Row, Col } from 'reactstrap';
import { max } from "mathjs";
import ChildChart from "./ChildChart.js";
import JointChart from "./JointChart.js";
import ParentChart from "./ParentChart.js";

export default function JDCharts({ parentData, childData, jointData }) {
  // these functions synchronize the plots - all three corresponding data points increase in size on mouse over
  const [nodeId, setNodeId] = useState();
  const handleMouseMove = useCallback((node) => setNodeId(node.id), [setNodeId]);
  const handleMouseLeave = useCallback(() => setNodeId(), [setNodeId]);
  const getNodeSize = useMemo(() => (node) => (nodeId && (nodeId === node.id)) ? 30 : 8, [nodeId]);

  // options common to all three plots
  const sharedOptions = {
    margin: { top: 60, right: 10, bottom: 70, left: 70 },
    xScale: { type: 'linear', min: 40, max: 100 },
    xFormat: function(e){return e+" in."},
    nodeSize: getNodeSize,
    enableGridX: false,
    enableGridY: false,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    axisBottom: {
      orient: 'bottom',
      tickSize: 10,
      tickPadding: 5,
      tickRotation: 0,
      legendPosition: 'middle',
      legendOffset: 46
    },
    axisLeft: {
      orient: 'left',
      tickSize: 10,
      tickPadding: 5,
      tickRotation: 0,
      legendPosition: 'middle',
      legendOffset: -60
    }
  }

  const maxHeight = max(...parentData.map((pt) => pt.y), ...childData.map((pt) => pt.y)) + 1;

  return (
    <Row>
      <Col>
        <ParentChart
          parentData={parentData}
          sharedOptions={sharedOptions}
          maxY={maxHeight}
        />
      </Col>
      <Col>
        <ChildChart
          childData={childData}
          sharedOptions={sharedOptions}
          maxY={maxHeight}
        />
      </Col>
      <Col>
        <JointChart
          jointData={jointData}
          sharedOptions={sharedOptions}
        />
      </Col>
    </Row>
  )
}
