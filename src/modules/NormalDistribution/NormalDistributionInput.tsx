import InputSlider from 'src/components/InputSlider';
import SelectorButtonGroup from 'src/components/SelectorButtonGroup';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

interface NormalDistributionInputProps {
  mu: number;
  sigma: number;
  onMuChange: (mu: number) => void;
  onSigmaChange: (sigma: number) => void;
  largerThan: boolean;
  val: number;
  onLargerThanChange: (largerThan: boolean) => void;
  onValChange: (val: number) => void;
}

export default function NormalDistributionInput({ mu, sigma, onMuChange, onSigmaChange, largerThan, val, onLargerThanChange, onValChange }: NormalDistributionInputProps) {

  const [muInput, setMuInput] = useState(mu.toString());
  const [sigmaInput, setSigmaInput] = useState(sigma.toString());
  const [valInput, setValInput] = useState(val.toString());

  useEffect(() => {
    if (muInput !== '') {
      onMuChange(parseFloat(muInput));
    }
    if (sigmaInput !== '') {
      onSigmaChange(parseFloat(sigmaInput));
    }
    if (valInput !== '') {
      onValChange(parseFloat(valInput));
    }
  }, [muInput, sigmaInput, valInput]);

  return (
    <div style={{ width: 500 }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ width: 100, justifyContent: 'flex-end' }}>Mean:</span>
        <InputSlider value={muInput} onChange={setMuInput} min={-10} max={10} step={0.01} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
        <span style={{ width: 100 }}>Standard deviation:</span>
        <InputSlider value={sigmaInput} onChange={setSigmaInput} min={0.1} max={5} step={0.01} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '2rem' }}>
        <span>P(x</span>
        <div style={{ marginLeft: '0.5rem' }}>
          <SelectorButtonGroup
            options={['>=', '<=']}
            selected={largerThan ? '>=' : '<='}
            select={(select: string) => onLargerThanChange(select === '>=')}
          />
        </div>
        <Form.Control
            style={{ width: 80, marginLeft: '0.5rem' }}
            type="number"
            className="input-group-append"
            value={valInput}
            min={-10}
            max={10}
            step={0.1}
            onChange={(event: any) => setValInput(event.target.value)}
          />
        <span style={{ marginLeft: '0.5rem' }}>)</span>
      </div>
    </div>
  );
}
