import React, { Component } from 'react';
import { Button, ButtonGroup, Card, CardText, CardTitle, Col, CardColumns, CardImg } from 'reactstrap';
import clt from '../clt.png';
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
                description: 'a theorem that describes the result of performing the same experiment a large number of times.',
                extra: 'According to the law, the average of the results obtained from a large number of trials should be close to the expected value, and will tend to become closer as more trials are performed.',
                img: clt
            },

            {
                name: "Central Limit Theorem",
                description: "The central limit theorem states that the distribution of sample means approximates a normal distribution as the sample size gets larger (assuming that all samples are identical in size), regardless of population distribution shape.",
                extra: "",
                img: ''
            },

            {
                name: "Joint Distributions",
                description: "",
                extra: "",
                img: ""
            },

            {
                name: "Least Squares",
                description: "",
                extra: "",
                img: ""
            },

            {
                name: "Omitted Variable Bias",
                description: "",
                extra: "",
                img: ""
            }
        ];

        // const modes = ["Law of Large Numbers", "Central Limit Theorem", "Joint Distributions", "Least Squares", "Omitted Variable Bias"];
        const sections = modes.map((section)=>{
            return (
                    <Card body>
                        <CardImg top width="100%" src={section.img} />
                        <CardTitle>{section.name}</CardTitle>
                        <CardText>{section.description}</CardText>
                    <Button outline
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
                {/* <div className="MiniLogo">
                </div> */}
                <CardColumns>
                    {sections}
                </CardColumns>
            </div>
        );
    }
}
export default SimBar;
