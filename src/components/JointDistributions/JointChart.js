import React from 'react';
import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";

export default function JointChart({ jointData, getNodeSize, handleMouseMove, handleMouseLeave }) {

  const data = [{id: "data", data: jointData}];

  return (
    <div style={{ height: 500, width: 500, margin: "auto" }}>
      <ResponsiveScatterPlotCanvas
        data={data}
        margin={{ top: 60, right: 10, bottom: 70, left: 70 }}
        xScale={{ type: 'linear', min: 40, max: 100 }}
        xFormat={function(e){return e+" in."}}
        yScale={{ type: 'linear', min: 40, max: 100 }}
        yFormat={function(e) {return e+" in."}}
        tooltip={({node}) => <div>{node.data.formattedX}<br/>{node.data.formattedY}</div>}
        nodeSize={getNodeSize}
        enableGridX={false}
        enableGridY={false}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        axisBottom={{
          orient: 'bottom',
          tickSize: 10,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Parent Height (inches)',
          legendPosition: 'middle',
          legendOffset: 46
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 10,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Child Height (inches)',
          legendPosition: 'middle',
          legendOffset: -60
        }}
      />
    </div>
  );
}