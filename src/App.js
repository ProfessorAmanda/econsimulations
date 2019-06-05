import React, { Component } from 'react';
import './App.css';
import SimulationContainer from './components/SimulationContainer.js'
import logo from './Intro.gif';


class App extends Component {
  constructor() {
    super();
    this.state = {
      starting: 0
    };
    this.show = this.show.bind(this);
  }

  show() {
    this.setState({
      starting: 0
    });
  }

  render() {
    setTimeout(this.show, 3800);
    return (
      <div>
          {this.state.starting ? <img className="Logo" width="60%" alt="Logo" src={logo} /> : 
        <div className="App">
          <SimulationContainer/>
        </div>}
      </div>
    );
  }
}

export default App;
