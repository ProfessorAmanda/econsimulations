import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import InputSlider from 'src/components/InputSlider';

interface TestingForNormalityInputProps {
  sampleSize: number;
  setSampleSize: (sampleSize: number) => void;
  mu: number;
  setMu: (mu: number) => void;
  sigma: number;
  setSigma: (sigma: number) => void;
  alpha: number;
  setAlpha: (alpha: number) => void;
}


export default function TestingForNormalityInput({ sampleSize, setSampleSize, mu, setMu, sigma, setSigma, alpha, setAlpha }: TestingForNormalityInputProps) {
  const [sampleSizeInput, setSampleSizeInput] = useState(sampleSize.toString());
  const [muInput, setMuInput] = useState(mu.toString());
  const [sigmaInput, setSigmaInput] = useState(sigma.toString());
  const [alphaInput, setAlphaInput] = useState(alpha.toString());

  useEffect(() => {
    setSampleSize(+sampleSizeInput);
    setMu(+muInput);
    setSigma(+sigmaInput);
    setAlpha(+alphaInput);
  }, [sampleSizeInput, muInput, sigmaInput, alphaInput]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <span style={{ width: '15rem', textAlign: 'right', marginRight: '2rem' }}>Choose a sample size:</span>
        <Form.Control
          style={{ width: '20rem' }}
          // @ts-ignore
          align="right"
          type="number"
          placeholder="Sample Size:"
          min={1}
          value={sampleSize}
          max={100}
          onChange={(event: any) => setSampleSizeInput(event.target.value)}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '1rem' }}>
        <span style={{ width: '15rem', textAlign: 'right', marginRight: '2rem' }}>Mean:</span>
        <InputSlider
          customStyle={{ width: '20rem' }}
          value={+muInput}
          min={-10}
          max={10}
          step={0.1}
          onChange={setMuInput}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '1.5rem' }}>
        <span style={{ width: '15rem', textAlign: 'right', marginRight: '2rem' }}>Standard deviation:</span>
        <Form.Control
          style={{ width: '20rem' }}
          // @ts-ignore
          align="right"
          type="number"
          placeholder="Standard deviation:"
          min={0.1}
          value={sigma}
          max={5}
          step={0.1}
          onChange={(event: any) => setSigmaInput(event.target.value)}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '1rem' }}>
        <span style={{ width: '15rem', textAlign: 'right', marginRight: '2rem' }}>Alpha:</span>
        <Form.Control
          style={{ width: '20rem' }}
          // @ts-ignore
          align="right"
          type="number"
          placeholder="Alpha:"
          min={0}
          value={+alphaInput}
          max={1}
          step={0.01}
          onChange={(event: any) => setAlphaInput(event.target.value)}
        />
      </div>


    </div>

  );
}
