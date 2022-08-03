import SimulationIntro from 'src/components/SimulationIntro';
import NormalDistribution from './NormalDistribution';

export default function LeastSquaresContainer() {
  return (
    <div className="module-container">
      <SimulationIntro
        name="Normal Distribution"
        text="The Normal Distribution is one of the most important probability distributions, because it describes a wide range of natural phenomena. You can uniquely identify any normal distribution with just its mean and standard deviation. This module demonstrates how the mean and standard deviation determine the probabilities calculated from the normal probability density function. It is also possible to test whether a given dataset follows a normal distribution by using a chi-square goodness-of-fit test."
      />
      <br/>
      <NormalDistribution />
    </div>
  );
}
