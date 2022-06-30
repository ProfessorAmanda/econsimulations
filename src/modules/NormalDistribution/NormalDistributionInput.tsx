import InputSlider from 'src/components/InputSlider';

interface NormalDistributionInputProps {
  mu: number;
  sigma: number;
  onMuChange: (mu: number) => void;
  onSigmaChange: (sigma: number) => void;
}

export default function NormalDistributionInput({ mu, sigma, onMuChange, onSigmaChange }: NormalDistributionInputProps) {

  return (
    <div style={{width: 500}}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ width: 100, justifyContent: 'flex-end' }}>Mean:</span>
        <InputSlider value={mu} onChange={onMuChange} min={-10} max={10} step={0.01} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
        <span style={{ width: 100 }}>Standard deviation:</span>
        <InputSlider value={sigma} onChange={onSigmaChange} min={0.1} max={5} step={0.01} />
      </div>
    </div>
  );
}
