/*

  Displays a Nivo scatterplot for the child data

  props:
    childData     - array[Object{x, y}]
    sharedOptions - object

*/
import React from 'react';
import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";

export default function ChildChart({ childData, sharedOptions }) {

  const data = [{id: "data", data: childData}];

  return (
    <div style={{ height: 500, width: 500, margin: "auto" }}>
      <ResponsiveScatterPlotCanvas
        data={data}
        yScale={{ type: 'linear', min: 0, max: maxY }}
        tooltip={({node}) => <div><strong>{node.data.formattedX}</strong></div>}
        colors={{"scheme": "set2"}}
        {...sharedOptions}
        axisBottom={{...sharedOptions.axisBottom, legend: 'Child Height (inches)'}}
        axisLeft={{...sharedOptions.axisLeft, legend: 'Count'}}
      />
    </div>
  );
}
