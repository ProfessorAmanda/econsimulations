import React, { Component } from 'react';
import styled from 'styled-components';

function popTable(props) {
    let rows = props.popArray.forEach( (val, index) => {
        return <tr> <td> {index} </td> <td> {val} </td> </tr>
    });
    return <table> <tr> <th> "Postion" </th> <th> "Value" </th> </tr> {rows} </table>
}

export default popTable;
