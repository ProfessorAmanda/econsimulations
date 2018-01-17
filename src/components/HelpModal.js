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
    }

    render(){
        return(
            <div>
                <button onClick={()=> {this.setState({open:true}); console.log("hello?");}}> Help!  </button>
                <Modal isOpen={this.state.open} >
                    <h1> Here to help! </h1>
                    <button onClick={() => {this.setState({open:false})}}> close </button>
                    </Modal>
            </div>
        )
    }
}

export default HelpModal;
