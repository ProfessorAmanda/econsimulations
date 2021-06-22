// Table of data points
import React from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';

export default function PopTable(props) {
    /*
        Props.popArray:
     */
    let showTable;
    if (props.popArray) {
        showTable = 'visible';
    }
    else {
        showTable = 'hidden';
    }

    const popArr = props.popArray || [];
    const samples = props.samples;
    const rows = popArr.map((val, index) => {
            for (const i of samples) {
                //console.log(i);
                if (val === i){
                    return (<tr key={index} style={{background:"#747EF2"}}><td>{popArr.length - 1 - index}</td><td>{val[0]}</td></tr>);
                }
            }
            if (index !== popArr.length - 1) {
                return(<tr key={index}><td>{popArr.length - 1 - index}</td><td>{val[0]}</td></tr>);
            }
            else {
                if (val[0]) {
                    return(<tr key={index}><td>{popArr.length - 1 - index}</td><td>{val[0]}</td></tr>);
                }
            }
            return popArr;

    });
    const tableBody = (
        <tbody>
            {rows}
        </tbody>
    );

    const values = {
        Uniform: { xmaxval: 74, xminval: 56, ymaxval: 30, title: "Lottery Outcome", yLabel: "Gain/Loss", xLabel: "Participant" },
        Normal: { xmaxval: 84, xminval: 66, ymaxval: 30, title: "Milk Production", yLabel: "Gallons", xLabel: "Cow" },
        Exponential: { xmaxval: 350, xminval: 0, ymaxval: 10, title: "Duration of Telemarketer Call", yLabel: "Seconds", xLabel: "Call" },
        "Chi-Squared": {xmaxval: 25, xminval: 0, ymaxval: 20, title: "Money Spent on Lunch", yLabel: "Dollars", xLabel: "Person" },
        Mystery: {xmaxval: 25, xminval: 0, ymaxval: 20, title: "Female Height", yLabel: "Height (in)", xLabel: "Female" }
    };

    return (
            <div style={{ visibility: showTable}}>
                <Table striped className="PopTable">
                    <thead>
                        <tr>
                            <th>{props.popType && values[props.popType].xLabel}</th>
                            <th>{props.popType && values[props.popType].yLabel}</th>
                        </tr>
                    </thead>
                    {tableBody}
                </Table>
            </div>
        );
}
PopTable.propTypes = {

    props : PropTypes.array,
}
