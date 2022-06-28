import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { optionalLaTeXType } from 'src/lib/types';
import Link from 'next/link';
import { Section } from 'src/lib/ts-types';

const modeToRoute = (mode : string) => {
  switch (mode) {
    case 'Law of Large Numbers': return 'law-of-large-numbers';
    case 'Central Limit Theorem': return 'central-limit-theorem';
    case 'Joint Distributions': return 'joint-distributions';
    case 'Least Squares': return 'least-squares';
    case 'Omitted Variable Bias': return 'omitted-variable-bias';
    case 'Confidence Intervals': return 'confidence-intervals';
    case 'Hypothesis Testing': return 'hypothesis-testing';
    case 'Sample Distribution of OLS Estimators': return 'sample-distribution-of-ols-estimators';
    case 'Multiple Regression': return 'multiple-regression';
    case 'The OLS Estimators are Consistent': return 'ols-estimators-are-consistent';
    case 'ANOVA': return 'anova';
    case 'Fixed Effects': return 'fixed-effects';
    case 'Measurement Error': return 'measurement-error';
    default: return '';
  }
}

export default function SimBarOption({ section } : { section : Section }) {
  return (
    <Link href={`/${modeToRoute(section.name)}`} passHref>
      <Card border="primary" className="menu-item" data-testid={`module-${section.name}`}>
        <Card.Header className="menu-item-title">{section.name}</Card.Header>
        <Card.Body>
          <Card.Text className="menu-item-text">{section.description}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

SimBarOption.propTypes = {
  section: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: optionalLaTeXType.isRequired
  }).isRequired,
}
