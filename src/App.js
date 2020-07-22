import React, { Component } from 'react';
import './App.css';
import SimulationContainer from './components/SimulationContainer.js';


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
    //setTimeout(this.show, 4000);
    return (
      <div>
        {document.body.classList.add('Wrapper')}
          { !this.state.starting &&
            <div>
              <SimulationContainer/>
            </div>
          }
      </div>
    );
  }
}

export default App;
