import { InlineMath } from 'react-katex';
import SimulationIntro from '../SimulationIntro';
import ANOVA from './ANOVA';

export default function ANOVAContainer() {

  return (
    <div className="module-container">
      <SimulationIntro
        name="ANOVA"
        text={<>The module presents a simple version of ANOVA (Analysis of Variance), in which we test the null hypothesis that the means of two or more populations are equal. We have to make two assumptions to begin: (1) all population groups are normally distributed, and (2) the population standard deviations of all groups are equal. After we take samples, we compose a test statistic (<InlineMath math="F"/>) that compares the variation across groups to the variation within groups.</>}
      />
      <br/>
      <ANOVA/>
    </div>
  );
}
