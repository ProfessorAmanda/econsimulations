import React from 'react';
import styles from './styles/App.css';  // eslint-disable-line
import SimulationMenu from './components/SimulationMenu.js';

export default function App() {

  return (
    <div>
      {document.body.classList.add('Wrapper')}
      <SimulationMenu/>
    </div>
  );
}
