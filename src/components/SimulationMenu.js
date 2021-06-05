/*

  Displays the StartHere button and then the menu once the button is clicked

  props:
    none
*/
import React, { useEffect, useState } from 'react';
import SimBar from './SimBar.js';
import StartHere from './StartHere';
import { Fade } from 'reactstrap';
import SimulationContainer from './SimulationContainer.js';

export default function SimulationMenu() {
  const [mode, setMode] = useState("Home");
  const [start, setStart] = useState(true);
  const [logo, setLogo] = useState(false);  // TODO - init to true for deployment!!

  // TODO - This has been commented out so the animation doesn't run during development
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLogo(false);
  //   }, 3500);
  // }, []);

  return (
    start ? (
      <div>
        <div className="App-bg"></div>
        {!logo && <StartHere start={start} showApp={() => setStart(false)}/>}
      </div>
    ) : (
      <div>
        {
          (mode === "Home") ? (
            <Fade in={(mode === "Home")} style={{ display: (mode === "Home") ? 'block' : 'none' }}>
              <div className="Splash"></div>
              <div className="Nav" key={'unkey'}>
                <SimBar setSection={setMode}/>
              </div>
            </Fade>
          ) : (
            <SimulationContainer mode={mode} setMode={setMode}/>
          )
        }
      </div>
    )
  );
}