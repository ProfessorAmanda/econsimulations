import LawOfLargeNumbersContainer from './LawOfLargeNumbers/LawOfLargeNumbersContainer.js';
import CentralLimitTheoremContainer from './CentralLimitTheorem/CentralLimitTheoremContainer.js';
import JointDistributionsContainer from './JointDistributions/JointDistributionsContainer.js';
import LeastSquaresContainer from './LeastSquares/LeastSquaresContainer.js';
import OmittedVariableBiasContainer from './OmittedVariableBias/OmittedVariableBiasContainer.js';
import ConfidenceIntervalsContainer from './ConfidenceIntervals/ConfidenceIntervalsContainer.js';
import HypothesisTestingContainer from './HypothesisTesting/HypothesisTestingContainer.js';
import SampleDistributionOLSEstimatorsContainer from './SampleDistributionOLSEstimators/SampleDistributionOLSEstimatorsContainer.js';
import MultipleRegressionContainer from './MultipleRegression/MultipleRegressionContainer.js';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { MODULES } from '../lib/constants.js';
import OLSEstimatorsAreConsistentContainer from './OLSEstimatorsAreConsistent/OLSEstimatorsAreConsistentContainer.js';
import ANOVAContainer from './ANOVA/ANOVAContainer.js';


export default function SimulationContainer({ mode, setMode }) {
  return (
    <div data-testid="sim-container" style={{paddingBottom: 25}}>
      <Button className="home-button" variant="outline-danger" id="Menu" onClick={() => setMode('Home')}>MENU</Button>
      <div className="mini-logo"/>
      {mode === 'Law of Large Numbers' && <LawOfLargeNumbersContainer/>}
      {mode === 'Central Limit Theorem' && <CentralLimitTheoremContainer/>}
      {mode === 'Joint Distributions' && <JointDistributionsContainer/>}
      {mode === 'Least Squares' && <LeastSquaresContainer/>}
      {mode === 'Omitted Variable Bias' && <OmittedVariableBiasContainer/>}
      {mode === 'Confidence Intervals' && <ConfidenceIntervalsContainer/>}
      {mode === 'Hypothesis Testing' && <HypothesisTestingContainer/>}
      {mode === 'Sample Distribution of OLS Estimators' && <SampleDistributionOLSEstimatorsContainer/>}
      {mode === 'Multiple Regression' && <MultipleRegressionContainer/>}
      {mode === 'The OLS Estimators are Consistent' && <OLSEstimatorsAreConsistentContainer/>}
      {mode === 'ANOVA' && <ANOVAContainer/>}
    </div>
  )
}

SimulationContainer.propTypes = {
  setMode: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(MODULES.map((obj) => obj.name)).isRequired,
}
