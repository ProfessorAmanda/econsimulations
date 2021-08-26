import { useEffect, useState } from 'react';
import SimBar from './SimBar.js';
import StartHere from './StartHere';
import { Fade } from 'react-bootstrap';
import SimulationContainer from './SimulationContainer.js';
import Footer from './Footer.js';

export default function SimulationMenu() {
  const [mode, setMode] = useState('Home');
  const [start, setStart] = useState(true);
  const [logo, setLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogo(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    start ? (
      <div>
        <div className="intro-animation"/>
        {!logo && (
          <>
            <StartHere start={start} showApp={() => setStart(false)}/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Footer/>
          </>
        )}
      </div>
    ) : (
      <div>
        {(mode === 'Home') ? (
          <Fade in={(mode === 'Home')}>
            <>
              <SimBar setSection={setMode}/>
              <Footer/>
            </>
          </Fade>
        ) : (
          <SimulationContainer mode={mode} setMode={setMode}/>
        )}
      </div>
    )
  );
}
