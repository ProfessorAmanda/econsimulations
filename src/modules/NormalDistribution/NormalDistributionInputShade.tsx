import InputSlider from "src/components/InputSlider";
import SelectorButtonGroup from "src/components/SelectorButtonGroup";

interface NormalDistributionInputShadeProps {
  largerThan: boolean;
  val: number;
  onLargerThanChange: (largerThan: boolean) => void;
  onValChange: (val: number) => void;
}

export default function NormalDistributionInputShade({ largerThan, onLargerThanChange, val, onValChange }: NormalDistributionInputShadeProps) {

  return (
    <div style={{width: 500}}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ width: 100, justifyContent: 'flex-end' }}>Larger than:</span>
        <SelectorButtonGroup
          options={['>=', '<=']}
          selected={largerThan ? '>=' : '<='}
          select={(select: string)=>onLargerThanChange(select==='>=')} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
        <span style={{ width: 100 }}>Value:</span>
        <InputSlider value={val} onChange={(v: string)=>onValChange(parseFloat(v))} min={-10} max={10} step={0.1} />
      </div>
    </div>
  );
}
