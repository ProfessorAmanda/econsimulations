import React, { useState } from 'react';
import Collapsable from '../Collapsable.js';
import ChartContainer from '../ChartContainer.js';
import SampleArea from '../SampleArea.js';
import SimulateSamples from '../SimulateSamples.js';
import { Alert } from 'reactstrap';
import { generateNormal, sample } from "../../lib/stats-utils.js";
import DifferenceOfMeansDisplay from "./DifferenceOfMeansDisplay.js";

const distributionArr = generateNormal();

export default function Normal() {
  const [sampled, setSampled] = useState([]);
  const [stage, setStage] = useState(1);
  const [mainSampleSize] = useState(2000);
  const [popArray] = useState(distributionArr);
  const [popMean] = useState(63.894);
  const [popType] = useState("Normal");
  const [sampleMean, setSampleMean] = useState(0);

  const getSample = (size) => {
    const sampleObject = sample(size, distributionArr);
    setSampled(sampleObject.pop)
    setStage(2);
    return sampleObject;
  }

  return (
    <div>
      <Collapsable>
        <div>
            {
              (stage >= 1) &&
              <div>
                <ChartContainer popArray={popArray} popMean={popMean} sampled={sampled} popType={'Normal'} mainSampleSize={mainSampleSize}/>
                <div>
                  <p> Try a few different sample sizes and compare sample mean to population mean </p>
                  <SampleArea setMean={setSampleMean} redraw = {() => {}} sample={getSample} popArray={distributionArr} popType={popType}/>
                  {stage >= 2 &&
                    <div>
                      <DifferenceOfMeansDisplay popMean={popMean} sampleMean={sampleMean}/>
                      <Alert color="info">
                        According to the law, the average of the results obtained from a large enough sample should be close to the total average of the population, and will tend to become closer the larger the sample is. Make sure to pick several samples, or click below for a simulation to see the law in action.
                      </Alert>
                      <SimulateSamples type={popType} sample={(size) => sample(size, popArray).pop} pop={popMean}/>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </Collapsable>
    </div>
  );

}
