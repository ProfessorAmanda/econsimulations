import { useEffect, useState } from 'react';
import StartHere from './StartHere';
import Footer from './Footer';



export default function SimulationMenu() {
  const [logo, setLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogo(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="intro-animation" />
      {!logo && (
        <>
          <StartHere />
          <br />
          <br />
          <br />
          <br />
          <Footer />
        </>
      )}
    </div>
  );
}
