import React, { Component } from 'react';
// import styled from 'styled-components';
import { Nav, NavItem, NavLink, Navbar } from 'reactstrap';  
import classnames from 'classnames';


// const ToolBarButton=styled.a`
//   background-color: white;
//   border-left: 1px solid #2b908f;
//   border-right: 1px solid #2b908f;
//   color: #555555;
//   padding: 10px 24px;
//   width: 80px;
//   text-align: center;
//   text-decoration: none;
//   display: block;
//   font-size: 12px;
//   -webkit-transition-duration: 0.4s; /* Safari */
//    transition-duration: 0.4s;
//    cursor: pointer;
//    &:focus {outline:0}
//    &:hover {
//        background-color: #2b908f;
//        color: white;
//    }

// `;

class PopBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: 'Normal',
            activeTab: "1"
        }
    }
    render() {
        let modes;
        if (this.props.mode === "CLT"){
          modes = 
          [ 
              { name: "Pick a Distribution:", id: "0"},
              { name: "Normal", id: "1" },
              { name: "Uniform", id: "2" }, 
              { name: "Exponential", id: "3" },
              { name: "Chi-Squared", id: "4" }, 
              { name: "Mystery", id: "5"} 
            ];
        }
        else if (this.props.mode === "LLN") {
          modes = [
            { name: "Pick a Distribution:", id: "0"},
            { name: "Normal", id: "1" },
            { name: "Uniform", id: "2" }, 
            { name: "Exponential", id: "3" },
            { name: "Chi-Squared", id: "4" }, 
          ];
        }
        else {
            modes = []
        }

        const sections = modes.map((section)=>{
            return (
                <NavItem>
                    <NavLink
                        className={classnames({ active: this.state.activeTab === section.id }, {disabled: section.id === "0"})}
                        // disabled={section.id === "0"}
                        onClick={() => {
                            this.props.setPop(section.name);
                            this.setState({ selected:section.name });
                            this.setState({
                                activeTab: section.id
                            })
                        }}
                    >
                        {section.name}
                    </NavLink>
                </NavItem>
            );
        });
        return(
            <div>
                <div className="TabBar">
                    {/* <p id="DistLabel">Dist Type</p> */}
                    <Nav tabs>
                        {sections} 
                    </Nav>
                    
                </div>
            </div>
        );
    }
}
export default PopBar
