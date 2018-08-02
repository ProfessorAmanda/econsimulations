import React, { Component } from 'react';
import styled from 'styled-components';
import HelpModal from './HelpModal.js';

// test

const SelectPop=styled.ul`
  list-style: none;
  float: left;
  margin: 10px
`;

const SectionItem=styled.li`
  padding: 5px;
  font-weight: bold;
`;
const label=styled.p`
  float: left;
  margin: 10px;
`
const ToolBarButton=styled.a`
  background-color: white;
  border: 2px solid black;
  color: #555555;
  padding: 10px 24px;
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

class PopBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: props.section
        }
    }
    render() {
        this.state.selected = this.props.section;
        let modes;
        if(this.props.mode === "CLT"){
          modes = ["Normal", "Uniform", "Exponential", "Chi-Squared","Mystery"];
        }
        else{
          modes = ["Normal", "Uniform", "Exponential", "Chi-Squared"];
        }

        const sections = modes.map((section)=>{
            const style = section === this.state.selected ? {
                background: '#555555',
                color: 'white'
            } : {};
            return (<ToolBarButton style={style} onClick={()=> {this.props.setPop(section); this.setState({selected:section})}}> {section} </ToolBarButton>);
        });
        return(

            <div id="section-list">
                 <SelectPop> <h4> Step 1: Select a Distribution Type
                  </h4> {sections} </SelectPop>
            </div>
        );
    }
}
export default PopBar
