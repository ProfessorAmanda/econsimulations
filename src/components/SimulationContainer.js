import React from 'react';
import LawOfLargeNumbers from './LawOfLargeNumbers.js';
import CentralLimitTheorem from './CentralLimitTheorem.js';
import JointWrapper from './JointWrapper.js';
import LeastSim from './LeastSim.js';
import OmmittedVariable from './OmmittedVariable.js';
import ConfidenceIntervals from './ConfidenceIntervals.js'
import HypothesisTestingNew from './HypothesisTestingNew.js'
import StartHere from './StartHere';
import { Button } from 'reactstrap';

export default function SimulationContainer({ mode, setMode }) {
  return (
    <div className="App">
      <Button outline color='danger' id="Menu" onClick={() => setMode("Home")}>MENU</Button>
      <div className="MiniLogo"></div>
      {mode === 'Law of Large Numbers' && <LawOfLargeNumbers/>}
      {mode === 'Central Limit Theorem' && <CentralLimitTheorem/>}
      {mode === 'Joint Distributions' && <JointWrapper/>}
      {mode === 'Least Squares' && <LeastSim/>}
      {mode === 'Omitted Variable Bias' && <OmmittedVariable/>}
      {mode === 'Start Here' && <StartHere/>}
      {mode === 'Confidence Intervals' && <ConfidenceIntervals/>}
      {mode === 'Hypothesis Testing' && <HypothesisTestingNew/>}
    </div>
  )
}
