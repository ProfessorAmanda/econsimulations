import SimBar from '../components/SimBar';
import { Fade } from 'react-bootstrap';
import Footer from '../components/Footer';
import Head from 'next/head';

export default function Menu() {
  return (
    <div className="wrapper">
      <Head>
        <title>Econ Simulations</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Fade in>
        <>
          <SimBar />
          <Footer />
        </>
      </Fade>
    </div>
  )
}