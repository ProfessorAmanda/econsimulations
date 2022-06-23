import SimBar from '../components/SimBar';
import { Fade } from 'react-bootstrap';
import Footer from '../components/Footer';

export default function Menu() {
  return (
    <div className="wrapper">
      <Fade in>
        <>
          <SimBar />
          <Footer />
        </>
      </Fade>
    </div>
  )
}