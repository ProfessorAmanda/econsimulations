/*

  A container component for the various simulations

  props:
    mode    - string
    setMode - callback function
*/
import React from 'react';
import LawOfLargeNumbers from './LawOfLargeNumbers/LawOfLargeNumbers.js';
import CentralLimitTheorem from './CentralLimitTheorem/CentralLimitTheorem.js';
import JointDistributions from './JointDistributions/JointDistributions.js';
import OmittedVariableBias from "./OmittedVariableBias/OmittedVariableBias.js";
import ConfidenceIntervals from './ConfidenceIntervals.js'
import HypothesisTestingNew from './HypothesisTestingNew.js'
import StartHere from './StartHere';
import { Button } from 'reactstrap';
import LeastSquares from './LeastSquares/LeastSquares.js';

export default function SimulationContainer({ mode, setMode }) {
  return (
    <div className="App">
      <Button outline color='danger' id="Menu" onClick={() => setMode("Home")}>MENU</Button>
      <div className="MiniLogo"></div>
      {mode === 'Law of Large Numbers' && <LawOfLargeNumbers/>}
      {mode === 'Central Limit Theorem' && <CentralLimitTheorem/>}
      {mode === 'Joint Distributions' && <JointDistributions/>}
      {mode === 'Least Squares' && <LeastSquares/>}
      {mode === 'Omitted Variable Bias' && <OmittedVariableBias/>}
      {mode === 'Start Here' && <StartHere/>}
      {mode === 'Confidence Intervals' && <ConfidenceIntervals/>}
      {mode === 'Hypothesis Testing' && <HypothesisTestingNew/>}
    </div>
  )
}
