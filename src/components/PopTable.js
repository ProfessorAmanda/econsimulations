// Table of data points
import React from 'react';

export default function PopTable(props) {
    /* 
        Props.popArray: 
     */
    let showTable;
    if (props.popArray[props.popType]) {
        showTable = 'visible';
    }
    else {
        showTable = 'hidden';
    }

    const popArr = props.popArray[props.popType] || [];
    const samples = props.samples[props.popType];
    const rows = popArr.map( (val, index) => {
        if (val){
            for (const i of samples) {
                if (index === i[0]){
                    return (<tr style={{background:"#747EF2"}}><td>{index + 1}</td><td>{Math.round(val * 10) / 10}</td></tr>);
                }
            }
            return(<tr><td>{index + 1}</td><td>{Math.round(val * 10) / 10}</td></tr>);
        }
    });
    const tableBody = (
        <table style={{width: "100%", border:"1px solid black"}}>
            <tbody style={{ overflow: "scroll" }}>
                {rows}
            </tbody>
        </table>
    );

    const values = { 
        Uniform: { xmaxval: 74, xminval: 56, ymaxval: 30, title: "Female Height", yLabel: "Height (in)", xLabel: "Subject" },
        Normal: { xmaxval: 84, xminval: 66, ymaxval: 30, title: "Milk Production", yLabel: "Gallons", xLabel: "Cow" },
        Exponential: { xmaxval: 350, xminval: 0, ymaxval: 10, title: "Duration of Telemarketer Call", yLabel: "Seconds", xLabel: "Call" },
        "Chi-Squared": {xmaxval: 25, xminval: 0, ymaxval: 20, title: "Money Spent on Lunch", yLabel: "Dollars", xLabel: "Person" }
    };

    return (
            <div style={{float:"left", width:"10%", height:"300px", visibility: showTable, overflowX: "hidden" }}>
                <table style={{width: "100%", border:"1px solid black"}}>
                    <tbody>
                        <tr>
                            <th>{props.popType && values[props.popType].xLabel}</th>
                            <th>{props.popType && values[props.popType].yLabel}</th>
                        </tr>
                    </tbody>
                </table>
                {tableBody}
            </div>
        );
}
