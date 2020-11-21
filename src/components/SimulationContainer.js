import React, { Component } from 'react';
import SimBar from './SimBar.js';
import LawOfLargeNumbers from './LawOfLargeNumbers.js';
import CentralLimitTheorem from './CentralLimitTheorem.js';
import JointWrapper from './JointWrapper.js';
import LeastSim from './LeastSim.js';
import OmmittedVariable from './OmmittedVariable.js';
import ConfidenceIntervals from './ConfidenceIntervals.js'
import HypothesisTestingNew from './HypothesisTestingNew.js'
import StartHere from './StartHere';
import { Button, Fade } from 'reactstrap';

class SimulationContainer extends Component{
    constructor(){
        super();
        this.state = {
            mode: 'Home',
            start: true,
            collapse: true,
            logo: true
    }
}

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                logo: false
            })
        }, 3500);
    }

    render(){
        if (this.state.start === true) {
            return (
                <div>
                    <div className="App-bg">
                    </div>
                    { !this.state.logo && <StartHere
                        showApp={() => {
                            this.setState({
                                start: false
                            })
                        }}
                        start={this.state.start}
                    /> }
                </div>
            )
        }
        return(
            <div>
                {
                    <Fade in={this.state.collapse} style={{ display: !this.state.collapse ? 'none' : 'block' }}>
                        <div className="Splash">
                        </div>
                        <div className="Nav" key={'unkey'}>
                            <SimBar section= {this.state.mode} setSection={(section) => this.setState({mode:section, collapse: false})} />
                        </div>
                    </Fade>
                }
                <div className="App">

                    { !this.state.collapse &&

                    <Button
                        outline
                        color='danger'
                        id="Menu"
                        onClick={() => {
                            this.setState({ collapse: true, mode:'Home' });
                        }}
                    >
                            MENU
                    </Button>
                    }
                    {this.state.mode === 'Law of Large Numbers' && <LawOfLargeNumbers/>}
                    {this.state.mode === 'Central Limit Theorem' && <CentralLimitTheorem/>}
                    {this.state.mode === 'Joint Distributions' && <JointWrapper/>}
                    {this.state.mode === 'Least Squares' && <LeastSim/>}
                    {this.state.mode === 'Omitted Variable Bias' && <OmmittedVariable/>}
                    {this.state.mode === 'Start Here' && <StartHere/>}
                    {this.state.mode === 'Confidence Intervals' && <ConfidenceIntervals/>}
                    {this.state.mode === 'Hypothesis Testing' && <HypothesisTestingNew/>}



                </div>
            </div>
        );

    }
}
export default SimulationContainer;
//{this.state.mode === 'Confidence Intervals' && <ConfidenceIntervals/>}
