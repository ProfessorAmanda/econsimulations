import React, { useState } from 'react';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

export default function SampleSizeInput({ maxSize, handleClick }) {
  const [sampleSize, setSampleSize] = useState("");

  const hangleChange = (event) => {
    setSampleSize(parseInt(event.target.value, 10))
  }

  return (
    <div>
      <InputGroup>
        <Input
            align="right"
            type="number"
            placeholder="Sample Size:"
            min={1}
            value={sampleSize}
            max={maxSize}
            onChange={(event) => hangleChange(event)}
        />
        <InputGroupAddon addonType="append">
          <Button disabled={!sampleSize || sampleSize > maxSize || sampleSize < 1} onClick={()=> handleClick(sampleSize)}>
            Sample
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
)
}



// class SampleArea extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             sampleSize: '',
//             popMean: undefined
//         }
//         this.handleChange = this.handleChange.bind(this);
//     }

//     handleChange(event) {
//         this.setState({sampleSize: parseInt(event.target.value, 10)});
//     }

//     render() {
//         return (
//             <div>
//                 <Container>
//                     <Row className="Center">
//                             <Input

//                                 align="right"
//                                 type="number"
//                                 placeholder="Sample Size:"
//                                 min={1}
//                                 value={this.state.sampleSize}
//                                 max={this.props.popArray.length}
//                                 onChange={this.handleChange}
//                             />
//                             <Button
//                             disabled={!this.state.sampleSize || this.state.sampleSize > this.props.popArray.length || this.state.sampleSize < 1}
//                             onClick={()=> {
//                                 const sampleObject = this.props.sample(this.state.sampleSize);
//                                 const mue = sampleObject.mue;
//                                 this.setState({
//                                     popMean: mue
//                                 });
//                                 this.props.setMean(mue);
//                             }}> Sample </Button>

//                     </Row>
//                 </Container>
//                 {/*<h4> {this.props.type} Sample Mean: {this.state.popMean || ''} </h4>*/}
//             </div>
//         )
//     }
//     onKey(e) {
//         if (e.key === "Enter" && this.state.sampleSize && this.state.sampleSize <= this.props.popArray.length && this.state.sampleSize >= 1) {
//             const sampleObject = this.props.sample(this.state.sampleSize);
//             const mue = sampleObject.mue;
//             this.setState({
//                 popMean: mue
//             });
//             this.props.setMean(mue);
//             this.props.redraw();
//         }
//     }

//     // newSample(size, array) {
//     //     const sampled = []
//     //     const currentPop = array;

//     //     while (sampled.length < size){
//     //         // index to sample ?
//     //         const r = Math.round(Math.random() * (currentPop.length - 1))
//     //         let shouldSample = true;
//     //         for (let i = 0; i < sampled.length; i++){
//     //              if (sampled[i][0] === r) {
//     //                  shouldSample = false;
//     //              }
//     //         }

//     //         if (shouldSample) {
//     //             let count = 1;
//     //             // currentPop.forEach( (val, index) => {
//     //             //     // if the value
//     //             //     if (index < r && Math.round(val * 10) === Math.round(currentPop[r] * 10)) {
//     //             //         count += 1;
//     //             //     }
//     //             // });
//     //             // only pushes if shouldSample is true
//     //             sampled.push([r, count]);
//     //         }
//     //         console.log(sampled);
//     //     }
//     //     const sampledCopy = sampled;
//     //     const sampleVals = [[]];
//     //     const samplePop = [];

//     //     for (const j in sampledCopy){
//     //         sampleVals[j] = [];
//     //         sampleVals[j][0] = Math.round(this.props.popArray[sampledCopy[j][0]] * 10)
//     //         sampleVals[j][1] = sampledCopy[j][1];
//     //         samplePop.push(sampleVals[j][0] / 10)
//     //     }
//     //     return samplePop;
//     // }
// }
// export default SampleArea
