import React, { Component } from 'react';
import { Button, Card, CardText, CardDeck, CardTitle, CardColumns, CardImg } from 'reactstrap';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon} from 'reactstrap';

import clt from '../clt.png';
import lln from '../lln.png';
import jd from '../jd.jpg';
import ls from '../ls.png';
import ovs from '../ovs.png';
import ci from '../ci.jpg';
import logo from '../ECONSIMS.png';


class SimBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: 'Home'
        }
    }
    render(){
        const modes =
        [
            {
                name: 'Law of Large Numbers',
                description: 'The Law of Large Numbers tells us that that the sample mean approaches the mean of the population as we increase the sample size. This simulations investigates the behavior of the sample mean as we change the sample size.',
                extra: '',
                img: lln
            },

            {
                name: "Central Limit Theorem",
                description: "The Central Limit Theorem states that, for sufficiently large samples, the sample mean is approximately normally distributed, even if the underlying population is not normally distributed (or if we have no idea what the underlying population looks like). This simulation investigates how the distribution of the sample mean is affected by the sample size and the shape of the population distribution.",
                extra: "",
                img: clt
            },

            {
                name: "Joint Distributions",
                description: "A joint probability distribution shows a probability distribution for two (or more) random variables to look for a relationship between the two variables.",
                extra: "",
                img: jd
            },

            {
                name: "Least Squares",
                description: "The method of least squares is a standard approach in regression analysis to approximate the solution of overdetermined systems, i.e., sets of equations in which there are more equations than unknowns.",
                extra: "",
                img: ls
            },

            {
                name: "Omitted Variable Bias",
                description: "One of the most common and vexing problems in ordinary least squares regression. OVB occurs when a variable that is correlated with both the dependent and one or more included independent variables is omitted from a regression equation.",
                extra: "",
                img: ovs
            }
        ];

        // const modes = ["Law of Large Numbers", "Central Limit Theorem", "Joint Distributions", "Least Squares", "Omitted Variable Bias"];
        const sections = modes.map((section)=>{
            return (
              <div>
              <Row className="Center">
              <Col>
                    <Card body outline color="primary" style={{}}>
                        {/* <CardTitle>{section.name}</CardTitle> */}
                        <CardText style={{overflowY: 'auto', boxSizing: 'content-box' }}>{section.description}</CardText>
                    <Button outline color='primary'
                        active={section.name === this.state.selected}
                        onClick={()=>{
                            this.props.setSection(section.name);
                            this.setState({ selected:section.name });
                        }}>
                        {section.name}
                        </Button>
                    </Card>
                </Col>
                </Row>
               <br/>
               <br/>
               </div>
            );
        });
        return(
            <div>
            <div className="MiniLogo"></div>
                    {sections}
            </div>
        );
    }
}
export default SimBar;
