/*

  Displays a menu with all the simulations and allows the user to click to start them

  props:
    setSection - callback function

*/
import React from 'react';
import clt from '../images/clt.png';
import lln from '../images/lln.png';
import jd from '../images/jd.jpg';
import ls from '../images/ls.png';
import ovs from '../images/ovs.png';
import SimBarOption from './SimBarOption';

export default function SimBar({ setSection }) {

  const modes = [
    {
      name: 'Law of Large Numbers',
      description: 'The Law of Large Numbers tells us that that the sample mean approaches the mean of the population as we increase the sample size. This simulation investigates the behavior of the sample mean as we change the sample size.',
      extra: "",
      img: lln
    },
    {
      name: "Central Limit Theorem",
      description: "The Central Limit Theorem states that, for sufficiently large samples, the sample mean is approximately normally distributed, even if the underlying population is not normally distributed (or if we have no idea what the underlying population looks like). This simulation investigates how the distribution of the sample mean is affected by the sample size and the shape of the population distribution.",
      extra: "",
      img: clt
    },
    {
      name: "Joint Distributions",
      description: "A joint probability distribution describes the simultaneous behavior of two random variables.",
      extra: "",
      img: jd
    },
    {
      name: "Least Squares",
      description: "Ordinary least squares regression estimates the slope(s) and intercept of a line to best fit data for two (or more) variables by minimizing the sum of the squared distances from the data points to the line.",
      extra: "",
      img: ls
    },
    {
      name: "Omitted Variable Bias",
      description: "Omitted variable bias (OVB) arises when a variable that is i) correlated with the outcome and ii) correlated with one on the included regressors is omitted from the regression model.",
      extra: "",
      img: ovs
    },
    {
        name: "Confidence Intervals",
        description: "test",
        extra: "",
        img: undefined
    }
      // ,
      //
      //             {
      //                 name: "Hypothesis Testing",
      //                 description: "test",
      //                 extra: "",
      //                 img: undefined
      //             }
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
