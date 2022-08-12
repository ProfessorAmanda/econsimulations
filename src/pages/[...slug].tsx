import { useRouter } from 'next/router';
import LawOfLargeNumbersContainer from '../modules/LawOfLargeNumbers/LawOfLargeNumbersContainer';
import CentralLimitTheoremContainer from '../modules/CentralLimitTheorem/CentralLimitTheoremContainer';
import JointDistributionsContainer from '../modules/JointDistributions/JointDistributionsContainer';
import LeastSquaresContainer from '../modules/LeastSquares/LeastSquaresContainer';
import OmittedVariableBiasContainer from '../modules/OmittedVariableBias/OmittedVariableBiasContainer';
import ConfidenceIntervalsContainer from '../modules/ConfidenceIntervals/ConfidenceIntervalsContainer';
import HypothesisTestingContainer from '../modules/HypothesisTesting/HypothesisTestingContainer';
import SampleDistributionOLSEstimatorsContainer from '../modules/SampleDistributionOLSEstimators/SampleDistributionOLSEstimatorsContainer';
import MultipleRegressionContainer from '../modules/MultipleRegression/MultipleRegressionContainer';
import OLSEstimatorsAreConsistentContainer from '../modules/OLSEstimatorsAreConsistent/OLSEstimatorsAreConsistentContainer';
import ANOVAContainer from '../modules/ANOVA/ANOVAContainer';
import FixedEffectsContainer from '../modules/FixedEffects/FixedEffectsContainer';
import MeasurementErrorContainer from '../modules/MeasurementError/MeasurementErrorContainer';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const slugToContainer = (slug : string) => {
  switch (slug) {
    case 'law-of-large-numbers': return <LawOfLargeNumbersContainer />;
    case 'central-limit-theorem': return <CentralLimitTheoremContainer />;
    case 'joint-distributions': return <JointDistributionsContainer />;
    case 'least-squares': return <LeastSquaresContainer />;
    case 'omitted-variable-bias': return <OmittedVariableBiasContainer />;
    case 'confidence-intervals': return <ConfidenceIntervalsContainer />;
    case 'hypothesis-testing': return <HypothesisTestingContainer />;
    case 'sample-distribution-of-ols-estimators': return <SampleDistributionOLSEstimatorsContainer />;
    case 'multiple-regression': return <MultipleRegressionContainer />;
    case 'ols-estimators-are-consistent': return <OLSEstimatorsAreConsistentContainer />;
    case 'anova': return <ANOVAContainer />;
    case 'fixed-effects': return <FixedEffectsContainer />;
    case 'measurement-error': return <MeasurementErrorContainer />;
    case '': return <></>;
    default: return <div>404</div>;
  }
}

export default function Module() {
  const [currSlug, setCurrSlug] = useState('');

  const router = useRouter();
  useEffect(() => {
    if (router.isReady && router.query.slug) {
      setCurrSlug(router.query.slug[0]);
    }
  }, [router.isReady]);

  return (
    <div className="wrapper">
      <div data-testid="sim-container" style={{ paddingBottom: 25 }}>
        <Link href={'/menu'} passHref>
          <Button className="home-button" variant="outline-danger" id="Menu" style={{ margin: 15 }}>MENU</Button>
        </Link>
        <div className="mini-logo" />
        {slugToContainer(currSlug)}
      </div>

    </div>
  )
}
