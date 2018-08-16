import React, {Component} from 'react';
import styled from 'styled-components';
import Highcharts from 'highcharts';


const contatiner = styled.div`
  marginLeft: 800px
`;

const POINT_SIZE = 5;

var rectOne;
var rectTwo;
var rectThree;
var rectFour;
var sumSquares;

class LeastSim extends Component {
	constructor(props){
		super(props);
		this.state = {
			chart: undefined,
      slope: 1,
      int: 3,
      points: [null,1,5,3,6],
      diffs: [0,0,0,0],
      step: 1
		};
	}
	render(){
    this.state.chart && this.show();
    return(
      <div style={{ marginLeft: 250,marginTop: 50 }}>
        <span style={{float:"left", width:"30%"}} id="sim-container"> </span>
        <span>
          {this.state.step === 1 ? <h4> Step 1: Choose a Slope and Y Intercept for Your Regression Line:</h4> :
          <h4>Step 2: Change Slope and Y Intercept to Reduce Sum of Squares</h4>}
          <h4>Slope</h4>
          <input type="number" step={.1} value={this.state.slope} min={-2} max={2} onChange={(event) => {
            this.setState({slope:parseFloat(event.target.value)});
          }}/>
          <h4>Y Intercept</h4>
          <input type="number" step={.1} value={this.state.int} min={-1} max={3} onChange={(event) => {
            this.setState({int:parseFloat(event.target.value)});
          }}/>
          <br></br><br></br>
          {this.state.step !== 1 ? null : <button onClick={() => {
            this.setState({step : 2});
          }}> Generate Regression Line </button>}
          {this.state.step === 1 ? null : <div><h4>Sum of Squares: {this.state.step === 1 ? 0 : Math.round(sumSquares * 100) / 100}</h4>
          <h4>Step 3: Show Least Squares Line</h4>
          <button onClick={() => {
            this.setState({ slope : 1.3, int : .5});
          }}> Find Least Squares Line </button></div>}
        </span>
      </div>
    );
	}
	componentDidMount(){
		this.show();
	}
	show(){

    let linePoints = this.generatePoints(this.state.slope,this.state.int);
    const scatPoints = [null,1,5,3,6];
    console.log(linePoints);
    if(!this.state.chart){
      this.setState({chart: Highcharts.chart('sim-container', {
    		chart: {
        		width: 400,
            height: 400
        },
        title : {
            text: "Least Squares Example"
        },
        xAxis: {
            min: 0,
            max: 8
        },
        yAxis: {
        		min: 0,
            max: 8
        },
        series: [
        	{
        		type: 'scatter',
            data: [null,1,5,3,6]
        	},
          {
        		type: 'line',
            data: linePoints
        	}
        ]

      }// on complete

      // const diff = scatPoints[2] - 5;
      // const xBox = diff > 0 ? 2 - diff : 2;
      // const yBox = diff > 0 ? scatPoints[2] : 5;
      // console.log(diff);

      // else {
      //     this.state.chart.update({series:[sampleMeanSeries], yAxis: {max: yMax}, xAxis : {title: {text:xLabel},max: xMax, min: xMin}});
      // }
  )}
);
    }
    else{
      let copyChart = this.state.chart;
      copyChart.redraw();
      const newSeries = [
        {
          name: 'points',
          type: 'scatter',
          data: [null,1,5,3,6]
        },
        {
          name: 'line',
          type: 'line',
          data: linePoints
        }
      ];

      copyChart.update({series: newSeries});

      const scatPoints = [null,1,5,3,6];
      const lineMax = copyChart.series[1].dataMax;
      const lineMin = copyChart.series[1].dataMin;
      const slope = (lineMax - lineMin)/4;
      const ids = ["first","second","third","fourth"];
      sumSquares = 0;
      for(let i=1;i<5;i++){
        let lineY = linePoints[i];
        let lineX = i;
        let diff = scatPoints[i] - lineY;
        let xBox = diff > 0 ? lineX - diff : i;
        let yBox = diff > 0 ? scatPoints[i] : lineY;
        let firstL = 41*Math.abs(diff);
        let secondL = 36*Math.abs(diff);
        sumSquares += diff*diff;

        if(i == 1 && this.state.step > 1){
          if(rectOne){
            rectOne.destroy();
          }

          rectOne = copyChart.renderer.rect(copyChart.xAxis[0].toPixels(xBox), copyChart.yAxis[0].toPixels(yBox), firstL, secondL, 1)
              .attr({
                  'stroke-width': 1,
                  stroke: 'grey',
                  fill: null,
                  zIndex: 1,
                  id: ids[i]
              })
              .add();
        }
        else if(i == 2 && this.state.step > 1){
          if(rectTwo){
            rectTwo.destroy();
          }

          rectTwo = copyChart.renderer.rect(copyChart.xAxis[0].toPixels(xBox), copyChart.yAxis[0].toPixels(yBox), firstL, secondL, 1)
              .attr({
                  'stroke-width': 1,
                  stroke: 'grey',
                  fill: null,
                  zIndex: 1,
                  id: ids[i]
              })
              .add();
        }
        else if(i == 3 && this.state.step > 1){
          if(rectThree){
            rectThree.destroy();
          }

          rectThree = copyChart.renderer.rect(copyChart.xAxis[0].toPixels(xBox), copyChart.yAxis[0].toPixels(yBox), firstL, secondL, 1)
              .attr({
                  'stroke-width': 1,
                  stroke: 'grey',
                  fill: null,
                  zIndex: 1,
                  id: ids[i]
              })
              .add();
        }
        else if(i == 4 && this.state.step > 1){
          if(rectFour){
            rectFour.destroy();
          }

          rectFour = copyChart.renderer.rect(copyChart.xAxis[0].toPixels(xBox), copyChart.yAxis[0].toPixels(yBox), firstL, secondL, 1)
              .attr({
                  'stroke-width': 1,
                  stroke: 'grey',
                  fill: null,
                  zIndex: 1,
                  id: ids[i]
              })
              .add();
        }
      }
      console.log(sumSquares);
    }
  }

  generatePoints(slope,int){
    let points = [];

    for(let i=0;i<POINT_SIZE;i++){
      points[i] = int + i*slope;
    }
    if(this.state.step === 1){
      points = [null,null,null,null,null];
    }
    return points;
  }

  generateSquare(lineX,lineY){
    const diff = this.state.points[lineX] - lineY;
    const xBox = diff > 0 ? lineX - diff : lineX;
    const yBox = diff > 0 ? this.state.points[lineX] : lineY;
    return xBox;
  }

}
export default LeastSim;
