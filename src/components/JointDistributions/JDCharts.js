import React, { useState, useCallback, useMemo } from "react";
import { Row, Col } from 'reactstrap';
import { max } from "mathjs";
import ChildChart from "./ChildChart.js";
import JointChart from "./JointChart.js";
import ParentChart from "./ParentChart.js";

export default function JDCharts({ parentData, childData, jointData }) {
  const [nodeId, setNodeId] = useState();
  const handleMouseMove = useCallback((node) => setNodeId(node.id), [setNodeId]);
  const handleMouseLeave = useCallback(() => setNodeId(), [setNodeId]);
  const getNodeSize = useMemo(() => (node) => (nodeId && (nodeId === node.id)) ? 30 : 8, [nodeId]);

  const maxHeight = 15;

  return (
    <Row>
      <Col>
        <ParentChart
          parentData={parentData}
          getNodeSize={getNodeSize}
          handleMouseMove={handleMouseMove}
          handleMouseLeave={handleMouseLeave}
          maxY={maxHeight}
        />
      </Col>
      <Col>
        <ChildChart
          childData={childData}
          getNodeSize={getNodeSize}
          handleMouseMove={handleMouseMove}
          handleMouseLeave={handleMouseLeave}
          maxY={maxHeight}
        />
      </Col>
      <Col>
        <JointChart
          jointData={jointData}
          getNodeSize={getNodeSize}
          handleMouseMove={handleMouseMove}
          handleMouseLeave={handleMouseLeave}
        />
      </Col>
    </Row>
  )
}
