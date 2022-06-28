import SimulationIntro from '@/components/SimulationIntro';
import HypothesisTesting from './HypothesisTesting';

export default function HypothesisTestingContainer() {
  return (
    <div className="module-container">
      <SimulationIntro
        name="Hypothesis Testing"
        text="When we conduct a test of hypotheses, we use the information provided by a sample to make a conclusion about population parameters that we cannot directly observe. We are able to make a connection between the sample and the population by using the rules that govern probability distributions. Due to the central limit theorem, we can make a variety of assertions about the probable location of points in a distribution, which allows us to make assertions about where population parameters might be located relative to the data we have collected from a sample. This allows us to test hypotheses."
      />
      <br/>
      <HypothesisTesting/>
    </div>
  )
}
