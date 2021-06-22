/*

  Displays a Nivo scatterplot for the joint distribution data

*/
import React from 'react';
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { jointDistributionsDataType } from '../../lib/types';

export default function JointChart({ jointData, sharedOptions, nodeId }) {

  const data = [{id: "data", data: jointData}];

  return (
    <Col style={{ padding:"5px 0px 5px 0px", marginLeft:"-50px", marginRight:"0px", width: "fit-content"}}>
    <div style={{ height: 368, width: 366, position:"inline-block", float:"right", marginLeft:"0px",}}>
      <ResponsiveScatterPlot
        {...sharedOptions}
        colors={(node) => (nodeId && (node.id === nodeId)) ? "#0053a1" : "#00b3ff"}
        data={data}
        yScale={{ type: 'linear', min: 40, max: 100 }}
        yFormat={(e) => e + " in."}
        tooltip={({node}) =>
          <div>
            Parent Height: <strong>{node.data.formattedX}</strong>
            <br/>
            Child Height: <strong>{node.data.formattedY}</strong>
          </div>
        }
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
    </Col>
  );
}

JointChart.propTypes = {
  jointData: jointDistributionsDataType.isRequired,
  sharedOptions: PropTypes.objectOf(PropTypes.any).isRequired,
  nodeId: PropTypes.string,
}
