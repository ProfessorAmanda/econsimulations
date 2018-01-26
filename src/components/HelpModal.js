import React, { Component } from 'react';
import Modal from 'react-modal';
import FaQuestionCircle from 'react-icons/lib/fa'
const modalStyle = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)'
    },
    content : {
        position                   : 'absolute',
        top                        : '25%',
        left                       : '25%',
        right                      : '25%',
        bottom                     : '25%',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '2px'

    }
}



class HelpModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            open : false
        }
        this.contentDict = {}
        this.contentDict["PopBar"] = <span>
                                        <h1> I am for the Pop Bar </h1>
                                        <button onClick={() => {this.setState({open:false})}}> close </button>
                                    </span>
        this.contentDict["Sampling"] = <span>
                                        <h1> I am for the Sampling </h1>
                                        <button onClick={() => {this.setState({open:false})}}> close </button>
                                    </span>

        this.contentDict["SimulateSamples"] = <span>
                                        <h1> I am for the Simulation </h1>
                                        <button onClick={() => {this.setState({open:false})}}> close </button>
                                    </span>
    }

    render(){
        return(
            <div>
                <button onClick={()=> {this.setState({open:true})}}> Help!  </button>
                <Modal isOpen={this.state.open} >
                {this.contentDict[this.props.content]}
                </Modal>
            </div>
        )
    }
}

export default HelpModal;
