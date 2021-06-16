/*

  A container component to hold the three charts for the Joint Distribution simulation
  Note that I have used Nivo for these plots instead of HighCharts - was easier to synchronize

  props:
    parentData, childData, jointData - array[Object{x, y}]

*/
import React, { useState, useCallback, useMemo } from "react";
import { Row, Col } from 'reactstrap';
import { max, min } from "mathjs";
import JointChart from "./JointChart.js";
import _ from "lodash";
import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";

export default function JDCharts({ parentData, childData, jointData }) {
  // these functions synchronize the plots - all three corresponding data points increase in size on mouse over
  const [nodeId, setNodeId] = useState();
  const handleMouseMove = useCallback((node) => setNodeId(node.id), [setNodeId]);
  const handleMouseLeave = useCallback(() => setNodeId(), [setNodeId]);
  const getNodeSize = useMemo(() => (node) => (nodeId && (nodeId === node.id)) ? 30 : 8, [nodeId]);

  const maxCount = max(...parentData.map((pt) => pt.y), ...childData.map((pt) => pt.y));
  const minX = _.floor(min(...parentData.map((pt) => pt.x), ...childData.map((pt) => pt.x)), -1);
  const maxX = _.ceil(max(...parentData.map((pt) => pt.x), ...childData.map((pt) => pt.x)), -1);

  // options common to all three plots
  const sharedOptions = {
    margin: { top: 60, right: 10, bottom: 70, left: 70 },
    xScale: { type: 'linear', min: min(40, minX), max: max(100, maxX) },
    yScale: { type: 'linear', min: 0, max: maxCount },
    xFormat: (e) => e + " in.",
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
      tickValues: _.range(0, maxCount + 1, 1),
      legendPosition: 'middle',
      legendOffset: -60
    }
  }

  return (
    <Row>
      <Col style={{ padding:"5px 0px 5px 0px"}}>
        <div style={{ height: 300, width: 300, float:"left", position:"inline-block"}}>
          <ResponsiveScatterPlotCanvas
            data={[{id: "data", data: parentData}]}
            tooltip={({node}) => <div><strong>{node.data.formattedX}</strong></div>}
            colors={{"scheme": "set1"}}
            {...sharedOptions}
            axisBottom={{...sharedOptions.axisBottom, legend: 'Parent Height (inches)'}}
            axisLeft={{...sharedOptions.axisLeft, legend: 'Count'}}
          />
        </div>
      </Col>
      <Col style={{ padding:"5px 0px 5px 0px"}}>
        <div style={{ height: 300, width: 300, float:"left", position:"inline-block", marginLeft:"5px"}}>
          <ResponsiveScatterPlotCanvas
            data={[{id: "data", data: childData}]}
            tooltip={({node}) => <div><strong>{node.data.formattedX}</strong></div>}
            colors={{"scheme": "set2"}}
            {...sharedOptions}
            axisBottom={{...sharedOptions.axisBottom, legend: 'Child Height (inches)'}}
            axisLeft={{...sharedOptions.axisLeft, legend: 'Count'}}
          />
        </div>
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
