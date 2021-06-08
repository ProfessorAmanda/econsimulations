import React, { Component } from 'react';
import { Button } from 'reactstrap';

class CLTLLNIntro extends Component{

    render() {
        return (

          <div>
              <div>
                  <h1>
                      Introduction
                  </h1>

              </div>

              <p> This simulation demonstrates the shape of the sampling distribution of the sample mean. Suppose I draw a large number of samples, each of size 𝑛, from some population. For each sample, I calculate a sample mean 𝑥̅. I now plot a histogram of those sample means. For a sufficiently large sample size, the shape of that histogram will look like a beautiful bell-shaped curve, no matter what shape the underlying population had.</p>

              <Button>
                  Continue
              </Button>
            </div>

        )
      }
    }

export default CLTLLNIntro;
