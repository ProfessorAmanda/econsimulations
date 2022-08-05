import SolowModelShift from './SolowModelShift';
import SolowModelShock from './SolowModelShock';
import SimulationIntro from 'src/components/SimulationIntro';
import SelectorButtonGroup from 'src/components/SelectorButtonGroup';
import { useState } from 'react';

export default function SolowModelContainer() {
  const [mode, setMode] = useState('');

  return (
    <div className="module-container">
      <SimulationIntro
        name="Solow Model"
        text="One of the primary goals of macroeconomics is to understand the drivers of long run economic growth. Part of this question is why some countries grow more quickly than others, while another part deals more with the long-run “destination” to which countries may be heading. The Solow model approaches these questions by considering the roles of capital accumulation, diminishing marginal returns, and the concept of a “steady state.” Explore the limits of production and capital accumulation in growing the economy, and how the economy reacts to shocks."
      />
      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <SelectorButtonGroup options={[ 'Shift', 'Shock' ]} select={setMode} selected={mode} />
      </div>
      {mode === 'Shift' && <SolowModelShift />}
      {mode === 'Shock' && <SolowModelShock />}
    </div>
  );
}
