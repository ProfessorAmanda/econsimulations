import React from 'react';
import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";

export default function ChildChart({ childData, getNodeSize, handleMouseMove, handleMouseLeave, maxY }) {

  const data = [{id: "data", data: childData}];

  return (
    <div style={{ height: 500, width: 500, margin: "auto" }}>
      <ResponsiveScatterPlotCanvas
        data={data}
        margin={{ top: 60, right: 10, bottom: 70, left: 70 }}
        xScale={{ type: 'linear', min: 40, max: 100 }}
        xFormat={function(e){return e+" in."}}
        yScale={{ type: 'linear', min: 0, max: maxY }}
        nodeSize={getNodeSize}
        tooltip={({node}) => <div>{node.data.formattedX}</div>}
        enableGridX={false}
        enableGridY={false}
        gridXValues={[40, 60, 80, 100]}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        axisBottom={{
          orient: 'bottom',
          tickSize: 10,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Child Height (inches)',
          legendPosition: 'middle',
          legendOffset: 46
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 10,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Count',
          legendPosition: 'middle',
          legendOffset: -60
        }}
      />
    </div>
  );
}
