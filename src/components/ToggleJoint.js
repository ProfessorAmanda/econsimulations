import React, { Component } from 'react';
import styled from 'styled-components';

// test

const SelectPop=styled.ul`
  list-style: none;
  float: left;
  margin: 0px
`;




const ToolBarButton=styled.a`
  background-color: white;
  border: 2px solid black;
  color: #555555;
  padding: 10px 24px;
  margin-right: -1600px;
  width: 80px;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 12px;
  -webkit-transition-duration: 0.4s; /* Safari */
   transition-duration: 0.4s;
   cursor: pointer;
   &:focus {outline:0}
   &:hover {
       background-color: #555555;
       color: white;
   }

`;

class ToggleJoint extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: 0,
            current: "Basic"
        }
    }
    render() {
        let modes;
        modes = ["Basic"]; // ,"Advanced"];

        const sections = modes.map((section)=>{
            const style = this.state.current === section ? {
                background: '#555555',
                color: 'white'
            } : {};
            return (<ToolBarButton style={style} onClick={()=> {
                const sel = this.state.selected;
                let newSel = 0;
                newSel = sel === 0 ? 1 : 0;
                let newMode;
                if(newSel === 0){
                  newMode = "Basic";
                }
                else{
                  newMode = "Advanced";
                }
                this.setState({selected:newSel});
                this.setState({current:newMode});
                this.props.toggleSwitch(newMode);
              }}> {section} </ToolBarButton>);
        });
        return(

            <div id="section-list">
                 <SelectPop>{sections} </SelectPop>
            </div>
        );
    }
}
export default ToggleJoint
