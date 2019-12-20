import React, { Component } from 'react';
import { Button, Fade } from 'reactstrap';


class StartHere extends Component{

  render(){
    return(
      <Fade in={this.props.start}>
      <div className="Jumbotron">
            <p className="lead">This website is an interactive educational application developed to simulate and visualize
            various statistical concepts.</p>
            <hr className="my2" />
            <p>Project of Professor Tanya Byker and Professor Amanda Gregg at Middlebury College, with research assistants Kevin Serrao, Class of 2018, Dylan Mortimer, Class of 2019, Ammar Almahdy, Class of 2020, and Jacqueline Palacios, Class of 2020</p>
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
