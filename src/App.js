import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import './App.css';
import SimulationContainer from './components/SimulationContainer.js'


class App extends Component {
  constructor() {
    super();
    this.state = {
      starting: 1
    };
    this.show = this.show.bind(this);
  }

  show() {
    this.setState({
      starting: 0
    });
  }

  render() {
    setTimeout(this.show, 1500);
    return (
      <div>
        {document.body.classList.add('Wrapper')}
          {this.state.starting ? 
          <div className="Nav">
          <Spinner type="grow" color="primary" />
          <Spinner type="grow" color="secondary" />
          <Spinner type="grow" color="success" />
          <Spinner type="grow" color="danger" />
          <Spinner type="grow" color="warning" />
          <Spinner type="grow" color="info" />
          <Spinner type="grow" color="light" />
          <Spinner type="grow" color="dark" />
        </div>  :
          <div>
            <div className="App-bg">
              </div>
            <div>
              <SimulationContainer/>
            </div>
      </div>
        }
      </div>
    );
  }
}

export default App;
