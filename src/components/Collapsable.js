import React, { Component } from 'react';
import Collapse from 'react-collapse';
import { presets } from 'react-motion';
import '../MarzEg.css'; 

class Collapsable extends Component {
    constructor(props) {
        super(props);
        const { stiffness, damping } = presets['gentle'];
        this.state = {stiffness, damping, stage: this.props.stage, parentStage: this.props.parentStage || 0 };
    }

    componentDidUpdate(props, state) {
        if (props.parentStage !== state.parentStage) {
            this.setState({
                parentStage: this.props.parentStage
            })
        }
    }

    render() {
        const { stiffness, damping } = this.state;
        console.log(this.state.stage);
        const height = this.state.stage.includes(this.props.parentStage) ? "100%" : 20;

        return (
            <div>
                <Collapse
                    style={{
                        margin: "auto",
                        width: "100%",
                        textAlign: "center",
                        backgroundColor: "rgba(255,255,255,0.4)",
                        marginBottom: '1em'
                    }}
                    isOpened={true}
                    springConfig={{ stiffness, damping }}
                >
                    <div style={{ height: height, padding: '2em' }}>
                        <div style={{ padding: '2em' }}>
                            {this.props.children}
                        </div>
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default Collapsable;