import InputSlider from 'src/components/InputSlider';
import SelectorButtonGroup from 'src/components/SelectorButtonGroup';
import { Form } from 'react-bootstrap';

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

  return (
    <div style={{ width: 500 }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ width: 100, justifyContent: 'flex-end' }}>Mean:</span>
        <InputSlider value={mu} onChange={onMuChange} min={-10} max={10} step={0.01} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
        <span style={{ width: 100 }}>Standard deviation:</span>
        <InputSlider value={sigma} onChange={onSigmaChange} min={0.1} max={5} step={0.01} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
        <span>P(x</span>
        <div style={{ marginLeft: 5 }}>
          <SelectorButtonGroup
            options={['>=', '<=']}
            selected={largerThan ? '>=' : '<='}
            select={(select: string) => onLargerThanChange(select === '>=')}
          />
        </div>
        <Form.Control
            style={{ width: 70, marginLeft: 5 }}
            type="number"
            className="input-group-append"
            value={val}
            min={-10}
            max={10}
            step={0.1}
            onChange={(event: any) => onValChange(parseFloat(event.target.value))}
          />
        <span style={{ marginLeft: 5 }}>)</span>
      </div>
    </div>
  );
}
