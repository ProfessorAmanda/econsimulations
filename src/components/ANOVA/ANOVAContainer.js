import { Alert } from 'react-bootstrap';
import { InlineMath } from 'react-katex';
import ANOVA from './ANOVA';

export default function ANOVAContainer() {

  return (
    <div className="module-container">
      <Alert className="sim-description" variant="primary">
        ANOVA
      </Alert>
      <Alert className="sim-description" variant="primary">
        The module presents a simple version of ANOVA (Analysis of Variance), in which we test the null hypothesis that the means of two or more populations are equal. We have to make two assumptions to begin: (1) all population groups are normally distributed, and (2) the population standard deviations of all groups are equal. After we take samples, we compose a test statistic (<InlineMath math="F"/>) that compares the variation across groups to the variation within groups.
      </Alert>
      <br/>
      <ANOVA/>
    </div>
  );
}
