/*

  Displays a menu with all the simulations and allows the user to click to start them

*/
import React from 'react';
import SimBarOption from './SimBarOption';
import PropTypes from 'prop-types'

export default function SimBar({ setSection }) {

  const modes = [
    {
      name: 'Law of Large Numbers',
      description: 'The Law of Large Numbers tells us that that the sample mean approaches the mean of the population as we increase the sample size. This simulation investigates the behavior of the sample mean as we change the sample size.',
    },
    {
      name: "Central Limit Theorem",
      description: "The Central Limit Theorem states that, for sufficiently large samples, the sample mean is approximately normally distributed, even if the underlying population is not normally distributed (or if we have no idea what the underlying population looks like). This simulation investigates how the distribution of the sample mean is affected by the sample size and the shape of the population distribution.",
    },
    {
      name: "Joint Distributions",
      description: "A joint probability distribution describes the simultaneous behavior of two random variables.",
    },
    {
      name: "Least Squares",
      description: "Ordinary least squares regression estimates the slope(s) and intercept of a line to best fit data for two (or more) variables by minimizing the sum of the squared distances from the data points to the line.",
    },
    {
      name: "Omitted Variable Bias",
      description: "Omitted variable bias (OVB) arises when a variable that is i) correlated with the outcome and ii) correlated with one on the included regressors is omitted from the regression model.",
    },
    {
      name: "Confidence Intervals",
      description: "A confidence interval provides a range of values for the likely location of the true population mean, based on information gathered from a sample.",
    },
    // {
    //   name: "Hypothesis Testing",
    //   description: "test",
    // }
  ];

  const sections = modes.map((section) =>
    <li key={section.name}>
      <SimBarOption section={section} setSection={setSection}/>
    </li>
  );

  return (
    <div key={'key23'}>
      <div className="MiniLogo"></div>
      <ul className="simBarOptionList">{sections}</ul>
    </div>
  );
}

SimBar.propTypes = {
  setSection: PropTypes.func.isRequired,
}
