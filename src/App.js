import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SimulationContainer from './components/SimulationContainer.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SimulationContainer/>
      </div>
    );
  }
}

export default App;
