import React, { Component } from 'react';
import { Button, Card, CardText } from 'reactstrap';
import { Row, Col} from 'reactstrap';

import clt from '../clt.png';
import lln from '../lln.png';
import jd from '../jd.jpg';
import ls from '../ls.png';
import ovs from '../ovs.png';



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
                description: "A joint probability distribution describes the simultaneous behavior of two random variables.",
                extra: "",
                img: jd
            },

            {
                name: "Least Squares",
                description: "Ordinary least squares regression estimates the slope(s) and intercept of a line to best fit data for two (or more) variables by minimizing the sum of the squared distances from the data points to the line.",
                extra: "",
                img: ls
            },

            {
                name: "Omitted Variable Bias",
                description: "Omitted variable bias (OVB) arises when a variable that is i) correlated with the outcome and ii) correlated with one on the included regressors is omitted from the regression model.",
                extra: "",
                img: ovs
            }


//                 ,

//             {
//                 name: "Confidence Intervals",
//                 description: "test",
//                 extra: "",
//                 img: undefined
//             }
//             ,

//                         {
//                             name: "Hypothesis Testing",
//                             description: "test",
//                             extra: "",
//                             img: undefined
//                         }




        ];

        // const modes = ["Law of Large Numbers", "Central Limit Theorem", "Joint Distributions", "Least Squares", "Omitted Variable Bias"];
        const sections = modes.map((section)=>{
            return (
              <div key={'key'}>
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
            <div key={'key23'}>
            <div className="MiniLogo"></div>
                    {sections}
            </div>
        );
    }
}


export default SimBar;
