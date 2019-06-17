import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';

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

class ToggleStandard extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: 0
        }
    }
    render() {
        this.state.selected = this.props.section;
        let modes;
        modes = ["Standardized"];

        const sections = modes.map((section)=>{
            return (<Button
              outline
              color="primary"
              active={this.state.selected === 1} 
              onClick={()=> {
                const sel = this.state.selected;
                let newSel = 0;
                newSel = sel === 0 ? 1 : 0;
                this.setState({selected:newSel});
                this.props.toggleSwitch(newSel);
              }}> {section} </Button>);
        });
        return(

            <div id="section-list">
                 <SelectPop>{sections} </SelectPop>
            </div>
        );
    }
}
export default ToggleStandard
