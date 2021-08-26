import { useEffect, useState } from 'react';
import SimBar from './SimBar.js';
import StartHere from './StartHere';
import { Button, Fade } from 'react-bootstrap';
import SimulationContainer from './SimulationContainer.js';

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

  const teachingMaterialsLink = (
    <>
      <Button
        size="sm"
        variant="primary"
        href="https://amandagreggeconomics.com/statistics-simulations-project/"
        target="_blank"
        rel="noopener noreferrer"
      >
        View teaching materials
      </Button>
      {' '}
      <Button
        size="sm"
        variant="success"
        href="https://github.com/ProfessorAmanda/econsimulations"
        target="_blank"
        rel="noopener noreferrer"
      >
        View code on GitHub
      </Button>
    </>
  );

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
            {teachingMaterialsLink}
          </>
        )}
      </div>
    ) : (
      <div>
        {(mode === 'Home') ? (
          <Fade in={(mode === 'Home')}>
            <>
              <SimBar setSection={setMode}/>
              {teachingMaterialsLink}
            </>
          </Fade>
        ) : (
          <SimulationContainer mode={mode} setMode={setMode}/>
        )}
      </div>
    )
  );
}
