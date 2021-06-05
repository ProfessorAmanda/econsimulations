/*

  Displays a Nivo scatterplot for the parent data

  props:
    parentData    - array[Object{x, y}]
    sharedOptions - object
    maxY          - number

*/
import React from 'react';
import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";

export default function ParentChart({ parentData, sharedOptions, maxY }) {

  const data = [{id: "data", data: parentData}];

  return (
    <div style={{ height: 500, width: 500, margin: "auto" }}>
      <ResponsiveScatterPlotCanvas
        data={data}
        yScale={{ type: 'linear', min: 0, max: maxY }}
        tooltip={({node}) => <div>{node.data.formattedX}</div>}
        colors={{"scheme": "set1"}}
        {...sharedOptions}
        axisBottom={{...sharedOptions.axisBottom, legend: 'Parent Height (inches)'}}
        axisLeft={{...sharedOptions.axisLeft, legend: 'Count'}}
      />
    </div>
  );
}
