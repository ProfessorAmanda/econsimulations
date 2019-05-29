import React, { Component } from 'react';
import styled from 'styled-components';


const HorizontalUL=styled.ul`
  list-style:none;
`;

const SectionItem=styled.li`
  display:inline;
  padding: 5px;
  font-weight: bold;
`;

const ToolBarButton=styled.button`
  background-color: white;
  border: 2px solid black;
  color: #555555;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
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

class SimBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: 'Home'
        }
    }
    render(){
        const modes = ["Law of Large Numbers", "Central Limit Theorem", "Joint Distributions", "Least Squares", "Omitted Variable Bias"];
        const sections = modes.map((section)=>{
            const style = section === this.state.selected ? {
                background: '#555555',
                color: 'white'
            } : {};
            return (<SectionItem key={section}> <ToolBarButton style={style} onClick={()=>{this.props.setSection(section); this.setState({selected:section})}}> {section} </ToolBarButton></SectionItem>);
        });
        return(
            <div id="section-list">
                <HorizontalUL>{sections}</HorizontalUL>
            </div>
        );
    }
}
export default SimBar;
