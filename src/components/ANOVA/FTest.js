import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import _ from 'lodash';
import { BlockMath, InlineMath } from 'react-katex';
import { mean, sum } from "mathjs";
import { populationMean, populationStandardDev } from "../../lib/stats-utils";
import { jStat } from 'jstat';

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
          <BlockMath math={`\\bar{\\bar{x}} = ${_.round(overallSampleMean, 2)}`}/>
          <BlockMath math={`SSTR = ${_.round(SSTR, 2)}`}/>
          <BlockMath math={`MSTR = ${_.round(MSTR, 2)}`}/>
          <BlockMath math={`SSE = ${_.round(SSE, 2)}`}/>
          <BlockMath math={`MSE = ${_.round(MSE, 2)}`}/>
          <BlockMath math={`F = ${_.round(F, 2)}`}/>
          <BlockMath math={`p-value = ${_.round(pValue, 2)}`}/>
        </>
      )}
    </>
  )
}
