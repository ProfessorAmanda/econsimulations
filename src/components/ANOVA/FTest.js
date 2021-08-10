import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import _ from 'lodash';
import { BlockMath } from 'react-katex';
import { mean, sum } from 'mathjs';
import { populationMean, populationStandardDev } from '../../lib/stats-utils';
import { jStat } from 'jstat';
import PropTypes from 'prop-types';
import { anovaObjectType } from '../../lib/types';

export default function FTest({ populations }) {
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setShowResults(false)
  }, [populations]);

  const samples = populations.map(({ sample }) => sample.map(({ x }) => x));

  const overallSampleMean = (_.flatten(samples).length > 0) ? mean(_.flatten(samples)) : undefined;
  const SSTR = sum(populations.map(({ data }) => data.length * (populationMean(data) - overallSampleMean) ** 2));
  const MSTR = SSTR / (populations.length - 1);
  const SSE = sum(populations.map(({ data }) => (data.length - 1) * populationStandardDev(data) ** 2));
  const MSE = SSE / (sum(populations.map(({ data }) => data.length)) - populations.length);
  const F = MSTR / MSE;
  const pValue = jStat.anovaftest(...samples);

  return (
    <>
      <Button
        variant="outline-primary"
        active={showResults}
        onClick={() => setShowResults(true)}
        disabled={samples.some((sample) => sample.length === 0)}
      >
        Run F-Test
      </Button>
      {showResults && (
        <>
          <Table bordered style={{marginTop: 20}} className="anova-table">
            <thead>
              <tr>
                <th></th>
                <th><BlockMath math={`\\bar{\\bar{x}} = ${_.round(overallSampleMean, 2)}`}/></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <th></th>
                <th>Sum of Squares</th>
                <th>df</th>
                <th>Mean Sum of Squares</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Due to Treatment</td>
                <td>{_.round(SSTR, 2)}</td>
                <td>{populations.length - 1}</td>
                <td>{_.round(MSTR, 2)}</td>
                <td></td>
              </tr>
              <tr>
                <td>Due to Error</td>
                <td>{_.round(SSE, 2)}</td>
                <td>{_.flatten(samples).length - populations.length}</td>
                <td>{_.round(MSE, 2)}</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td><BlockMath math={`F = ${F.toPrecision(3)}`}/></td>
                <td><BlockMath math={`p-value \\approx ${pValue.toPrecision(3)}`}/></td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

FTest.propTypes = {
  populations: PropTypes.arrayOf(anovaObjectType).isRequired
}
