/*

  Displays a Nivo scatterplot for the joint distribution data

  props:
    jointData     - array[Object{x, y}]
    sharedOptions - object

*/
import React from 'react';
import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";
import { max, min } from 'mathjs';

export default function JointChart({ jointData, sharedOptions }) {

  const data = [{id: "data", data: jointData}];

  const maxHeight = max(...jointData.map((pt) => pt.x), ...jointData.map((pt) => pt.y)) + 2;
  const minHeight = min(...jointData.map((pt) => pt.x), ...jointData.map((pt) => pt.y)) - 2;

  return (
    <div style={{ height: 500, width: 500, margin: "auto" }}>
      <ResponsiveScatterPlotCanvas
        {...sharedOptions}
        colors={{"scheme": "category10"}}
        data={data}
        // TODO: do we want responsive axes?
        yScale={{ type: 'linear', min: minHeight, max: maxHeight }}
        xScale={{ type: 'linear', min: minHeight, max: maxHeight }}
        yFormat={function(e) {return e+" in."}}
        tooltip={({node}) => <div>{node.data.formattedX}<br/>{node.data.formattedY}</div>}
        axisBottom={{...sharedOptions.axisBottom, legend: 'Parent Height (inches)'}}
        axisLeft={{...sharedOptions.axisLeft, legend: 'Child Height (inches)'}}
      />
    </div>
  );
}
