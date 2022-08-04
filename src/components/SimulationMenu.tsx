import { useState } from 'react';
import StartHere from './StartHere';
import Footer from './Footer';
import { animated, useSpring } from '@react-spring/web';
import useWindowDimensions from 'src/lib/useWindowDimensions';
import Image from 'next/image';


export default function SimulationMenuNew() {
  const [animationDone, setAnimationDone] = useState(false);

  const { isMobilePortrait } = useWindowDimensions();

  const imgAnimation = useSpring({
    from: { y: '10rem' },
    to: { y: '0rem' },
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

  const textAnimation = useSpring({
    config: {
      mass: 1,
      tension: 200,
      friction: 60
    },
    opacity: animationDone ? 1 : 0,
    y: animationDone ? 0 : -100,
  });


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <animated.div style={{
        ...imgAnimation
      }}
      >
        <Image
          src="/images/IntroNew.gif"
          width="768"
          height="408"
          alt="logo" />
      </animated.div>
      <animated.div style={{
        ...textAnimation,
        marginLeft: isMobilePortrait ? '10%' : '25%',
        marginRight: isMobilePortrait ? '10%' : '25%',
      }}>
        <div>
          <StartHere />
        </div>

        <div style={{ marginTop: '5rem' }}>
          <Footer />
        </div>
      </animated.div>
    </div>
  );
}
