/*

  Displays the introduction to the website and the start button

  props:
    start   - boolean
    showApp - callback
*/

import React from 'react';
import { Button, Fade } from 'reactstrap';
import PropTypes from 'prop-types';

export default function StartHere({ start, showApp }) {
  return (
    <Fade in={start}>
      <div className="Jumbotron">
        <p className="lead">This website is an interactive educational application developed to simulate and visualize
        various statistical concepts.</p>
        <hr className="my2" />
        <p>Project of Professor Tanya Byker and Professor Amanda Gregg at Middlebury College, with research assistants Kevin Serrao, Class of 2018, Dylan Mortimer, Class of 2019, Ammar Almahdy, Class of 2020, Jacqueline Palacios, Class of 2020, and Siyuan Niu, Class of 2021, Ethan Saxenian, Class of 2022</p>
        <Button outline color='danger' onClick={() => showApp()}>Start!</Button>
      </div>
    </Fade>
  );
}

StartHere.propTypes = {

  showApp : PropTypes.func.isRequired,
  start : PropTypes.bool.isRequired,

}
