import React, { Component } from 'react';
import Modal from 'react-modal';
import Icon from 'react-icons-kit';
import { question } from 'react-icons-kit/fa/question';
import { close } from 'react-icons-kit/fa/close';
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
        this.contentDict["PopBar"] = {
            header : "Population Bar",
            paragraph: "Here is where you select the distribution type of your population."
        }
        this.contentDict["Sampling"] = {
            header : "Sampling Section",
            paragraph : "This is where you play around with sampling from your population"
        }
        this.contentDict["SimulateSamples"] = {
            header : "Simulation Sampler",
            paragraph : "This simulation shows the Law of Large Numbers in action, where larger samples have means that converge to the true population mean."
        }
    }

    render(){
        return(
            <span>
                <button onClick={()=> {this.setState({open:true})}}> <Icon icon={question}/> </button>
                <Modal isOpen={this.state.open}>
                    <button style={{float: 'right'}} onClick={() => {this.setState({open:false})}}> <Icon icon={close}/> </button>
                    <h1> {this.contentDict[this.props.content].header} </h1>
                    <p> {this.contentDict[this.props.content].paragraph} </p>
                </Modal>
            </span>
        )
    }
}

export default HelpModal;
