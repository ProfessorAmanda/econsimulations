import SimulationMenu from '../components/SimulationMenu';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <div style={{
        position: 'fixed',
        objectFit: 'cover',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        opacity: 0.025,
        zIndex: -5,
      }}>
        <Image src="/images/bg.png" layout="fill" alt="background"/>
      </div>
      <SimulationMenu />
    </div>
  )
}