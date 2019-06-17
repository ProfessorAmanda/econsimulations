import React, { Component } from 'react';
import { Button, ButtonGroup, Card, CardText, CardTitle, Col, CardColumns, CardImg } from 'reactstrap';
import clt from '../clt.png';
import lln from '../lln.png';
import jd from '../jd.jpg';
import ls from '../ls.png';
import ovs from '../ovs.png';
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
                description: 'In probability theory, the law of large numbers (LLN) is a theorem that describes the result of performing the same experiment a large number of times. According to the law, the average of the results obtained from a large number of trials should be close to the expected value, and will tend to become closer as more trials are performed.',
                extra: 'According to the law, the average of the results obtained from a large number of trials should be close to the expected value, and will tend to become closer as more trials are performed.',
                img: lln
            },

            {
                name: "Central Limit Theorem",
                description: "In probability theory, the central limit theorem establishes that, in some situations, when independent random variables are added, their properly normalized sum tends toward a normal distribution even if the original variables themselves are not normally distributed.",
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
                description: "One of the most common and vexing problems in ordinary least squares. regression. OVB occurs when a variable that is correlated with both the dependent and one or more. included independent variables is omitted from a regression equation",
                extra: "",
                img: ovs
            }
        ];

        // const modes = ["Law of Large Numbers", "Central Limit Theorem", "Joint Distributions", "Least Squares", "Omitted Variable Bias"];
        const sections = modes.map((section)=>{
            return (
                    <Card body outline color="primary">
                        <CardImg top width="100%" src={section.img} />
                        <CardTitle>{section.name}</CardTitle>
                        <CardText>{section.description}</CardText>
                    <Button outline color='primary'
                        active={section.name === this.state.selected}
                        onClick={()=>{ 
                            this.props.setSection(section.name); 
                            this.setState({ selected:section.name });
                        }}>
                        {section.name} 
                        </Button>
                    </Card>
            );
        });
        return(
            <div>
                <CardColumns>
                    {sections}
                </CardColumns>
            </div>
        );
    }
}
export default SimBar;
