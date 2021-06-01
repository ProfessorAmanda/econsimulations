import React from 'react';
import styles from './styles/App.css';
import SimulationMenu from './components/SimulationMenu.js';

export default function App() {

  return (
    <div>
      {document.body.classList.add('Wrapper')}
      <SimulationMenu/>
    </div>
  );
}
