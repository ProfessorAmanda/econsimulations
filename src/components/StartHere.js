import React, { Component } from 'react';
import { Button, Fade } from 'reactstrap';


class StartHere extends Component{

  render(){
    return(
      <Fade in={this.props.start}>
      <div className="Jumbotron">
            <h1 className="display-1" color="danger">Hello!</h1>
            <p className="lead">This website is an educational application developed to simulate and visualize
            various statistical concepts. Each module on the website takes students through
            multiple steps of simulations for each respective statistical concept.</p>
            <hr className="my2" />
            <p>Project of Professor Tanya Byker and Professor Amanda Gregg at Middlebury College, worked on by research assistants Kevin Serrao, Class of 2018, Dylan Mortimer, Class of 2019, and Ammar Almahdy, Class of 2020</p>
            <Button
              outline color='danger'
              onClick={this.props.showApp}
              >Start!
            </Button>
      </div>
      </Fade>
    )
  }

}



export default StartHere;
