/*

  A container component for the various simulations

*/
import LawOfLargeNumbers from './LawOfLargeNumbers/LawOfLargeNumbers.js';
import CentralLimitTheorem from './CentralLimitTheorem/CentralLimitTheorem.js';
import JointDistributions from './JointDistributions/JointDistributions.js';
import OmittedVariableBias from './OmittedVariableBias/OmittedVariableBias.js';
import ConfidenceIntervals from './ConfidenceIntervals/ConfidenceIntervals.js';
import HypothesisTesting from './HypothesisTesting/HypothesisTesting.js';
import SampleDistributionOLSEstimators from './SampleDistributionOLSEstimators/SampleDistributionOLSEstimators.js';
import { Button } from 'react-bootstrap';
import LeastSquares from './LeastSquares/LeastSquares.js';
import PropTypes from 'prop-types';
import { MODULES } from '../lib/constants.js';
import Scatter3D from './Scatter3D.js';

export default function SimulationContainer({ mode, setMode }) {
  return (
    <div data-testid="sim-container" style={{paddingBottom: 25}}>
      <Button className="home-button" variant="outline-danger" id="Menu" onClick={() => setMode('Home')}>MENU</Button>
      <div className="mini-logo"/>
      {mode === 'Law of Large Numbers' && <LawOfLargeNumbers/>}
      {mode === 'Central Limit Theorem' && <CentralLimitTheorem/>}
      {mode === 'Joint Distributions' && <JointDistributions/>}
      {mode === 'Least Squares' && <LeastSquares/>}
      {mode === 'Omitted Variable Bias' && <OmittedVariableBias/>}
      {mode === 'Confidence Intervals' && <ConfidenceIntervals/>}
      {mode === 'Hypothesis Testing' && <HypothesisTesting/>}
      {mode === 'Sample Distribution of OLS Estimators' && <SampleDistributionOLSEstimators/>}
      {mode === '3D Regression' && <Scatter3D/>}
    </div>
  )
}

SimulationContainer.propTypes = {
  setMode: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(MODULES.map((obj) => obj.name)).isRequired,
}
