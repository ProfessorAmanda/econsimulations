import { useEffect, useState } from 'react';
import Collapsable from '../Collapsable.js';
import ChartContainer from '../ChartContainer.js';
import SampleSizeInput from '../SampleSizeInput.js';
import { Alert } from 'react-bootstrap';
import { populationMean, dataFromDistribution } from '../../lib/stats-utils.js';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { popShapeType } from '../../lib/types.js';
import SimulateSamples from '../SimulateSamples.js';

export default function LawOfLargeNumbers({ popShape, sampleSize }) {
  const [sampled, setSampled] = useState([]);
  const [stage, setStage] = useState(1);
  const [popArray, setPopArray] = useState([]);

  useEffect(() => {
    setStage(1);
    const newPop = dataFromDistribution(popShape, sampleSize);
    setPopArray(newPop);
    setSampled([]);
  }, [popShape, sampleSize]);

  const handleClick = (size) => {
    const sample = _.sampleSize(popArray, size);
    setSampled(sample);
    setStage(2);
  }

  const popMean = populationMean(popArray) || 0;
  const sampleMean = _.round(populationMean(sampled), 2) || 0;

  return (
    <Collapsable>
      <div data-testid="lln-sim">
        <ChartContainer popArray={popArray} popMean={popMean} sampled={sampled} sampleMean={sampleMean} popShape={popShape}/>
        <p>Try a few different sample sizes and compare sample mean to population mean</p>
        <SampleSizeInput maxSize={popArray.length} minSize={1} handleClick={handleClick}/>
        {(stage >= 2) && (
          <div>
            <Alert variant="success">
              Sample Mean: {_.round(sampleMean, 2) || ''}
              <br/>
              Difference of Means: {_.round(popMean - sampleMean, 2)}
            </Alert>
            <Alert variant="info">
              According to the law, the average of the results obtained from a large enough sample should be close to the total average of the population, and will tend to become closer the larger the sample is. Make sure to pick several samples, or see below for a simulation to see the law in action.
            </Alert>
            <SimulateSamples
              title={`Population vs Sample Means <br /> (${popShape})`}
              popArray={popArray}
              popMean={_.round(popMean, 2)}
              sampleSeriesName={`Population Mean (${popMean.toFixed(2)})`}
              meanSeriesName="Sampled Means"
            />
          </div>
        )}
      </div>
    </Collapsable>
  );
}

LawOfLargeNumbers.propTypes = {
  popShape: popShapeType.isRequired,
  sampleSize: PropTypes.number.isRequired,
}
