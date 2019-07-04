import React, { Component } from 'react';
import { render } from 'react-dom';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

class ChartContainer extends Component {
  constructor(props) {
    super(props);
    // const popMean = this.state.popMean[popType];
    const values = { 
        Normal: { xmaxval: 74, xminval: 56, ymaxval: 40, title: "Milk Production", xLabel: "Gallons" },
        Uniform: { xmaxval: 74, xminval: 56, ymaxval: 25, title: "Alien Female Height", xLabel: "Height (in)"},
        Exponential: { xmaxval: 400, xminval: 0, ymaxval: 10, title: "Duration of Telemarketer Call", xLabel: "Duration (seconds)"},
        "Chi-Squared": {xmaxval: 25, xminval: 0, ymaxval: 40, title: "Money Spent on Lunch", xLabel: "Dollars"}
    };
    const { xmaxval, xminval, ymaxval, title, xLabel } = values;

    const first = {data : this.props.pseries, name:"Population"};
    const second = {data : [], name:"Sample"};

    this.state = {
      // To avoid unnecessary update keep all options in the state.
      chartOptions: {
        chart: {
            type: 'scatter',
        },
        plotOptions: {
            series: {
                animation: {
                    duration: 2000,
                    easing: 'easeOutBounce'
                }
            }
        },
        
        title: {
            text: `${title} <br /> Population Mean:`
        },
        xAxis: {
            min: xminval,
            max: xmaxval,
            title : {
                enabled: true,
                text: xLabel
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            max: ymaxval,
            title: {
                text: 'Count'
            }
        },
        tooltip: {
            enabled: true,
            pointFormat: `${xLabel}: <b>{point.x}<b><br />`
        },
        series: [{data : this.props.pseries, name:"Population"}, second]
      },
      hoverData: null,
      data: []
    };
  }

  setHoverData = (e) => { 
    // The chart is not updated because `chartOptions` has not changed.
    this.setState({ hoverData: e.target.category })
  }

  componentDidMount() {
    if (this.props.pseries) {

        const pseries = this.props.pseries;

        let index = 0;
        
        setInterval(() => {
            const x = pseries.pop();
            index = index + 1;
            if (x) {
                this.setState((prevState) => {
                    const tmp = prevState.chartOptions.series[0].data;
                    tmp.push(x)
                    console.log(tmp);
                    return { chartOptions: {
                        series: [
                            { data: tmp}
                        ]
                    }}
                })
            }
        }, 100);
        
    }
  }

//   componentDidUpdate(prevProps) {
//       console.log(this.props);
//       if (this.props.pseries !== this.state.data) {

//         const pseries = this.props.pseries;

//         let index = 0;
        
//         setInterval(() => {
//             const x = pseries.pop();
//             index = index + 1;
//                 this.setState((prevState) => {
//                     const tmp = prevState.chartOptions.series[0].data;
//                     tmp.push(x)
//                     console.log(tmp);
//                     return { chartOptions: {
//                         series: [
//                             { data: tmp}
//                         ]
//                     }}
//                 })
//         }, 100);
        
        
//     }

//   }

  updateSeries = () => {
    // The chart is updated only with new options.
    this.setState({ 
      chartOptions: {
        series: [
          { data: [Math.random() * 5, 2, 1]}
        ]
      }
    });
  }

  render() {
    const { chartOptions, hoverData } = this.state;
    const pseries = this.props.pseries;
    
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      <h3>Hovering over {hoverData}</h3>
      <button onClick={this.updateSeries.bind(this)}>Update Series</button>
      </div>
    )
  }
}

export default ChartContainer