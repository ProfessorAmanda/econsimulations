import { useEffect, useState } from 'react';
import StartHere from './StartHere';
import Footer from './Footer';
import { animated, useSpring } from '@react-spring/web';
import useWindowDimensions from 'src/lib/useWindowDimensions';


export default function SimulationMenuNew() {
  const [gif, setGif] = useState('');
  const [animationDone, setAnimationDone] = useState(false);

  const { isMobile } = useWindowDimensions();

  useEffect(() => {
    // To make sure gif replays on every reload
    setGif('/images/Intro.gif');
  }, []);

  const imgStyles = useSpring({
    from: { y: '0rem' },
    to: { y: '-10rem' },
    config: {
      mass: 1,
      tension: 300,
      friction: 100
    },
    delay: 3300, // The duration for the gif to finish playing
    onStart: () => {
      setTimeout(() => {
        setAnimationDone(true);
      }, 600);
    }
  });

  const textStyles = useSpring({
    config: {
      mass: 1,
      tension: 200,
      friction: 60
    },
    opacity: animationDone ? 1 : 0,
    y: animationDone ? 0 : -100,
  });


  return (
    <div>
      <animated.div style={{
        ...imgStyles,
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundImage: `url('${gif}')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100%',
        zIndex: -1,
      }} />
      <animated.div style={{
        ...textStyles,
        marginLeft: isMobile ? '10%' : '25%',
        marginRight: isMobile ? '10%' : '25%',
      }}>
        <div style={{ marginTop: '50vh' }}>
          <StartHere />
        </div>
        <div style={{ marginTop: '5rem' }}>
          <Footer />
        </div>
      </animated.div>
    </div>
  );
}
