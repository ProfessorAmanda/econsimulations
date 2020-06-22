import React, { Component } from 'react';
import Highcharts from 'highcharts';
import 'highcharts/modules/annotations';
import { Alert, Button, Container, Col, Input, Label, Row } from 'reactstrap';


const Test = ()=>{
    const containerr = document.createElement('div');
    document.body.appendChild(containerr);

    const chart = new Highcharts.Chart({
    chart: {
    renderTo: containerr,
    height: 400
    },
    xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    series: [{
    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }]
    });
    return(
        <div id="containerr"></div>,
        document.body.removeChild(containerr)
    )
}



export default Test;
